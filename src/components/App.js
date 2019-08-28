import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import QuestionPage from "./QuestionPage";

const App = () => {
  return (
    <Router>
      <div className="App">
          <Route path="/" component={QuestionPage} />
      </div>
    </Router>
  );
}

export default App;
