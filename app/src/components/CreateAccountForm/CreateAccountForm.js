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
        HttpService.requestPost(`${process.env.REACT_APP_API_HOST}/api/auth/createaccount`, accountDetails).then(() => {
          //Load 2nd Form/Load dashboard
          console.log("Account has been create: ", accountDetails);
        }).catch((e) => {
          //redirect to error page
          console.log(e.response);
          if(e.response){
            if (e.response.status === 400){
              const error = e.response.data.error ? e.response.data.error : null,
                    errorMsg = e.response.data.error_message ? e.response.data.error_message : null;   
              setFeedback(errorMsg);
            }
            
            if(e.response.status === 503){
              //Handle Request Timeout
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

  //Set feedback based on Username
  // useEffect(() => {
  //   if (username) {
  //       if (username.length > 0) {
  //         let regex = /^[a-zA-Z0-9.]{6,16}$/;
  //         if (regex.test(username)) {
  //           setFeedback("");
  //         } else {
  //           setFeedback(
  //             "Your unique username must be between 6 to 16 characters and must not included any special characters. Get Creative!"
  //           );
  //         }
  //       } else {
  //         setFeedback("You must enter a unique username.");
  //       }
  //     } else {
  //         setFeedback("")
  //     }
  // }, [username])

  //Set feedback based on Email
  // useEffect(() => {
  //   if(email) {
  //       if(email.length > 0) {
  //           let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //           if(regex.test(email)) {
  //               // TODO: Check to see whether the value exists in the database already
  //               setFeedback('');
  //           } else {
  //               setFeedback('You must enter a valid email.');
  //           }
  //       } else {
  //           setFeedback('You must enter an email address.');
  //       }
  //   }
  // }, [email]);

  //Set feedback based on Password
  // useEffect(() => {
  //   if (password) {
  //     if (password.length > 0) {
  //       let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&%^&*+=_-]).{8,}$/;
  //       if (regex.test(password)) {
  //         setFeedback(null);
  //       } else {
  //         setFeedback(
  //           "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
  //         );
  //       }
  //     } else {
  //       setFeedback("You must enter a password.");
  //     }
  //   }
  // }, [password, confirmPassword]);

  //Set feedback based on Password comparison
  // useEffect(() => {
  //   if(password && confirmPassword) {
  //     if(password === confirmPassword) {
  //       setFeedback('');
  //     } else {
  //       setFeedback('Passwords do not match.');
  //     }
  //   }
  // },[password, confirmPassword]);

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
