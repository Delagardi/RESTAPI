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
    const {onDelete, id} = this.props;

    onDelete(id);
  }

  onEdit() {
    this.setState({ isEdit: true});
  }

  onEditSubmit(event) {
    event.preventDefault();

    // this.props.onEditSubmit(
    //   this.nameInput.value,
    //   this.adressInput.value,
    //   this.phoneInput.value,
    //   this.props.name //original name, normaly use ID
    // );
    this.props.onEditSubmit(
      this.titleInput.value,
      this.bodyInput.value,
      this.idInput.value,
      this.userIdInput.value,
      //this.props.name //original name, normaly use ID
    );

    this.setState({isEdit: false});
  }

  render() {
    //const {name, adress, phone} = this.props;
    const {title, body, id, userId} = this.props;

    return (
      <div>
        {
          this.state.isEdit
          ? (
            <form onSubmit={this.onEditSubmit}>
              <input placeholder="title" ref={titleInput => this.titleInput = titleInput} defaultValue={title} />
              <input placeholder="body" ref={bodyInput => this.bodyInput = bodyInput} defaultValue={body}/>
              <input placeholder="userId" ref={userIdInput => this.userIdInput = userIdInput} defaultValue={userId}/>
              <input placeholder="id" ref={idInput => this.idInput = idInput} defaultValue={id}/>
              <button>Save</button>
            </form>
          )
          : (
            // <div>
            //   <span>{name}</span>
            //   {` | `}
            //   <span>{adress}</span>
            //   {` | `}
            //   <span>{phone}</span>
            //   {` | `}
            //   <button onClick={this.onEdit}>Edit renter</button>
            //   {` | `}
            //   <button onClick={this.onDelete}>Delete renter</button>
            // </div>
            <div>
              <span>{title}</span>
              {` | `}
              <span>{body}</span>
              {` | `}
              <span>{id}</span>
              {` | `}
              <span>{userId}</span>
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
