import dice from "../dice";

function Die({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
  } 

  return (
    <div onClick={holdDice} className='tenzies-die' style={styles}>
        { dice(value) }
    </div>
  );
}

export default Die;