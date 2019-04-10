import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div>
    <h2>The Trip List</h2>
    <Link to="/users/1/trips">Create a new Dragon</Link>
    {props.dragons.map(dragon => (
      <div key={dragon.id}>
        <h2>Name: {dragon.name}</h2>
        <p>Age: {dragon.age}</p>
        <p>Birthplace {dragon.birthplace}</p>
        {props.currentUser.id === dragon.user_id ? (
          <>
          <Link to={`/dragons/${dragon.id}/edit`}>Edit Dragon</Link>
          <button onClick={() => props.destroyDragon(dragon.id)}>Delete Dragon</button>
          </>
        ) : (
          <button onClick={() => props.likeDragon(dragon.id)}>Like Dragon</button>
        )}
      </div>
    ))}
  </div>
);
