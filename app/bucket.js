import React from 'react';
import ReactDOM from 'react-dom';
import BucketPage from './containers/BucketPage';

let bucketId = window.location.pathname.split("/buckets/")[1];

ReactDOM.render(<BucketPage bucketId={bucketId} />, document.getElementById('content'));
