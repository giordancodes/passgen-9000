import React, { Component } from 'react';

import Icons from './Icons';

class Robustness extends Component{
	render(){
		return(
      <label htmlFor="robustness">
        <p className="main-label">password robustness</p>
        <div className="range-count">
          <input  type="range"
                  min="1"
                  max="4"
                  value={ this.props.form.robustness }
                  onChange={ this.props.updateField }
                  id="robustness" />
          <p>
            { this.props.robustnessDesc }
            <Icons next={ this.props.next }
                   prev={ this.props.prev } />
          </p>
        </div>
      </label>
    )
	}
}

export default Robustness;