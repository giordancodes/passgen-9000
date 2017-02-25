import React, { Component } from 'react';

import Length from './Length';
import Robustness from './Robustness';
import Aesthetic from './Aesthetic';
import Distinct from './Distinct';
import Generate from './Generate';
import Icons from './Icons';

class PassGenForm extends Component{
	render(){
		return(
		  <form id="pass-gen-form">

		    <Length form={ this.props.form }
		    				updateField={ this.props.updateField }
		    				next={ this.props.next }
                prev={ this.props.prev } />

        <Robustness form={ this.props.form }
		    						updateField={ this.props.updateField }
		    						robustnessDesc={ this.props.robustnessDesc }
		    						next={ this.props.next }
                		prev={ this.props.prev } />

    		<Aesthetic 	form={ this.props.form }
		    						updateField={ this.props.updateField }
		    						next={ this.props.next }
                		prev={ this.props.prev } />
				
				<Distinct form={ this.props.form }
		    					updateField={ this.props.updateField }
	    						next={ this.props.next }
              		prev={ this.props.prev } />  

			  <Generate genPass={ this.props.genPass } />

			</form>
    )
	}
}

export default PassGenForm;