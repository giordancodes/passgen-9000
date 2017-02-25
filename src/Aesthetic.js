import React, { Component } from 'react';

import Icons from './Icons';

class Aesthetic extends Component{
	render(){
		return(
      <label htmlFor="aesthetic">
        <p className="main-label">aesthetic</p>
        <div className="labels radio">
          <input  type="radio"
                  value={ "words" }
                  onChange={ this.props.updateRadio }
                  checked={ this.props.form.aesthetic }
                  name="aesthetic" />
          <input  type="radio"
                  value={ "characters" }
                  onChange={ this.props.updateRadio }
                  checked={ this.props.form.aesthetic }
                  name="aesthetic" />
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