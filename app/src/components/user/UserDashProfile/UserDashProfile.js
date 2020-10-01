import React from "react";
import "./UserDashProfile.scss";
import headshot from "../../../assets/chris-headshot.png";
import { FaBell, FaCog } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function UserDashProfile(props) {
    const history = useHistory();
  const accountDetails = {
    user_name: "Christopher Jones",
    first_name: "Christopher",
    last_name: "Jones",
    user_gender: "male",
    favorite_food: "Chicken Wings & Caesar Salad",
    user_email: "tkcwebdev@gmail.com",
    location: "Las Vegas, NV, 89149",
    user_description:
      "I'm the best at finding awesome eateries, you should join me some time!",
    created_on: "",
    last_updated: "",
    top_three: ["American", "Mexican", "Italian"],
  };

  const logout = () => {
      console.log('Logging out');
      history.push('/');
  }
  return (
    <div className="UserDashProfile">
      <div className="user-quick-touches">
      <Dropdown>
          <Dropdown.Toggle>
            <FaBell />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button">
                <Link to="/dashboard/notifications" >Notifications</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <img
          className="headshot"
          src={headshot}
          alt={accountDetails.user_name + " headshot"}
        />
        <Dropdown>
          <Dropdown.Toggle>
            <FaCog />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button">
                <Link to="/dashboard" >Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item as="button">
                <a href={false} onClick={logout} >Logout</a>
            </Dropdown.Item>
            <Dropdown.Item as="button">
                <Link to="/dashboard" >Dashboard</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <hr />
      <div className="account-group">
        <p className="account-group-label">Name</p>
        <p>{accountDetails.user_name}</p>
      </div>
      <div className="account-group">
        <p className="account-group-label">Location</p>
        <p>{accountDetails.location}</p>
      </div>
      <div className="account-group">
        <p className="account-group-label">Favorite Food</p>
        <p>{accountDetails.favorite_food}</p>
      </div>
      <div className="account-group">
        <p className="account-group-label">Top 3 Types</p>
        <p>{accountDetails.top_three.join(", ")}</p>
      </div>
    </div>
  );
}
