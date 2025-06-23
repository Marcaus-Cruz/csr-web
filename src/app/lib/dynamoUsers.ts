import { DYNAMO_DB } from "./dynamoClient";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "Users";

export async function createUser(user: {
  id: string;
  created: string;
  updated: string;
  hitlist?: { id: string }[];
}) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: user,
  });

  await DYNAMO_DB.send(command);
}

export async function getUserById(id: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });

  const result = await DYNAMO_DB.send(command);
  return result.Item;
}
