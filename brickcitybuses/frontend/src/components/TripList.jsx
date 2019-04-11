import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div>
    <h2>The Trip List</h2>
    <Link to="/users/1/trips">Create a new Trip</Link>
    {props.trips.map(trip => (
      <div key={trip.id}>
        <h2>Origin: {trip.origin}</h2>
        <p>Destination: {trip.destination}</p>
        {props.currentUser.id === trip.user_id ? (
          <>
          <Link to={`/users/1/trips/1`}>Edit Trip</Link>
          <button onClick={() => props.destroyTrip(trip.id)}>Delete Trip</button>
          </>
        ) : (
          <button onClick={() => props.likeTrip(trip.id)}>Like Trip</button>
        )}
      </div>
    ))}
  </div>
);
