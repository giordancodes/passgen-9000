import React, { Component } from 'react';

import SeedWords from './SeedWords.json';
import Substitutions from './Substitutions.json';

import PassGenForm from './PassGenForm';
import Generated from './Generated';
import Heading from './Heading';
import Error from './Error';

import { slugify, rando, isInArray, strReplaceChar } from './Helpers';

import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			form:{
        length: 22,
				robustness: 2,
        distinct: ""
			},
      aesthetic: false,
      aestheticDesc: "words",
      robustnessDesc: null,
      generatedResult: null,
      error: null,
      currentStep: 1,
      vanillaResult: null
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
                          aesthetic={ this.state.aesthetic }
                          aestheticDesc={ this.state.aestheticDesc }
                          currentStep={ this.currentStep }
                          onSwapChars={ this.onSwapChars }
                          vanillaResult={ this.state.vanillaResult }
                          dLength={ this.state.dLength }
                          next={ this.next }
                          prev={ this.prev } />
        
            <Error error={ this.state.error } />
            
          </section>
          <section className="result">
              <h4>
                <Generated  generatedResult={ this.state.generatedResult }
                            vanillaResult={ this.state.vanillaResult } />
              </h4>
          </section>
        </div>
      </div>
    );
  }

  componentDidMount() { 
    let l = this.state.form.length;
    let r = this.state.form.robustness;
    this.introAnimation();
    this.updateDesc();
    this.setState({ indexesToSubstitute: Math.floor(l * (r * .2)) })
  }

  introAnimation(){
    setTimeout(() => { document.getElementById("title").style.fontSize = "9vw" }, 500);
    setTimeout(() => { document.getElementById("title").style.height = "10vh" }, 500);
    setTimeout(() => { document.getElementById("title").style.padding = "42px 0" }, 500);
    // inputs
    setTimeout(() => { document.getElementById("pass-gen-form").style.opacity = "1" }, 500);
  }

  updateField = (e) =>{
  	let form = this.state.form;
    form[e.target.id] = e.target.value;
    let dLength = this.state.form.distinct.length;
    let l = this.state.form.length;
    let r = this.state.form.robustness;

    this.updateDesc();

    // set a finite number of random indexes swapped, multiplied by .2 per level of robustness 
    let indexesToSubstitute = Math.floor(l * (r * .2));

    this.setState({ form, dLength, indexesToSubstitute });
  }

  updateCheck = () =>{
    let aesthetic = this.state.aesthetic;

    aesthetic = !aesthetic;

    { 
      aesthetic
        ? this.setState({ aestheticDesc: "characters" })
        : this.setState({ aestheticDesc: "words" })
    }

    this.setState({ aesthetic });
  }

  updateDesc = () =>{
    let robustnessDesc = this.state.robustnessDesc;
    let r = this.state.form.robustness;

    robustnessDesc = `${r * 20}%`;

  // using "5" as just 5 is not recognized as type, so == is needed instead of === to qualify 
    if (r === "5"){
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
  }

  prev = (e) =>{
    e.preventDefault();

    let currentStep = this.state.currentStep - 1;
    if (currentStep < 1){
      currentStep = 1;
    }
    this.setState({ currentStep }, this.transition());
  }

  transition = () =>{
    let step = this.state.currentStep;
  }

  clearError = () =>{
    setTimeout(() =>{ this.setState({ error: '' })} , 8000);
  }

  genPass = (e, l, r, distinct, a, rework, orig) =>{
    e.preventDefault();

    let result = "";
    l = this.state.form.length;
    r = this.state.form.robustness;
    distinct = slugify(this.state.form.distinct);
    a = this.state.aesthetic;
    let indexesToSubstitute = this.state.indexesToSubstitute;
    let adjLength = SeedWords["sfw-adj"].length;
    let nounLength = SeedWords["sfw-noun"].length;
    let specialsLength = Substitutions["specials"].length;
    orig = this.state.vanillaResult;

    genWithSpecials:
    while (a){
      
    }

    // if custom word is longer than desired length, throw error, end
    if (l < distinct.length){
      this.setState({ error: `custom word that is longer than your desired password length, please adjust. chosen length: ${l}, custom word length: ${distinct.length}`, generatedResult: "" });
      this.clearError();
      return;
    }
    
    // if custom word is 1 letter short, add a special char
    if (l - 1 === distinct.length){
      result = result + Substitutions["specials"][rando(specialsLength)];
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
      if (l < result.length){
        result = "";
      }
    }
    this.setState({ vanillaResult: result });

    this.setState({ indexesToSubstitute })

    result = this.swapChars(indexesToSubstitute, l, result);
    
    this.setState({ generatedResult: result });

  }

  onSwapChars = (e, i, l, r) =>{
    e.preventDefault();
    i = this.state.indexesToSubstitute;
    l = this.state.form.length;
    r = this.state.vanillaResult;
    
    let result = this.swapChars(i, l, r);
    this.setState({ generatedResult: result });
  }

  swapChars = (indexesToSubstitute, l, result) =>{

    // array to hold indexes of random characters to substitute
    let charsTaken = [];
    let swappedResult = result;
    let resultSplit = result.split("");

    // begin the swapping
    for (let i = 0; i < indexesToSubstitute; i++){

      // go through result, randomly choose characters to be subbed, add chosen index to array 
      let randomIndex = rando(l); 

      // check if index has already been used, swap single char with random sub option from array
      // if it has been used, push i back to compensate
      if (!isInArray(charsTaken, randomIndex)){
        let subArray = Substitutions[resultSplit[randomIndex]];
        let subArrayLength = Substitutions[resultSplit[randomIndex]].length;

        charsTaken.push(randomIndex);
        swappedResult = strReplaceChar(swappedResult, randomIndex, subArray[rando(subArrayLength)]);
      } else {
        i--;
      }
    }
    return swappedResult;
  }
}

export default PassGen9000;
