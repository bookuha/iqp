import styles from "./links-list.module.css";

export interface Link {
  label: string;
  url: string;
}

interface Props {
  links: Link[];
}

export const LinksList = ({ links }: Props) => {
  return (
    <div className={styles.list}>
      {links.map((l) => (
        <a key={l.label} href={l.url} className={styles.link}>
          {l.label}
        </a>
      ))}
    </div>
  );
};
