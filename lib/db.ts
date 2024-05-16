import { Account, Client, OAuthProvider } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6644cf900012760a372a");

const account = new Account(client);

export { client, account };
