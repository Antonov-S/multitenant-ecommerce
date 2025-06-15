import { getPayload } from "payload";
import configPromise from "@payload-config";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { CustomCategory } from "./types";
import { SearshFilters } from "./search-filters";
import { Category } from "@/payload-types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise
  });

  const data = await payload.find({
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

  // const formattedData: CustomCategory[] = data.docs.map(doc => ({
  //   ...doc,
  //   subcategories:
  //     doc.subcategories?.docs ??
  //     [].map(doc => ({
  //       // Because of "depth: 1" we are confident doc will be a type of "Category"
  //       ...(doc as Category),
  //       subcategories: undefined
  //     }))
  // }));

  const formattedData: CustomCategory[] = data.docs.map(
    (cat): CustomCategory => ({
      ...cat,
      subcategories: (cat.subcategories?.docs || []).filter(
        (sub): sub is Category => typeof sub === "object" && sub !== null
      )
    })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearshFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
