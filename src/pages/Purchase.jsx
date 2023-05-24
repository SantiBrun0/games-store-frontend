import React, { useEffect, useState } from 'react'
import { useContextGlobal } from '../components/utils/ContextGlobal'
import Swal from 'sweetalert2'

const Purchase = () => {

  const { cart, totalPrice, postOrder, clearCart, sellVideogame } = useContextGlobal()
  const ids = cart.flatMap((game) => Array(game.quantity).fill(game.id))

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getFormattedDate() {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
  
    return `${day}/${month}/${year}`;
  }

  const [customer, setCustomer] = useState({
    videogames: ids,
    date: getFormattedDate(),
    fullNameCustomer: '',
    dni: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      province: '',
      country: ''
    },
    mount: totalPrice
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      address: {
        ...prevCustomer.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    cart.forEach(videogame => {
      sellVideogame(videogame.id, videogame.quantity)
    });
    
    postOrder(customer)
    .then((data) => {
      Swal.fire({
        title: `${data.message}`,
        html: `Por favor guarde el tracking code: <br> ${data.trackingCode}`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'LISTO'
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart()
          window.location.replace('/')
        }
      })
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Algo ha salido mal, intente nuevamente',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        clearCart()
        window.location.replace('/')
      }, 3500)
    })

  };


  return (
    <section className='purchase'>

      <div className='resume'>
        {
          cart.map(videogame => (
            <div key={videogame.id} className='res-item'>
              <img src={videogame.images.front} alt="videogame" />
              <div className='res-data'>
                <strong>{videogame.name}</strong>
                <p>{videogame.console.name}</p>
                <p>precio por unidad: ${videogame.price}, unidades: {videogame.quantity}, subtotal: ${(videogame.price * videogame.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        }
        <strong className='total-price'>PRECIO TOTAL: ${totalPrice}</strong>
      </div>

      <form onSubmit={handleSubmit} className='form-purchase'>
        <div>
          <label htmlFor="fullNameCustomer">Nombre completo:</label>
          <input
            type="text"
            id="fullNameCustomer"
            name="fullNameCustomer"
            value={customer.fullNameCustomer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={customer.dni}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Número de teléfono:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="street">Calle:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={customer.address.street}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={customer.address.city}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div>
          <label htmlFor="province">Provincia:</label>
          <input
            type="text"
            id="province"
            name="province"
            value={customer.address.province}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">País:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={customer.address.country}
            onChange={handleAddressChange}
            required
          />
        </div>
        <button type="submit" className='btn-submit'>Confirmar compra</button>
      </form>

    </section>
  )
}

export default Purchase