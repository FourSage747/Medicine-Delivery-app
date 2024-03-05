import css from './Css.module.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts } from "./redux/Reducer";
import { useState } from "react";
import Notiflix from 'notiflix';
import { postShoppingThunk } from "./redux/thunk";
import { RotatingLines } from 'react-loader-spinner'

export const ShoppingCart = () => {
  const {isLoading} = useSelector(state => state)
  const {shopping} = useSelector(state => state)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address } = formData;
    if (!name||!email||!phone||!address||shopping.length === 0) {
      Notiflix.Notify.failure('Each field must be filled in and at least one product must be selected')
    }
    else {
      const newShopping = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        shopping: shopping.map(item => ({
          name: item.name,
          price: item.price
        }))
      }
      dispatch(postShoppingThunk(newShopping))
      .unwrap()
      .then(()=>Notiflix.Notify.success('Your order has been accepted'))
      .catch(()=>Notiflix.Notify.failure('Some error'))
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      })
    }
  };

  const handleRemove = (id) => {
      dispatch(deleteProducts(id))
  }

  const totalPrice = shopping.reduce((total, el) => total + parseFloat(el.price), 0);
  const formattedPrice = totalPrice.toFixed(2);

  return (
    <div className={css.shoppingBlock}>
      {!isLoading && <div className={css.shoppingCart}>
        <form className={css.form}>
          <h2>Enter your details</h2>
          <span>Name</span><br />
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
          />
          <br />
          <span>Email</span><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
          />
          <br />
          <span>Phone</span><br />
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Phone" 
          />
          <br />
          <span>Address</span><br />
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="Address" 
          />
        </form>
        
          <ul className={css.shoppingUl}>
            {shopping.map(el => {
              return (
                <li className={css.shopItem} key={el._id} id={el._id}>
                  <span>{el.name}</span><br />
                  <p>price: ${el.price}</p><br />
                  <button className={`${css.button} ${css.buttonRemove}`} type="button" onClick={() => handleRemove(el._id)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        
      </div>}
      {!isLoading && <div className={css.submit}>
        {shopping.length > 0 && <div>Total Price: ${formattedPrice}</div>}
        <button className={`${css.button} ${css.buttonSubmit}`} type="submit" onClick={handleSubmit}>Submit</button>
      </div>}
       {isLoading && <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />}
    </div>
  );
  };