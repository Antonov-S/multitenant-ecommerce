import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1, // populate subcategories
      pagination: false,
      where: {
        parent: {
          exists: false
        }
      },
      sort: "name"
    });

    const formattedData = data.docs.map(cat => ({
      ...cat,
      subcategories: (cat.subcategories?.docs || []).filter(
        (sub): sub is Category => typeof sub === "object" && sub !== null
      )
    }));

    return formattedData;
  })
});
