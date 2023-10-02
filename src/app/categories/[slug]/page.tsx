import { Category } from ".prisma/client";
import { CreateQuestionForm } from "@/app/categories/[slug]/components/CreateQuestionForm/CreateQuestionForm";

const fetchCategory = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${slug}`,
    { next: { revalidate: 20 } }
  );

  return await res.json();
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const category: Category = await fetchCategory(params.slug);

  return (
    <main className="main">
      <h1>{category.title}</h1>
      <p>{category.description}</p>
      <h3>Add a question</h3>
      <CreateQuestionForm />
    </main>
  );
};

export default CategoryPage;
