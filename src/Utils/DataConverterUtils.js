
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

  export function convertClubsForSelectComponent(clubs) {
    return clubs.map(club => ({
      value: club.id,
      label: club.clubName   

    }));
  }
 

  export function convertStatusesForSelectComponent(statuses) {
    return statuses.map(status => ({
      value: status.id,
      label: status.description   

    }));
  }

  export function convertRolesForSelectComponent(roles) {
    return roles.map(role => ({
      value: role.id,
      label: role.name   

    }));
  }

  export function convertCitiesForSelectComponent(cities) {
    return cities.map(city => ({
      value: city.id,
      label: city.name   

    }));
  }

  