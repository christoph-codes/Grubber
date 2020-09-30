import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MarketingFrame from "../frames/MarketingFrame/MarketingFrame";
import UserFrame from "../frames/UserFrame/UserFrame";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="page-container">
          <Switch>
            <Route path="/dashboard" exact component={UserFrame} />
			<Route path="/" component={MarketingFrame} />
          </Switch>
        </div>
        {/* Placeholder for footer */}
      </div>
    </Router>
  );
}

export default App;
