import { AstraDB } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";
console.log(endpoint, token, collection);

if (!token || !endpoint || !collection) {
  throw new Error("Please set astra db configuration");
}

export async function getVectorStore() {
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: {
        vector: {
          dimension: 1536,
          metric: "cosine",
        },
      },
    }
  );
}

export async function getEmbeddingCollection() {
  return new AstraDB(token, endpoint).collection(collection);
}
