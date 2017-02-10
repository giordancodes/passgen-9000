import React, { Component } from 'react';

import SeedWords from './SeedWords.json';
import Substitutions from './Substitutions.json';
import Helpers from './Helpers';
import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			distinctWord: false,
			form:{
        length: 8,
				robustness: 8
			},
      generatedResult: null

		}
	}
  render() {
    return (
      <div className="wrapper">
        {<h1>PassGen 9000</h1>}
        <section className="intro">
      		
          <form>
            <label htmlFor="length">
              <p>length of password</p>
              <div className="range-count">
                <input  type="range"
                        min="8"
                        max="32"
                        value={ this.state.form.length }
                        onChange={ this.updateField }
                        id="length" />
                <p>{ this.state.form.length }</p>
              </div>
            </label>
            <label htmlFor="robustness">
            <p>password robustness</p>
              <div className="range-count">
                <input  type="range"
                        min="8"
                        max="32"
                        value={ this.state.form.robustness }
                        onChange={ this.updateField }
                        id="robustness" />
                <p>{ this.state.form.robustness }</p>
              </div>
            </label>

          <h3>use your own word/phrase?</h3>
          <label htmlFor="distinct-no">
            <p>no, thank you</p>
            <input  type="radio"
                    id="distinct-no"
                    checked={ this.state.distinctWord === false }
                    onChange={ this.setDistinct } />
          </label>
          <label htmlFor="distinct-yes">
            <p>yes, please</p>
            <input  type="radio"
                    id="distinct-yes"
                    checked={ this.state.distinctWord === true }
                    onChange={ this.setDistinct } />
          </label>
          
          { 
            this.state.distinctWord ?

              <label htmlFor="distinct">
                <p>distinct word/phrase</p>
                <input  type="text"
                        id="distinct"
                        onChange={ this.updateField } />
              </label> 

            : null 
          }
          <button onClick={ this.genPass } >
            Generate
          </button>
        	</form>
        </section>
        <section className="result">
          {
            this.state.generatedResult ?

            <h4>{ this.state.generatedResult }</h4>

            : null

          }
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

  genPass = (e, l, r, distinctWord) =>{
    e.preventDefault();

    let result;
    l = this.state.form.length;
    r = this.state.form.robustness;
    distinctWord = this.state.distinctWord;



    this.setState({ generatedResult: result });

    console.log(SeedWords["sfw-adj"]);
    console.log(this.slugify("--sadjas--fr-jf-cd9-"));

  }

  slugify = (text) =>{
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-')   // Replace multiple - with single -
      .replace(/^-+/, '')       // Trim - from start of text
      .replace(/-+$/, '');      // Trim - from end of text
  }

  rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

}

export default PassGen9000;
