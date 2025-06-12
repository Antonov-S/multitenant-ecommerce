import { Category } from "@/payload-types";

import { CategoryDropdown } from "./category-dropdawn";

interface CategoriesProps {
  data: any;
}

export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((categoriy: Category) => (
          <div key={categoriy.id}>
            <CategoryDropdown
              category={categoriy}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
