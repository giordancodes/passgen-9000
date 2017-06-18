import React, { Component } from 'react';

class Heading extends Component{
	render(){
		return(
      <h1 className="full-screen" id="title">
        <span>PassGen 9000</span><br/>
        <a onClick={ this.props.begin } className="begin">begin</a>
      </h1>
		)
	}
}

export default Heading;