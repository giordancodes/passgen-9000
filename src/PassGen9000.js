import React, { Component } from 'react';

import SeedWords from './SeedWords.json';
import Substitutions from './Substitutions.json';

import PassGenForm from './PassGenForm';
import Generated from './Generated';
import Heading from './Heading';
import Error from './Error';

import { slugify, rando, isLetter } from './Helpers';

import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			chooseDistinctWord: false,
			form:{
        length: 22,
				robustness: 3,
        aesthetic: "words",
        distinct: ""
			},
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
                          updateRadio={ this.updateRadio }
                          genPass={ this.genPass }
                          form={ this.state.form }
                          robustnessDesc={ this.state.robustnessDesc }
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

  componentWillMount() {
  }

  componentDidMount() { 
    this.updateDesc();
    this.introAnimation();
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

    this.setState({form});
  }

  updateRadio = (e) =>{
    let aesthetic = this.state.form.aesthetic;
    // form[e.target.checked] = e.target.value;
    console.log(aesthetic[e.target.value]);
    // { 
    //   form.aesthetic === "words" ? 
    //   form.aesthetic = "characters"
    //   : form.aesthetic = "words"
    // }

    this.setState({aesthetic});
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
    this.setState({ currentStep });
  }

  prev = (e) =>{
    e.preventDefault();

    let currentStep = this.state.currentStep - 1;
    if (currentStep < 1){
      currentStep = 1;
    }
    this.setState({ currentStep });
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


    // go through result, randomly choose chars to be subbed
    for (let i = 0; i < resultSplit.length; i++){
      console.log(resultSplit[i]);
    }

    console.log(result, result.length);
    this.setState({ generatedResult: result });

  }

}

export default PassGen9000;
