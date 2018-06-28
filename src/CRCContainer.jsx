import React from 'react';
import Bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import reactAutoBind from 'react-autobind';

import CRCValueComponent from './CRCValueComponent.jsx';


class CRCContainer extends React.Component {
  constructor(props) {
    super(props);
    
    reactAutoBind(this);
  }
  
  render() {
    return <Bootstrap.Grid>
      <Bootstrap.Row>
        <Bootstrap.Col md={2}>
          {this.props.name}
        </Bootstrap.Col>
        <Bootstrap.Col md={10}>
          <CRCValueComponent length={2} value={this.props.value} />
        </Bootstrap.Col>
      </Bootstrap.Row>
    </Bootstrap.Grid>;
  }
}


export default CRCContainer;
