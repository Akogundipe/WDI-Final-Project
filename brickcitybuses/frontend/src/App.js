import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';
import {
  getTrips,
  saveTrip,
  deleteTrip,
  getTrip,
  updateTrip
   } from './services/api-helpers';
   import {
  registerUser,
  verifyToken,
  loginUser } from './services/user';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TripList from './components/TripList';
import TripForm from './components/TripForm';
import EditTripForm from './components/EditTripForm';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFormData: {
        name: '',
        email: '',
        password: '',
      },
      tripForm: {
        origin: '',
        destination: ''
      },
      trips: [],
      trip: '',
      currentUser: null,
      currentView: 'All Trips',
      loginFormData: {
        email: '',
        password: ''
      }
    }

    this.handleAllTripsClick = this.handleAllTripsClick.bind(this);
    this.handleAddTripClick = this.handleAddTripClick.bind(this);
    this.handleTripClick = this.handleTripClick.bind(this);
    this.handleRegisterFormChange = this.handleRegisterFormChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.destroyTrip = this.destroyTrip.bind(this);
    this.mountEditForm = this.mountEditForm.bind(this);
    this.handleTripFormChange = this.handleTripFormChange.bind(this);
    this.handleCreateTrip = this.handleCreateTrip.bind(this);
    this.handleUpdateTrip = this.handleUpdateTrip.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async destroyTrip(id) {
    await deleteTrip(id, this.state.currentUser.id);
    this.setState(prevState => ({
      trips: prevState.trips.filter(trip => trip.id !== id)
    }));
  }

  async mountEditForm(id) {
    let trip = this.state.trips.find(el => el.id === parseInt(id));
    if (trip === undefined) {
      const data = await verifyToken();
      this.setState({
        currentUser: data.user
      });
      await this.fetchTrips();
      trip = this.state.trips.find(el => el.id === parseInt(id));
    }

    this.setState({
      tripForm: {
        origin: trip.origin,
        destination: trip.destination
      }
    });
  }

  async handleUpdateTrip(ev, id) {
    ev.preventDefault();
    const data = this.state.tripForm;
    const trip = await updateTrip(data, id, this.state.currentUser.id);
    this.setState(prevState => ({
      trips: prevState.trips.map(tr => tr.id === trip.id ? trip : tr)
    }));
    this.setState({
      tripForm: {
        origin: '',
        destination: ''
      }
    })
    this.props.history.push(`/users/${this.state.currentUser.id}/trips`)
  }

  handleRegisterFormChange(e) {
    const { name, value } = e.target;

    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  async handleRegister(e) {
    e.preventDefault();
    const { registerFormData } = this.state;
    const { user } = await registerUser(registerFormData);
    this.setState({
      currentUser: user
    });
    this.fetchTrips();
    this.props.history.push('/');
  }

  async fetchTrips() {
    const trips = await getTrips(this.state.currentUser.id);
    this.setState({
      trips
    });
  }

  async handleLogin(e) {
    e.preventDefault();
    const { user }= await loginUser(this.state.loginFormData);
    const blankLoginData = { email: '', password: ''}
    this.setState({
      currentUser: user,
      loginFormData: blankLoginData
    });

    this.fetchTrips();
    this.props.history.push('/');
  }

  async handleLogout() {
    // e.preventDefault();
    localStorage.removeItem('authToken');
    this.setState({
      currentUser: null
    });
    this.props.history.push('/');
  }

  handleLoginFormChange(e) {
    const { name, value } = e.target;

    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }
  /*async componentDidMount() {
    this.fetchAllTrips();
  }*/
  async componentDidMount() {
    try {
      const { user } = await verifyToken();
      if (user !== undefined) {
      this.setState({
        currentUser: user
      })
      await this.fetchTrips();
      } else {
        this.props.history.push('/login');
      }
    } catch (e) {
      this.props.history.push('/login');
    }
  }

  // async fetchAllTrips() {
  //   await getTrips()
  //   .then(resp => {
  //     const { trips } = resp;
  //     this.setState({ trips });
  //   })
  // }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  // handleSubmit(e, method) {
  //   e.preventDefault();
  //   const { origin: origin, destination: destination,
  //           tripToEdit } = this.state;
  //   const newTrip = {
  //     origin: origin, destination: destination
  //   }
  //   console.log('hello I am a handle submit');
  //   saveTrip(newTrip, this.state.currentUser.id)
  //   .then(resp => {
  //     this.fetchAllTrips();
  //     this.setState({
  //       origin: '',
  //       destination: '',
  //       tripToEdit: '',
  //     });
  //   });
  // }

  async handleCreateTrip(e) {
    const {origin, destination } = this.state.tripForm
    e.preventDefault();
    const trip = await saveTrip(this.state.tripForm, this.state.currentUser.id);

    this.setState({
      origin: trip.origin,
      destination: trip.destination
    })

    this.setState(prevState => ({
      trips: [...prevState.trips, trip]
    }));

    this.setState({
      tripForm: {
        origin: '',
        destination: ''
      }
    })
     await this.fetchTrips();

  }

  handleTripFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      tripForm: {
        ...prevState.tripForm,
        [name]: value
      }
    }))
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
        {/*<Header
          handleLinkClick={this.handleLinkClick}
          handleAllTripsClick={this.handleAllTripsClick}
          handleAddTripClick={this.handleAddTripClick} />*/}
          <h1>Brick City Buses</h1>
          {this.state.currentUser === null && (
            <nav>
              <Link to="/register">Go Sign Up</Link>
              <Link to="/login">Go Sign In</Link>
              <button onClick={async () => {
                const trips = await this.fetchTrips();
              }}>Fetch Trips</button>
          </nav>
          )
          }
          <Route exact path="/" render={(props) => {
            return (
              <>
              {this.state.currentUser && <Redirect to="/home" />}
              </>
            )
          }} />
          <Route path="/register" render={(props) => {
            const {
              name,
              email,
              password
            } = this.state.registerFormData;
            return (
              <RegisterForm
                name={name}
                email={email}
                password={password}
                handleChange={this.handleRegisterFormChange}
                handleSubmit={this.handleRegister} />
            )
          }} />
        <Route exact path="/users/:user_id/trips" render={(props) => {
          const {
            origin,
            destination
          } = this.state.tripForm;

          return (
            <TripForm
              origin={origin}
              destination={destination}
              handleChange={this.handleTripFormChange}
              handleSubmit={this.handleCreateTrip} />
          );
        }} />
      <Route path="/users/:user_id/trips/:id" render={(props) => {
          const {
            origin,
            destination,
          } = this.state.tripForm;
        const { id } = props.match.params;
        const trip = this.state.trips.find(el => el.id === parseInt(id));
        return (
          <EditTripForm
            origin={origin}
            destination={destination}
            id={id}
            trip={trip}
            mountEditForm={this.mountEditForm}
            handleSubmit={this.handleUpdateTrip}
            handleChange={this.handleTripFormChange} />
        )

        }} />

      <Route exact path="/users/:user_id/trips" render={(props) => {
        const {
          trips,
          currentUser
        } = this.state;
        if (currentUser == null) {
          return <div></div>
        }
        return (
          <TripList
            handleLogout={this.handleLogout}
            currentUser={this.state.currentUser}
            destroyTrip={this.destroyTrip}
            trips={trips} />
        );
      }} />
        <Route path="/login" render={(props) => {
            const {
              email,
              password
            } = this.state.loginFormData;
            return (
              <LoginForm
                email={email}
                password={password}
                handleChange={this.handleLoginFormChange}
                handleSubmit={this.handleLogin} />
            )
          }} />
          <Route path="/home" render={(props) => {
            const {
              trips,
              currentUser
            } = this.state;
            if (currentUser == null) {
              return <div></div>
            }
            return (
              <Home
                currentUser={this.state.currentUser}
                handleChange={this.handleLoginFormChange}
                handleSubmit={this.handleLogin} />
            )
          }} component={ Home } />
      </div>
    );
  }
}

export default withRouter(App);
