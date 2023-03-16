import { ethers } from "ethers";

const WS_RPC_URL = ""; // TODO: WebSocket URL here
const WORMHOLE_ADDRESS = "0xC8e2b0cD52Cf01b0Ce87d389Daa3d414d4cE29f3";
const EVENT_SIGNATURE =
  "LogMessagePublished(address,uint64,uint32,bytes,uint8)";

(async () => {
  const provider = new ethers.providers.WebSocketProvider(WS_RPC_URL);
  const filter = {
    address: WORMHOLE_ADDRESS,
    topics: [ethers.utils.id(EVENT_SIGNATURE)],
  };
  provider.on(filter, (log) => {
    console.log(log);
    const { blockHash } = log;
    provider.getBlock(blockHash).then((result) => console.log(result));
  });
})();
