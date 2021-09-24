import React from "react";
import { Route, Switch } from "react-router-dom";
import "./MarketingFrame.scss";

import CreateAccount from "../../pages/CreateAccount/CreateAccount";
import HomeLogin from "../../pages/HomeLogin/HomeLogin";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";

import Header from "../../Header";

export default function MarketingFrame(props) {
  return (
    <div className="MarketingFrame">
			<Header navigations={[{link: "/", exact: true, text: "Home"},
					{link: "/create-account", exact: false, text: "Create Account"}]} />
      <Switch>
        <Route path="/" exact component={HomeLogin} />
        <Route path="/create-account" exact component={CreateAccount} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
      </Switch>
      
      
    </div>
  );
}
