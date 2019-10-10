import axios from 'axios';
import salchichasData from '../data/salchichas';
import perrosData from '../data/perros';
import bebidasData from '../data/bebidas';
import ingredientsData from '../data/ingredientes';

export default class api {

    constructor(baseUrl) {
        this.baseUrl = `${baseUrl}/api`;
    }

    getSausage = async (callback) => {
        await axios.get(`${this.baseUrl}/sausage/all`)
        .then((res) => {
            callback(res.data.data);
        }).catch(() => {
            callback(salchichasData);
        })
    }

    getHotDogs = async (callback) => {
        await axios.get(`${this.baseUrl}/hotdog/all`)
        .then((res) => {
            callback(res.data.data);
        }).catch(() => {
            callback(perrosData);
        })
    }

    getDrinks = async (callback) => {
        await axios.get(`${this.baseUrl}/drink/all`)
        .then((res) => {
            callback(res.data.data);
        }).catch(() => {
            callback(bebidasData);
        })
    }

    getIngredients = async (callback) => {
        await axios.get(`${this.baseUrl}/ingredient/all`)
        .then((res) => {
            callback(res.data.data);
        }).catch(() => {
            callback(ingredientsData);
        })
    }

}