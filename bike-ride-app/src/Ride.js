import React from "react";
import RideCard from "./RideCard";
import Create from "./Create";

export class Ride extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: "Ride Name",
      userInput: "",
      rideName: this.props.rideName,
      rideType: this.props.rideType,
      rideDistance: this.props.rideDistance,
      rideMinutes: this.props.rideMinutes,
      rideDuration: this.props.rideDuration,
      allMyRides: localStorage.getItem("Rides")
        ? JSON.parse(localStorage.getItem("Rides"))
        : [],
      showLongRides: false,
      showRoad: false,
      currMode: "noFilter",
      sortBy: "asc",
      optionValue: "asc",
      searchQuerry: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSortRides = this.handleSortRides.bind(this);
    this.deleteRide = this.deleteRide.bind(this);
    this.addRide = this.addRide.bind(this);
    this.editRide = this.editRide.bind(this);
  }

  filterBoth = (rideData) => {
    return (rideData.newRideDistance >= 30) & (rideData.newRideType === "road");
  };
  filterLongTrips = (rideData) => {
    return rideData.newRideDistance >= 30;
  };
  filterRoads = (rideData) => {
    return rideData.newRideType === "road";
  };
  filterNone = () => {
    return true;
  };

  pipe = (data, mode, sortBy) => {
    if (sortBy === "asc") {
      var sortFunc = (a, b) => {
        return b.newRideDistance - a.newRideDistance;
      };
    } else {
      var sortFunc = (a, b) => {
        return a.newRideDistance - b.newRideDistance;
      };
    }
    if (mode === "filterBoth") {
      return data
        .filter(this.filterBoth)
        .sort(sortFunc)
        .map((d, i) => {
          return (
            <RideCard
              rideData={d}
              key={i}
              deleteRide={this.deleteRide}
              editRide={this.editRide}
              addRide={this.addRide}
            />
          );
        });
    } else if (mode === "filterLongTrip") {
      return data
        .filter(this.filterLongTrips)
        .sort(sortFunc)
        .map((d, i) => {
          return (
            <RideCard
              rideData={d}
              key={i}
              deleteRide={this.deleteRide}
              editRide={this.editRide}
              addRide={this.addRide}
            />
          );
        });
    } else if (mode === "filterRoad") {
      return data
        .filter(this.filterRoads)
        .sort(sortFunc)
        .map((d, i) => {
          return (
            <RideCard
              rideData={d}
              key={i}
              deleteRide={this.deleteRide}
              editRide={this.editRide}
              addRide={this.addRide}
            />
          );
        });
    } else {
      return data
        .filter(this.filterNone)
        .filter((x) => {
          return x.newRideName.includes(this.state.searchQuerry);
        })
        .sort(sortFunc)
        .map((d, i) => {
          return (
            <RideCard
              rideData={d}
              key={i}
              deleteRide={this.deleteRide}
              editRide={this.editRide}
              addRide={this.addRide}
            />
          );
        });
    }
  };

  editRide(
    newRideName,
    newRideType,
    newRideDistance,
    newRideMinutes,
    rideData
  ) {
    let data = this.state.allMyRides.filter((item) => item !== rideData);
    this.setState(
      {
        allMyRides: data,
      },
      () => {
        localStorage.setItem("Rides", JSON.stringify(this.state.allMyRides));
        this.addRide(newRideName, newRideType, newRideDistance, newRideMinutes);
      }
    );
  }

  deleteRide(rideData) {
    let data = this.state.allMyRides.filter((item) => item !== rideData);
    this.setState(
      {
        allMyRides: data,
      },
      () => {
        localStorage.setItem("Rides", JSON.stringify(this.state.allMyRides));
      }
    );

    console.log(data);
  }

  handleStateChange() {
    let newState;
    console.log(this.state.showLongRides, this.state.showRoad);
    if (this.state.showLongRides && this.state.showRoad) {
      newState = "filterBoth";
    } else if (this.state.showLongRides) {
      newState = "filterLongTrip";
    } else if (this.state.showRoad) {
      newState = "filterRoad";
    } else {
      newState = "noFilter";
    }
    this.setState({
      currMode: newState,
    });
    console.log(this);
    console.log(this.state.showLongRides, this.state.showRoad);
  }

  handleSortRides(e) {
    this.setState({
      sortBy: e.target.value,
    });
  }

  addRide(newRideName, newRideType, newRideDistance, newRideMinutes) {
    let aRide = { newRideName, newRideType, newRideDistance, newRideMinutes };
    this.setState({
      aRide: this.state.allMyRides.push(aRide),
    });
    this.saveRide(aRide);

    // console.log("Ride Added");
  }

  saveRide(x) {
    localStorage.setItem("Rides", JSON.stringify(this.state.allMyRides));
  }

  calculateDistance() {
    let data = this.state.allMyRides;
    let totalDistance = 0;

    for (let aRide of data) {
      totalDistance += parseInt(aRide.newRideDistance);
    }
    return totalDistance;
  }

  calculateSpeed(d) {
    let data = this.state.allMyRides;
    let hours = data[d].newRideMinutes / 60;
    return Math.round(data[d].newRideDistance / hours);
  }

  handleClick(e) {
    e.preventDefault();

    if (this.state.inputTitle === "Ride Name") {
      this.setState({
        rideName: this.state.userInput,
        inputTitle: "Ride Type (Road/Trail)",
      });
    }

    if (this.state.inputTitle === "Ride Type (Road/Trail)") {
      this.setState({
        rideType: this.state.userInput,
        inputTitle: "Ride Distance (Km)",
      });
    }

    if (this.state.inputTitle === "Ride Distance (Km)") {
      this.setState({
        rideDistance: this.state.userInput,
        inputTitle: "Ride Duration (minutes)",
      });
    }

    if (this.state.inputTitle === "Ride Duration (minutes)") {
      this.setState({
        rideMinutes: this.state.userInput,
        inputTitle: "Ride Name",
      });
      this.addRide(
        this.state.rideName,
        this.state.rideType,
        this.state.rideDistance,
        this.state.userInput
      );
    }
  }

  handleChange(e) {
    this.setState({ userInput: String(e.target.value) });
  }

  render() {
    const data = this.state.allMyRides;
    return (
      <div>
        <React.Fragment>
          <>
            <br></br>
            <>Search:</>
            <input
              type="text"
              onChange={(e) => {
                this.setState({
                  searchQuerry: e.target.value,
                });
              }}
            ></input>

            <p></p>

            <div>
              <table>
                <tr>Total Distance travelled(Km)</tr>
                <tr>{this.calculateDistance()}Km</tr>
              </table>
            </div>
            <h2>Enter Ride Details</h2>
            <div className="create">
              <Create
                addRide={this.addRide}
                rideData={{
                  newRideName: "Ride",
                  newRideType: "track",
                  newRideDistance: "1",
                  newRideMinutes: "1",
                }}
                editRide={this.editRide}
                editMode={false}
              />
            </div>

            <label for="name">Show Roads</label>
            <input
              id="name"
              type="checkbox"
              onClick={() => {
                this.setState(
                  { showRoad: !this.state.showRoad },
                  this.handleStateChange
                );
              }}
            ></input>

            <label for="name">Show Long Rides</label>
            <input
              id="name"
              type="checkbox"
              onClick={() => {
                this.setState(
                  { showLongRides: !this.state.showLongRides },
                  this.handleStateChange
                );
              }}
            ></input>

            <select value={this.state.sortBy} onChange={this.handleSortRides}>
              <option value="asc">Ride Distance High-Low</option>
              <option value="desc">Ride Distance Low-High</option>
            </select>

            <h2>Your Rides</h2>
            <div className="cards">
              {this.pipe(data, this.state.currMode, this.state.sortBy)}
            </div>
            <br></br>
          </>
        </React.Fragment>
      </div>
    );
  }
}

export default Ride;
