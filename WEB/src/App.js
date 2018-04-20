import React, { Component } from 'react';
import RenterItem from "./RenterItem.js";
import AddRenter from "./AddRenter.js";
import './App.css';

const renters = [
  {
    name: "Kyiv Renters",
    adress: "Vasylkivska, 15",
    phone: 445554433
  },
  {
    name: "Renter Company",
    adress: "Antonovycha, 10",
    phone: 442223322 
  },
  {
    name: "World Wide Renters",
    adress: "Lva Tolsogo, 20",
    phone: 983332211 
  }
];

//initiate DB
localStorage.setItem("rentersItem", JSON.stringify(renters))

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renters: JSON.parse(localStorage.getItem("rentersItem"))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount() {
    const renters = this.getRenters();

    this.setState({renters});
  }

  getRenters() {
    return this.state.renters;
  }

  onAdd(name, adress, phone) {
    const renters = this.getRenters();

    renters.push({
      name,
      adress,
      phone
    });

    this.setState({renters});
  }

  onDelete(name) {
    const renters = this.getRenters();

    const filteredRenters = renters.filter(renter => {
      return renter.name !== name;
    });

    this.setState({renters: filteredRenters});
  }

  onEditSubmit(name, adress, phone, originalName) {
    //console.log(name, adress, phone);
    let renters = this.getRenters();

    renters = renters.map(renter => {
      if (renter.name === originalName) {
        renter.name = name;
        renter.adress = adress;
        renter.phone = phone;
      }

      return renter;
    });
    
    this.setState({renters});
  }

  render() {
    return (
      <div className="App">
        <h1>Products manager</h1>
        <div>
          <AddRenter
            onAdd = {this.onAdd}
          />
          {
            this.state.renters.map(renter => {
              return (
                <RenterItem
                  key = {renter.name}
                  name = {renter.name}
                  adress = {renter.adress}
                  phone = {renter.phone}
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
