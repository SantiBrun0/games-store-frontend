import React from 'react'
import { useContextGlobal } from './utils/ContextGlobal'
import { Link } from 'react-router-dom'


const Card = ({ data, addToCart }) => {

  const limitedDescription = data.description.slice(0,86) + '...'

  const { cart } = useContextGlobal()
  const productInCart = cart.filter(item => item.id === data.id)

  return (
    <article className='card'>
        <img src={data.images.front} alt="portada" className='image' />
        <div className='data-container'>
            <p className='name'>{data.name}</p>
            <p className='console'>{data.console.name}</p>
        </div>
        <p className='description'>{limitedDescription}</p>
        <Link to={`/detail/${data.id}`} className='link-ver-mas' state={data}>Ver más</Link>
        <div className='price-container'>
            <p className='price'>${data.price}</p>
            <p className='stock'>STOCK: {data.stock}</p>
        </div>
        <button 
          className={`${data.stock == 0 || productInCart[0]?.quantity == data.stock ? 'btn-disabled' : 'btn-add'}`} 
          disabled={(data.stock == 0 || productInCart[0]?.quantity == data.stock) ? true : false}
          onClick={() => addToCart(data)}
        >
            {(data.stock == 0 || productInCart[0]?.quantity == data.stock) ? "SIN STOCK" : "AGREGAR AL CARRITO"}
        </button>
    </article>
  )
}

export default Card