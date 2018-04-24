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
  }

  componentWillMount() {
    //const renters = this.getRenters();

    //this.setState({renters});

    // Нет смысла ждать пока компонент замаунтиться и потом
    // грузить данные. Это можно/нужно делать гараздо раньше
    Axios.get("http://localhost:4321/renters")
    .then(res => {
      const copyRenters = res.data.slice();

      this.setState({
      // Здесь ты передаешь обьект по сылке, а нужно его копировать,
      // иначе это может вызвать трудн отлавливаемые баги
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
    const renters = this.getRenters();

    const filteredRenters = renters.filter(renter => {
      return renter._id !== _id;
    });

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
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
// <RenterItem
//                   key = {renter._id}
//                   contacts = {renter.contacts}
//                   user = {renter.user}
//                   expiryDate = {renter.expiryDate}
//                   name = {renter.name}
//                   adress = {renter.adress}
//                   comments = {renter.comments}
//                   onDelete = {this.onDelete}
//                   onEditSubmit = {this.onEditSubmit}
//                 />
export default App;
