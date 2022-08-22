import React, { Component } from "react";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideType: this.props.rideData.newRideType,
      rideName: this.props.rideData.newRideName,
      rideDistance: this.props.rideData.newRideDistance,
      rideMinutes: this.props.rideData.newRideMinutes,
    };
  }

  handleChange = (e) => {
    this.setState({
      rideType: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.editMode) {
      this.props.editRide(
        this.state.rideName,
        this.state.rideType,
        this.state.rideDistance,
        this.state.rideMinutes,
        this.props.rideData
      );
      this.props.setEdit();
    }
    this.props.addRide(
      this.state.rideName,
      this.state.rideType,
      this.state.rideDistance,
      this.state.rideMinutes
    );
  };
  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}>
          <div id="ride-name" className="row">
            <h1 for="name" required>
              Ride Name
            </h1>
            <input
              name="name"
              required
              value={this.state.rideName}
              onChange={(e) => {
                this.setState({
                  rideName: e.target.value,
                });
              }}
            ></input>
          </div>

          <div id="ride-type" className="row">
            <h1>Ride Type</h1>
            <select value={this.state.rideType} onChange={this.handleChange}>
              <option value={"track"}>Track</option>
              <option value={"road"}>Road</option>
            </select>
          </div>

          <div id="ride-distance" className="row">
            <h1>Ride Distance(Km)</h1>
            <input
              type="number"
              value={this.state.rideDistance}
              min="0"
              step={0.01}
              required
              onChange={(e) => {
                this.setState({
                  rideDistance: e.target.value,
                });
              }}
            ></input>
          </div>

          <div id="ride-duration" className="row">
            <h1>Ride Duration(minutes)</h1>
            <input
              type="number"
              value={this.state.rideMinutes}
              min="0"
              step={1}
              required
              onChange={(e) => {
                this.setState({
                  rideMinutes: e.target.value,
                });
              }}
            ></input>
          </div>

          <button>{this.props.editMode ? "Save Edit" : "Create Ride"}</button>
          {this.props.editMode ? (
            <button onClick={this.props.setEdit}>Cancel Edit</button>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    );
  }
}

export default Create;
