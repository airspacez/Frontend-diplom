
export function convertGameTypesForSelectComponent(gameTypes) {
    return gameTypes.map(gameType => ({
      value: gameType.id,
      label: gameType.description   

    }));
  }

  export function convertGameResultsForSelectComponent(gameResults) {
    return gameResults.map(gameResult => ({
      value: gameResult.id,
      label: gameResult.description   

    }));
  }

  export function convertGamePlacesForSelectComponent(gamePlaces) {
    return gamePlaces.map(gamePlace => ({
      value: gamePlace.id,
      label: gamePlace.description + ", " + gamePlace.address + ", " + gamePlace.city.name  

    }));
  }

 
  