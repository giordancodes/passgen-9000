import React, { Component } from 'react';

class PassGenForm extends Component{
	render(){
		return(
		  <form>
		    <label htmlFor="length">
		      <p>length of password</p>
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
		    <p>password robustness</p>
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

			  <h3>use your own word/phrase?</h3>
			  <label htmlFor="distinct-no">
			    <p>no, thank you</p>
			    <input  type="radio"
			            id="distinct-no"
			            checked={ this.props.distinctWord === false }
			            onChange={ this.props.setDistinct } />
			  </label>
			  <label htmlFor="distinct-yes">
			    <p>yes, please</p>
			    <input  type="radio"
			            id="distinct-yes"
			            checked={ this.props.distinctWord === true }
			            onChange={ this.props.setDistinct } />
			  </label>
			  
			  { 
			    this.props.distinctWord ?

			      <label htmlFor="distinct">
			        <p>distinct word/phrase</p>
			        <input  type="text"
			                id="distinct"
			                onChange={ this.props.updateField } />
			      </label> 

			    : null 
			  }
			  <button onClick={ this.props.genPass } >
			    Generate
			  </button>
			</form>
    )
	}
}

export default PassGenForm;