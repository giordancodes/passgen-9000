import React, { Component } from 'react';

import Icons from './Icons';

class Length extends Component{
	render(){
		return(
      <label htmlFor="length">
        <p className="main-label">length of password</p>
        <div className="labels">
          <input  type="range"
                  min="8"
                  max="32"
                  value={ this.props.form.length }
                  onChange={ this.props.updateField }
                  id="length" />
          <p>
            { this.props.form.length } 
            <Icons next={ this.props.next }
                   prev={ this.props.prev } />
          </p>
        </div>
      </label>
    )
	}
}

export default Length;