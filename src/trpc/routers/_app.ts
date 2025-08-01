import { createTRPCRouter } from "../init";

import { authRouter } from "@/modules/auth/server/procedure";
import { tagsRouter } from "@/modules/tags/server/procedures";
import { reviewsRouter } from "@/modules/reviews/server/procedures";
import { libraryRouter } from "@/modules/library/server/procedures";
import { tenantsRouter } from "@/modules/tenants/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { checkoutRouter } from "@/modules/checkout/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  reviews: reviewsRouter,
  library: libraryRouter,
  tenants: tenantsRouter,
  checkout: checkoutRouter,
  products: productsRouter,
  categories: categoriesRouter
});

export type AppRouter = typeof appRouter;
