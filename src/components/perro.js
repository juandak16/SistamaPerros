import React, {useEffect, useState} from 'react';

const Perro = (props) => {
    
    const [salsita, setSalsita] = useState('tomate');

    useEffect(() => {
        console.log('montado')
        return () => console.log('desmontado')
    })

    return (
        <h1>PERRITO {salsita}</h1>
    );
}
 
export default Perro;

sfc