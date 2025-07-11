import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, trpc } from "@/trpc/server";

import { LibraryView } from "@/modules/library/ui/views/library-view";

const Page = async () => {
  const queryClinet = getQueryClient();
  void queryClinet.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <LibraryView />
    </HydrationBoundary>
  );
};

export default Page;
