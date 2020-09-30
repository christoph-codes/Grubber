import React from "react";
import { Route, Switch } from "react-router-dom";
import "./UserFrame.scss";
import UserDashboard from "../../pages/UserDashboard/UserDashboard";

export default function UserFrame({ children }) {
  return (
    <div className="UserFrame">
      {/* TODO: Create Private Route Component that checks */}
      <Switch>
        <Route path="/dashboard" exact component={UserDashboard} />
      </Switch>
      {children}
    </div>
  );
}
