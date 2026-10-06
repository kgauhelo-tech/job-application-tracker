import Text from "../components/Text";
import Styles from "./PageNotFound.module.css";
import { AlertTriangle } from "reicon-react";

const PageNotFound = () => {
  function handleNavigateBack() {}
  return (
    <div className={Styles.page_container}>
      <div className={Styles.cont}>
        <div className={Styles.text_cont}>
          <Text variant="h1">Page not found!</Text>
        </div>
        <div className={Styles.icon_cont}>
          <AlertTriangle size={75} color="white" />
        </div>
        <div className={Styles.btn_cont}>
          <button onClick={handleNavigateBack}>
            <Text variant={"p"}>Return</Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
