import React from "react";
import Text from "../Text";
import styles from "./TextInput.module.css";

type Props = {
  placeholder?: string;
  elementId: string;
  label: string;
  inputType: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputComponent: React.FC<Props> = ({
  placeholder,
  elementId,
  label,
  inputType,
  value,
  onChange,
}) => {
  return (
    <div className={styles.input}>
      <label htmlFor={elementId}>
        <Text variant="p">{label}</Text>
      </label>
      <input
        id={elementId}
        type={inputType}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
