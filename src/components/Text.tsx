import React from "react";
import styles from "./Text.module.css";

type variantType = "p" | "h1" | "heading" | "subHeading";

type Props = {
  variant: variantType;
  children: React.ReactNode;
  isTitle?: boolean;
};

const Text: React.FC<Props> = ({ variant, children, isTitle }) => {
  switch (variant) {
    case "p":
      return <p className={styles.p}>{children}</p>;
    case "h1":
      if (isTitle) {
        return <h1 className={`${styles.h1} ${styles.title}`}>{children}</h1>;
      }
      return <h1 className={`${styles.h1}`}>{children}</h1>;
    case "heading":
      return <h2 className={`${styles.heading}`}>{children}</h2>;
    case "subHeading":
      return (
        <h2 className={`${styles.h3} ${styles.subHeading}`}>{children}</h2>
      );

      break;
    default:
      break;
  }
};

export default Text;
