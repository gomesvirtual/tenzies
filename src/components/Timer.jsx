function Timer({ newRecord, tens, seconds, minutes }) {
  return ( 
      <div className="timer">
          { newRecord && <p className="record">New Record!</p> }        
          <span className="running-time">
            { 
              tens &&             
              `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}:${tens > 9 ? tens : "0" + tens}`
            }
          </span>        
      </div>
  );
}

export default Timer;