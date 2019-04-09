import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import {
  getTrips,
  saveTrip,
  deleteTrip,
  getTrip
   } from './services/api-helpers';
   import {
  registerUser,
  verifyToken,
  loginUser } from './services/user';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: '',
      origin: '',
      destination: '',
      tripToEdit: '',
      currentView: 'All Trips',
      loginFormData: {
        email: '',
        password: ''
      }
    }

    this.handleAllTripsClick = this.handleAllTripsClick.bind(this);
    this.handleAddTripClick = this.handleAddTripClick.bind(this);
    this.handleTripClick = this.handleTripClick.bind(this);
    /*this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);*/
  }

  componentDidMount() {
    this.fetchAllTrips();
  }

  fetchAllTrips() {
    getTrips(1)
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
    const { origin: origin, destination: destination,
            tripToEdit } = this.state;
    const newTrip = {
      origin: origin, destination: destination
    }
    saveTrip(newTrip, method, tripToEdit)
    .then(resp => {
      this.fetchAllTrips();
      this.setState({
        origin: '',
        destination: '',
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
    origin, destination } = trip;

    this.setState({
      tripToEdit: id,
      origin: origin,
      destination: destination
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
