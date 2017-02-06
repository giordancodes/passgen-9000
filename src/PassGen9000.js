import React, { Component } from 'react';
import './passgen.css';

class PassGen9000 extends Component {
	constructor(){
		super();
		this.state={
			distinctWord: false,
			form:{
        length: 8,
				strength: 8
			}
		}
	}
  render() {
    return (
      <div className="wrapper">
        {/*<h1>PassGen 9000</h1>*/}
        <section className="intro">
      		
          <form>
            <label htmlFor="length">
              <p>length of password</p>
              <div className="range-count">
                <input   type="range"
                        min="8"
                        max="32"
                        value={ this.state.form.length }
                        onChange={ this.updateField }
                        id="length" />
                <p>{ this.state.form.length }</p>
              </div>
            </label>
            <label htmlFor="strength">
            <p>password robustness</p>
              <div className="range-count">
                <input  type="range"
                        min="8"
                        max="32"
                        value={ this.state.form.strength }
                        onChange={ this.updateField }
                        id="strength" />
                <p>{ this.state.form.strength }</p>
              </div>
            </label>

					<hr/>

          <h3>start with your own word/phrase?</h3>
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
