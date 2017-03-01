import React, { Component } from 'react';

import Icons from './Icons';

class Aesthetic extends Component{
	render(){
		return(
      <label htmlFor="aesthetic">
      
        <p className="main-label">aesthetic</p>
        
        <div className="labels radio">

          <input  type="checkbox"
                  id="aesthetic"
                  className="cmn-toggle cmn-toggle-round"
                  onChange={ this.props.updateCheck }
                  checked={ this.props.aesthetic } />

          <label htmlFor="aesthetic"></label>

          <p>
            { this.props.aesthetic }
            <Icons next={ this.props.next }
                   prev={ this.props.prev } />
          </p>

        </div>
      </label>
    )
	}
}

export default Aesthetic;