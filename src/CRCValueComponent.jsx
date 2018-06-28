import React from 'react';
import Bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

class CRCValueComponent extends React.Component {
  constructor(props) {
    // Make sure length has sane default
    props.length = props.length || 2;

    // Make sure length is a multiple of 2
    props.length = (props.length + 1) & ~1;
    props.length &= ~1;

    // Make sure it has a number value
    props.value = props.value || 0;

    super(props);
  }
  
  render() {
    return <Bootstrap.Label bsStyle={this.props.value == 0 ? 'success' : 'default'}>0x{this.props.value.toString('hex').padStart(this.props.length)}</Bootstrap.Label>;
  }
}

CRCValueComponent.propTypes = {
  length: (props, propName, componentName) => {
    if (typeof(props[propName]) != 'number') {
      return new Error(`Invalid length supplied to ${componentName}. Must be a number.`);
    }
    if (props[propName] <= 0) {
      return new Error(`Invalid length supplied to ${componentName}. Must be a positive multiple of 2.`);
    }
    if (props[propName] & 1 != 0) {
      return new Error(`Invalid length supplied to ${componentName}. Must be a multiple of 2.`);
    }
  },
  value: PropTypes.number.isRequired,
};

export default CRCValueComponent;
