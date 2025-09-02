import React, { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [redGuess, setRedGuess] = useState(0);
  const [greenGuess, setGreenGuess] = useState(0);
  const [redReal, setRedReal] = useState(0);
  const [greenReal, setGreenReal] = useState(0);
  const [guessList, setGuessList] = useState([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
  const [lightList, setLightList] = useState([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
  const [inputText, setInputText] = useState(''); 
  const [textBoxValues, setTextBoxValues] = useState([]);
  const [correctGreens, setCorrectGreens] = useState([]);
  const[showBox,setShowBox] = useState(true)

  const updateLight = (value) => {
    const num = Math.random();
    if (num < 0.7) {
     lightList[counter] = 1
      setRedReal(redReal + 1);
    } else {
      lightList[counter] = 0
      setGreenReal(greenReal + 1);
    }
  }
  function getGreenGuesses() {
    let correct = 0;
    for (let i = 0; i < guessList.length;i++) {
      if (guessList[i] === lightList[i]) {
        correct = correct + 1;
      }
    }
    return correct;
  }
  function getCounter() {
    if (counter === 0) {
      return 0;
    }
    if ((counter%20) === 0) {
      return 20;
    }
    return counter%20
  }
  function reset() {
    setCounter(0);
    setGuessList([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
    setLightList([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
    setTextBoxValues((prevTextBoxValues) => [...prevTextBoxValues, inputText])
    setCorrectGreens((prevGuessGreens)=>[...prevGuessGreens,getGreenGuesses()])
    setShowBox(true)
    setInputText('')
  }
  function getCorrect() {
    let correct = 0;
    for (let i = 0; i < guessList.length;i++) {
      if (guessList[i] === lightList[i] && lightList[i] !== -1) {
        correct = correct + 1;
      }
    }
    return correct;
  }

  function RedPress() {
    guessList[counter%20] = 0
    updateLight(0);
    setCounter(counter + 1);
    setRedGuess(redGuess + 1);

}

  function GetStarted() {
    setShowBox(false);
  }
  function GreenPress() {
    updateLight(1);
    setCounter(counter + 1);
    guessList[counter%20] = 1
    setGreenGuess(greenGuess + 1);
  }

  function handleInputChange(event) {
    setInputText(event.target.value);
  }
  const TableComponent = ({ list1, list2, list3 }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Guessing Name</th>
            <th># of Correct Guesses</th>
          </tr>
        </thead>
        <tbody>
          {list1.map((item, index) => (
            <tr key={index}>
              <td><b>{item}</b></td>
              <td><b>{list2[index]}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <div className="App">
      <div>
      <div  style={{ marginBottom: '20px' }}> 
      ` <h2>Red-Green Guessing Game</h2>
        <h4>Try and see if you can guess how often the light turns green</h4>
        {showBox && (
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Name your guessing strategy"
            style={{ width: '200px', height: '29px', marginRight: '10px', padding: '2px', fontSize:'15px' }}
          />
        )}
      </div>
      <div>
        {inputText !== "" && showBox ?  <button id ="rectangleButton" onClick={GetStarted}>Start this round</button>: ''}
      </div>
      {!showBox && ((counter%20)!==0 || counter === 0) && (
        <div>
          <button id="redButton" onClick={RedPress} style={{ marginRight: '10px' }}>Red</button>
          <button id="greenButton" onClick={GreenPress}>Green</button>
        </div>
      )}
      {counter!==0 && (counter%20)===0 ? <button id ="rectangleButton" onClick={reset}>Start the next round</button>: ''}
      <div>
        <h3>Guessed Colors</h3>
        <div className="rectangleContainer">
          {guessList.map((value, index) => (
            <li key={index}>
              {value === 0 ? <div className="rectangleRed"></div> : ''}
              {value === 1 ? <div className="rectangleGreen"></div> : ''}
              {value === -1 ? <div className="rectangleGrey"></div> : ''}
            </li>
          ))}
        </div>
        <h3>Actual Colors</h3>
          <div className="rectangleContainer">
            {lightList.map((value, index) => (
              <li key={index}>
                {value === 0 ? <div className="rectangleRed" ></div> : ''}
                {value === 1 ? <div className="rectangleGreen"></div> : ''}
                {value === -1 ? <div className="rectangleGrey"></div> : ''}
              </li>
            ))}
          </div>
        <div>
          <h4>Total Guesses: {getCounter()}</h4>
          <h4>Total Correct: {getCorrect()}</h4>
          <h4>Percentage Correct: {(getCorrect()/getCounter())*100}</h4>
        </div>
        <div align='center'>
          <TableComponent list1={textBoxValues} list2={correctGreens}/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;

