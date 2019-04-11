import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  registerUser,
  verifyToken,
  loginUser } from './services/user';
import {
  getDragons,
  createDragon,
  deleteDragon,
  updateDragon,
  addLike,
} from './services/dragon';
import RegisterForm from './components/RegisterForm';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import DragonList from './components/DragonList';
import DragonForm from './components/DragonForm';
import EditDragonForm from './components/EditDragonForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFormData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      dragonForm: {
        name: '',
        age: 0,
        birthplace: ''
      },
      dragons: [],
      currentUser: null,
      loginFormData: {
        email: '',
        password: ''
      }
    };

    this.handleRegisterFormChange = this.handleRegisterFormChange.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleDragonFormChange = this.handleDragonFormChange.bind(this);
    this.handleCreateDragon = this.handleCreateDragon.bind(this);
    this.handleUpdateDragon = this.handleUpdateDragon.bind(this);
    this.destroyDragon = this.destroyDragon.bind(this);
    this.mountEditForm = this.mountEditForm.bind(this);
    this.likeDragon = this.likeDragon.bind(this);
  }

  async likeDragon(id) {
    const data = await addLike(id);
    console.log(data);
  }
  async destroyDragon(id) {
    await deleteDragon(id);
    this.setState(prevState => ({
      dragons: prevState.dragons.filter(dragon => dragon.id !== id)
    }));
  }

  async mountEditForm(id) {
    let dragon = this.state.dragons.find(el => el.id === parseInt(id));
    if (dragon === undefined) {
      await verifyToken();
      await this.fetchDragons();
      dragon = this.state.dragons.find(el => el.id === parseInt(id));
    }

    this.setState({
      dragonForm: {
        name: dragon.name,
        age: dragon.age,
        birthplace: dragon.birthplace
      }
    });
  }

  async handleUpdateDragon(ev, id) {
    ev.preventDefault();
    const data = this.state.dragonForm;
    const dragon = await updateDragon(data, id);
    this.setState(prevState => ({
      dragons: prevState.dragons.map(drag => drag.id === dragon.id ? dragon : drag)
    }));
    this.props.history.push('/dragons');
  }
  async handleCreateDragon(e) {
    e.preventDefault();
    const dragon = await createDragon(this.state.dragonForm);
    this.setState(prevState => ({
      dragons: [...prevState.dragons, dragon]
    }));
    this.props.history.push('/dragons');
  }

  handleDragonFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      dragonForm: {
        ...prevState.dragonForm,
        [name]: value
      }
    }))
  }

  async componentDidMount() {
    try {
      const { user } = await verifyToken();
      if (user !== undefined) {
      this.setState({
        currentUser: user
      })
      await this.fetchDragons();
      } else {
        this.props.history.push('/');
      }
    } catch (e) {
      this.props.history.push('/');
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    const { user }= await loginUser(this.state.loginFormData);
    this.setState({
      currentUser: user
    });

    this.fetchDragons();
    this.props.history.push('/welcome');
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
    this.fetchDragons();
    this.props.history.push('/welcome');
  }

  async fetchDragons() {
    const dragons = await getDragons();
    this.setState({
      dragons
    });
  }

  render() {
    const {
      currentUser
    } = this.state;
    return (
      <div className="App">
        <h1>The Dragon Auth App</h1>
        {this.state.currentUser === null && (
          <nav>
            <Link to="/register">Go Sign Up</Link>
            <Link to="/login">Go Sign In</Link>
            <button onClick={async () => {
              const dragons = await this.fetchDragons();
            }}>Fetch Dragons</button>
        </nav>
        )
        }
        <Route exact path="/" render={(props) => {
          return (
            <>
            {this.state.currentUser && <Redirect to="/welcome" />}
            </>
          )
        }} />
        <Route path="/register" render={(props) => {
          const {
            firstName,
            lastName,
            email,
            password
          } = this.state.registerFormData;
          return (
            <RegisterForm
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
              handleChange={this.handleRegisterFormChange}
              handleSubmit={this.handleRegister} />
          )
        }} />
      <Route exact path="/dragons/new" render={(props) => {
        const {
          name,
          age,
          birthplace,
        } = this.state.dragonForm;

        return (
          <DragonForm
            name={name}
            age={age}
            birthPlace={birthplace}
            handleChange={this.handleDragonFormChange}
            handleSubmit={this.handleCreateDragon} />
        );
      }} />
    <Route path="/dragons/:id/edit" render={(props) => {
        const {
          name,
          age,
          birthplace,
        } = this.state.dragonForm;
      const { id } = props.match.params;
      const dragon = this.state.dragons.find(el => el.id === parseInt(id));
      return (
        <EditDragonForm
          name={name}
          age={age}
          id={id}
          birthplace={birthplace}
          dragon={dragon}
          mountEditForm={this.mountEditForm}
          handleSubmit={this.handleUpdateDragon}
          handleChange={this.handleDragonFormChange} />
      )

      }} />

    <Route exact path="/dragons" render={(props) => {
      const {
        dragons
      } = this.state;
      return (
        <DragonList
          likeDragon={this.likeDragon}
          currentUser={currentUser}
          destroyDragon={this.destroyDragon}
          dragons={dragons} />
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
      <Route path="/welcome" component={ Welcome } />
    </div>
    );
  }
}

export default withRouter(App);
