import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./UserGrub.scss";

export default function UserGrub({ grub }) {
  return (
    <div className="UserGrub">
      <Row className="align-items-center">
        <Col xs={1}>
          <div className="grub-avatar">
            <img src={grub.restaurant.img} alt={grub.restaurant.name} />
          </div>
        </Col>
        <Col xs={5}>
          <div className="grub-message">
            <h2>
              {grub.message}
              <br />
              <span>{grub.restaurant.name}</span>
            </h2>
          </div>
        </Col>
        <Col xs={3}>
          <div className="grub-request-detail">
            <p>
              Requested by {grub.author.name.split(' ').shift()}.
            </p>
          </div>
        </Col>
        <Col xs={1}>
          <div className={`grub-user-request-count`}>
            +{grub.users_requested}
          </div>
        </Col>
        <Col xs={2}>
          <div className="grub-join-btn">
            <Button disabled={grub.status === 'open' ? false : true} onClick={() => console.log('Join this grub')}>Join</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
