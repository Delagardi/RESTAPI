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

  onAdd(expiryDate, name, _id, adress, comments) {
    const renters = this.getRenters();

    console.log("RENTERS: " + renters);

    renters.push({
      //contacts,
      //user,
      expiryDate,
      _id,
      name,
      adress,
      comments
    });

    this.setState({renters});
  }

  onDelete(_id) {
    console.log("Delete _id: " + _id);
    const renters = this.getRenters();
    
    const filteredRenters = renters.filter(renter => {
      console.log("renter._id: " + renter._id);
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
    Axios.get(renterURI)
    .then(function (response) {
      // response.data.map(resData => {
      
      console.log(response.data.name);
  
      console.log(response.data._id);
      // const rentersAll = this.getRenters();
  
      // rentersAll.filter(renterOne => {
      //   console.log("renter._id: " + renterOne._id);
      //   return renterOne._id === renterID;
      // });

      //this.setState({renters: filteredRenters});
        // return (
        //   <RenterItem
        //     key = {response.data._id}
        //     contacts = {response.data.contacts}
        //     expiryDate = {response.data.expiryDate}
        //     name = {response.data.name}
        //     _id = {response.data._id}
        //     adress = {response.data.adress}
        //     comments = {response.data.comments}
        //     user = {response.data.user}
        //   />
        // );
      //})
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
              );
            })
          }
        </div>
      </div>
    );
  }
}
export default App;
