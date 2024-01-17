import { on } from "events";
import styles from "./popup.module.css";

export default function Popup(props: {
  open: boolean;
  children: React.ReactNode;
  onClickClose?: () => void;
  backgroundColor?: string;
}) {
  const handlePopupClose = () => {
    props.onClickClose?.();
  };

  return (
    props.open && (
      <div className={styles.popup} onClick={handlePopupClose}>
        <div
          className={styles.content}
          style={
            props.backgroundColor
              ? { backgroundColor: props.backgroundColor }
              : {}
          }
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      </div>
    )
  );
}
