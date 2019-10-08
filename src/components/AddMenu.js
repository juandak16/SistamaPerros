import React, {useState,useEffect} from 'react'
import { Button, Form, Checkbox, Image, Modal, Divider } from 'semantic-ui-react'
import Navbar from './Navbar';

const AddMenu = () => {
  const vistas = ['perro','bebida','salchicha','ingrediente']
  const [vistaActiva,setVistaActiva] = useState('perro')
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

      <Modal.Content>
        {vistaActiva === 'perro'? 
        
        <div className='add-perro'>
          


        </div>
        
        
        : vistaActiva === 'bebida'? 'bebida' : vistaActiva === 'salchicha' ? 'salchicha' : 'ingrediente'} 
      </Modal.Content>
    </Modal>
  )
}

export default AddMenu