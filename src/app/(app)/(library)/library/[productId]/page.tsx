import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductView } from "@/modules/library/ui/views/product-view";

interface PageParams {
  params: Promise<{
    productId: string;
  }>;
}

const Page = async ({ params }: PageParams) => {
  const { productId } = await params;

  const queryClinet = getQueryClient();
  void queryClinet.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId
    })
  );
  void queryClinet.prefetchQuery(
    trpc.reviews.getOne.queryOptions({
      productId
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <ProductView productId={productId} />
    </HydrationBoundary>
  );
};

export default Page;
