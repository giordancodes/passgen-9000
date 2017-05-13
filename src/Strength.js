import React, { Component } from 'react';

import Icons from './Icons';

class Strength extends Component{
	render(){
		return(
      <label htmlFor="strength">
        <p className="main-label">strength</p>
        <div className="labels">
          <input  type="range"
                  min="1"
                  max="5"
                  value={ this.props.form.strength }
                  onChange={ this.props.updateField }
                  id="strength" />
          <p>
            { this.props.strengthDesc }
            <Icons  next={ this.props.next }
                    prev={ this.props.prev } />
          </p>
        </div>
      </label>
    )
	}
}

export default Strength;