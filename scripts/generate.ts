import dotenv from "dotenv";
dotenv.config({ path: ".env" });

//Configure dotenv
import { getEmbeddingCollection, getVectorStore } from "../utils/astraDB";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function generateEmbeddings() {
  const vectorStore = await getVectorStore();
  (await getEmbeddingCollection()).deleteMany({});
  const loader = new DirectoryLoader("data/", {
    ".json": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
    ".data.ts": (path) => new TextLoader(path),
  });
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 100,
  });
  const output = await splitter.splitDocuments(docs);
  await vectorStore.addDocuments(output);
}

generateEmbeddings();
