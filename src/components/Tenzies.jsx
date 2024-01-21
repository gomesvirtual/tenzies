import { useEffect, useState } from "react";
import Board from "./Board";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import fireworksSoundAsset from '../sounds/fireworks.wav'
import clickSoundAsset from '../sounds/click.wav'

const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.2;
const fireworksSound = new Audio(fireworksSoundAsset);
fireworksSound.volume = 0.2;

function Tenzies() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(true);
  const [rolls, setRolls] = useState(0);
  const [tens, setTens] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [newRecord, setNewRecord] = useState(false);

  
  function generateNewDie() {
    return { 
      id: nanoid(),
      value: Math.ceil(Math.random() * 6), 
      isHeld: false       
    }
  }

  function allNewDice() {
    const newDice = []; 
    for (let index = 0; index < 10; index++) {      
      newDice.push(generateNewDie());
    }
    return newDice;
  }  

  function handleRollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => !die.isHeld ? generateNewDie() : die));
      setRolls(roll => roll + 1);
    } else {
      resetGame();
    }    
  }

  function resetGame() {
    setDice(allNewDice());
    setTenzies(false);
    setRolls(0);
    setMinutes(0);
    setSeconds(0);
    setTens(null);
    setNewRecord(false);
  }

  function holdDice(id) {
    if (tenzies) {
      return
    }
    clickSound.play();
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
    }))
  }

  useEffect(() => {
    const allTheSame = dice.every(die => die.value === dice[0].value && die.isHeld);
    allTheSame && setTenzies(true); 
  }, [dice])


  useEffect(() => {
    const interval = setInterval(() => {
      !tenzies && setTens(timeGame => timeGame + 1);
    }, 10)
    return () => clearInterval(interval);
  }, [tens, tenzies])

  if (tens > 99) {
    setSeconds(sec => sec + 1);
    setTens(0);    
  }

  if (seconds > 59) {
    setMinutes(min => min + 1);
    setSeconds(0);
    setTens(0);
  } 
  
  const topScores = JSON.parse(localStorage.getItem('topScores')) || [];

  if (tenzies && tens && !newRecord) { 
    let stringTime = minutes > 9 ? minutes : "0" + minutes;
    stringTime += seconds > 9 ? ":" + seconds : ":0" + seconds;
    stringTime += tens > 9 ? ":" + tens : ":0" + tens;

    const timeMill = Number(stringTime.replaceAll(":",""));

    if (topScores.every(ts => ts.timeMill > timeMill)) {
      setNewRecord(true);
      fireworksSound.play();
    }
    if (topScores.length === 5 && topScores.some(ts => ts.timeMill > timeMill)) {
      topScores.pop();
    }

    if (topScores.length < 5) { 
      topScores.push({ stringTime, timeMill });
      const sortedTimes = topScores.sort((a, b) => a.timeMill - b.timeMill);      
      localStorage.setItem("topScores", JSON.stringify(sortedTimes));
    }    
  } 
  
  const showTopScores = topScores.map(ts => <li>{ts.stringTime}</li>);

  return ( 
    <>
      <main className='tenzies-main'>
        {
          topScores.length > 0 && 
          <ul className="top-scores">
            <li>Top Scores</li>
              {showTopScores}
          </ul>
        }      
        <Board dice={dice} holdDice={holdDice} handleRollDice={handleRollDice} tenzies={tenzies} tens={tens} seconds={seconds} minutes={minutes} newRecord={newRecord} rolls={rolls} resetGame={resetGame} />        
      </main>   
      {newRecord && <Confetti />}
    </> 
  );
}

export default Tenzies;