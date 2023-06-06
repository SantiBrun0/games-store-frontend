import React from 'react'

const CardOrder = ({ data }) => {
  console.log(data);
  return (
    <article className='card-order'>
        <p>FECHA: {data.date}</p>
        <p>TITULAR: {data.fullNameCustomer}</p>
        <p>DNI: {data.dni}</p>
        <p>TELEFONO: {data.phoneNumber}</p>
        <p>DIRECCION: {data.address.street}, {data.address.city}, {data.address.province}, {data.address.country}</p>
        <p>DETALLE DE ORDEN:</p>
        <ul>
            {
                data.videogames.map((game, index) => (
                    <li key={index}>{game.name}, {game.console.name}</li>
                ))
            }
        </ul>
        <p>MONTO TOTAL: ${data.mount}</p>
        <p>ESTADO: EN PROGRESO - un operador se comunicará para proceder con el pago y el envío del pedido</p>
    </article>
  )
}

export default CardOrder