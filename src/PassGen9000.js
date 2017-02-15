import React, { Component } from 'react';

import SeedWords from './SeedWords.json';
import Substitutions from './Substitutions.json';

import PassGenForm from './PassGenForm';
import Generated from './Generated';
import Heading from './Heading';

import { slugify, rando, isLetter } from './Helpers';

import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			distinctWord: false,
			form:{
        length: 22,
				robustness: 1
			},
      robustnessDesc: null,
      generatedResult: null

		}
	}
  render() {
    return (
      <div className="wrapper">
        {/*<Heading />*/}
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

            <h4>
              <Generated generatedResult={ this.state.generatedResult }/>
            </h4>

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

    // generate password from SeedWords with chosen length
    while (l > result.length){
      // using n to switch between adjectives and nouns being added
      let n = 1;

      while (l > result.length){
        if (n % 2 === 1){
          result = `${result}${SeedWords["sfw-adj"][rando(adjLength)]}`;
        } else {
          result = `${result}${SeedWords["sfw-noun"][rando(nounLength)]}`;
        }
        n ++;
        if (l < result.length){
          result = "";
        }
      }
    }

    let resultSplit;
    resultSplit = result.split("");

    // based on robustness, choose how many chars will be substituted
    for (let i = 0; i < resultSplit.length; i++){
      console.log(resultSplit[i]);
    }

    // console.log(result.);

    console.log(result, result.length);
    this.setState({ generatedResult: result });
    // console.log(slugify("--sadjas--fr-jf-cd9-"));

  }

}

export default PassGen9000;
