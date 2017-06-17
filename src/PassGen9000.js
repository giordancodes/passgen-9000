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
				strength: 3,
				distinct: ""
			},
			aesthetic: false,
			aestheticDesc: "words",
			lengthDesc: [null ,"medium"],
			strengthDesc: [null ,"medium"],
			generatedResult: null,
			error: null,
			currentStep: 1,
			vanillaResult: null,
			dLength: 0
		}
	}

	render() {
		return (
			<div className="full-page">
				<Heading />
				<div className="wrapper">
					<section className="intro">
						
						<PassGenForm  updateField={ this.updateField }
													updateCheck={ this.updateCheck }
													genPass={ this.genPass }
													form={ this.state.form }
													strengthDesc={ this.state.strengthDesc }
													lengthDesc={ this.state.lengthDesc }
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
		let r = this.state.form.strength;
		this.introAnimation();
		this.updateDesc();
		this.setState({ indexesToSubstitute: Math.floor(l * (r * .12)) })
	}

	introAnimation(){
		setTimeout(() => { document.getElementById("title").style.fontSize = "9vw" }, 500);
		setTimeout(() => { document.getElementById("title").style.height = "2vw" }, 500);
		setTimeout(() => { document.getElementById("title").style.padding = "42px 0" }, 500);
		// inputs
		setTimeout(() => { document.getElementById("pass-gen-form").style.opacity = "1" }, 500);
	}

	updateField = (e) =>{
		let form = this.state.form;
		form[e.target.id] = e.target.value;
		let dLength = this.state.form.distinct.length;
		let l = this.state.form.length;
		let r = this.state.form.strength;

		this.updateDesc();

		// set a finite number of random indexes swapped, multiplied by .2 per level of strength 
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
		let lengthDesc = this.state.lengthDesc;
		let strengthDesc = this.state.strengthDesc;
		let strengthCalc = this.state.strengthCalc;
		let r = this.state.form.strength;
		let l = this.state.form.length;

		lengthDesc[0] = l;
		strengthDesc[0] = `${r * 20}`;

		for (let property of lengthDesc) {
			if (property < 12) {
				lengthDesc[1] = "weak";
			} else if (property > 11 && property < 20) {
				lengthDesc[1] = "medium";
			} else if (property > 19) {
				lengthDesc[1] = "strong";
			}
		}
		
		for (let property of strengthDesc) {
			if (property <= 40) {
				strengthDesc[1] = "weak";
			} else if (property >= 41 && property <= 79) {
				strengthDesc[1] = "medium";
			} else if (property >= 80 && property <= 99) {
				strengthDesc[1] = "strong";
			} else if (property == 100) {
		//  no password can truly be 100% effective
				strengthDesc = [99, "strong"];
			}
		}

		// switch(true) {
		// 	case l < 12:
		// 		lengthDesc[1] = "weak";
		// 		break;
		// 	case r < 2:
		// 		strengthDesc[1] = "weak";
		// 		break;
		// 	case r === 2 || r === 3:
		// 	case (l > 11 && l < 20):
		// 		strengthDesc[1] = "medium";
		// 		break;
		// 	case r === 4 || l > 19:
		// 		strengthDesc[1] = "strong";
		// 		break;
		// 	case r === 5:
		// 		break;
		// }

		this.setState({ strengthDesc, lengthDesc });
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
		r = this.state.form.strength;
		distinct = slugify(this.state.form.distinct);
		a = this.state.aesthetic;
		let indexesToSubstitute = this.state.indexesToSubstitute;
		let adjLength = SeedWords["sfw-adj"].length;
		let nounLength = SeedWords["sfw-noun"].length;
		let specialsLength = Substitutions["specials"].length;
		orig = this.state.vanillaResult;

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
