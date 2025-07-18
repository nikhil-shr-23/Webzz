
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./Client";
import { Suspense } from "react";








const Home =  async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.lol.queryOptions({text: "world"}))
 
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Client/>
      </Suspense>
    </HydrationBoundary>
  );
}

export default Home