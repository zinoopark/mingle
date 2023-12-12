import { on } from "events";
import styles from "./popup.module.css";

export default function Popup({
  open,
  children,
  onClickClose,
}: {
  open: boolean;
  onClickClose?: () => void;
  children: React.ReactNode;
}) {
  const handlePopupClose = () => {
    onClickClose?.();
  };
  return (
    open && (
      <div className={styles.popup} onClick={handlePopupClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  );
}
