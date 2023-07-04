import styles from "../home.module.css";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles["navbar-title-container"]}>
        <span className={styles["navbar-title"]}>Interview questions</span>
        <span className={styles["navbar-title-gray"]}>by sisv4</span>
      </div>
      <a
        className={styles["navbar-link"]}
        target="_blank"
        rel="noopener"
        href="https://t.me/sharpenjoyer"
      >
        Telegram
      </a>
    </div>
  );
};
