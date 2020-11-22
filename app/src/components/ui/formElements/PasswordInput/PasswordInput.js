import React, { Fragment, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./PasswordInput.scss";

export default function PasswordInput({ placeholder, handler, feedback }) {
  const [value, setValue] = useState("");
  const sendValue = (e) => {
    let val = e.target.value;
    setValue(val);
    handler(val);
  };

  return (
    <Fragment>
      <InputGroup className="PasswordInput" size="lg">
        <FormControl
          placeholder={placeholder}
          onChange={sendValue}
          type="password"
          min="6"
          autoComplete="new-password"
          value={value}
        />
      </InputGroup>
    </Fragment>
  );
}
