import React, { Component } from 'react';

import SeedWords from './SeedWords.json';
import Substitutions from './Substitutions.json';
import PassGenForm from './PassGenForm';
import Generated from './Generated';
import Helpers from './Helpers';
import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			distinctWord: false,
			form:{
        length: 8,
				robustness: 1
			},
      robustnessDesc: null,
      generatedResult: null

		}
	}
  render() {
    return (
      <div className="wrapper">
        {/*<h1>PassGen 9000</h1>*/}
        <section className="intro">
      		
          <PassGenForm  updateField={ this.updateField }
                        genPass={ this.genPass }
                        form={ this.state.form }
                        robustnessDesc={ this.state.robustnessDesc }
                        distinctWord={ this.state.distinctWord }
                        setDistinct={ this.setDistinct } />
          
        </section>
        <section className="result">
          {
            this.state.generatedResult ?

            <h4> <Generated generatedResult={ this.state.generatedResult }/> </h4>

            : null
          }
        </section>
      </div>
    );
  }

  componentDidMount() {	
  	this.updateDesc();
  }

  setDistinct = (e) => {
  	let distinctWord = this.state.distinctWord;
  	distinctWord = !distinctWord;
  	this.setState({ distinctWord })
  }

  updateField = (e) =>{
  	let form = this.state.form;
  	form[e.target.id] = e.target.value;
    this.updateDesc();

  	this.setState({form});
  }

  updateDesc = () =>{
    let robustnessDesc = this.state.robustnessDesc;
    let r = this.state.form.robustness;

    if (r == 1){
      robustnessDesc = "not bad";
    } else if (r == 2){
      robustnessDesc = "pretty good";
    } else if (r == 3){
      robustnessDesc = "strong like bull";
    } else if (r == 4){
      robustnessDesc = "locked down";
    }

    this.setState({ robustnessDesc });
  }

  genPass = (e, l, r, distinctWord) =>{
    e.preventDefault();

    let result = "";
    l = this.state.form.length;
    r = this.state.form.robustness;
    distinctWord = this.state.distinctWord;
    let adjLength = SeedWords["sfw-adj"].length;
    let nounLength = SeedWords["sfw-noun"].length;
    let seedAdj;
    let seedNoun;

    while (l >= result.length){
      result = `${result}${SeedWords["sfw-adj"][this.rando(adjLength)]}`;
      result = `${result}${SeedWords["sfw-noun"][this.rando(nounLength)]}`;
    }

    console.log(result, result.length);
    this.setState({ generatedResult: result });
    console.log(this.slugify("--sadjas--fr-jf-cd9-"));

  }

  swapChar = (char) =>{
    
  }

  slugify = (text) =>{
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-')   // Replace multiple - with single -
      .replace(/^-+/, '')       // Trim - from start of text
      .replace(/-+$/, '');      // Trim - from end of text
  }

  rando(max) {
    let min = 0;
    max = max -1;
    return Math.floor(Math.random() * (max - min) + min);
  }

}

export default PassGen9000;
