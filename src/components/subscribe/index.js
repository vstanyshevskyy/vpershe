import React from 'react';
import Form from './form';
import SheetsSubmitter from '../sheets-submitter';
import config from '../../config';

export default props => (
  <SheetsSubmitter apiUrl={config.subscribeApiUrl} >
    <Form {...props} />
  </SheetsSubmitter>
);
