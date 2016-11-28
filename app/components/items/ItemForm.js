import React from 'react';
import $ from 'jquery';

class ItemForm extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    $.ajax({
      url: '/api/items',
      type: 'POST',
      dataType: 'JSON',
      data: { name: this.refs.name.value, listId: this.props.listId }
    }).done( item =>{
      this.props.addItem(item);
      this.refs.name.value='';
    });
  }

  render(){
    return(
      <div>
        <form ref="form" onSubmit={this.handleSubmit}>
          <input ref="name" placeholder="Item Name" />
          <button className="btn light-blue darken-2 right">Add Item</button>
        </form>
      </div>
    )
  }

}

export default ItemForm;
