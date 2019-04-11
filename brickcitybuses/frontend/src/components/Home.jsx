import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div>
    <h2>Choose or Save a Trip Below</h2>
    <Link to="/users/:user_id/trips">View the Trip List</Link>
    <Link to="/users/:user_id/trips">Save a Trip</Link>
  </div>
);
