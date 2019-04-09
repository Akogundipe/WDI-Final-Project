import React, { Component } from 'react';
import './App.css';
import {
  getTrips,
  saveTrip,
  deleteTrip,
  getTrip
   } from './services/api-helpers';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: '',
      //trip parameters empty strings
      tripToEdit: '',
      currentView: 'All Trips'
    }

    this.handleAllTripsClick = this.handleAllTripsClick.bind(this);
    this.handleAddTripClick = this.handleAddTripClick.bind(this);
    this.handleTripClick = this.handleTripClick.bind(this);
  }

  componentDidMount() {
    this.fetchAllTrips();
  }

  fetchAllTrips() {
    getTrips()
    .then(resp => {
      const { trips } = resp;
      this.setState({ trips });
    })
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e, method) {
    e.preventDefault();
    const { /*trip parameters*/
            tripToEdit } = this.state;
    const newTrip = {
      //trip parameters = each other
    }
    saveTrip(newTrip, method, tripToEdit)
    .then(resp => {
      this.fetchAllTrips();
      this.setState({
        //trip parameters
        tripToEdit: '',
        currentView: this.state.trip ? 'Single Trip' : 'All Trips'
      });
    });
  }

  handleDeleteClick(id) {
    deleteTrip(id)
    .then(resp => {
      this.fetchAllTrips();
    });
  }

  handleEditClick(trip) {
    const { id,
    /*trip parameters*/ } = trip;

    this.setState({
      tripToEdit: id,
      //trip parameters = each other
    });
  }

  handleTripClick(id) {
    getTrip(id)
    .then(resp => {
      this.setState({
        trip: resp.trip,
        currentView: 'Single Trip'
      });
    });
  }

  handleAllTripsClick() {
    this.setState({
      currentView: 'All Trips',
      trip: ''
    });
  }

  handleAddTripClick() {
    this.setState({
      currentView: 'Add Trip'
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          handleLinkClick={this.handleLinkClick}
          handleAllTripsClick={this.handleAllTripsClick}
          handleAddTripClick={this.handleAddTripClick} />
      </div>
    );
  }
}

export default App;
