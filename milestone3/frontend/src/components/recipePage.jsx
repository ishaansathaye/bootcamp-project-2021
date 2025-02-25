import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './recipePage.css';

export default function RecipePage({name, desc, image, ingredients, steps}) {

  const [newIngredient, setNewIngredient] = React.useState('');
  // const [ingredientAdd, setIngredientAdd] = useState('');
  const [newInstruction, setNewInstruction] = React.useState('');
  // const [instructionAdd, setInstructionAdd] = useState('');

  let addIngredient = () => {
    fetch(`http://localhost:3001/api/recipe/${name}/ingredients`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        method: 'PUT',
        body: JSON.stringify({newIngredient: newIngredient})
      }).then(response => response.json())
      .then(jsondata => setNewIngredient(jsondata))
  
    let ul = document.getElementById("ingredients");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(newIngredient));
    ul.appendChild(li);
}

  let addInstruction = () => {
      fetch(`http://localhost:3001/api/recipe/${name}/instructions`, {
          headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({newInstruction: newInstruction})
        }).then(response => response.json())
        .then(jsondata => setNewInstruction(jsondata))
      
      let ol = document.getElementById("instructions");
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(newInstruction));
      ol.appendChild(li);
  }

  return (
    <main>
    <div>
      <section>
        <div className="flex-container">
          <div className="flex-header">
            <h2 id="name">{name}</h2>
            <p id="info">{desc}</p>
          </div>
          <img id="image" className="flex-image" src={image} alt="recipe pic" />
        </div>
      </section>
      <section >
        <h3>Ingredients</h3>
        <ul id="ingredients">
          {ingredients.map(function(name, index){
            return <li key={index}>{name}</li>;
          })}
        </ul>
        <div> 
          <h4> Add an Ingredient</h4>
            <label>Ingredient: </label>
            <input 
              id="newIngredient" 
              className="form-element" 
              placeholder="Enter here" 
              value={newIngredient}
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
            /> <br /> <br />
          <button className="form-button" onClick={addIngredient}>Add</button>
        </div>
        </section>
        <section>
        <h3>Instructions</h3>
        <ol id="instructions">
          {steps.map(function(name, index){
            return <li key={index}>{name}</li>;
          })}
        </ol>
        <div className="form-group"> 
          <h4> Add an Instruction</h4>
            <div className="vertical-align">
              <label>Ingredient: </label>
              <input 
                id="newInstruction" 
                className="form-element" 
                placeholder="Enter here" 
                value={newInstruction}
                onChange={(e) => {
                  setNewInstruction(e.target.value);
                }}
              /> <br /> <br />
            </div>
          <button className="form-button" onClick={addInstruction}>Add</button>
        </div>
      </section>
    </div>
    </main>
  );
}