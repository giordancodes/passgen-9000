import React from 'react';

const Generate = (props) => (
	<div className="range-count">
		<button id="generate"
						onClick={ props.genPass } >
		  Generate
		</button>
	</div>
	);

export default Generate;