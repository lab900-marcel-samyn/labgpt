import { CallbackManagerForToolRun } from "langchain/dist/callbacks";
import { Tool } from "langchain/tools";

export class ExampleTool extends Tool {
  name = "ExampleTool";
  description = "Useful if you want to know what a tool looks like.";

  protected _call(
    arg: any,
    callbackManager?: CallbackManagerForToolRun | undefined
  ): Promise<string> {
    return Promise.resolve("This is the result of an example tool.");
  }
}
