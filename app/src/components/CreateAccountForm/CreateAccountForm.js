import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import "./CreateAccountForm.scss";

import EmailInput from "../ui/formElements/EmailInput/EmailInput";
import UsernameInput from "../ui/formElements/UsernameInput/UsernameInput";
import LocationInput from "../ui/formElements/LocationInput/LocationInput";
import PasswordInput from "../ui/formElements/PasswordInput/PasswordInput";

export default function CreateAccountForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const createAccount = () => {
    if (!feedback) {
      const accountDetails = {
        email,
        username,
        location,
        password,
        confirmPassword
      };
      console.log(feedback);
      console.log(accountDetails);
    } else {
      setFeedback("All fields must be filled out.");
    }
  };

  const validateEmail = () => {
    // Check database for existing email record
    console.log(email)
  };
  const validateUsername = () => {
    // Check database for unique username
    console.log(username)
  };
  const validatePasswords = () => {
    // Ensure the passwords match
    if(password === confirmPassword) {
        console.log(`${password} + 'is good!`)
    } else {
        console.log(`${password} & ${confirmPassword} do not match!`);
    }
  };

  useEffect(() => {
    validateEmail();
  });

  useEffect(() => {
    validateUsername();
  });

  useEffect(() => {
    validatePasswords();
  });

  return (
    <Col className="CreateAccountForm">
      <div className="full-height purplebg">
        <div className="content">
          <h1>Create Account</h1>
          <UsernameInput
            feedback={setFeedback}
            placeholder="Username"
            handler={setUsername}
            required={true}
          />
          <LocationInput feedback={setFeedback} handler={setLocation} />
          <EmailInput
            feedback={setFeedback}
            placeholder="Email Address"
            handler={setEmail}
            required={true}
          />
          <PasswordInput
            feedback={setFeedback}
            placeholder="Password"
            handler={setPassword}
            required={true}
          />
          <PasswordInput
            feedback={setFeedback}
            placeholder="Confirm Password"
            handler={setConfirmPassword}
            required={true}
          />
          {feedback ? (
            <div className="feedback">
              <small>{feedback}</small>
            </div>
          ) : null}
          <Button onClick={createAccount}>Create Account</Button>
        </div>
      </div>
    </Col>
  );
}
