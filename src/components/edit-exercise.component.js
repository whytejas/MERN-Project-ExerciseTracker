import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {

  constructor(props) {
    super(props);

    this.state = {
        username : '',
        description : '',
        duration : 0,
        date : new Date(),
        users: []

    }

}

componentDidMount(){
  console.log(this.props.match);


  axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
  .then(response => {
    this.setState({
      username: response.data.username,
      description: response.data.description,
      duration: response.data.duration,
      date: new Date(response.data.date)
    })   
  })
  .catch(function (error) {
    console.log(error);
  })



  axios.get('http://localhost:5000/users/')
  .then(res => {
    this.setState({
      users: res.data.map(user => user.username),
      username: res.data[0].username
    })
  })
}



myChangeHandler = (event) => {
   
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
 
  }

  myDateChangeHandler = (date) => {
    this.setState({
      date: date
    });
  };


  onSubmitHandler = (event) => { 
    event.preventDefault();
    let exercise = {
        username: this.state.username,
        description: this.state.description,
        duration: this.state.duration,
        date: this.state.date 
    }

    console.log(exercise);
    
    axios.post('http://localhost:5000/exercises/update/'+ this.props.match.params.id, exercise)
    .then(res => console.log(res.data));

    window.location = '/';
   
  }






  render() {
    return (
      <div>
      <h3>Edit Exercise </h3>
      <form onSubmit={this.onSubmitHandler}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
              required
              name="username"
              className="form-control"
              defaultValue={this.state.username}
              onChange={this.myChangeHandler}>
                 
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={this.myChangeHandler}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              name="duration"
              className="form-control"
              value={this.state.duration}
              onChange={this.myChangeHandler}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              
              selected={this.state.date}
              onChange={this.myDateChangeHandler}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
  }
}