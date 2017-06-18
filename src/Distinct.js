import React, { Component } from 'react';

import Icons from './Icons';

class Distinct extends Component{
	render(){
		return(
      <label htmlFor="distinct">
        <p className="main-label">custom input?          <Icons  next={ this.props.next }
                  prev={ this.props.prev } />
        </p>
        <div className="labels">
          <input  type="text"
                  id="distinct"
                  onChange={ this.props.updateField }
                  value={ this.props.form.distinct } />
        </div>
        <p>{ this.props.dLength }</p>
      </label>
    )
	}
}

export default Distinct;