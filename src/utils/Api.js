import { apiConfig } from "./constants";

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers['authorization'];
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => this._checkResponse(res))
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => this._checkResponse(res))
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.bio
            })
        })
            .then((res) => this._checkResponse(res))
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => this._checkResponse(res))
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link,
            })
        })
            .then((res) => this._checkResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }

    putCardLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }

    deleteCardLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }

    getInitialData() {
        return Promise.all([this.getInfo(), this.getInitialCards()]);
      }
}

const api = new Api(apiConfig)
export {api}