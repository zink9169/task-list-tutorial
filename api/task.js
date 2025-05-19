import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  try {
    const command = new ScanCommand({
      ExpressionAttributeNames: { "#name": "name" },
      ProjectionExpression: "id, #name, completed",
      TableName: "Tasks",
    });

    const response = await docClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTasks = async ({ name, completed = false }) => {
  try {
    const uuid = crypto.randomUUID();
    const command = new PutCommand({
      TableName: "Tasks",
      Item: {
        id: uuid,
        name,
        completed,
      },
    });

    await docClient.send(command);
    return { id: uuid, name, completed };
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTasks = async ({ id, name, completed }) => {
  try {
    const command = new UpdateCommand({
      TableName: "Tasks",
      Key: { id },
      ExpressionAttributeNames: { "#name": "name" },
      UpdateExpression: "set #name = :n, completed = :c",
      ExpressionAttributeValues: {
        ":n": name,
        ":c": completed,
      },
      ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    return response.Attributes;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTasks = async (id) => {
  try {
    const command = new DeleteCommand({
      TableName: "Tasks",
      Key: { id },
    });

    await docClient.send(command);
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
