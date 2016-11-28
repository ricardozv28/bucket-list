import React from 'react';
import $ from 'jquery';
import BucketForm from './BucketForm';
import Bucket from './Bucket';

class Buckets extends React.Component {
  constructor(props){
    super(props);
    this.addBucket = this.addBucket.bind(this);
    this.updateBucket = this.updateBucket.bind(this);
    this.deleteBucket = this.deleteBucket.bind(this);
    this.state = { buckets: []}
  }

  componentWillMount(){
    $.ajax({
      url: '/buckets',
      type: 'GET',
      dataType: 'JSON'
    }).done( buckets => {
      this.setState({ buckets });
    });
  }

  addBucket(bucket){
    this.setState({ buckets: [...this.state.buckets, bucket ] });
  }

  deleteBucket(id){
    this.setState({ buckets: this.state.buckets.filter( b => b._id !== id ) });
  }

  updateBucket(bucket){
    let buckets = this.state.buckets.map( b => {
      if(b._id === bucket._id)
        return bucket;
      return b;
    });
    this.setState({ buckets });
  }

  render(){
    let buckets = this.state.buckets.map ( bucket =>{
      return(
        <Bucket
          key={bucket._id}
          updateBucket={this.updateBucket}
          deleteBucket={this.deleteBucket}
          {...bucket}
        />
      )

    })

    return(
      <div>
        <BucketForm addBucket={this.addBucket} />
        <div className="row">
        { buckets }
        </div>
      </div>
    )
  }

}

export default Buckets;
