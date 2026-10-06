import styles from "./ContentCont.module.css";

import React from "react";

type Props = {
  children: React.ReactNode;
  bg_color?: string;
};
const ContentContainer: React.FC<Props> = ({ children, bg_color }) => {
  return (
    <div
      style={{ backgroundColor: `${bg_color}` }}
      className={styles.content_cont}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
