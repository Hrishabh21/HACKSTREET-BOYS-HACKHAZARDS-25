import { NextResponse } from "next/server";
import { Keypair, Server, TransactionBuilder, Networks, Operation, Asset } from "stellar-sdk";

const server = new Server("https://horizon-testnet.stellar.org"); // testnet

export async function POST(req: Request) {
  const { recipientWallet, amount } = await req.json();

  const senderSecret = process.env.STELLAR_SECRET!;
  const senderKeypair = Keypair.fromSecret(senderSecret);
  const senderPublic = senderKeypair.publicKey();

  const account = await server.loadAccount(senderPublic);
  const fee = await server.fetchBaseFee();

  const tx = new TransactionBuilder(account, {
    fee,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(Operation.payment({
      destination: recipientWallet,
      asset: Asset.native(),
      amount: amount.toString(),
    }))
    .setTimeout(30)
    .build();

  tx.sign(senderKeypair);
  const result = await server.submitTransaction(tx);

  return NextResponse.json({ status: "success", result });
}
