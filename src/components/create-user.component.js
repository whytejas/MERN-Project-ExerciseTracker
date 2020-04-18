import React, { Component } from 'react';
import axios from 'axios';


export default class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: 'New User',


    }

  }





  myChangeHandler = (event) => {

    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });

  }

 

  onSubmitHandler = (event) => {
    event.preventDefault();
    let user = {
      username: this.state.username,
      
    }

    console.log(user);
    axios.post('http://localhost:5000/users/add', user)
    .then(res => console.log(res.data))


  }



  render() {
    return (
     
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmitHandler}>
          
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                name="username"
                className="form-control"
                value={this.state.username}
                onChange={this.myChangeHandler}
                />
          </div>
        
  
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}