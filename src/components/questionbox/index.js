import React from 'react';
import Config from '../../config';
import SheetsSubmitter from '../sheets-submitter';
import QuestionboxForm from './questionbox';

export default props => (
  <SheetsSubmitter apiUrl={Config.questionApiUrl}>
    <QuestionboxForm {...props} />
  </SheetsSubmitter>
);
