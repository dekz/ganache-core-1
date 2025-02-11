import { utils } from "@ganache/utils";
import {
  Address,
  AddressProtocol,
  SerializedAddress,
  AddressNetwork
} from "./address";
import { Balance, SerializedBalance } from "./balance";
import {
  Definitions,
  DeserializedObject,
  SerializableObject,
  SerializedObject
} from "./serializable-object";
declare type AccountConfig = {
  properties: {
    address: {
      type: Address;
      serializedType: SerializedAddress;
      serializedName: "Address";
    };
    balance: {
      type: Balance;
      serializedType: SerializedBalance;
      serializedName: "Balance";
    };
    nonce: {
      type: number;
      serializedType: number;
      serializedName: "Nonce";
    };
  };
};
declare class Account
  extends SerializableObject<AccountConfig>
  implements DeserializedObject<AccountConfig> {
  #private;
  get config(): Definitions<AccountConfig>;
  static random(
    defaultFIL: number,
    rng?: utils.RandomNumberGenerator,
    protocol?: AddressProtocol,
    network?: AddressNetwork
  ): Account;
  constructor(
    options?:
      | Partial<SerializedObject<AccountConfig>>
      | Partial<DeserializedObject<AccountConfig>>
  );
  addBalance(val: string | number | bigint): void;
  subtractBalance(val: string | number | bigint): void;
  readonly address: Address;
  nonce: number;
  get balance(): Balance;
}
declare type SerializedAccount = SerializedObject<AccountConfig>;
export { Account, AccountConfig, SerializedAccount };
