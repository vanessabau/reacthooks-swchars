import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

//Function 
const App = props => {
	//Array destructuring, currently named 'state' but could be named anything
	// const [state, setState] = useState({
	// 	selectedCharacter: 1,
  //   side: 'light',
  //   destroyed: false
	// })

//Set up states individually 
	const [selectedChar, setSelectedChar] = useState(1);
	const [chosenSide, setChosenSide] = useState('light');
	const [destroyed, setDestroyed] = useState(false);
	
//Function that stores the arrow function
//Function to handle side
  const sideHandler = side => {
		// setState({ ...state, side: side });
		setChosenSide(side);
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
		// setState({ ...state, selectedCharacter: charId });
		setSelectedChar(charId);
  };

  const destructionHandler = () => {
		// setState({ ...state, destroyed: true });
		setDestroyed(true);
  };

  
    let content = (
      <React.Fragment>
        <CharPicker
          side={chosenSide}
          selectedChar={selectedChar}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={selectedChar} />
        <button onClick={sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {chosenSide === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;
  
}

export default App;
