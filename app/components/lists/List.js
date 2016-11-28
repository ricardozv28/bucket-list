import React from 'react';
import $ from 'jquery';
import ItemForm from '../items/ItemForm';
import Item from '../items/Item';
import Pencil from 'react-icons/lib/go/pencil';
import Trash from 'react-icons/lib/md/delete';

class List extends React.Component{
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.state = { items: [] , edit: false }
  }

  componentWillMount(){
    $.ajax({
      url: '/api/items',
      type: 'GET',
      dataType: 'JSON',
      data: { listId: this.props._id }
    }).done( items => {
      this.setState({ items });
    });
  }

  toggleEdit(){
    this.setState( { edit: !this.state.edit });
  }

  deleteList(){
    $.ajax({
      url: `/api/lists/${this.props._id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () => {
      this.props.deleteList(this.props._id)
    });
  }

  updateList(){
    $.ajax({
      url: `/api/lists/${this.props._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { name: this.refs.name.value }
    }).done( list => {
      this.props.updateList(list);
      this.refs.name.value="";
      this.toggleEdit();
    })
  }

  deleteItem(id){
    this.setState({ items: this.state.items.filter( i => i._id !== id)});
  }

  updateItem(item){
    let items = this.state.items.map( i =>{
      if(item._id === i._id)
        return item;
      return i;
    });
    this.setState( { items });
  }

  addItem(item){
    this.setState({ items: [item,...this.state.items] });
  }

  show(){
    let items = this.state.items.map( item =>{
      return(
        <Item
          key={item._id}
          {...item}
          deleteItem={this.deleteItem}
          updateItem={this.updateItem}
        />
      )
    })

    return(
      <div className="col s12 m6">
        <div className="right">
          <Pencil className="icon-edit" onClick={this.toggleEdit} style={{fontSize: '25px' }}/>
          <Trash className="icon-delete" onClick={this.deleteList} style={{fontSize: '25px' }} />
        </div>
        <h3 className="center">{this.props.name}</h3>
        <hr />
        <ItemForm addItem={this.addItem} listId={this.props._id} />
        {items}
      </div>
    )
  }

  edit(){
    return(
      <div className="col s12 m6">
        <div className="card">
          <div className="card-content">
            <input
              ref="name"
              placeholder="name"
              defaultValue={this.props.name}
              required={true}
            />
          </div>
          <div className="card-action">
            <button className="btn red lighten-3" onClick={this.toggleEdit}>Cancel</button>
            <button className="btn blue lighten-1" onClick={this.updateList}>Update</button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    if(this.state.edit)
      return this.edit();
    else
      return this.show();
  }

}

export default List;
