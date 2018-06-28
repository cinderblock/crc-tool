import React from 'react';
import * as Bootstrap from 'react-bootstrap';
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
    };
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
    var hexText = (this.state.buffer.toString('hex') + this.state.extraHexChar).match(/.{1,2}|^$/g).join(' ');


    return <Bootstrap.Grid>
      <Bootstrap.Form horizontal>
        <Bootstrap.FormGroup controlId="stringInput">
          <Bootstrap.Row>
            <Bootstrap.Col md={1}>
              <Bootstrap.ControlLabel>ASCII</Bootstrap.ControlLabel>
              </Bootstrap.Col>
            <Bootstrap.Col md={10}>
              <Bootstrap.FormControl style={{paddingLeft: '2.2ch', fontFamily: 'monospace', letterSpacing: '1.5ch'}} type="text" value={this.state.buffer.toString()} onChange={this.handleStringChange} placeholder="Ascii string" />
            </Bootstrap.Col>
          </Bootstrap.Row>
        </Bootstrap.FormGroup>
        <Bootstrap.FormGroup controlId="hexInput">
          <Bootstrap.Row>
            <Bootstrap.Col md={1}>
              <Bootstrap.ControlLabel>HEX</Bootstrap.ControlLabel>
            </Bootstrap.Col>
            <Bootstrap.Col md={10}>
              <Bootstrap.FormControl style={{fontFamily: 'monospace', wordSpacing: '-0.5ch'}} type="text" value={hexText} onChange={this.handleHexChange} className="form-control" placeholder="HEX" />
            </Bootstrap.Col>
          </Bootstrap.Row>
        </Bootstrap.FormGroup>
      </Bootstrap.Form>
    </Bootstrap.Grid>;
  }
}


export default StringHexInput;
