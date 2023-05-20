class DataAccessService
{
    async getSimpleStatistics() {
        var response = await fetch('http://localhost:8080/statisticsTest', {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getSimpleStatisticsById(id) {
        var response = await fetch(`http://localhost:8080/getUserStatistics/${id}`, {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getUserData() {
        var response = await fetch('http://localhost:8080/getUserData', {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getUserDataById(id) {
        var response = await fetch(`http://localhost:8080/getUserData/${id}`, {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getUserLastGames() {
        var response = await fetch('http://localhost:8080/getLastGames', {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getUserLastGamesById(id) {
        var response = await fetch(`http://localhost:8080/getLastGames/${id}`, {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getGameDetailsById(id) {
        var response = await fetch(`http://localhost:8080/games/${id}`, {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        return data;
    }

    async getarchiveGames(page, count) {
        var response = await fetch(`http://localhost:8080/archive?page=${page}&count=${count}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        return data;
    }

    async getarchiveGamesByFilter(day, month, year, placeId, resultId, typeId, page, count) {
        var filterString = ""
        if (!isNaN(day) && day != null && day != undefined)
        {
            filterString += `&day=${day}`;
        }
        if (!isNaN(month) && month != null && month != undefined)
        {
            filterString += `&month=${month}`;
        }
        if (!isNaN(year) && year != null && year != undefined)
        {
            filterString += `&year=${year}`;
        }
        if (placeId != -1 && placeId != undefined )
        {
            filterString += `&placeId=${placeId}`;
        }
        if (resultId != -1 && resultId != undefined)
        {
            filterString += `&gameResult=${resultId}`;
        }
        if (typeId != -1 && typeId != undefined)
        {
            filterString += `&typeId=${typeId}`;
        }
        console.log(filterString);
        var response = await fetch(`http://localhost:8080/archive/test?page=${page}&count=${count}` + filterString, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getUsersBySearchString(searchString, page, count) {
        var search = "";
        if (searchString.length > 0)
        {
            search += `&searchString=${searchString}`;
        }
       
        console.log(search);
        var response = await fetch(`http://localhost:8080/users?page=${page}&count=${count}` + search, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getUserRatingsBySearchString(searchString, page, count) {
        var search = "";
        if (searchString.length > 0)
        {
            search += `&searchString=${searchString}`;
        }
       
        console.log(search);
        var response = await fetch(`http://localhost:8080/ratings?page=${page}&count=${count}` + search, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        var data = await response.json();
        console.log(data);
        return data;
    }

    async getGameTypes() {
        var response = await fetch(`http://localhost:8080/gameTypes`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        return data;
    }

    async getGameResults() {
        var response = await fetch(`http://localhost:8080/gameResults`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        return data;
    }


    


    async getGamePlaces() {
        var response = await fetch(`http://localhost:8080/gamePlaces`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        return data;
    }

    
}

export default new DataAccessService();