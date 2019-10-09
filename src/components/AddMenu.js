import React, {useState,useEffect} from 'react';
import { Button, Input, Dropdown, Modal } from 'semantic-ui-react';
import perros from '../data/perros';
import Navbar from './Navbar';



const AddMenu = () => {
  const vistas = ['perro','bebida','salchicha','ingrediente']
  const [vistaActiva,setVistaActiva] = useState('perro')
  const [ingredientes,setIngredientes] = useState(null);
  const [salchicha,setSalchicha] = useState(null);
  const [nombre,setNombre] = useState(null);
  const [precio,setPrecio] = useState(null);


  const crearPerro = () => {
    var o = Object();
    o.name = nombre;
    o.price = precio;
    o.sausage = salchicha;
    o.ingredients = ingredientes;
    console.log(o);
  }
  
  return (
    <Modal trigger={<Button> Add </Button>} centered={false}>
      <Modal.Header>
        <Navbar
          vistas={vistas}
          vistaActiva={'perro'}
          rolActivo={'Agregar'}
          setVistaActiva={setVistaActiva}
        />
      </Modal.Header>

      <Modal.Content className='container-add'>
        {vistaActiva === 'perro'? 
          <div>
            <h2 className='title'>Creando Perro</h2>

            <div className='add-perro'>
              <div>
                <h2 className='subtitle'>Nombre:</h2>
                <Input focus placeholder='Nombre' className='input-add' onChange={ (event,data) => setNombre(data.value) } />
              </div>
              <div>
                <h2 className='subtitle'>Precio:</h2>
                <Input focus placeholder='Precio' className='input-add' onChange={ (event,data) => setPrecio(data.value) } />
              </div>
              <div>
                <h2 className='subtitle'>Salchicha:</h2>
                <Dropdown className="input-add" id='Dropdown-add' placeholder='Salchichas' fluid selection options={
                  perros.map((perro,j)=>{
                    var o = Object();
                    o.key = j;
                    o.text = perro.nombre;
                    o.value = perro.nombre;
                    return o;
                  })}
                  onChange={(event,data) => setSalchicha(data.value)}
                  />
              </div>
              <div>
                <h2 className='subtitle'>Ingredientes:</h2>
                <Dropdown className="input-add" id='Dropdown-add' placeholder='Ingredientes' fluid multiple selection options={
                  perros.map((perro,j)=>{
                    var o = Object();
                    o.key = j;
                    o.text = perro.nombre;
                    o.value = perro.nombre;
                    return o;
                  })}
                  onChange={(event,data) => setIngredientes(data.value)}
                />
              </div>
            </div>
            <Button className='button-add' onClick={ crearPerro } > Crear </Button>
          </div>
        : vistaActiva === 'bebida'? 'bebida' : vistaActiva === 'salchicha' ? 'salchicha' : 'ingrediente'} 
      </Modal.Content>
    </Modal>
  )
}

export default AddMenu