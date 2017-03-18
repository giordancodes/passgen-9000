import React, { Component } from 'react';

import SeedWords from './SeedWords.json';
import Substitutions from './Substitutions.json';

import PassGenForm from './PassGenForm';
import Generated from './Generated';
import Heading from './Heading';
import Error from './Error';

import { slugify, rando, isLetter, isInArray, strReplaceChar } from './Helpers';

import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			chooseDistinctWord: false,
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
                          aesthetic={ this.state.aesthetic }
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
                <Generated  generatedResult={ this.state.generatedResult }
                            vanillaResult={ this.state.vanillaResult } />
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
      if (l < result.length){
        result = "";
      }
    }
    this.setState({ vanillaResult: result });
    let resultSplit;
    resultSplit = result.split("");

    // high number from random seed comes from full chosen length value
    let charsToSubstitute = Math.floor(l);
    // let charsToSubstitute = Math.floor(l * (r * .2));

    // array to hold indexes of random characters to substitute
    let charsTaken = [];

    // set a finite number of random indexes swapped, multiplied by .2 per level of robustness 
    let indexesToSubstitute = charsToSubstitute * (r * .2);

    result = this.swapChars(indexesToSubstitute, charsToSubstitute, charsTaken, resultSplit, result);

    // // begin the swapping
    // for (let i = 0; i < indexesToSubstitute; i++){

    //   // go through result, randomly choose characters to be subbed, add chosen index to array 
    //   let randomIndex = rando(charsToSubstitute);

    //   // check if index has already been used, swap single char wth random sub option
    //   if (!isInArray(charsTaken, randomIndex)){
    //     let subArray = Substitutions[resultSplit[randomIndex]];
    //     let subArrayLength = Substitutions[resultSplit[randomIndex]].length;

    //     charsTaken.push(randomIndex);

    //     result = strReplaceChar(result, randomIndex, subArray[rando(subArrayLength)]);
        
    //   }
      
    // }
    
    console.log("result.length:", result.length);
    this.setState({ generatedResult: result });

  }

  swapChars = (indexesToSubstitute, charsToSubstitute, charsTaken, resultSplit, result) =>{
    // begin the swapping
    for (let i = 0; i < indexesToSubstitute; i++){

      // go through result, randomly choose characters to be subbed, add chosen index to array 
      let randomIndex = rando(charsToSubstitute);

      // check if index has already been used, swap single char wth random sub option
      if (!isInArray(charsTaken, randomIndex)){
        let subArray = Substitutions[resultSplit[randomIndex]];
        let subArrayLength = Substitutions[resultSplit[randomIndex]].length;

        charsTaken.push(randomIndex);

        return strReplaceChar(result, randomIndex, subArray[rando(subArrayLength)]);
        
      }
      
    }
  }

}

export default PassGen9000;
