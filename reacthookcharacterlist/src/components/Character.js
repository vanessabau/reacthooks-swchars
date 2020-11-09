//Using the fetch method in the component
import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = props => {
	// state = { loadedCharacter: {}, isLoading: false };
	const [loadedCharacter, setLoadedCharacter] = useState({});
	const [isLoading, setIsLoading] = useState(false);

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

	
  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

	// useEffect(() => {fetchData()}, [])
  // componentDidMount() {
  //   this.fetchData();
	// }
	
	//runs initially and then whenever the selected Character changes we fetch data
	useEffect(() => {
		fetchData();
		return () => {
			console.log('Cleaning up...');
		}}, [props.selectedChar]);

	//convert to constant that holds a function
  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
      	props.selectedChar
    );
		// this.setState({ isLoading: true });
		setIsLoading(true);
    fetch('https://swapi.dev/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
				};
				setIsLoading(false);
				setLoadedCharacter(loadedCharacter);
        // this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
      })
      .catch(err => {
				console.log(err);
				setIsLoading(false);
      });
  };

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  //Render was here
    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  
}

//Optional function
export default React.memo(Character, (prevProps, nextProps)=>{
	return (
		    nextProps.selectedChar === prevProps.selectedChar 
		  );
});
