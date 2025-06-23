import { DYNAMO_DB } from "./dynamoClient";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "csr-users";

export interface DynamoUser {
  id: string;
  email: string;
  created: string;
  updated: string;
  hitlist?: { id: string }[];
}

export async function createUser(userData: DynamoUser) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: userData,
  });

  await DYNAMO_DB.send(command);
}

export async function getUserById(userId: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: userId },
  });

  const result = await DYNAMO_DB.send(command);
  return result.Item;
}

export async function createUserIfNoExist(userData: DynamoUser) {
  const existing = await getUserById(userData.id);

  if (!existing) {
    await createUser(userData);
  }
}
