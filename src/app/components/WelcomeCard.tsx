import styles from "./welcome-card.module.css";

export const WelcomeCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles["card-info"]}>
        <span className={styles["card-title"]}>C# interview questions</span>
        <span className={styles["card-content"]}>
          Prepare to your .NET C# interview
        </span>
      </div>
      <a className={styles["card-footer-link"]}>Start</a>
    </div>
  );
};

export default WelcomeCard;
