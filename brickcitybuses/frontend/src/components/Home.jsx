import React from 'react';
import { Link } from 'react-router-dom';
import {verifyToken} from "../services/user.js"

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }
  }

  async componentDidMount() {
    const { user } = await verifyToken();
    if (user !== undefined) {
      this.setState({
        currentUser: user
      });
    }
  }

  render (){
    return(
      <div>
        <h2>Choose or Save a Trip Below</h2>
        {
          this.state.currentUser
          ?<Link to={`/users/${this.state.currentUser.id}/trips`}>View the Trip List</Link>
          :<div>why tho</div>
        }
        {/*<Link to={`/users/${props.currentUser.id}/trips`}>Save a Trip</Link>*/}
      </div>
    );
  }
}

export default Home;
