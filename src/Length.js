import React, { Component } from 'react';

import Icons from './Icons';

class Length extends Component{
	render(){
		return(
      <label htmlFor="length">
        <div className="labels">
          <p className="main-label">length</p>
          <input  type="range"
                  min="8"
                  max="32"
                  value={ this.props.form.length }
                  onChange={ this.props.updateField }
                  id="length" />
          <p className={ this.props.lengthDesc[1] }>
            { this.props.lengthDesc[0] } 
            <Icons  next={ this.props.next }
                    prev={ this.props.prev } />
          </p>
        </div>
      </label>
    )
	}
}

export default Length;