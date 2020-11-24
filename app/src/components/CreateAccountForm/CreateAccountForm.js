import React, { useState, useEffect } from "react";
import HttpService from '../../services/HttpService/HttpService';
import { Col, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "./CreateAccountForm.scss";

import createAccountValidator from '../util/createAccountValidator';

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
  const [isAllFieldFilled, setIsAllFieldsFilled] = useState(false);

  const createAccount = () => {
    if (isAllFieldFilled) {
      let errors = createAccountValidator.validateAll(username, email, password, confirmPassword);

      //If validation error exists, then display first validation error.
      if(errors.length > 0){
        setFeedback(errors[0]);
      }
      //Else validation is good and information is sent to back-end.
      else {
        const accountDetails = {
          email,
          userName: username,
          location,
          userPass: password // May need to encrypt if we do not use TLS/HTTPS
        };

        setFeedback("");
        HttpService.requestPost(`${process.env.REACT_APP_API_HOST}/api/auth/createaccount`, accountDetails).then((res) => {
          console.log(res.data);
        }).catch((e) => {
          if(e.response){
            //Display Error Message from server
            if (e.response.status === 400){
              const error = e.response.data.error ? e.response.data.error : null,
                    errorMsg = e.response.data.error_message ? e.response.data.error_message : null;   
              setFeedback(errorMsg);
            }
            
            //Handle Request Timeout Error
            if(e.response.status === 503){
              setFeedback("Looks like the server is taking to long to respond, please try again in sometime");
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    if(email && username && location && password && confirmPassword){
      setIsAllFieldsFilled(true);
    }
    else{
      setIsAllFieldsFilled(false);
    }
  }, [username, email, location, password, confirmPassword]);

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
          <Button onClick={createAccount} disabled={!isAllFieldFilled}>Create Account</Button>
          <div className="additional-form-links">
            <Link to="/">Already Have An Account? Login</Link>
          </div>
        </div>
      </div>
    </Col>
  );
}
