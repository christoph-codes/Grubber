import React, { useState, useEffect } from "react";
import HttpService from '../../services/HttpService/HttpService';
import { Col, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
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
    if (email && username && location && password && confirmPassword && !feedback) {
      const accountDetails = {
        email,
        userName: username,
        location,
        userPass: password // May need to encrypt if we do not use TLS/HTTPS
      };

      // TODO: Send account details to database
      console.log(accountDetails);
      setFeedback("");
      HttpService.requestPost(`${process.env.REACT_APP_API_HOST}/api/auth/createaccount`, accountDetails).then(() => {
        //Load 2nd Form/Load dashboard
      }).catch(() => {
        //redirect to error page
      });
    } else {
      setFeedback("All fields must be filled out.");
    }
  };

  useEffect(() => {
    // Ensure the passwords match
    if(password && confirmPassword) {
      if(password === confirmPassword) {
        setFeedback('');
      } else {
        setFeedback('Passwords do not match.');
      }
    }
  }, [password, confirmPassword, feedback]);

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
          <div className="additional-form-links">
            <Link to="/">Already Have An Account? Login</Link>
          </div>
        </div>
      </div>
    </Col>
  );
}
