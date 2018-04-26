import React, { Component } from 'react';
import Axios from 'axios';

class AddRenter extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault(); //prevent page from refreshing

    Axios.post("http://localhost:4321/renters/",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
        console.log("RESPONSE DATA (adding): " + response.data);
        // event.setState({
        //   renters.push(response.data);
        // })
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

    this.props.onAdd(
      this.expiryDateInput.value,
      //this._id.value,
      this.nameInput.value,
      this.contactsInput.value,
      this.adressInput.value,
      this.userInput.value,
      this.commentsInput.value
    );

    //cleaing the input after adding the retner
    this.expiryDateInput.value = "";
    //this._id.value = "";
    this.nameInput.value = "";
    this.contactsInput.value = "";
    this.adressInput.value = "";
    this.userInput.value = "";
    this.commentsInput.value = "";
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Add Renter</h3>
        <input placeholder = "expiryDate" ref = {expiryDateInput => this.expiryDateInput = expiryDateInput} />
        <input placeholder="Name" ref={nameInput => this.nameInput = nameInput} />
        <input placeholder="Contacts" ref={contactsInput => this.contactsInput = contactsInput} />
        <input placeholder="Adress" ref={adressInput => this.adressInput = adressInput} />
        <input placeholder="User" ref={userInput => this.userInput = userInput} />
        <input placeholder="Comments" ref={commentsInput => this.commentsInput = commentsInput} />
        <button>Add renter</button>
        <hr />
      </form> 
    );
  }
}

export default AddRenter;
