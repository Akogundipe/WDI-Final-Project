import React, { Component } from 'react';
import TripForm from './TripForm';

export default class EditTripForm extends Component {
  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const {
      trip,
      origin,
      destination,
      handleChange,
      handleSubmit,
      id,
    } = this.props;

    return trip === undefined ? <h2>Loading . . .</h2> : (
      <div>
        <h2>Editing {trip.origin}</h2>
        <TripForm
          onMount={this.mountEditForm}
          origin={origin}
          destination={destination}
          handleChange={handleChange}
          handleSubmit={(ev) => handleSubmit(ev, id)} />
      </div>
    )
  }
}
