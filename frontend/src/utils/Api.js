import { apiConfig } from "./config";

export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    };

    _getHeaders() {
        return {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        };

        return Promise.reject(`Ошибка: ${res.status}`);
    };

    _get(link) {
        return fetch(`${this._baseUrl}${link}`, {
            headers: this._getHeaders(),
        })
        .then(this._checkStatus);
    };

    _post(link, method, body) {
        return fetch(`${this._baseUrl}${link}`, {
            method: method,
            headers: this._getHeaders(),
            body: JSON.stringify(body),
        })
        .then(this._checkStatus);
    };

    getInitialCards() {
        return this._get('/cards');
    };

    getUserInfo() {
        return this._get('/users/me');
    };

    editUserInfo(body) {
        return this._post('/users/me', 'PATCH', body);
    };

    editAvatar(body) {
        return this._post('/users/me/avatar','PATCH',body);
    };

    addNewCard(body) {
        return this._post('/cards', 'POST', body);
    };

    deleteCard(id) {
        return this._post(`/cards/${id}`, 'DELETE');
    };

    addLike(id) {
        return this._post(`/cards/${id}/likes`, 'PUT');
    };

    deleteLike(id) {
        return this._post(`/cards/${id}/likes`, 'DELETE');
    };
};

const api = new Api(apiConfig);

export default api;
