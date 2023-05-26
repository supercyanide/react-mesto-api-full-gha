const BASE_URL = 'https://api.supercyanide.nomoredomains.rocks'; //'https://c4c3-212-58-103-119.eu.ngrok.io';

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
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data
  });
};

export const signin = (email, password) => {
  return request(`signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    withCredentials: true,
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data
  });
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
};