import assert from "assert";
import getProvider from "../helpers/getProvider";
import EthereumProvider from "../../src/provider";

describe("forking", () => {
  describe("auth", () => {
    describe("Handle invalid url", () => {
      it("returns the correct error response", async () => {
        await assert.rejects(
          getProvider({
            fork: {
              url: "https://mainnet.infura.io/v3/INVALID_URL" // invalid infura URL
            }
          }),
          {
            message:
              `Invalid JSON response from fork provider:\n\n invalid project id\n` +
              `\n\nThe provided fork url, https://mainnet.infura.io/v3/INVALID_URL, may be an invalid or incorrect Infura endpoint.` +
              `\nVisit https://infura.io/docs/ethereum for Infura documentation.`
          }
        );
      });
    });
    describe.skip("Basic Authentication", () => {
      let provider: EthereumProvider;
      before(async function () {
        provider = await getProvider({
          fork: {
            //url: "http://localhost:3000"
            //url: "https://mainnet.infura.io/v3/5c6624a8c03c413f90c091baa879dc98"
            url:
              "wss://mainnet.infura.io/ws/v3/aba2a3c1f59f4e2a952b01310fd552b2"
            // password: "3029b7acc7c64b03a71a834b1417d5f5"
            // jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjI3YTAxZjViZjVhYzRjZTFiNzQ0MGRiZTgxYjNiYTViIn0.eyJleHAiOjE2NDMyMTY5MTksImF1ZCI6ImluZnVyYS5pbyJ9.DZRQZKcbuLKPZRCK5kamg3XQ_0NizdnzC1085n4b9Em_9UWBx0DScBBHSYL_2Q5tw-tG9ndLFsUh_bjjUeORdGbs2RpBYcvjkI5xMIHiWEM_r5fqXf8O35YgenaggIiyz_48DeBSeNfjz8HAsXhnm0Sb2ZJmrgfOTYxj0-dQycX4SPDudjCk4ee_XuAgNC_PYFqPA7VZLalETu032_AuFgWTDZbbDiFRHH1nBPFC2Jh-YKL524y922gKeaN1NA1RxMqhObH8PF36iJfvMrCM5ZaEM6n8M0s62M61bXKI_MYQtwaE3KCM5jVuJnleeSviedOxQ32mg9YT9h7A2npKaA",
            // headers: [
            //   {
            //     name: "authorization",
            //     value: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjExNzBmMzMzNDBlNjRlYjI4NWY1YTc3ZjQ4NWRhYjY5In0.eyJleHAiOjE2NDMyMTY5MTksImF1ZCI6ImluZnVyYS5pbyJ9.MS7OgYcBd5bTZbYVZKyfXhgh6tf0eIuucyGX8DRYSo08XzGROD9ir6Qz4bWq_A7Uk7hdU_K5GaULx_je-LXC25ax84dJ8n9W5SeGnajwodvXGtiNlNws0il3ZXE9DOJiBFeJXgRpTdY2iKQf-tNVdUr9nY9AGUYiBsxHsF3XXTFoN4oPHJSkKQqnpdDS4JU730HODuKWMIClhb0Z7rplC-XvHGrZz-oGoSQVCW7zwN40zyfc0bHttlNa9EufdJZ74GHnM3IMB8-bVzCL2CdELdIS0r6EuftXhcUimlcm0Zk4UN4CWHV-uj_Iv8ebj63os0b55tJFtt4R-Xlp6gO50w"
            //   }
            // ]
          }
        });
      });

      it("it doesn't crash", async () => {
        const addresses = [
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
          "0x00000000219ab540356cbb839cbe05303d7705fa",
          "0xc61b9bb3a7a0767e3179713f3a5c7a9aedce193c",
          "0xdc76cd25977e0a5ae17155770273ad58648900d3",
          "0x53d284357ec70ce289d6d64134dfac8e511c8a3d",
          "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
          "0x73bceb1cd57c711feac4224d062b0f6ff338501e",
          "0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea",
          "0x07ee55aa48bb72dcc6e9d78256648910de513eca",
          "0x229b5c097f9b35009ca1321ad2034d4b3d5070f6",
          "0x1b3cb81e51011b549d78bf720b0d924ac763a7c2",
          "0xe853c56864a2ebe4576a807d26fdc4a0ada51919",
          "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
          "0xe92d1a43df510f82c66382592a047d288f85226f",
          "0x2bf792ffe8803585f74e06907900c2dc2c29adcb",
          "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
          "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
          "0xf66852bc122fd40bfecc63cd48217e88bda12109"
          // "0x558553d54183a8542f7832742e7b4ba9c33aa1e6",
          // "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
          // "0x66f820a414680b5bcda5eeca5dea238543f42054",
          // "0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca",
          // "0xf977814e90da44bfa03b6295a0616a897441acec",
          // "0x3bfc20f0b9afcace800d73d2191166ff16540258",
          // "0x0548f59fee79f8832c299e01dca5c76f034f558e",
          // "0xc098b2a3aa256d2140208c3de6543aaef5cd3a94",
          // "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3",
          // "0x8103683202aa8da10536036edef04cdd865c225e",
          // "0x0a4c79ce84202b03e95b7a692e5d728d83c44c76",
          // "0x2b6ed29a95753c3ad948348e3e7b1a251080ffb9",
          // "0x1e2fcfd26d36183f1a5d90f0e6296915b02bcb40",
          // "0x24d48513eac38449ec7c310a79584f87785f856f",
          // "0x189b9cbd4aff470af2c0102f365fc1823d857965",
          // "0x00e13ba0cbe2583e23528f4e84ccbf909d39c869",
          // "0x0e22e8c049f96170ac41e0e3b360a14feb8083a2",
          // "0x701bd63938518d7db7e0f00945110c80c67df532",
          // "0xb29380ffc20696729b7ab8d093fa1e2ec14dfe2b",
          // "0x59448fe20378357f206880c58068f095ae63d5a5",
          // "0x9bf4001d307dfd62b26a2f1307ee0c0307632d59",
          // "0xe9fb0895312d39da56c173f1486b1ce934b4004a",
          // "0xe0f5b79ef9f748562a21d017bb7a6706954b7585",
          // "0xae93ec389ae6fa1c788ed2e1d222460bb6d0177b",
          // "0x9845e1909dca337944a0272f1f9f7249833d2d19",
          // "0x98ec059dc3adfbdd63429454aeb0c990fba4a128",
          // "0x1ffedd7837bcbc53f91ad4004263deb8e9107540",
          // "0x657e46adad8be23d569ba3105d7a02124e8def97",
          // "0x73263803def2ac8b1f8a42fac6539f5841f4e673",
          // "0x40f0d6fb7c9ddd9cbc1c02a208380c08cf77189b",
          // "0x78b96178e7ae1ff9adc5d8609e000811657993c8",
          // "0xd65bd7f995bcc3bdb2ea2f8ff7554a61d1bf6e53",
          // "0x1a71b118ac6c9086f43bcf2bb6ada3393be82a5c",
          // "0xfc39f0dc7a1c5d5cd1cdf3b460d5fa99a56abf65",
          // "0xd44023d2710dd7bef797a074ecec4fc74fdd52b2",
          // "0x7712bdab7c9559ec64a1f7097f36bc805f51ff1a",
          // "0x024861e9f89d44d00a7ada4aa89fe03cab9387cd",
          // "0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9",
          // "0x90a9e09501b70570f9b11df2a6d4f047f8630d6d",
          // "0xbf3aeb96e164ae67e763d9e050ff124e7c3fdd28",
          // "0xb8808f9e9b88497ec522304055cd537a0913f6a0",
          // "0x36a85757645e8e8aec062a1dee289c7d615901ca",
          // "0xf274483d5bb6e2522afea3949728f870ba32bb9c",
          // "0xa7e4fecddc20d83f36971b67e13f1abc98dfcfa6",
          // "0x8cf23cd535a240eb0ab8667d24eedbd9eccd5cba",
          // "0x5b5b69f4e0add2df5d2176d7dbd20b4897bc7ec4",
          // "0xd69b0089d9ca950640f5dc9931a41a5965f00303",
          // "0xf774da4418c6dca3051f0e7570829b24214e730b",
          // "0x3ba25081d3935fcc6788e6220abcace39d58d95d",
          // "0x12136e543b551ecdfdea9a0ed23ed0eff5505ee0",
          // "0xfd61352232157815cf7b71045557192bf0ce1884",
          // "0xfd898a0f677e97a9031654fc79a27cb5e31da34a",
          // "0x4b4a011c420b91260a272afd91e54accdafdfc1d",
          // "0xa8dcc0373822b94d7f57326be24ca67bafcaad6b",
          // "0x844ada2ed8ecd77a1a9c72912df0fcb8b8c495a7",
          // "0x9c2fc4fc75fa2d7eb5ba9147fa7430756654faa9",
          // "0xb20411c403687d1036e05c8a7310a0f218429503",
          // "0x9a1ed80ebc9936cee2d3db944ee6bd8d407e7f9f",
          // "0xb8cda067fabedd1bb6c11c626862d7255a2414fe",
          // "0xb9fa6e54025b4f0829d8e1b42e8b846914659632",
          // "0x701c484bfb40ac628afa487b6082f084b14af0bd",
          // "0xba18ded5e0d604a86428282964ae0bb249ceb9d0",
          // "0xfe01a216234f79cfc3bea7513e457c6a9e50250d",
          // "0x0c05ec4db907cfb91b2a1a29e7b86688b7568a6d",
          // "0xc4cf565a5d25ee2803c9b8e91fc3d7c62e79fe69",
          // "0xe04cf52e9fafa3d9bf14c407afff94165ef835f7",
          // "0x77afe94859163abf0b90725d69e904ea91446c7b",
          // "0x19d599012788b991ff542f31208bab21ea38403e",
          // "0xca582d9655a50e6512045740deb0de3a7ee5281f",
          // "0xd05e6bf1a00b5b4c9df909309f19e29af792422b",
          // "0x0f00294c6e4c30d9ffc0557fec6c586e6f8c3935",
          // "0xeb2b00042ce4522ce2d1aacee6f312d26c4eb9d6",
          // "0x7ae92148e79d60a0749fd6de374c8e81dfddf792",
          // "0x554f4476825293d4ad20e02b54aca13956acc40a",
          // "0x9cf36e93a8e2b1eaaa779d9965f46c90b820048c",
          // "0x4756eeebf378046f8dd3cb6fa908d93bfd45f139",
          // "0x091933ee1088cdf5daace8baec0997a4e93f0dd6",
          // "0xa0efb63be0db8fc11681a598bf351a42a6ff50e0",
          // "0x8b83b9c4683aa4ec897c569010f09c6d04608163",
          // "0x550cd530bc893fc6d2b4df6bea587f17142ab64e",
          // "0x828103b231b39fffce028562412b3c04a4640e64",
          // "0x367989c660881e1ca693730f7126fe0ffc0963fb",
          // "0xe35b0ef92452c353dbb93775e0df97cedf873c72",
          // "0x0518f5bb058f6215a0ff5f4df54dae832d734e04",
          // "0x0e86733eab26cfcc04bb1752a62ec88e910b4cf5",
          // "0x0ff64c53d295533a37f913bb78be9e2adc78f5fe",
          // "0xb8b6fe7f357adeab950ac6c270ce340a46989ce1",
          // "0xeddf8eb4984cc27407a568cae1c78a1ddb0c2c1b",
          // "0x7145cfedcf479bede20c0a4ba1868c93507d5786",
          // "0x2fa9f9efc767650aace0422668444c3ff63e1f8d",
          // "0xd57479b8287666b44978255f1677e412d454d4f0",
          // "0x4baf012726cb5ec7dda57bc2770798a38100c44d",
          // "0x6262998ced04146fa42253a5c0af90ca02dfd2a3",
          // "0x19184ab45c40c2920b0e0e31413b9434abd243ed",
          // "0xb5ab08d153218c1a6a5318b14eeb92df0fb168d6",
          // "0x5195427ca88df768c298721da791b93ad11eca65",
          // "0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13",
          // "0x8d95842b0bca501446683be598e12f1c616770c1",
          // "0xa4a6a282a7fc7f939e01d62d884355d79f5046c1",
          // "0x35aeed3aa9657abf8b847038bb591b51e1e4c69f",
          // "0xefb2e870b14d7e555a31b392541acf002dae6ae9",
          // "0xb93d8596ac840816bd366dc0561e8140afd0d1cb",
          // "0x11577a8a5baf1e25b9a2d89f39670f447d75c3cd",
          // "0xdcd0272462140d0a3ced6c4bf970c7641f08cd2c",
          // "0xaf10cc6c50defff901b535691550d7af208939c5",
          // "0x67f706db3bbd04a250eed049386c5d09c4ee31f0",
          // "0x3d4530082c3eb60f58af03f79b1ed3f40e591cd1",
          // "0x595faf77e533a5cd30ab5859c9a0116de8bad8db",
          // "0x1bd3fc5ac794e7af8e834a8a4d25b08acd9266ce",
          // "0xd5268a476aadd1a6729df5b3e5e8f2c1004139af",
          // "0x7ead3a4361bd26a20deb89c9470be368ee9cb6f1",
          // "0xf481b7fab9f5d0e74f21ae595a749634fb053619",
          // "0xdb3c617cdd2fbf0bb4309c325f47678e37f096d9",
          // "0xd47b4a4c6207b1ee0eb1dd4e5c46a19b50fec00b",
          // "0xa1a45e91164cdab8fa596809a9b24f8d4fdbe0f3",
          // "0x16769e533352798deb664ba570230a758346ca1a",
          // "0x3bc643a841915a267ee067b580bd802a66001c1d",
          // "0xd65fb7d4cb595833e84c3c094bd4779bab0d4c62",
          // "0x4ce6b9b77a2e3341c4f94c751cd5c3b2424eb4b2",
          // "0x376c3e5547c68bc26240d8dcc6729fff665a4448",
          // "0x2125f3189cd5d650d6142b222f20083efc2d05f2",
          // "0x1b8766d041567eed306940c587e21c06ab968663",
          // "0x8fe68ee399bff5f8373b4b0877eaa518ca2026d3",
          // "0x6a11f3e5a01d129e566d783a7b6e8862bfd66cca",
          // "0xd9858d573a26bca124282afa21ca4f4a06eff98a",
          // "0x991a7ff3cb20d5b5d6d9be5efec4e4c51cddad7a",
          // "0x47029dc4f3922706bf670d335c45550cff4f6a35",
          // "0x8ae880b5d35305da48b63ce3e52b22d17859f293",
          // "0x5a710a3cdf2af218740384c52a10852d8870626a",
          // "0x27321f84704a599ab740281e285cc4463d89a3d5",
          // "0xbf4ed7b27f1d666546e30d74d50d173d20bca754",
          // "0xdb89045c811549f7eb925ec16f7d0cd7166556b3",
          // "0x4eac9ce57af61a6fb1f61f0bf1d8586412be30bc",
          // "0x5657e633be5912c6bab132315609b51aadd01f95",
          // "0x7d465b1b48855925ae5fad79b68415468d6a866e",
          // "0x999e77c988c4c1451d3b1c104a6cca7813a9946e",
          // "0x7d6149ad9a573a6e2ca6ebf7d4897c1b766841b4",
          // "0x4fdd5eb2fb260149a3903859043e962ab89d8ed4",
          // "0x1fe29b608c1cab7b7354fc96c7bbb2a68355ced6",
          // "0xcdbf58a9a9b54a2c43800c50c7192946de858321",
          // "0x40f50e8352d64af0ddda6ad6c94b5774884687c3",
          // "0x2d89034424db22c9c555f14692a181b22b17e42c",
          // "0x6586ce3d543e0c57b347f0c3b9eeed2f132c104f",
          // "0x4b5d3010905e0a2f62cce976d52c4f6eb5e545a5",
          // "0x7f3a1e45f67e92c880e573b43379d71ee089db54",
          // "0x469f1ea76d13d4b4ea20a233eac8ce6ac74d5087",
          // "0xb7b678375ee3841846e11765739f04ca9bb75a9a",
          // "0x3a048255067e077001d970d03da5c9f335f9b77e",
          // "0x539c92186f7c6cc4cbf443f26ef84c595babbca1",
          // "0xbfbbfaccd1126a11b8f84c60b09859f80f3bd10f",
          // "0x868dab0b8e21ec0a48b726a1ccf25826c78c6d7f",
          // "0x44c2eb90a6d5d74dce8dccbd485cd889f8bc7b6a",
          // "0x1cc1c81fd28cd948e94da74fa22fc4182d9ecfec",
          // "0xd47ae555e8d869794adf7d1dbb78a7e47ccf811f",
          // "0xae3808749e520415fd5184a5ee333b65cc86be8c",
          // "0xc39cc669a548c661dfa6b5a1eeaa389d1ec53143",
          // "0x2fd56159f4c8664a1de5c75e430338cfa58cd5b9",
          // "0xa0e239b0abf4582366adaff486ee268c848c4409",
          // "0x63b421492ac68600ca218e29f0d432389886d894",
          // "0x28140cb1ac771d4add91ee23788e50249c10263d",
          // "0xc5424b857f758e906013f3555dad202e4bdb4567",
          // "0xa160cdab225685da1d56aa342ad8841c3b53f291",
          // "0x8b15eb5ea0a405da4d82f26d9197fad62ef7405a",
          // "0xc56fefd1028b0534bfadcdb580d3519b5586246e",
          // "0x86a6a0080b1a4c9390416cf73ffb02738d94f8d6",
          // "0xd793281182a0e3e023116004778f45c29fc14f19",
          // "0x0dbd8de20eed94a5693d57998827fcf68ed2ecf4",
          // "0xd24400ae8bfebb18ca49be86258a3c749cf46853",
          // "0x1b29dd8ff0eb3240238bf97cafd6edea05d5ba82",
          // "0x76ae5632ae65d95dd704218920f7d8ac4daef9cc",
          // "0x282edab8a933bc1c02649fe3ea2842ecbe9928a7",
          // "0x3cceb0d443ca4b1320ae4fa60a053eac163ca512",
          // "0x30a2ebf10f34c6c4874b0bdd5740690fd2f3b70c",
          // "0xe4f4866437513e7e023fb3933ba43045312b7459",
          // "0x1bb762b16438f8b287626fd1042bc6f6848cc286",
          // "0xdc24316b9ae028f1497c275eb9192a3ea0f67022",
          // "0xb3764761e297d6f121e79c32a65829cd1ddb4d32",
          // "0xb46427e2cddecb0bde40bf402361effddd4401e2",
          // "0x2eb08efb9e10d9f56e46938f28c13ecb33f67b15",
          // "0xca0a044400c1fa857e4cd0c95d86376b85659303",
          // "0x18c535cdf2f10a62471676682d00b408306cae0b",
          // "0x1085b9c6e43895cc441ba1840b940ef786683785",
          // "0x677f887fae0873bcf7e800f77bc7643063c7dece",
          // "0x28973c01a23a002e8c40dc123858fd2122e50f87",
          // "0x583197dccce7e295525acfa016eabe1b25becbc6",
          // "0x46fde20dfde85c8c169e8823b6f615146674103e",
          // "0x7d783603bd1caed3cdb8e734a50fb35df1f1da7a",
          // "0x58c1655ee5c109bf69715411dc32338e40a54c46",
          // "0x385dc986ac6dfaefe851ac95d3650e0baafef3ac",
          // "0x67586e3526bbe9f3e19d76bb41f1de0a774b50b4",
          // "0x79f67f689b9925710d4dda2a39d680e9cea61c81",
          // "0x6d9d2b30df394f17a5058aceb9a4d3446f1bc042",
          // "0xd2b0b1daed605718080f861034d3241f1cfd89cb",
          // "0x368d43c23843ca9b49dc861d80251bda6a090367",
          // "0x88a7ef2f047f8b07c6c917a6fd1a13438e9d8424",
          // "0x1d0295df8712965a22e6851059ba205d07542b77",
          // "0xfdfeb7474b6b104f32599948bb7f8ed81b06def3",
          // "0xcfee6efec3471874022e205f4894733c42cbbf64",
          // "0x8033539e873b3f0deaba706dd6d3480e0dd5cb30",
          // "0x3f7e77b627676763997344a1ad71acb765fc8ac5",
          // "0x23b8fdb94858cbf1f917256ff7bf20d4ea768110",
          // "0x80845058350b8c3df5c3015d8a717d64b3bf9267",
          // "0x7566126f2fd0f2dddae01bb8a6ea49b760383d5a",
          // "0x802ea31c421ec79e8190cb68b699af3e3bc625fe",
          // "0xe5e47125d919c4efdff82ab8792e319096492a87",
          // "0x755cdba6ae4f479f7164792b318b2a06c759833b",
          // "0x438cb3c3efe8ff20878726da06b7c26db1138f3e",
          // "0x21346283a31a5ad10fa64377e77a8900ac12d469",
          // "0x6b378be3c9642ccf25b1a27facb8ace24ac34a12",
          // "0x1e143b2588705dfea63a17f2032ca123df995ce0",
          // "0x4920f22b632bfaa40af8d39c31d9607809485952",
          // "0xe9778e69a961e64d3cdbb34cf6778281d34667c2",
          // "0xef110ca3c34a5074d455d687ac98f40c03d16173",
          // "0xf4fa0e6c5ab8d4c9c45c40cf48a8bbbb5cb4f046",
          // "0xa2f6abe26fe0e1c1f2684ab002ed02a59ffbf85a",
          // "0xdfb6a4b143f6a1de4725c451c46433801de52bfd",
          // "0x8759b0b1d9cba80e3836228dfb982abaa2c48b97",
          // "0x1522900b6dafac587d499a862861c0869be6e428",
          // "0x97e813b9a81d097e60a5e6311bc9a475199b67ae",
          // "0xaf306bad224f70d6e1971ba17d97c144cab119e4",
          // "0x742d35cc6634c0532925a3b844bc454e4438f44e",
          // "0x8b505e2871f7deb7a63895208e8227dcaa1bff05",
          // "0x1e22cd8cfa52e950e1f1e78d7e9d59b20df63909",
          // "0xe5ab43ec248ba3dcf7b57ec498701a7d0576f2e2",
          // "0x711cd20bf6b436ced327a8c65a14491aa04c2ca1",
          // "0xff64a8933e05c9d585ab72db95d207ebee9be5a8",
          // "0x3262f13a39efaca789ae58390441c9ed76bc658a",
          // "0x9a9d870472bee65080e82bf3591f7c91de31a7cc",
          // "0x19bf56fca395a600c20f732b05757f30ad24a719",
          // "0x04b7f4195595d8132dd8249cc8dc7e79a6ae772b",
          // "0xff2ac8c5834a7585fcc97edb8ba2431c4beab487",
          // "0x4ed97d6470f5121a8e02498ea37a50987da0eec0",
          // "0xcac9c634b4464efe71a9a5910edba06686baf457",
          // "0x2d1566722288be5525b548a642c98b546f116aa0",
          // "0xf443864ba5d5361bbc54298551067194f980a635",
          // "0x84bf16e7675cee22d0e0302913ccf58b45333ddf",
          // "0x891404dd46a473584f5510d5ecbfd8d83794428f",
          // "0x06fed18718975d9e178e0c0fea35c18eac794c3f",
          // "0x1342a001544b8b7ae4a5d374e33114c66d78bd5f",
          // "0xb4f4317b7885de16305d1303570879c21f378255",
          // "0xd4914762f9bd566bd0882b71af5439c0476d2ff6",
          // "0x5bcd25b6e044b97dfc941b9ec4b617ec10e1abcd",
          // "0xa43d2e05ed00c040c8422a88cb8ede921a539f92",
          // "0x998a7fd73446cd6532bf3058a270581730b27137",
          // "0x084ef8564b4f75a70b7ad5e8aabf73edac005397",
          // "0x904cc2b2694ffa78f04708d6f7de205108213126",
          // "0x693be1ea307e3b3826d34e96336399969898dee8",
          // "0x8c3389616404fda275cfdba0c7b0b3d1fee9ebdc",
          // "0xf8a4d3a0b5859a24cd1320ba014ab17f623612e2",
          // "0xb4db55a20e0624edd82a0cf356e3488b4669bd27",
          // "0x51cab40a6895d2a5c092f3766b3b9830884b0adf",
          // "0x2a77d03a2eb21d0d4a3841c62fa4340465b03a3f",
          // "0x8dc250d5403ba72cbeaf0ac40f7c61c6db3a9a20",
          // "0x05576087d1ad92873da0a3b76e7105195935b0f5",
          // "0x7c2a289c0523e748c286a37570d2efc16d2c934e",
          // "0x062448f804191128d71fc72e10a1d13bd7308e7e",
          // "0x6a25f40929a1fe4984f914b9d87e2c461cce369b",
          // "0x36e5c4b77138f0c6386ef969225a005c28bcda63",
          // "0xbba17b81ab4193455be10741512d0e71520f43cb",
          // "0xa7efae728d2936e78bda97dc267687568dd593f3",
          // "0xe20c0178c91050155f461685c24db0c0276c94b6",
          // "0xa646e29877d52b9e2de457eca09c724ff16d0a2b",
          // "0x51fd527c62e40bc1ef62f1269f7f13c994777ee2",
          // "0xe2f34156be01c20aa815530d3a05b8951178bd81",
          // "0xd0ffc75e8000cba848d259b8d121a7bfcc13dce8",
          // "0x1f2dfb84fb0afdaf1019b9309181fa0fc86b61c0",
          // "0x11a05633e78aabf81cbc84d58e0f8d07fd25c992",
          // "0x876eabf441b2ee5b5b0554fd502a8e0600950cfa",
          // "0x955a27306f1eb21757ccbd8daa2de82675aabc36",
          // "0xceffc7330317f72957c662d072a5e7d63b9b578c",
          // "0x14c728c9aeeafce01f1a7b87d02255dd4326f180",
          // "0x31e8e8b728bcde2287c275de4bedc4d8c6efa925",
          // "0x50cb0508434b4c68a2c4fde30b02b269d2d5b6bd",
          // "0xf79f21c74a1e53c5eb148eb0c6e64196a30d439c",
          // "0x9d3937226a367bedce0916f9cee4490d22214c7c",
          // "0x9a9bed3eb03e386d66f8a29dc67dc29bbb1ccb72",
          // "0xd641651ed7e19a04ce536610d75b3dcaf427ad73",
          // "0x50bd66bfddf48b8914602bf51c93756731ec51ae",
          // "0x5a03703125380cfda804446fdaa3b4064cb6cc0a",
          // "0xc3ecba28af450e2ed469164766751130d93ecc36",
          // "0x6220d7a458a68d6a554e5904792049fd2ef6bbcc"
        ];

        const aa = await provider.send("eth_getBlockByNumber", [
          "0xb3c207",
          true
        ]);
        const aa1 = await provider.send("eth_getBlockByNumber", ["0xb3c207"]);
        const aa2 = await provider.send("eth_getBlockByNumber", ["0xb3c207"]);
        const aa3 = await provider.send("eth_getBlockByNumber", ["0xb3c207"]);
        return;

        let p = addresses.map(address => {
          return provider.send("eth_getBalance", [address]).then(balance => {
            console.log(address, BigInt(balance));
          });
        });
        await Promise.all(p);
        p = addresses.map(address => {
          return provider.send("eth_getBalance", [address]).then(balance => {
            console.log(address, BigInt(balance));
          });
        });
        await Promise.all(p);
        p = addresses.map(address => {
          return provider.send("eth_getBalance", [address]).then(balance => {
            console.log(address, BigInt(balance));
          });
        });
        await Promise.all(p);
        // const result = await provider.send("eth_getBalance", [
        //   "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8"
        // ]);
        // console.log(BigInt(result));
      }).timeout(0);
    });
  });
});
