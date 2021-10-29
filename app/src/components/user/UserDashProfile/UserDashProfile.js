import React from "react";
import "./UserDashProfile.scss";
import headshot from "../../../assets/chris-headshot.png";
import { FaBell, FaCog } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import HttpService from "../../../services/HttpService/HttpService";

export default function UserDashProfile(props) {
  const history = useHistory();
  const accountDetails = {
	"userName": "cjones",
	"userPass": "password",
	"firstName": "Christopher",
	"lastName": "Jones",
	"gender": "Male",
	"favoriteFood": {
	  "items": [
		"American", "Mexican", "Italian"
	  ]
	},
	"email": "tkcwebdev@gmail.com",
	"location": 89149,
	"description": "I'm the best at finding awesome eateries, you should join me some time!",
	// "created_on": new Date(),
    // "last_updated": "",
  }

  const logout = () => {
    console.log("Logging out");
    history.push("/");
  };

  // Testing server connection with a get request
  const getSomething = (e) => {
	  e.preventDefault();
	  HttpService.requestGet("http://localhost:3333/healthcheck").then(response => {
		console.log(response.data.status);
	  })
	  .catch(error => {
		console.log(error);
	  })
	};

	// Testing server connection with a post request
	const postSomething = (e) => {
		e.preventDefault();
		console.log(accountDetails.userName);
		HttpService.requestPost('http://localhost:3333/api/auth/createaccount', accountDetails).then(response => {
		  console.log(response);
		  console.log('It works')
		})
		.catch(error => {
		  console.log(error);
		  console.log('Its broken')
		})
	  };
  return (
    <div className="UserDashProfile">
		<button onClick={getSomething}>Get Something</button>
		<button onClick={postSomething}>Post Something</button>
      <div className="user-quick-touches">
        <Dropdown>
          <Dropdown.Toggle>
            <FaBell />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button">
              <Link to="/dashboard/notifications">Notifications</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <img
          className="headshot"
          src={headshot}
          alt={`${accountDetails.firstName} ${accountDetails.lastName} headshot`}
        />
        <Dropdown>
          <Dropdown.Toggle>
            <FaCog />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button">
              <Link to="/dashboard">Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <a href={false} onClick={logout}>
                Logout
              </a>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <hr />
      <div className="account-group">
        <p className="account-group-label">Name</p>
        <p>{`${accountDetails.firstName} ${accountDetails.lastName}`}</p>
      </div>
      <div className="account-group">
        <p className="account-group-label">Location</p>
        <p>{accountDetails.location}</p>
      </div>
      <div className="account-group">
        <p className="account-group-label">Top 3 Types</p>
        <p>{accountDetails.favoriteFood.items.join(", ")}</p>
      </div>
    </div>
  );
}
