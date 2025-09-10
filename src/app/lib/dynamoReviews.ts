import { DYNAMO_DB } from "./dynamoClient";
import { PutCommand, GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { CategoryType } from "../types/category.types";

const TABLE_NAME = "csr-reviews";

export interface DynamoReview {
  id: string;
  owner: string;
  restName: string;
  sandName: string;
  intro: string;
  categories: CategoryType[];
  mainCategories: CategoryType[];
  extraCategories: CategoryType[];
  overallRating: number;
  altRating: number;
  remarks: string;
  hashtags: string[];
}

export async function createReview(review: DynamoReview): Promise<void> {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: review,
  });

  await DYNAMO_DB.send(command);
}

export async function getReviewById(id: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });

  const result = await DYNAMO_DB.send(command);
  return result.Item;
}

export async function getAllReviews() {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
  });

  const result = await DYNAMO_DB.send(command);
  return result.Items;
}

export async function getReviewsByOwner(owner: string) {
  // Use scan with filter instead of query since index might not be configured correctly
  const command = new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: "#owner = :owner",
    ExpressionAttributeNames: {
      "#owner": "owner"
    },
    ExpressionAttributeValues: {
      ":owner": owner,
    },
  });

  const result = await DYNAMO_DB.send(command);
  return result.Items;
}
