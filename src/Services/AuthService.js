export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUserId';
 class AuthenticationService {


    static async login(Username, Password) {
       let formData = new FormData()
       formData.append("username",Username)
       formData.append("password",Password)
       return fetch('http://localhost:8080/auth', {
           method: 'post',
           credentials: 'include',
           headers: {
           },
           
           body: formData
       },
       {
           withCredentials: true,
       }
       ).catch(reason => console.log(reason));
   }


   static registerSuccessfulLogin(id) {
       sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, id)
   }

   
   static async logout() {
       
       var response = await fetch('http://localhost:8080/logout', 
           {
               method: 'post',
               credentials: 'include',
           }
           );
           if (response.ok)    
           {
               console.log("Success logout!");
           }
           else
           {
               console.log(response.status);
           }
      
   }

   static async isUserLoggedIn() {
    var response = await fetch('http://localhost:8080/isUserLoggedIn', {
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
            
        var data = await response.json();
        
        return data;
  }
  

  
}


export default AuthenticationService