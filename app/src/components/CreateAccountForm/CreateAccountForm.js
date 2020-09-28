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
        password
      };
      // TODO: Send account details to database
      console.log(accountDetails);
    } else {
      setFeedback("All fields must be filled out.");
    }
  };

  useEffect(() => {
    // Check database for existing email record
    if(email.length >= 6) {
      setFeedback('');
    } else {
      setFeedback('Please enter a valid email to create your account.');
    }
  }, [email]);

  useEffect(() => {
    // Check database for unique username
    if(username.length > 0) {
      setFeedback('');
    } else {
      setFeedback('Please enter a unique username to create your account.');
    }
  }, [username]);

  useEffect(() => {
    // Ensure the passwords match
    if(password && confirmPassword) {
      if(password === confirmPassword) {
        setFeedback('');
      } else {
          setFeedback('Passwords do not match.');
      }
    } else {
      if(confirmPassword.length > 0) {
        setFeedback('Please confirm your password.');
      }
    }
  }, [password, confirmPassword]);

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
