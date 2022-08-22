import React from "react";
import Rider from "./Rider";
import "./style.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMyRiders: JSON.parse(localStorage.getItem("Rider")),
    };
  }

  render() {
    if (!localStorage.getItem("Rider")) {
      this.allMyRiders = [];
    } else {
      var rider = this.state.allMyRiders[0];
    }
    return (
      <div className="rider">
        {localStorage.getItem(Rider) !== null
          ? (this.allMyRiders = JSON.parse(localStorage.getItem("Rider")))
          : (this.allMyRiders = [])}
        <React.Fragment>
          {this.state.allMyRiders !== null ? (
            <Rider
              userFirstName={rider.newFirstName}
              userLastName={rider.newLastName}
              userName={rider.newUserName}
            />
          ) : (
            <Rider
              userFirstName={"---"}
              userLastName={"---"}
              userName={"---"}
            />
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default App;
