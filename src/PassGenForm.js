import React, { Component } from 'react';

import Length from './Length';
import Robustness from './Robustness';
import Icons from './Icons';

class PassGenForm extends Component{
	render(){
		return(
		  <form>

		    <Length form={ this.props.form }
		    				updateField={ this.props.updateField }
		    				next={ this.props.next }
                prev={ this.props.prev } />

        <Robustness form={ this.props.form }
		    						updateField={ this.props.updateField }
		    						robustnessDesc={ this.props.robustnessDesc }
		    						next={ this.props.next }
                		prev={ this.props.prev } />

			  <label htmlFor="distinct">
	        <p className="main-label">distinct word/phrase <span>(optional)</span></p>
	        <input  type="text"
	                id="distinct"
	                onChange={ this.props.updateField }
		              value={ this.props.form.distinct } />
	      </label> 

			  <label htmlFor="generate">
			  	<button id="generate"
			  					onClick={ this.props.genPass } >
			  	  Generate
			  	</button>
		  	</label>

			</form>
    )
	}
}

export default PassGenForm;