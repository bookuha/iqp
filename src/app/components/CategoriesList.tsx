import { LinksList } from "@/app/components/LinksList";
import styles from "./categories-list.module.css";
import { Category } from ".prisma/client";

const fetchCategories = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/categories");
  return await res.json();
};

export const CategoriesList = async () => {
  const categories: Category[] = await fetchCategories();

  return (
    <div>
      <h2>Categories</h2>
      <div className={styles.content}>
        <LinksList
          links={categories.map(({ title, slug }) => ({
            label: title,
            url: "categories/" + slug,
          }))}
        />
      </div>
    </div>
  );
};
