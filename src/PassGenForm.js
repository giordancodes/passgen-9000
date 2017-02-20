import React, { Component } from 'react';

class PassGenForm extends Component{
	render(){
		return(
		  <form>
		    <label htmlFor="length">
		      <p className="main-label">length of password</p>
		      <div className="range-count">
		        <input  type="range"
		                min="8"
		                max="32"
		                value={ this.props.form.length }
		                onChange={ this.props.updateField }
		                id="length" />
		        <p>{ this.props.form.length }</p>
		      </div>
		    </label>
		    <label htmlFor="robustness">
		    <p className="main-label">password robustness</p>
		      <div className="range-count">
		        <input  type="range"
		                min="1"
		                max="4"
		                value={ this.props.form.robustness }
		                onChange={ this.props.updateField }
		                id="robustness" />
		        <p>{ this.props.robustnessDesc }</p>
		      </div>
		    </label>

			  <label htmlFor="distinct">
	        <p className="main-label">distinct word/phrase <span>(optional)</span></p>
	        <input  type="text"
	                id="distinct"
	                onChange={ this.props.updateField }
		              value={ this.props.form.distinct } />
	      </label> 

			  <button onClick={ this.props.genPass } >
			    Generate
			  </button>
			</form>
    )
	}
}

export default PassGenForm;