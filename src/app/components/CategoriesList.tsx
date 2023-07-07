import { Link, LinksList } from "@/app/components/LinksList";
import styles from "./categories-list.module.css";

const links: Link[] = [
  { label: "Hot", url: "123" },
  { label: "Internals", url: "123" },
  { label: "ASP.NET", url: "123" },
  { label: "Optimization", url: "123" },
  { label: ".NET Framework", url: "123" },
  { label: "F#", url: "123" },
  { label: "WPF/Avalonia", url: "123" },
];

export const CategoriesList = () => {
  return (
    <div>
      <h2>Categories</h2>
      <div className={styles.content}>
        <LinksList links={links} />
      </div>
    </div>
  );
};
