import React, { useState, useEffect } from "react";
import Create from "./Create";

function RideCard({ rideData, deleteRide, editRide, addRide }) {
  const [edit, setEdit] = useState(false);
  const calculateSpeed = () => {
    let hours = rideData.newRideMinutes / 60;
    return Math.round(rideData.newRideDistance / hours);
  };

  if (edit) {
    return (
      <Create
        rideData={rideData}
        editRide={editRide}
        editMode={true}
        addRide={addRide}
        setEdit={() => {
          setEdit(false);
        }}
      />
    );
  } else {
    return (
      <span>
        <div>
          <button
            onClick={() => {
              deleteRide(rideData);
            }}
          >
            Delete
          </button>

          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? "save" : "Edit"}
          </button>
          <div class="wrapper">
            <div id="ride-name" class="row">
              <h1>Ride Name</h1>
              <p>{rideData.newRideName}</p>
            </div>

            <div id="ride-type" class="row">
              <h1>Ride Type</h1>
              <p>{rideData.newRideType}</p>
            </div>

            <div id="ride-distance" class="row">
              <h1>Ride Distance(Km)</h1>
              <p>{rideData.newRideDistance}</p>
            </div>

            <div id="ride-duration" class="row">
              <h1>Ride Duration(minutes)</h1>
              <p>{rideData.newRideMinutes}</p>
            </div>

            <div id="ride-avgSpeed" class="row">
              <h1>Average speed (Km)</h1>
              <p>{calculateSpeed()}</p>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

export default RideCard;
