import css from './Css.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "./redux/thunk";
import { deleteProducts, shoppingCart } from "./redux/Reducer";
import { RotatingLines } from 'react-loader-spinner'

export const Shop = () => {
    const {isLoading} = useSelector(state => state)
    const {products} = useSelector(state => state)
    const {shopping} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getProductsThunk())
      .unwrap()
      .then((data)=>console.log(data))
      .catch((err)=>console.log(err))
    },[dispatch])

    const handleAdd = (id) => {
      const item = products.find(product => product._id === id)
      const isInCart = shopping.some(item => item._id === id);
      if (isInCart) {
        dispatch(deleteProducts(id))
      }
      else {
        dispatch(shoppingCart(item))
      }
    }
    return (
      <div className={css.shopBlock}>
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
        {!isLoading && products && products.length > 0 && (
          <ul className={css.shopList}>
            {products.map(el => {
              const isInCart = shopping.some(item => item._id === el._id);
              return (
                <li className={css.shopItem} key={el._id} id={el._id}>
                  <span>{el.name}</span><br />
                  <p>price: ${el.price}</p><br />
                  <button className={`${css.button} ${
                    isInCart ? css.buttonRemove : css.buttonAdd
                  }`} type="button" onClick={() => handleAdd(el._id)}>
                    {isInCart ? "Remove" : "Add"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
    
    
  };