class ApiAuth {
    constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
    postUser(email, password) {
      console.log(email, password)
        return fetch(`${this._baseUrl}/signup`, {
          
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            "password": `${password}`,
            "email": `${email}` 
          })
        }
        )
        .then(this._checkResponse);
      }

      authorization(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({ email, password }),
        }
        )
        .then(this._checkResponse)
         
          .catch((err)=>{
            console.log(err);
          })
      }
      checkTokenUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
        }
        )
          .then(this._checkResponse);
      }

      _checkResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
          }
          return res.json();
        }

  

  }
  
  export const apiAuth  = new ApiAuth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json" 
    },
  });