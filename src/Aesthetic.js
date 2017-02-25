import React, { Component } from 'react';

import Icons from './Icons';

class Aesthetic extends Component{
	render(){
		return(
      <label htmlFor="aesthetic">
        <p className="main-label">aesthetic</p>
        <div className="radio">
          <input  type="radio"
                  value={ this.props.form.aesthetic }
                  onChange={ this.props.updateField }
                  id="words" />
          <input  type="radio"
                  value={ this.props.form.aesthetic }
                  onChange={ this.props.updateField }
                  id="chars" />
          <p>
            { this.props.form.aesthetic }
            <Icons next={ this.props.next }
                   prev={ this.props.prev } />
          </p>
        </div>
      </label>
    )
	}
}

export default Aesthetic;