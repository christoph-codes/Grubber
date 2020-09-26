import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import "./LoginForm.scss";

import UsernameInput from "../ui/formElements/UsernameInput/UsernameInput";
import PasswordInput from "../ui/formElements/PasswordInput/PasswordInput";

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const login = () => {
    if (!feedback) {
      const accountDetails = {
        username,
        password,
      };
      // TODO: Send account details to database
      console.log(accountDetails);
    } else {
      setFeedback("All fields must be filled out.");
    }
  };

  useEffect(() => {
    // Validate correct username and password
    if (username && password) {
      if (username.length > 0) {
        setFeedback("");
      } else {
        setFeedback("Please enter a unique username to create your account.");
      }
      if (password.length > 0) {
        setFeedback("");
      } else {
        setFeedback("Please enter your password.");
      }
    } else {
      setFeedback("All fields must be filled out.");
    }
  }, [username, password]);

  return (
    <Col className="LoginForm">
      <div className="full-height purplebg">
        <div className="content">
          <h1>
            Get some <span className="secondary">grub</span> with a new friend
            who enjoys the same food.
          </h1>
          <UsernameInput
            feedback={setFeedback}
            placeholder="Username"
            handler={setUsername}
            required={true}
          />
          <PasswordInput
            feedback={setFeedback}
            placeholder="Password"
            handler={setPassword}
            required={true}
          />
          {feedback ? (
            <div className="feedback">
              <small>{feedback}</small>
            </div>
          ) : null}
          <Button onClick={login}>Login</Button>
        </div>
      </div>
    </Col>
  );
}
