import React, { Component } from 'react';
import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			distinctWord: false,
			form:{
				length: 8
			}
		}
	}
  render() {
    return (
      <div className="wrapper">
        {/*<h1>PassGen 9000</h1>*/}
        <section className="intro">
      		<h3>start with your own word/phrase?</h3>
        	<label htmlFor="distinct-no">
        		no, thank you
        		<input 	type="radio"
        						id="distinct-no"
        						checked={ this.state.distinctWord === false }
        						onChange={ this.setDistinct } />
					</label>
					<label htmlFor="distinct-yes">
						yes, please
        		<input 	type="radio"
        						id="distinct-yes"
        						checked={ this.state.distinctWord === true }
        						onChange={ this.setDistinct } />
					</label>
        	<form>

        		{ 
        			this.state.distinctWord ?

	        			<label htmlFor="distinct">
		        			distinct word/phrase
		        			<input 	type="text"
		        							id="distinct"
		        							onChange={ this.updateField } />
		        		</label> 

        		  : null 
        		}

        		<label htmlFor="length">
        			length of password
        			<input 	type="range"
        							min="8"
        							max="32"
        							value={ this.state.form.length }
        							onChange={ this.updateField }
        							id="length" />
        			{ this.state.form.length }
        		</label>
        		<label htmlFor="">
        			<input type="text"
        			id="" />
        		</label>
        	</form>
        </section>
      </div>
    );
  }

  componentDidMount() {	
  	
  }

  setDistinct = (e) => {
  	let distinctWord = this.state.distinctWord;
  	distinctWord = !distinctWord;
  	this.setState({ distinctWord })
  }

  updateField = (e) =>{
  	let form = this.state.form;
  	form[e.target.id] = e.target.value;
  	this.setState({form});
  }

}

export default PassGen9000;
