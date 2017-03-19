import React, { Component } from 'react';

import Length from './Length';
import Robustness from './Robustness';
import Aesthetic from './Aesthetic';
import Distinct from './Distinct';
import Generate from './Generate';
import ReProcess from './ReProcess';

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

    		<Aesthetic 	aesthetic={ this.props.aesthetic }
		    						aestheticDesc={ this.props.aestheticDesc }
		    						updateCheck={ this.props.updateCheck }
		    						next={ this.props.next }
                		prev={ this.props.prev } />
				
				{ !this.props.aesthetic ?
						<Distinct form={ this.props.form }
											updateField={ this.props.updateField }
											next={ this.props.next }
											prev={ this.props.prev } />
					: null
				}
				
			  <Generate genPass={ this.props.genPass } />

				<ReProcess />

			</form>
    )
	}
}

export default PassGenForm;