import React, { Component } from 'react';
import RenterItem from "./RenterItem.js";
import AddRenter from "./AddRenter.js";
import './App.css';

import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renters: [],
      isLoading: false,
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.showRenterById = this.showRenterById.bind(this);
  }

  componentWillMount() {
    Axios.get("http://localhost:4321/renters")
    .then(res => {
      const copyRenters = res.data.slice();

      this.setState({
        renters: copyRenters
      });
    })
  }

  getRenters() {
    return this.state.renters;
  }

  onAdd(expiryDate, name, _id, adress, comments, contacts, user) {
    const renters = this.getRenters();

    console.log("RENTERS: " + renters);

    renters.push({
      contacts,
      user,
      expiryDate,
      _id,
      name,
      adress,
      comments
    });

    this.setState({renters});
  }

  onDelete(_id) {
    const renters = this.getRenters();
    
    const filteredRenters = renters.filter(renter => {
      return renter._id !== _id;
    });

    const renterUrlDelete = "http://localhost:4321/renters/" + _id;

    Axios.delete(renterUrlDelete)
    .then(res => {
      console.log(res);
    })

    this.setState({renters: filteredRenters});
  }

  onEditSubmit(_id, expiryDate, name, adress, comments) {
    //console.log(name, adress, phone);
    let renters = this.getRenters();

    renters = renters.map(renter => {
      if (renter._id === _id) {
        //renter.contacts = contacts;
        //renter.user = user;
        renter.expiryDate = expiryDate;
        renter.name = name;
        renter.adress = adress;
        renter.comments = comments;
      }

      return renter;
    });
    
    this.setState({renters});
  }

  showRenterById(renterID) {
    const renterURI = "http://localhost:4321/renters/" + renterID;
    //let rentersAll = this.getRenters();

    this.setState({isLoading: true});

    Axios.get(renterURI).then(({data}) => {
      this.setState({currentRentor: {...data}, currentRentorId: data._id, isLoading: false});
    });
  }

  back = () => {
    this.setState({currentRentorId: 0});
  }

  render() {
    return (
      <div className="App">
        <h1>Renter manager</h1>
        <div>
          <AddRenter
            onAdd = {this.onAdd}
          />

          {this.state.isLoading 
            ? <h2>Loading...</h2> 
            : <div>
              {this.state.currentRentorId
              ? <div>
                <button onClick={this.back}>Back to list</button>
                <br />
                <RenterItem key = {this.state.currentRentor._id}
                  contacts = {this.state.currentRentor.contacts}
                  expiryDate = {this.state.currentRentor.expiryDate}
                  name = {this.state.currentRentor.name}
                  _id = {this.state.currentRentor._id}
                  adress = {this.state.currentRentor.adress}
                  comments = {this.state.currentRentor.comments}
                  user = {this.state.currentRentor.user}
                  onDelete = {this.onDelete}
                  onEditSubmit = {this.onEditSubmit}
                  showRenterById = {this.showRenterById}
                />
              </div> 
              : <div>
                <table class="pure-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                  {this.state.renters.map((r, i) => (
                  <tr>
                    <td>{i+1}</td>
                    <td>{r.name}</td>
                    <td>
                      <button className="pure-button pure-button-primary" onClick={this.showRenterById.bind(this, r._id)}>Edit</button>
                    </td>
                  </tr>
                  ))}
                </tbody>
                </table>
                <div>Number of renters: {this.state.renters.length}</div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}
export default App;
