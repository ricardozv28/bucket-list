import React from 'react';
import $ from 'jquery';
import Trash from 'react-icons/lib/md/delete';

class Bucket extends React.Component{
  constructor(props){
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateBucket = this.updateBucket.bind(this);
    this.deleteBucket = this.deleteBucket.bind(this);
    this.state = { edit: false };
  }

  toggleEdit(){
    this.setState( {edit: !this.state.edit });
  }

  updateBucket(){
    let { name, description } =this.refs;
    $.ajax({
      url: `/buckets/${this.props._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { name: name.value, description: description.value }
    }).done( bucket => {
      this.props.updateBucket(bucket);
      name.value = "";
      description.value = "";
      this.toggleEdit();
    });
  }

  deleteBucket(){
    $.ajax({
      url: `/buckets/${this.props._id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () =>{
      this.props.deleteBucket(this.props._id);
    });
  }

  show(){
    return(
      <div className="col s12 m3">
        <div className="card">
          <div className="card-content">
            <Trash className="right blue-text" onClick={this.deleteBucket} style={{fontSize: '25px'}}/>
            <span className="card-title">{this.props.name}</span>
            <p>{this.props.description || "Click edit to add a description"}</p>
          </div>
          <div className="card-action">
            <button className="btn light-blue darken-2" onClick={this.toggleEdit}>Edit</button>
            <a href={`/buckets/${this.props._id}`} className="btn light-blue darken-2">Show</a>
          </div>
        </div>
      </div>
    )
  }

  edit(){
    return(
      <div className="col s12 m3">
        <div className="card">
          <div className="card-content">
            <input
              ref="name"
              placeholder="name"
              defaultValue={this.props.name}
              required={true}
            />
            <textarea
              className="materialize-textarea"
              ref="description"
              defaultValue={this.props.description}
              placeholder="Write a description"
            >
            </textarea>
          </div>
          <div className="card-action">
            <button className="btn red lighten-3" onClick={this.toggleEdit}>Cancel</button>
            <button className="btn blue lighten-1" onClick={this.updateBucket}>Update</button>
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

export default Bucket
