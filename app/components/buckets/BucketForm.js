import React from 'react';
import $ from 'jquery';

class BucketForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    $.ajax({
      url: '/buckets',
      type: 'POST',
      dataType: 'JSON',
      data: { name: this.refs.name.value }
    }).done( bucket => {
      this.props.addBucket(bucket);
      this.refs.name.value = "";
    })
  }



  render(){
    return(
      <div className="row">
        <div className="center col offset-m2 s12 m8">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input ref="name" placeholder="Add Bucket Name"/>
              <button className="btn purple lighten-1">Add Bucket</button>
            </div>
          </form>
        </div>
      </div>

    )
  }

}

export default BucketForm;
