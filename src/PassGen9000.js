import React, { Component } from 'react';

import SeedWords from './SeedWords.json';
import Substitutions from './Substitutions.json';

import PassGenForm from './PassGenForm';
import Generated from './Generated';
import Heading from './Heading';
import Error from './Error';

import { slugify, rando, isLetter, isInArray } from './Helpers';

import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			chooseDistinctWord: false,
			form:{
        length: 22,
				robustness: 3,
        distinct: ""
			},
      aesthetic: false,
      aestheticDesc: "words",
      robustnessDesc: null,
      generatedResult: null,
      error: null,
      currentStep: 1
		}
	}

  render() {
    return (
      <div>
        <Heading />
        <div className="wrapper">
          <section className="intro">
            
            <PassGenForm  updateField={ this.updateField }
                          updateCheck={ this.updateCheck }
                          genPass={ this.genPass }
                          form={ this.state.form }
                          robustnessDesc={ this.state.robustnessDesc }
                          aestheticDesc={ this.state.aestheticDesc }
                          chooseDistinctWord={ this.state.chooseDistinctWord }
                          setDistinct={ this.setDistinct }
                          currentStep={ this.currentStep }
                          next={ this.next }
                          prev={ this.prev } />
        
            <Error error={ this.state.error } />
            
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
      </div>
    );
  }

  componentDidMount() { 
    this.introAnimation();
    this.updateDesc();
  }

  introAnimation(){
    setTimeout(() => { document.getElementById("title").style.fontSize = "9vw" }, 1500);
    setTimeout(() => { document.getElementById("title").style.height = "10vh" }, 3000);
    setTimeout(() => { document.getElementById("title").style.padding = "42px 0" }, 3000);
    // inputs
    setTimeout(() => { document.getElementById("pass-gen-form").style.opacity = "1" }, 3700);
  }

  setDistinct = (e) => {
  	let chooseDistinctWord = this.state.chooseDistinctWord;
  	chooseDistinctWord = !chooseDistinctWord;
  	this.setState({ chooseDistinctWord })
  }

  updateField = (e) =>{
  	let form = this.state.form;
    form[e.target.id] = e.target.value;
    this.updateDesc();

    this.setState({ form });
  }

  updateCheck = () =>{
    let aesthetic = this.state.aesthetic;
    let aestheticDesc = this.state.aestheticDesc;

    aesthetic = !aesthetic;

    { 
      aesthetic ? this.setState({ aestheticDesc: "characters" })
      : this.setState({ aestheticDesc: "words" })
    }

    this.setState({ aesthetic });
  }

  updateDesc = () =>{
    let robustnessDesc = this.state.robustnessDesc;
    let r = this.state.form.robustness;

    robustnessDesc = `${r * 20}%`;

    if (r == 5){
      robustnessDesc = "99%";
    }

    this.setState({ robustnessDesc });
  }

  next = (e) =>{
    e.preventDefault();

    let currentStep = this.state.currentStep + 1;
    if (currentStep > 5){
      currentStep = 5;
    }
    this.setState({ currentStep }, this.transition());
    console.log(currentStep)
  }

  prev = (e) =>{
    e.preventDefault();

    let currentStep = this.state.currentStep - 1;
    if (currentStep < 1){
      currentStep = 1;
    }
    this.setState({ currentStep }, this.transition());
    console.log(currentStep);
  }

  transition = () =>{
    let step = this.state.currentStep;


    console.log(step);
  }

  clearError = () =>{
    setTimeout(() =>{ this.setState({ error: '' })} , 5000);
  }

  genPass = (e, l, r, distinct) =>{
    e.preventDefault();

    let result = "";
    l = this.state.form.length;
    r = this.state.form.robustness;
    distinct = slugify(this.state.form.distinct);
    let adjLength = SeedWords["sfw-adj"].length;
    let nounLength = SeedWords["sfw-noun"].length;

    // if custom word is longer than desired length, throw error and end
    if (l - 3 < distinct.length){
      this.setState({ error: "you've entered a custom word that is not suited your desired password length, please adjust", generatedResult: "" });
      this.clearError();
      return;
    }

    // generate password from SeedWords with chosen length
    while (l > result.length){

    // use custom word if desired
      result = result + distinct;

      // using n to switch between adjectives and nouns being added
      let n = 1;
      while (l > result.length){
        if (n % 2 === 1){
          result = `${result}${SeedWords["sfw-adj"][rando(adjLength)]}`;
        } else {
          result = `${result}${SeedWords["sfw-noun"][rando(nounLength)]}`;
        }
        n ++;
      }
      // console.log(result.search(distinct));
      if (l < result.length){
        result = "";
      }
    }

    let resultSplit;
    resultSplit = result.split("");

    // based on robustness, choose how many chars will be substituted
    let charsToSubstitute = Math.floor(l * (r * .2));

    // array to hold index of random chars to sub
    let charsTaken = [];

    for (let i = 0; i < charsToSubstitute; i++){

      // go through result, randomly choose chars to be subbed, add chosen index to array 
      let randomlyChosen = rando(charsToSubstitute);
      console.log(randomlyChosen);

      // check if index has already been used
      if (!isInArray(charsTaken, randomlyChosen)){
        charsTaken.push(randomlyChosen);
        console.log(Substitutions[resultSplit[randomlyChosen]]);

      }
      
    }

    console.log(result, result.length);
    this.setState({ generatedResult: result });

  }

}

export default PassGen9000;
