import axios from "axios";
import salchichasData from "../data/salchichas";
import perrosData from "../data/perros";
import bebidasData from "../data/bebidas";
import ingredientsData from "../data/ingredientes";
import billsData from "../data/pedidos";

export default class api {
                 constructor(baseUrl) {
                   this.baseUrl = `${baseUrl}/api`;
                 }

                 //Sausage
                 getSausage = async callback => {
                   await axios
                     .get(`${this.baseUrl}/sausage/all`)
                     .then(res => {
                       console.log("salchichas api");
                       callback(res.data.data);
                     })
                     .catch(() => {
                       console.log("salchichas data");
                       callback(salchichasData);
                     });
                 };

                 postSausage = async data => {
                   try {
                     await axios.post(`${this.baseUrl}/sausage/store`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 deleteSausage = async id => {
                   try {
                     await axios.delete(`${this.baseUrl}/sausage/delete/${id}`);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 putSausage = async (data, id) => {
                   try {
                     await axios.put(`${this.baseUrl}/sausage/update/${id}`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 //HotDog
                 getHotDogs = async callback => {
                   await axios
                     .get(`${this.baseUrl}/hotdog/all`)
                     .then(res => {
                       console.log("perros api");
                       callback(res.data.data);
                     })
                     .catch(() => {
                       console.log("perros data");
                       callback(perrosData);
                     });
                 };

                 postHotDogs = async data => {
                   try {
                     await axios.post(`${this.baseUrl}/hotdog/store`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 deleteHotDogs = async id => {
                   try {
                     await axios.delete(`${this.baseUrl}/hotdog/delete/${id}`);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 putHotDogs = async (data, id) => {
                   try {
                     await axios.put(`${this.baseUrl}/hotdog/update/${id}`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 //Drink
                 getDrinks = async callback => {
                   await axios
                     .get(`${this.baseUrl}/drink/all`)
                     .then(res => {
                       console.log("bebidas api");
                       callback(res.data.data);
                     })
                     .catch(() => {
                       console.log("bebidas data");
                       callback(bebidasData);
                     });
                 };

                 postDrinks = async data => {
                   try {
                     await axios.post(`${this.baseUrl}/drink/store`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 deleteDrinks = async id => {
                   try {
                     await axios.delete(`${this.baseUrl}/drink/delete/${id}`);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 putDrinks = async (data, id) => {
                   try {
                     await axios.put(`${this.baseUrl}/drink/update/${id}`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 //Ingrediente
                 getIngredients = async callback => {
                   await axios
                     .get(`${this.baseUrl}/ingredient/all`)
                     .then(res => {
                       console.log("ingredientes api");
                       callback(res.data.data);
                     })
                     .catch(() => {
                       console.log("ingredientes data");
                       callback(ingredientsData);
                     });
                 };

                 postIngredients = async data => {
                   try {
                     await axios.post(`${this.baseUrl}/ingredient/store`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 deleteIngredients = async id => {
                   try {
                     await axios.delete(`${this.baseUrl}/ingredient/delete/${id}`);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 putIngredients = async (data, id) => {
                   try {
                     await axios.put(`${this.baseUrl}/ingredient/update/${id}`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };

                 //Pedidos
                 getBills = async callback => {
                   await axios
                     .get(`${this.baseUrl}/bill/all`)
                     .then(res => {
                       console.log("pedidos api");
                       callback(res.data.data);
                     })
                     .catch(() => {
                       console.log("pedidos data");
                       callback(billsData);
                     });
                 };

                 postBills = async data => {
                   try {
                     await axios.post(`${this.baseUrl}/bill/store`, data);
                   } catch (e) {
                     throw new Error(e);
                   }
                 };
                 //Reporte
                 getReports = async callback => {
                   await axios
                     .get(`${this.baseUrl}/report/alltime`)
                     .then(res => {
                       console.log("reporte api");
                       callback(res.data.data);
                     })
                     .catch(() => {
                       console.log("reporte data");
                       //callback(billsData);
                     });
                 };
               }

               

