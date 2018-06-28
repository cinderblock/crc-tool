import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import reactAutoBind from 'react-autobind';



class StringHexInput extends React.Component {
  constructor(props) {
    super(props);
    
    reactAutoBind(this);
    
    this.state = {
      // The main byte buffer we're wrapping around
      buffer: Buffer.from(''),
      // As a user is inputting bytes in HEX, half of the characters are only half bytes and we need a place to store that one as we're typing
      extraHexChar: '',
      // Location of cursor so that it can be displayed in both views
      cursorLocation: 0,
      // Which byte is currently being hovered over in either string or HEX view (so that we can highlight them)
      hoverByte: false,
      // List of "highlighted" bytes in either string or HEX view (user has clicked on them)
      highlightedBytes: [],
    }
  }
  
  handleStringChange(event) {
    this.setState({
      buffer: Buffer.from(event.target.value),
    });
  }
  
  handleHexChange(event) {
    var hexStr = event.target.value.replace(/[^0-9a-fA-F]/g, '');
    var extraHexChar = hexStr.length % 2 ? hexStr[hexStr.length - 1] : '';
    hexStr = hexStr.substring(0, hexStr.length & ~1);
    var buffer = Buffer.from(hexStr, 'hex');
    this.setState({buffer, extraHexChar});
  }
  
  render() {
    return <div>
      Input String: <input style={{fontFamily: 'monospace'}} type="text" value={this.state.buffer.toString()} onChange={this.handleStringChange}></input>
      Input HEX: <input style={{fontFamily: 'monospace'}} type="text" value={this.state.buffer.toString('hex') + this.state.extraHexChar} onChange={this.handleHexChange}></input>
    </div>;
  }
}


export default StringHexInput;
