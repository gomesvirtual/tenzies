function dice(value) {

  let face = '';
  switch (value) {  
    case 1:
      face = <div className="dice first-face">
        <span className="dot"></span>
      </div>;
      break;
    case 2:
      face = <div className="dice second-face">
        <span className="dot"></span>
        <span className="dot"></span>
      </div>;
      break;
    case 3:
      face = <div className="dice third-face">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>;
      break;
    case 4:
      face = <div className="dice fourth-face">
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>;
      break;
    case 5:
      face = <div className="dice fifth-face">  
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>      
        <div className="column">
          <span className="dot"></span>
        </div>      
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>    
      </div>;
      break;
    case 6:
      face = <div className="dice sixth-face">
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="column">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>    
      </div>;
      break;    
  }
  return face;
}

export default dice;