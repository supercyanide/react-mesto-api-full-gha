const BASE_URL = 'https://da9f-212-58-103-119.eu.ngrok.io'; // 'https://api.supercyanide.nomoredomains.rocks';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse)
}

export const signup = ({ password, email }) => {
  return request(`signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  .then((data) => data);
};

export const signin = (email, password) => {
  return request(`signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  .then((data) => data);
};

export const checkToken = (token) => {
  return request(`users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(data => { return data })
};