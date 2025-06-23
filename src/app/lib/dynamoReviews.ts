import { DYNAMO_DB } from "./dynamoClient";
import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import type { CategoryType } from "../types/category.types";

const TABLE_NAME = "reviews";

export async function createReview(review: {
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
}) {
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

export async function getReviewsByOwnerId(ownerId: string) {
  const command = new QueryCommand({
    TableName: "csr-reviews", // match your actual table name
    IndexName: "ownerId-index", // the index you created
    KeyConditionExpression: "owner = :ownerId",
    ExpressionAttributeValues: {
      ":ownerId": ownerId,
    },
  });

  const result = await DYNAMO_DB.send(command);
  return result.Items;
}