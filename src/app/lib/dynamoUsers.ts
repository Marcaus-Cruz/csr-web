import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { Hitlist } from "../types/hitlist.types";
import { DYNAMO_DB } from "./dynamoClient";

const TABLE_NAME = "csr-users";

export interface DynamoUser {
  id: string;
  email: string;
  created: string;
  updated: string;
  hitlist?: Hitlist;
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

export async function updateUserHitlist(userId: string, newHitlist: Hitlist) {
  const updatedAt = new Date().toISOString();

  await DYNAMO_DB.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: userId },
      UpdateExpression: "SET hitlist = :hitlist, updated = :updated",
      ExpressionAttributeValues: {
        ":hitlist": newHitlist,
        ":updated": updatedAt,
      },
    })
  );
}
