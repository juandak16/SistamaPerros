import React from 'react';
import axios from 'axios';

import perros from '../data/perros';

export default class PerroList extends React.Component {
    state = {
        perros: [],
        bandera: false,
    };
    componentDidMount() {
        this.getPerros();
    }
    getPerros = async () => {
      try {
        let res = await axios.get("https://pokeapi.co/api/v2/pokemon/")
        let data = res.data;
        console.log(data);
        this.setState({ perros: data });
      } catch(error) {
        console.log("error", error);
      }
    };

  render() {
    return (
      <div>
        <button onClick={() => this.setState({bandera: !this.state.bandera})} >CAMBIO</button>
        {perros.map((perro, i) => {
          return <h2>perro: {perro.nombre}</h2>
        })}
        {/* {this.state.perros.length === 0 ? (
          <div>Loading...</div>
          ) : (
            this.state.perros.results.map((e, i) => {
              return <div key={i}>{e.name}</div>;
            })
            )} */}
      </div>
    )
  }

}


/*
import React from 'react';
import axios from 'axios';

export default class DrinksApi extends React.Component {
    state = {
      bebidas: []
    };
    componentDidMount() {
      this.getBebidas();
    }
    getBebidas = async () => {
      try {
        let res = await axios.get("https://pokeapi.co/api/v2/pokemon/")
        let data = res.data;
        this.setState({ bebidas: data.results });
      } catch(error) {
        console.log("error", error);
      }
    };

  render() {
    return (
      <div>
        {this.state.bebidas.map((bebida,i) => {
          return bebida.name
        })}
      </div>
    )
  }

}*/