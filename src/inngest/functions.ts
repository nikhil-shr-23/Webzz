import { inngest } from "./client";
import { createAgent,  openai } from '@inngest/agent-kit'
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step }) => {

    const sandboxId = await step.run("get-sandvox-id", async()=>{
      const sandbox = await Sandbox.create("webzzr-nextjs-2");
      return sandbox.sandboxId;
    })
    

    const codiza = createAgent({
      name: "writer",
      system: "You are an expert next.js developer and you write readable, maintainble code, you write simple nextjs snippets too and you are proficient with react.",
      model: openai({ model: "gpt-4o"}),
    });

    const { output } = await codiza.run(
      `write the following snippet:${event.data.value}`,
    );
    console.log(output);

    const sandboxUrl = await step.run("get-sandvox-url", async()=>{
      const sandbox = await getSandbox(sandboxId)
       const host =  sandbox.getHost(3000);
       return `https://${host}`;
    })


    return { output, sandboxUrl };
  },
); 