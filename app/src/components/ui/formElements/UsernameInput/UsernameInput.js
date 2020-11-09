import React, { Fragment, useEffect, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./UsernameInput.scss";

export default function UsernameInput({ placeholder, handler, feedback }) {
  const [value, setValue] = useState("");
  const sendValue = (e) => {
    let val = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setValue(val);
  };

  useEffect(() => {
    if (value) {
      if (value.length > 0) {
        let regex = /^[a-z0-9.]{6,16}$/;
        if (regex.test(value)) {
          feedback("");
        } else {
          feedback(
            "Your unique username must be between 6 to 16 characters and must not included any special characters. Get Creative!"
          );
        }
      } else {
        feedback("You must enter a unique username.");
      }
    } else {
        feedback("")
    }
    handler(value);
  });

  return (
    <Fragment>
      <InputGroup className="UsernameInput" size="lg">
        <FormControl
          placeholder={placeholder}
          onChange={sendValue}
          type="text"
          maxLength="16"
          value={value}
          autoComplete="username"
        />
      </InputGroup>
    </Fragment>
  );
}
