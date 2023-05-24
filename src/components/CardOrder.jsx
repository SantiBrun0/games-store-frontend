import React from 'react'

const CardOrder = ({ data }) => {
  return (
    <article className='card-order'>
        <p>{data.date}</p>
        <p>{data.fullNameCustomer}</p>
        <p>{data.dni}</p>
        <p>{data.phoneNumber}</p>
        <p>{data.address.street}, {data.address.city}, {data.address.province}, {data.address.country}</p>
        <ul>
            {
                data.videogames.map((game, index) => (
                    <li key={index}>{game.name}, {game.console.name}</li>
                ))
            }
        </ul>
    </article>
  )
}

export default CardOrder