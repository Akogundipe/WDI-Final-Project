import React from 'react';

export default (props) => {
  const {
    origin,
    destination,
    handleChange,
    handleSubmit
  } = props;
  return (
    <form>
      <h2>Trip Form</h2>
      <label htmlFor="origin">Origin</label>
      <input
        type="text"
        name="origin"
        value={origin}
        id="origin"
        onChange={handleChange} />
      <label htmlFor="destination">Destination</label>
      <input
        type="text"
        name="destination"
        value={destination}
        id="destination"
        onChange={handleChange} />
      <button
        onClick={handleSubmit}
        type="submit">Save Trip</button>
    </form>
  )
}
