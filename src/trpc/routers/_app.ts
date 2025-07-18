import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
    invoke: baseProcedure
        .input(
            z.object({
                value: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            await inngest.send({
                name: "test/hello.world",
                data: {
                    value: input.value
                }
            })
            return{
                ok:"success"
            }
        }),
        //this is how you invoke a bg job in trpc
  lol: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;