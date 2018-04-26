import React, { Component } from 'react';

class RenterItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      isEdit: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.showRenterById = this.showRenterById.bind(this);
  }

  showRenterById() {
    const {showRenterById, _id} = this.props;

    showRenterById(_id);
  }

  onDelete() {
    const {onDelete, _id} = this.props;

    onDelete(_id);
  }

  onEdit() {
    this.setState({ isEdit: true});
  }

  onEditSubmit(event) {
    event.preventDefault();

    this.props.onEditSubmit(
      this.contactsInput.value,
      this.userInput.value,
      this.expiryDateInput.value,
      this._idInput.value,
      this.nameInput.value,
      this.adressInput.value,
      this.commentsInput.value,
    );

    this.setState({isEdit: false});
  }

  render() {
    //const {name, adress, phone} = this.props;
    const {
      contacts,
      user,
      expiryDate,
      _id,
      name,
      adress,
      comments
    } = this.props;

    return (
      <div>
        {
          this.state.isEdit
          ? (
            <form onSubmit={this.onEditSubmit}>
              
              <input placeholder="expiryDate" ref={expiryDateInput => this.expiryDateInput = expiryDateInput} defaultValue={expiryDate}/>
              <input placeholder="_id" ref={_idInput => this._idInput = _idInput} defaultValue={_id}/>
              <input placeholder="name" ref={nameInput => this.nameInput = nameInput} defaultValue={name}/>
              <input placeholder="adress" ref={adressInput => this.adressInput = adressInput} defaultValue={adress}/>
              <input placeholder="comments" ref={commentsInput => this.commentsInput = commentsInput} defaultValue={comments}/>
              <button>Save</button>
            </form>
          )
          : (
            <div>
              <div>Contacts info: 
                {this.props.contacts.map(contactItem => {
                    return (
                      <div key={contactItem._id}>
                        <span>ID contact: {contactItem._id}</span>
                        <h4>Contact Name: {contactItem.contactName}</h4>
                      </div>
                    );
                  })
                }
              </div>
              <div>User info: 
                {this.props.user.map(userItem => {
                    return (
                      <div key={userItem._id}>
                        <span>ID user: {userItem._id}</span>
                        <h4>User Name: {userItem.userName}</h4>
                      </div>
                    );
                  })
                }
              </div>
              <span>Expiry Date: {expiryDate}</span>
              <div onClick={this.showRenterById}>ID of renter: {_id}</div>
              <h3>{name}</h3>
              <div>
                <div>Adress: {adress}</div>
                <small>Comments {comments} |</small>
              </div>
              <hr />
              <button onClick={this.onEdit}>Edit renter</button>
              <button onClick={this.onDelete}>Delete renter</button>
            </div>
          )
        }
        
      </div>  
    );
  }
}
export default RenterItem;
