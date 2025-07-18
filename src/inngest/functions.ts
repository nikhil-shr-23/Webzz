import { inngest } from "./client";
import { createAgent, Agent, openai } from '@inngest/agent-kit'


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    
    const codiza = createAgent({
      name: "writer",
      system: "You are an expert next.js developer and you write readable, maintainble code, you write simple nextjs snippets too and you are proficient with react.",
      model: openai({ model: "gpt-4o"}),
    });

    const { output } = await codiza.run(
      `write the following snippet:${event.data.value}`,
    );
    console.log(output);


    return { output };
  },
); 