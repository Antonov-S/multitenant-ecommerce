interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { category, subcategory } = await params;

  return (
    <div>
      Category: {category} <br />
      Subcategory: {subcategory || "No subcategories"}
    </div>
  );
};

export default Page;
