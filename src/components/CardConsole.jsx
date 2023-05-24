import React from 'react'

const CardConsole = ({ data }) => {

  const limitedDescription = data.description.slice(0,90) + '...'

  return (
    <article className='card'>
        <img src={data.images.front} alt="portada" className='image' />
        <div className='data-container'>
            <p className='name'>{data.name}</p>
        </div>
        <p className='description'>{limitedDescription}</p>
        <div className='price-container'>
            <p className='price'>${data.price}</p>
            <p className='stock'>STOCK: {data.stock}</p>
        </div>
        <button 
          className={`${data.stock == 0 ? 'btn-disabled' : 'btn-add'}`} 
          disabled={(data.stock == 0) ? true : false}
        >
            {(data.stock == 0) ? "SIN STOCK" : "AGREGAR AL CARRITO"}
        </button>
    </article>
  )
}

export default CardConsole