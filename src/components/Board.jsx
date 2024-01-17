import Die from "./Die";
import Timer from "./Timer";

function Board(props) {
  const diceElements = props.dice.map((die) => 
     <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => props.holdDice(die.id)} />
  )

  const { newRecord, tens, seconds, minutes } = props;

  return ( 
    <>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='tenzies-dice'>{ diceElements }</div>
      <button onClick={props.handleRollDice} className="tenzies-btn">{!props.tenzies ? "Roll" : "New Game"}</button>
      { !props.tenzies && <button onClick={props.resetGame} className="reset-game">Reset</button> }
      <Timer newRecord={newRecord} tens={tens} seconds={seconds} minutes={minutes} tenzies={props.tenzies}/>
      { props.rolls > 0 && <div className="rolls">{props.rolls > 1 ? `${props.rolls} Rolls` : `${props.rolls} Roll`}</div> }     
    </>
  );
}

export default Board;