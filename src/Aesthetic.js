import React, { Component } from 'react';

import Icons from './Icons';

class Aesthetic extends Component{
	render(){
		return(
      <label htmlFor="aesthetic">
        <p className="main-label">aesthetic</p>
        <div className="labels radio">
          <input  type="checkbox"
                  id="check1"
                  className="cmn-toggle cmn-toggle-round"
                  onClick={ this.props.updateRadio }
                  checked={ this.props.aesthetic }
                  name="aesthetic" />
          <label htmlFor="check1"></label>
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