import React, { Component } from 'react';
import RenterItem from "./RenterItem.js";
import AddRenter from "./AddRenter.js";
import './App.css';

import Axios from 'axios';


// const renters = [
//   {
//     name: "Kyiv Renters",
//     adress: "Vasylkivska, 15",
//     phone: 445554433
//   },
//   {
//     name: "Renter Company",
//     adress: "Antonovycha, 10",
//     phone: 442223322 
//   },
//   {
//     name: "World Wide Renters",
//     adress: "Lva Tolsogo, 20",
//     phone: 983332211 
//   }
// ];

//initiate DB
//localStorage.setItem("rentersItem", JSON.stringify(renters))

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //renters: JSON.parse(localStorage.getItem("rentersItem"))
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
    Axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(res => {
      const copyRenters = res.data.slice();

      this.setState({
      // Здесь ты передаешь обьект по сылке, а нужно его копировать,
      // иначе это может вызвать трудн отлавливаемые баги
        renters: copyRenters
      });
    })
  }

  // componentWillMount() {
  //   // Нет смысла ждать пока компонент замаунтиться и потом
  //   // грузить данные. Это можно/нужно делать гараздо раньше
  //   axios.get(`https://jsonplaceholder.typicode.com/posts`)
  //   .then(res => {
  //     // Здесь ты перезаписываешь стейт полность, так делать не стоит 
  //     // так как там могут быть другие нужные данну
  //     const copyPosts = res.data.slice();

  //     this.setState({
  //     // Здесь ты передаешь обьект по сылке, а нужно его копировать,
  //     // иначе это может вызвать трудн отлавливаемые баги
  //       posts: copyPosts
  //     });
  //   })
  // }

  getRenters() {
    return this.state.renters;
  }

  // onAdd(name, adress, phone) {
  //   const renters = this.getRenters();

  //   renters.push({
  //     // name,
  //     // adress,
  //     // phone
  //     title,
  //     body,
  //     phone,
  //     id,
  //     userId
  //   });

  //   this.setState({renters});
  // }
  onAdd(title, body, id, userId) {
    const renters = this.getRenters();

    renters.push({
      // name,
      // adress,
      // phone
      title,
      body,
      id,
      userId
    });

    this.setState({renters});
  }

  // onDelete(name) {
  //   const renters = this.getRenters();

  //   const filteredRenters = renters.filter(renter => {
  //     return renter.name !== name;
  //   });

  //   this.setState({renters: filteredRenters});
  // }

  onDelete(id) {
    const renters = this.getRenters();

    const filteredRenters = renters.filter(renter => {
      return renter.id !== id;
    });

    this.setState({renters: filteredRenters});
  }

  // onEditSubmit(name, adress, phone, originalName) {
  //   //console.log(name, adress, phone);
  //   let renters = this.getRenters();

  //   renters = renters.map(renter => {
  //     if (renter.name === originalName) {
  //       renter.name = name;
  //       renter.adress = adress;
  //       renter.phone = phone;
  //     }

  //     return renter;
  //   });
    
  //   this.setState({renters});
  // }
  onEditSubmit(title, body, userId, id) {
    //console.log(name, adress, phone);
    let renters = this.getRenters();

    renters = renters.map(renter => {
      if (renter.id === id) {
        renter.title = title;
        renter.body = body;
        renter.userId = userId;
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
                // <RenterItem
                //   key = {renter.name}
                //   name = {renter.name}
                //   adress = {renter.adress}
                //   phone = {renter.phone}
                //   onDelete = {this.onDelete}
                //   onEditSubmit = {this.onEditSubmit}
                // />
                <RenterItem
                  key = {renter.id}
                  title = {renter.title}
                  body = {renter.body}
                  userId = {renter.userId}
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

export default App;
