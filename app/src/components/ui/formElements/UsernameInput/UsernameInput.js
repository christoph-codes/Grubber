import React, { Fragment, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./UsernameInput.scss";

export default function UsernameInput({ placeholder, handler, onBlurHandler, feedback }) {
  const [value, setValue] = useState("");
  const sendValue = (e) => {
    let val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setValue(val);
    handler(val);
  };

  return (
    <Fragment>
      <InputGroup className="UsernameInput" size="lg">
        <FormControl
          placeholder={placeholder}
          onChange={sendValue}
          onBlur={onBlurHandler}
          type="text"
          maxLength="16"
          value={value}
          autoComplete="username"
        />
      </InputGroup>
    </Fragment>
  );
}
