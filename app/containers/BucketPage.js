import React from 'react';
import Lists from '../components/lists/lists';

const BucketPage = ({ bucketId }) => (
  <div>
    <Lists bucketId={bucketId} />
  </div>
);

export default BucketPage;
