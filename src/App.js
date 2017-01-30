import React, { Component } from 'react';
import './passgen.css';

class App extends Component {
	constructor(){
		super();
		this.state={
			customWord: false
		}
	}
  render() {
    return (
      <div>
        {/*<h1>PassGen 9000</h1>*/}
        <section className="intro">
      		<h3>start with your own word/phrase?</h3>
        	<label htmlFor="custom-no">
        		no, thank you
        		<input 	type="radio"
        						id="custom-no"
        						checked={ this.state.customWord === false }
        						onChange={ this.setCustom } />
					</label>
					<label htmlFor="custom-yes">
						yes, please
        		<input 	type="radio"
        						id="custom-yes"
        						checked={ this.state.customWord === true }
        						onChange={ this.setCustom } />
					</label>
        	<form>
        		<label htmlFor="">
        			custom word/phrase
        			<input type="text"/>
        		</label>
        		<label htmlFor="">
        			<input type="text"/>
        		</label>
        		<label htmlFor="">
        			<input type="text"/>
        		</label>
        	</form>
        </section>
      </div>
    );
  }

  componentDidMount() {	
  	
  }

  setCustom = (e) => {
  	let customWord = this.state.customWord;
  	customWord = !customWord;
  	this.setState({ customWord })
  }

  updateField = (e) =>{
  	let form = this.state.form;
  	form[e.target.id] = e.target.value;
  	this.setState({form});
  }

}

export default App;
