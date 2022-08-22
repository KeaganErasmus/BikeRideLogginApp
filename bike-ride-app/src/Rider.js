import React from "react";
import Ride from "./Ride";

class Rider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: "First Name",
      userInput: "",
      userFirstName: this.props.userFirstName,
      userLastName: this.props.userLastName,
      userName: this.props.userName,
      newRider: [],
      allMyRiders: JSON.parse(localStorage.getItem("Rider")),
      allMyRides: JSON.parse(localStorage.getItem("Rides")),
      displayInput: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  addRider(newFirstName, newLastName, newUserName) {
    let aRider = { newFirstName, newLastName, newUserName };
    this.state.newRider.push(aRider);
    this.saveRiders(aRider);
  }

  saveRiders(x) {
    let aRider = this.state.newRider;
    let existingRiders = JSON.parse(localStorage.getItem("Rider"));

    if (existingRiders === null) {
      localStorage.setItem("Rider", JSON.stringify(aRider));
    } else {
      this.state.allMyRiders.push(x);
      localStorage.setItem("Rider", JSON.stringify(this.state.allMyRiders));
    }
    console.log("saved");
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.inputTitle === "First Name") {
      this.setState({
        userFirstName: this.state.userInput,
        inputTitle: "Last Name",
      });
    }

    if (this.state.inputTitle === "Last Name") {
      this.setState({
        userLastName: this.state.userInput,
        inputTitle: "Username",
      });
    }

    if (this.state.inputTitle === "Username") {
      this.setState({
        userName: this.state.userInput,
        inputTitle: "Your account",
      });
      this.addRider(
        this.state.userFirstName,
        this.state.userLastName,
        this.state.userInput
      );
      // this.saveRiders()
    }

    if (this.state.inputTitle === "complete") {
      this.setState({
        inputTitle: "Your account",
        allMyRiders: JSON.parse(localStorage.getItem("Rider")),
      });
    }
  }

  handleChange(e) {
    this.setState({ userInput: String(e.target.value) });
  }

  handleChangeState(e) {
    e.preventDefault();
    this.setState({
      displayInput: true,
    });
  }

  handleDelete() {
    localStorage.removeItem("Rider");
    this.allMyRiders = [];
  }

  render() {
    if (!localStorage.getItem("Rides")) {
      this.allMyRides = [];
    } else {
      var rides = this.state.allMyRides[0];
      console.log("Local storage found");
    }

    return (
      <React.Fragment>
        {this.state.allMyRiders === null && this.state.displayInput === false && (
          <>
            <button onClick={this.handleChangeState}>Add an account</button>
          </>
        )}

        {this.state.displayInput === true && (
          <>
            <h2>Enter {this.state.inputTitle}</h2>
            <input
              type="text"
              value={this.state.userInput}
              onChange={this.handleChange}
            ></input>
            <button onClick={this.handleClick}>Submit</button>
          </>
        )}

        {this.state.displayInput === false && (
          <>
            <h2>Your account</h2>
            <table>
              <tbody>
                <tr>
                  <th>First Name</th>
                  <th>{this.props.userFirstName}</th>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <th>{this.props.userLastName}</th>
                </tr>

                <tr>
                  <th>Username</th>
                  <th>{this.props.userName}</th>
                </tr>
              </tbody>
            </table>

            <br></br>
            <button onClick={this.handleDelete}>Delete account</button>

            <br></br>

            <div hidden={localStorage.getItem("Rider") === null}>
              {this.state.allMyRides !== null ? (
                <Ride
                  rideName={rides.newRideName}
                  rideType={rides.newRideType}
                  rideDistance={rides.newRideDistance}
                />
              ) : (
                <Ride rideName={"-"} rideType={"-"} rideDistance={"-"} />
              )}
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default Rider;
