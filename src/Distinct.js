import React, { Component } from 'react';

import Icons from './Icons';

class Distinct extends Component{
	render(){
		return(
      <label htmlFor="distinct">
        <p className="main-label">distinct word/phrase <span>(optional)</span></p>
        <div className="range-count">
          <input  type="text"
                  id="distinct"
                  onChange={ this.props.updateField }
                  value={ this.props.form.distinct } />
          <p>
            <Icons next={ this.props.next }
                   prev={ this.props.prev } />
          </p>
        </div>
      </label>
    )
	}
}

export default Distinct;