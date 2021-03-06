import React from 'react';
import { Button } from 'react-bootstrap';

import reactAutoBind from 'react-autobind';

import 'bootstrap/dist/css/bootstrap.min.css';

import StringHexInput from './StringHexInput.jsx';


class CRCToolContainer extends React.Component {
  constructor(props) {
    super(props);
    
    reactAutoBind(this);
  }
  
  render() {
    return <StringHexInput></StringHexInput>;
  }
}


export default CRCToolContainer;
