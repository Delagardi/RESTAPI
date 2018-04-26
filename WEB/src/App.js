import React, { Component } from 'react';
import RenterItem from "./RenterItem.js";
import AddRenter from "./AddRenter.js";
import './App.css';

import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renters: []
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
    let rentersAll = this.getRenters();

    Axios.get(renterURI)
    .then(function (response) {
      console.log("RESPONSE: " + response.data.name);
      // rentersAll.filter(renterOne => {
      //   console.log("renter._id: " + renterOne._id);
      //   if ( renterOne._id === renterID ) {
      //     return   
      //   }
        
      // });
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Renter manager</h1>
        <div>
          <AddRenter
            onAdd = {this.onAdd}
          />
          {
            this.state.renters.map(renter => {
              return (
                <div>
                <div>
                  <h3>Data exampl for insert in Add fields</h3>
                  <p>name: ADD ME!</p>
                  <p>adress: Kyiv, Ukraine</p>
                  <p>contacts: 010000000000000000000000</p>
                  <p>comments: some comments</p>
                  <p>user: 000000000000000000000002</p>
                  <p>expiryDate: 2018-04-15</p>
                  <hr/>
                  <hr/>
                </div>
                <RenterItem
                  key = {renter._id}
                  contacts = {renter.contacts}
                  expiryDate = {renter.expiryDate}
                  name = {renter.name}
                  _id = {renter._id}
                  adress = {renter.adress}
                  comments = {renter.comments}
                  user = {renter.user}
                  onDelete = {this.onDelete}
                  onEditSubmit = {this.onEditSubmit}
                  showRenterById = {this.showRenterById}
                />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
export default App;
