import React, { Component } from 'react';

class AddRenter extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault(); //prevent page from refreshing

    this.props.onAdd(this.nameInput.value, this.adressInput.value, this.phoneInput.value);

    //cleaing the input after adding the product
    this.nameInput.value = "";
    this.adressInput.value = "";
    this.phoneInput.value = "";
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Add Renter</h3>
        <input placeholder="Name" ref={nameInput => this.nameInput = nameInput} />
        <input placeholder="Adress" ref={adressInput => this.adressInput = adressInput} />
        <input placeholder="Phone" ref={phoneInput => this.phoneInput = phoneInput} />
        <button>Add renter</button>
        <hr />
      </form> 
    );
  }
}

export default AddRenter;
