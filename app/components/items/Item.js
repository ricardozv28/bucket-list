import React from 'react';
import $ from 'jquery';
import Pencil from 'react-icons/lib/go/pencil';
import Trash from 'react-icons/lib/md/delete';

class Item extends React.Component{
  constructor(props){
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.state = { edit:false }
  }

  toggleEdit(){
    this.setState({ edit: !this.state.edit })
  }

  updateItem(){
    let { name } = this.refs;
    $.ajax({
      url: `/api/items/${this.props._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { name: name.value }
    }).done( item => {
      this.props.updateItem(item);
      name.value = '';
      this.toggleEdit();
    })
  }

  deleteItem(){
    $.ajax({
      url: `/api/items/${this.props._id}`,
      type: 'DELETE',
      dataType:'JSON'
    }).done( () =>{
      this.props.deleteItem(this.props._id)
    });
  }

  show(){
   return(
     <div className="col s12">
       <div className="card">
          <div className="card-content">
            <span className="card-title">{this.props.name}</span>
          </div>
          <div className="card-action" style={{padding: '20px 20px 40px 20px'}}>
            <div className="right">
              <Pencil onClick={this.toggleEdit} style={{fontSize: '16px' , marginRight: '6px'}}/>
              <Trash onClick={this.deleteItem} style={{fontSize: '18px'}}/>
            </div>
          </div>
       </div>
      </div>
    );
  }

  edit(){
    return(
      <div className="col s12">
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
            <button className="btn blue lighten-1" onClick={this.updateItem}>Update</button>
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

export default Item;
