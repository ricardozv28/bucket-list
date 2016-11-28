import React from 'react';
import $ from 'jquery';

class ListForm extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    $.ajax({
      url: '/api/lists',
      type: 'POST',
      dataType: 'JSON',
      data: { name: this.refs.name.value, bucketId: this.props.bucketId }
    }).done( list => {
      this.refs.name.value= '';
      this.props.addList(list);
    })
  }

  render(){
    return(
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div className="card-content">
                <input ref="name" placeholder="List Name" />
              </div>
              <div className="card-action">
                <button className="btn purple lighten-1">Add List</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default ListForm;
