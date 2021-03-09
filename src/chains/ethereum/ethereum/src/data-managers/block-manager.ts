import Manager from "./manager";
import { Tag } from "@ganache/ethereum-utils";
import { LevelUp } from "levelup";
import { Quantity, Data } from "@ganache/utils";
import Common from "ethereumjs-common";
import Blockchain from "../blockchain";
import { Block } from "@ganache/ethereum-block";

const NOTFOUND = 404;

const EMPTY_BUFFER = Buffer.from([]);

export default class BlockManager extends Manager<Block> {
  /**
   * The earliest block
   */
  public earliest: Block;

  /**
   * The latest block
   */
  public latest: Block;

  /**
   * The next block
   */
  public pending: Block;

  #blockchain: Blockchain;
  #common: Common;
  #blockIndexes: LevelUp;

  static async initialize(
    blockchain: Blockchain,
    common: Common,
    blockIndexes: LevelUp,
    base: LevelUp
  ) {
    const bm = new BlockManager(blockchain, common, blockIndexes, base);
    await bm.updateTaggedBlocks();
    return bm;
  }

  constructor(
    blockchain: Blockchain,
    common: Common,
    blockIndexes: LevelUp,
    base: LevelUp
  ) {
    super(base, Block, common);

    this.#blockchain = blockchain;
    this.#common = common;
    this.#blockIndexes = blockIndexes;
  }

  #fromFallback = async (tagOrBlockNumber: string | Buffer | Tag) => {
    const fallback = this.#blockchain.fallback;
    const b = await fallback.request("eth_getBlockByNumber", [
      tagOrBlockNumber,
      true
    ]);
    return null;
    // return Block.fromJSON(b, this.#common, true);
  };

  getBlockByTag(tag: Tag) {
    switch (Tag.normalize(tag as Tag)) {
      case Tag.LATEST:
        return this.latest;
      case void 0:
      case null:
        // the key is probably a hex string, let nature takes its course.
        break;
      case Tag.PENDING:
        // TODO: build a real pending block!
        return this.latest; // this.createBlock(this.latest.header);
      case Tag.EARLIEST:
        return this.earliest;
      default:
        // this probably can't happen. but if someone passed something like
        // `toString` in as a block tag and it got this far... maybe we'd
        // get here...
        throw new Error(`Invalid block Tag: ${tag}`);
    }
  }

  getEffectiveNumber(tagOrBlockNumber: string | Buffer | Tag = Tag.LATEST) {
    if (typeof tagOrBlockNumber === "string") {
      const block = this.getBlockByTag(tagOrBlockNumber as Tag);
      if (block) {
        return block.header.number;
      }
    }
    return Quantity.from(tagOrBlockNumber);
  }

  async getNumberFromHash(hash: string | Buffer | Tag) {
    return this.#blockIndexes.get(Data.from(hash).toBuffer()).catch(e => {
      if (e.status === NOTFOUND) return null;
      throw e;
    }) as Promise<Buffer | null>;
  }

  async getByHash(hash: string | Buffer | Tag) {
    const number = await this.getNumberFromHash(hash);
    return number ? super.get(number) : null;
  }

  async getRaw(tagOrBlockNumber: string | Buffer | Tag) {
    // TODO(perf): make the block's raw fields accessible on latest/earliest/pending so
    // we don't have to fetch them from the db each time a block tag is used.
    const number = this.getEffectiveNumber(tagOrBlockNumber).toBuffer();
    return super.getRaw(number).then((block: any) => {
      if (block == null && this.#blockchain.fallback) {
        return this.#fromFallback(tagOrBlockNumber);
      }
      return block;
    });
  }

  async get(tagOrBlockNumber: string | Buffer | Tag) {
    if (typeof tagOrBlockNumber === "string") {
      const block = this.getBlockByTag(tagOrBlockNumber as Tag);
      if (block) return block;
    }

    const block = await super.get(tagOrBlockNumber);
    if (block) return block;

    throw new Error("header not found");
  }

  /**
   * Writes the block object to the underlying database.
   * @param block
   */
  async putBlock(number: Buffer, hash: Buffer, serialized: Buffer) {
    let key = number;
    // ensure we can store Block #0 as key "00", not ""
    if (EMPTY_BUFFER.equals(key)) {
      key = Buffer.from([0]);
    }
    const secondaryKey = hash;
    await Promise.all([
      this.#blockIndexes.put(secondaryKey, key),
      super.set(key, serialized)
    ]);
  }

  updateTaggedBlocks() {
    return new Promise<Block>((resolve, reject) => {
      this.base
        .createValueStream({ limit: 1 })
        .on("data", (data: Buffer) => {
          this.earliest = new Block(data, this.#common);
        })
        .on("error", (err: Error) => {
          reject(err);
        })
        .on("end", () => {
          resolve(void 0);
        });

      this.base
        .createValueStream({ reverse: true, limit: 1 })
        .on("data", (data: Buffer) => {
          this.latest = new Block(data, this.#common);
        })
        .on("error", (err: Error) => {
          reject(err);
        })
        .on("end", () => {
          resolve(void 0);
        });
    });
  }
}
