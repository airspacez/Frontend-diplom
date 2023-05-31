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

    async getEvents() {
        var response = await fetch(`http://localhost:8080/events`, {
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

    async patchUserData(userId, updates)
    {
        var response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'PATCH',
            credentials:'include',
            headers: {
                
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            
            
        return true;

    }

    async patchEvent(userId, updates)
    {
        var response = await fetch(`http://localhost:8080/events/${userId}`, {
            method: 'PATCH',
            credentials:'include',
            headers: {
                
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            
            
        return true;

    }

    async patchUserInEvent(userId,eventId, updates, signal)
    {
        var response = await fetch(`http://localhost:8080/usersInEvents/${userId}/${eventId}`, {
            method: 'PATCH',
            credentials:'include',
            headers: {
                
              'Content-Type': 'application/json',
            },
            signal:signal,
            body: JSON.stringify(updates),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            
            
        return true;

    }

    async postUserInEvent(userId,eventId, updates, signal)
    {
        var response = await fetch(`http://localhost:8080/usersInEvents/${userId}/${eventId}`, {
            method: 'POST',
            credentials:'include',
            headers: {
                
              'Content-Type': 'application/json',
            },
            signal:signal,
            body: JSON.stringify(updates),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            
            
        return true;

    }

    async deleteUserInEvent(userId,eventId, signal)
    {
        var response = await fetch(`http://localhost:8080/usersInEvents/${userId}/${eventId}`, {
            method: 'DELETE',
            credentials:'include',
            headers: {
                
              'Content-Type': 'application/json',
            },
           signal:signal
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            
            
        return true;

    }


    
    
    async patchClubData(clubId, updates)
    {
        var response = await fetch(`http://localhost:8080/clubs/${clubId}`, {
            method: 'PATCH',
            credentials:'include',
            headers: {
                
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            
            
        return true;

    }

    async patchPlaceData(placeId, updates)
    {
        var response = await fetch(`http://localhost:8080/places/${placeId}`, {
            method: 'PATCH',
            credentials:'include',
            headers: {
                
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            
            
        return true;

    }




    async getUserDataById(id, signal) {
        var response = await fetch(`http://localhost:8080/getUserData/${id}`, {
            credentials: 'include',
            signal: signal, // Передаем сигнал от AbortController
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

    async getClubs() {
        var response = await fetch(`http://localhost:8080/clubs`, {
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

    async getStatuses() {
        var response = await fetch(`http://localhost:8080/statuses`, {
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

    async getAllUserRoles() {
        var response = await fetch(`http://localhost:8080/roles`, {
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

    async getCities() {
        var response = await fetch(`http://localhost:8080/cities`, {
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


    async getClubs() {
        var response = await fetch(`http://localhost:8080/clubs`, {
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



    async getClubEntityById(clubId, signal) {
        var response = await fetch(`http://localhost:8080/clubs/${clubId}`, {
            credentials: 'include',
            signal:signal,
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

    async getGamePlaces(page, count) {
        var response = await fetch(`http://localhost:8080/places?page=${page}&count=${count}`, {
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

    async getPlaceEntityById(placeId,signal) {
        var response = await fetch(`http://localhost:8080/places/${placeId}`, {
            credentials: 'include',
            signal: signal, // Передаем сигнал от AbortController
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

    async isPlaceHasAnyGamesById(placeId,signal) {
        var response = await fetch(`http://localhost:8080/places/${placeId}/hasAnyGames`, {
            credentials: 'include',
            signal: signal, // Передаем сигнал от AbortController
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

    async isClubHasAnyUsersById(clubId,signal) {
        var response = await fetch(`http://localhost:8080/clubs/${clubId}/hasAnyUsers`, {
            credentials: 'include',
            signal: signal, // Передаем сигнал от AbortController
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

    async deletePlaceById(placeId) {
        var response = await fetch(`http://localhost:8080/places/${placeId}`, {
            method:'DELETE',
            credentials: 'include',
           
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
       
        return true;
    }

    async deleteEventById(eventId) {
        var response = await fetch(`http://localhost:8080/events/${eventId}`, {
            method:'DELETE',
            credentials: 'include',
           
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
       
        return true;
    }


    async deleteClubById(clubId) {
        var response = await fetch(`http://localhost:8080/clubs/${clubId}`, {
            method:'DELETE',
            credentials: 'include',
           
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
       
        return true;
    }

    async addPlace(data) {
        console.log(data);
        var response = await fetch(`http://localhost:8080/places`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
       
        return true;
    }

    async addEvent(data) {
        console.log(data);
        var response = await fetch(`http://localhost:8080/events`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var result = await response.json();
        return result;
    }
    
    async addClub(data) {
        console.log(data);
        var response = await fetch(`http://localhost:8080/clubs`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            console.log(response);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
       console.log(response);
        var data = await response.json();
        return data;
    }


    async getEventById(eventId,signal) {
        var response = await fetch(`http://localhost:8080/events/${eventId}`, {
            credentials: 'include',
            signal: signal, // Передаем сигнал от AbortController
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



    async isLoggedUserRegisteredInEventById(eventId,signal) {
        var response = await fetch(`http://localhost:8080/events/${eventId}/isLoggedUserRegistered`, {
            credentials: 'include',
            signal: signal, // Передаем сигнал от AbortController
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