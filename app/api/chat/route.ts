import { ChatOpenAI } from "@langchain/openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getVectorStore } from "@/utils/astraDB";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;
    const currentMessageContent = body.message;

    const chatModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
    });

    const chatHistory =
      messages
        ?.slice(0, -1)
        ?.map((m: { role: string; message: string }) =>
          m.role === "user"
            ? new HumanMessage(m.message)
            : new AIMessage(m.message)
        ) || [];

    const retriever = (await getVectorStore()).asRetriever();

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a chatbot for a personal portfolio website. You are god of coding. And you also a sarcastic guy. You impersonate the website owner. " +
          "Answer the user's question based on the below context. " +
          "Context:\n{context}",
      ],
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });

    const retrieverChain = await createRetrievalChain({
      combineDocsChain,
      retriever,
    });

    const response = await retrieverChain.invoke({
      input: currentMessageContent,
    });

    // console.log(response);

    return Response.json(
      {
        text: response.answer,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
