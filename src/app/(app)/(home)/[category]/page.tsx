interface PageProps {
  params: Promise<{ category: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { category } = await params;

  return <div>Category: {category}</div>;
};

export default Page;
