import React, { Component } from 'react';

class RenterItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  onDelete() {
    const {onDelete, name} = this.props;

    onDelete(name);
  }

  onEdit() {
    this.setState({ isEdit: true});
  }

  onEditSubmit(event) {
    event.preventDefault();

    this.props.onEditSubmit(
      this.nameInput.value,
      this.adressInput.value,
      this.phoneInput.value,
      this.props.name //original name, normaly use ID
    );

    this.setState({isEdit: false});
  }

  render() {
    const {name, adress, phone} = this.props;

    return (
      <div>
        {
          this.state.isEdit
          ? (
            <form onSubmit={this.onEditSubmit}>
              <input placeholder="Name" ref={nameInput => this.nameInput = nameInput} defaultValue={name} />
              <input placeholder="Adress" ref={adressInput => this.adressInput = adressInput} defaultValue={adress}/>
              <input placeholder="Phone" ref={phoneInput => this.phoneInput = phoneInput} defaultValue={phone}/>
              <button>Save</button>
            </form>
          )
          : (
            <div>
              <span>{name}</span>
              {` | `}
              <span>{adress}</span>
              {` | `}
              <span>{phone}</span>
              {` | `}
              <button onClick={this.onEdit}>Edit renter</button>
              {` | `}
              <button onClick={this.onDelete}>Delete renter</button>
            </div>
          )
        }
        
      </div>  
    );
  }
}

export default RenterItem;
