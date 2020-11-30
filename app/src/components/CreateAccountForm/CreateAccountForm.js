import React, { useState, useEffect } from "react";
import HttpService from '../../services/HttpService/HttpService';
import { Col, Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import "./CreateAccountForm.scss";

import EmailInput from "../ui/formElements/EmailInput/EmailInput";
import UsernameInput from "../ui/formElements/UsernameInput/UsernameInput";
import PasswordInput from "../ui/formElements/PasswordInput/PasswordInput";

export default function CreateAccountForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAllFieldFilled, setIsAllFieldsFilled] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  let history = useHistory();

  const createAccount = () => {
    if (isAllFieldFilled) {
      //If validation error exists, then display first validation error.
      if(errors.username === "" && errors.email === "" && errors.password === "" && errors.confirmPassword === ""){
        const accountDetails = {
          email,
          userName: username,
          userPass: password // May need to encrypt if we do not use TLS/HTTPS
        };

        setFeedback("");
        HttpService.requestPost(`${process.env.REACT_APP_API_HOST}/api/auth/createaccount`, accountDetails).then((res) => {
          history.push("create-account/personal-details");
        }).catch((e) => {
          if(e.response){
            //Display Error Message from server
            if (e.response.status === 400){
              const errorMsg = e.response.data.error_message ? e.response.data.error_message : null;   
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
    if(email && username && password && confirmPassword){
      setIsAllFieldsFilled(true);
    }
    else{
      setIsAllFieldsFilled(false);
    }
  }, [username, email, password, confirmPassword]);

  useEffect(() => {
    if(errors.username !== ""){
      setFeedback(errors.username);
    }
    else if(errors.email !== ""){
      setFeedback(errors.email);
    }
    else if(errors.password !== ""){
      setFeedback(errors.password);
    }
    else if(errors.confirmPassword !== ""){
      setFeedback(errors.confirmPassword);
    }
    else {
      setFeedback("");
    }
  }, [errors]);

  /** ON BLUR HANDLERS */
  const validateUsername = () => {
    if (username.length > 0) {
      let regex = /^[a-zA-Z0-9.]{6,16}$/;
      if (regex.test(username)) {
        setErrors({
          ...errors,
          username: "",
        });
      } else {
          setErrors({
            ...errors,
            username: "Your unique username must be between 6 to 16 characters and must not included any special characters. Get Creative!",
          });
      }
    } else {
      setErrors({
        ...errors,
        username: "You must enter a unique username.",
      });
    }
  }

  const validateEmail = function(){
    if(email.length > 0) {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(regex.test(email)) {
          setErrors({
            ...errors,
            email: "",
          });
        } else {
          setErrors({
            ...errors,
            email: "You must enter a valid email.",
          });
        }
    } else {
        setErrors({
          ...errors,
          email: "You must enter an email address..",
        });
    }
  };

  const validatePassword = function(){
    if (password.length > 0) {
      let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&%^&*+=_-]).{8,}$/;
      if (regex.test(password)) {
        setErrors({
          ...errors,
          password: "",
        });
      } else {
        setErrors({
          ...errors,
          password: "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
        });
      }
    } else {
      setErrors({
        ...errors,
        password: "You must enter a password.",
      });
    }
  };

  const validateConfirmPassword = function(){
    if(password && confirmPassword) {
      if(password === confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "",
        });
      } else {
        setErrors({
          ...errors,
          confirmPassword: "Passwords do not match.",
        });
      }
  }
  };


  return (
    <Col className="CreateAccountForm">
      <div className="full-height purplebg">
        <div className="content">
          <h1>Create Account</h1>
          <UsernameInput
            feedback={setFeedback}
            placeholder="Username"
            handler={setUsername}
            onBlurHandler={validateUsername}
            required={true}
          />
          <EmailInput
            placeholder="Email Address"
            handler={setEmail}
            onBlurHandler={validateEmail}
            required={true}
          />
          <PasswordInput
            feedback={setFeedback}
            placeholder="Password"
            handler={setPassword}
            onBlurHandler={validatePassword}
            required={true}
          />
          <PasswordInput
            feedback={setFeedback}
            placeholder="Confirm Password"
            handler={setConfirmPassword}
            onBlurHandler={validateConfirmPassword}
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
