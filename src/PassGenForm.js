import React, { Component } from 'react';

import Length from './Length';
import Strength from './Strength';
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
								lengthDesc={ this.props.lengthDesc }
		    				next={ this.props.next }
                prev={ this.props.prev } />

        <Strength 	form={ this.props.form }
		    						updateField={ this.props.updateField }
		    						strengthDesc={ this.props.strengthDesc }
		    						next={ this.props.next }
                		prev={ this.props.prev } />

    		<Aesthetic 	aesthetic={ this.props.aesthetic }
		    						aestheticDesc={ this.props.aestheticDesc }
		    						updateCheck={ this.props.updateCheck }
		    						next={ this.props.next }
                		prev={ this.props.prev } />
				
				{ 
					!this.props.aesthetic
						? <Distinct form={ this.props.form }
											updateField={ this.props.updateField }
											dLength={ this.props.dLength }
											next={ this.props.next }
											prev={ this.props.prev } />
						: null
				}
				
			  <Generate genPass={ this.props.genPass } />

				{ 
					this.props.vanillaResult === null 
						?	null
						: <ReProcess onSwapChars={ this.props.onSwapChars } />
				}
				

			</form>
    )
	}
}

export default PassGenForm;