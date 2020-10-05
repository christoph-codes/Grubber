import React, { useState } from "react";
import { Button, Row, Col, InputGroup, FormControl, Collapse } from "react-bootstrap";
import "./UserGrubRequest.scss";
import TextInput from "../../ui/formElements/TextInput/TextInput";
import NumberInput from "../../ui/formElements/NumberInput/NumberInput";

export default function UserGrubRequest(props) {
  const [feedback, setFeedback] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [grubMessage, setGrubMessage] = useState("");
  const [grubRestaurantName, setGrubRestaurantName] = useState("");
  const [grubUsersRequested, setGrubUsersRequested] = useState("");

  const toggleGrubRequestForm = () => {
    setOpenForm(!openForm);
  };

  const submitGrubPost = () => {
    if (grubMessage && grubRestaurantName && grubUsersRequested) {
      const grubPost = {
        message: grubMessage,
        restaurant_name: grubRestaurantName,
        users_requested: grubUsersRequested,
        users_pending: [],
        status: "open",
        // User Id must be set by the logged in user
        user_id: 1,
      };
      console.log(grubPost);
    } else {
      setFeedback("You must enter all of the required fields");
    }
  };
  return (
    <div className="UserGrubRequest">
      <InputGroup className="TextInput" size="lg">
        <FormControl
          placeholder="Ready for some grub?"
          type="text"
          onClick={() => setOpenForm(true)}
          onChange={(e) => setGrubMessage(e.target.value)}
        />
      </InputGroup>
      <Collapse in={openForm}>
          <div className="grub-request-form">
            <Row>
              <Col>
                <NumberInput
                  feedback={setFeedback}
                  placeholder="How many would you like to join you?"
                  handler={setGrubUsersRequested}
                  min="0"
                />
              </Col>
              <Col>
                <TextInput
                  feedback={setFeedback}
                  placeholder="Where are you looking to eat?"
                  handler={setGrubRestaurantName}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col xs={4}>
                <Button
                  onClick={() => {
                    submitGrubPost();
                  }}
                >
                  Grub Request
                </Button>
                <button className="cancel-link" onClick={toggleGrubRequestForm}>Cancel</button>
              </Col>
            </Row>
          </div>
      </Collapse>

      {feedback ? (
        <div className="feedback">
          <small>{feedback}</small>
        </div>
      ) : null}
    </div>
  );
}
