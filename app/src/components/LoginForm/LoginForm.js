import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import "./LoginForm.scss";

import UsernameInput from "../ui/formElements/UsernameInput/UsernameInput";
import PasswordInput from "../ui/formElements/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const login = () => {
    if (username && password) {
      if (!feedback) {
        const accountDetails = {
          username,
          password,
        };
        // TODO: Send account details to database
        console.log(accountDetails);
      }
    } else {
      setFeedback("All fields must be filled out.");
    }
  };

  useEffect(() => {
    // Validate correct username and password

    if (username.length > 0) {
        let isGoodUsername = true;
        if(isGoodUsername) {
            setFeedback("");
        } else {
            setFeedback("Please enter your account username.");
        }
    }
    if (password.length > 0) {
        let isGoodPassword = true;
        if (isGoodPassword) {
            setFeedback("");
        } else {
            setFeedback("Please enter your password.");
        }
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
          <div className="additional-form-links">
            <Link to="/create-account">Create An Account?</Link>
            <Link to="/forgot-password">Forgot Your Password?</Link>
          </div>
        </div>
      </div>
    </Col>
  );
}
