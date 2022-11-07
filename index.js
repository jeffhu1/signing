import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

const rawMessage = "hello world";
const message = new TextEncoder().encode(rawMessage);
const signature = new Uint8Array([
  240, 113, 66, 24, 242, 187, 51, 52, 208, 5, 92, 141, 58, 2, 3, 200, 103, 218,
  95, 197, 101, 136, 128, 201, 40, 143, 152, 183, 217, 252, 169, 136, 185, 172,
  201, 138, 128, 99, 176, 5, 81, 189, 21, 187, 204, 131, 242, 129, 15, 126, 168,
  130, 185, 91, 43, 34, 167, 123, 79, 10, 97, 57, 203, 1,
]);
const publicKey = new PublicKey(
  "42n146w5Rvogu9RzeYVepJmJQnUMKjsjNHmCvGPX5g6c"
).toBytes();

const res = nacl.sign.detached.verify(message, signature, publicKey);
console.log(res);
