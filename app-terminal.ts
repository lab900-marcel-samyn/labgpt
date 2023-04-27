import dotenv from "dotenv-safe";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { Calculator } from "langchain/tools/calculator";
import createPrompt from "prompt-sync";
import { botContext } from "./prompts";
import { ExampleTool } from "./tools";

dotenv.config();

const prompt = createPrompt();

export const run = async () => {
  const model = new ChatOpenAI({ temperature: 0.5 });
  const tools = [
    // new SerpAPI(process.env.SERPAPI_API_KEY, {
    //   location: "Mechelen,Belgium",
    //   hl: "en",
    //   gl: "be",
    // }),
    new Calculator(),
    new ExampleTool(),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-conversational-react-description",
    memory: new BufferMemory({
      returnMessages: true,
      memoryKey: "chat_history",
    }),
    agentArgs: {
      systemMessage: botContext,
    },
    verbose: true,
  });

  while (true) {
    const request = prompt("Message: ") ?? "";
    if (!request.trim()) {
      break;
    }

    const response = await executor.call({ input: request });

    console.log(response.output);
  }
};

run();
