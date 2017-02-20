import React, { Component } from 'react';

class Icons extends Component{
	render(){
		return(
		  <span className="icons">
      	<a onClick={ this.props.next }>
      		<i className="fa fa-check"></i></a>
      	<a onClick={ this.props.prev }>
      		<i className="fa fa-times"></i></a>
    	</span>
    )
	}
}

export default Icons;