const http = require("http");
const ethers = require("ethers");

wallet = new ethers.Wallet("334e9ce1983e68f478182570c0a73f0c6a48c113a0e59d250483548d15ba6b8e");

const server = http.createServer(async (req, res) => {
  let hash = ethers.utils.id("time: " + new Date());
  let hashBytes = ethers.utils.arrayify(hash);
  let flatsig = await wallet.signMessage(hashBytes);
  signature = ethers.utils.splitSignature(flatsig);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Type": "application/json",
  };

  res.writeHead(200, headers);

  let data = {
    signature,
    hash,
  };

  res.end(JSON.stringify(data));
});

// Server listening to port 3000
server.listen(3001, () => {
  console.log("Server is Running");
});
