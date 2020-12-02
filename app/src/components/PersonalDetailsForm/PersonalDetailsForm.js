import React, { useState, useEffect } from "react";
import HttpService from '../../services/HttpService/HttpService';
import { Col, Button } from "react-bootstrap";
import "./PersonalDetailsForm.scss";

import LocationInput from "../ui/formElements/LocationInput/LocationInput";
import TextInput from "../ui/formElements/TextInput/TextInput";

export default function PersonalDetailsForm(props) {
  const [location, setLocation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAllFieldFilled, setIsAllFieldsFilled] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    location: "",
    favoriteFood: ""
  });

  const onSubmit = () => {
    console.log("submit");
  }

  useEffect(() => {
    if(firstName && lastName && location && favoriteFood){
      setIsAllFieldsFilled(true);
    }
    else{
      setIsAllFieldsFilled(false);
    }
  }, [firstName, lastName, location, favoriteFood]);

  useEffect(() => {
    if(errors.firstName !== ""){
      setFeedback(errors.firstName);
    }
    else if(errors.lastName !== ""){
      setFeedback(errors.lastName);
    }
    else if(errors.location !== ""){
      setFeedback(errors.location);
    }
    else if(errors.favoriteFood !== ""){
      setFeedback(errors.favoriteFood);
    }
    else {
      setFeedback("");
    }
  }, [errors]);

  const validateFirstName = () => {
    if (firstName.length > 0) {
      setErrors({
        ...errors,
        firstName: "",
      });
    } else {
      setErrors({
        ...errors,
        firstName: "Please enter your first name",
      });
    }
  }

  const validateLastName = () => {
    if (lastName.length > 0) {
      setErrors({
        ...errors,
        lastName: "",
      });
    } else {
      setErrors({
        ...errors,
        lastName: "Please enter your last name",
      });
    }
  }

  const validateFavoriteFood = () => {
    if (favoriteFood.length > 0) {
      setErrors({
        ...errors,
        favoriteFood: "",
      });
    } else {
      setErrors({
        ...errors,
        favoriteFood: "Please enter your favorite food",
      });
    }
  }

  return (
    <Col className="PersonalDetailsForm">
      <div className="full-height purplebg">
        <div className="content">
          <h1>Personal Details</h1>
          <TextInput
            placeholder="First Name"
            handler={setFirstName}
            onBlurHandler={validateFirstName}
          />
          <TextInput
            placeholder="Last Name"
            handler={setLastName}
            onBlurHandler={validateLastName}
          />
          <LocationInput
            handler={setLocation}
          />
          <TextInput
            placeholder="Favorite Food"
            handler={setFavoriteFood}
            onBlurHandler={validateFavoriteFood}
          />
          {feedback ? (
            <div className="feedback">
              <small>{feedback}</small>
            </div>
          ) : null}
          <Button onClick={onSubmit} disabled={!isAllFieldFilled}>Submit</Button>

        </div>
      </div>
    </Col>
  );
}
