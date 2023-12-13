import styles from "./Divider.module.css";

export default function Divider(props: { gap: string }) {
  return (
    <div className={styles.divider}>
      <div className={styles.line} style={{ marginBlock: props.gap }}></div>
    </div>
  );
}
