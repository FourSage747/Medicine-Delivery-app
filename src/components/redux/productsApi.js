import axios from "axios";

const instance = axios.create({
  baseURL: 'https://medicine-delivery-app-backend.onrender.com',
})


export const getProducts = async () => {
  const {data} = await instance.get('/api/products')
  return data
}

export const postShopping = async (body) => {
  const {data} = await instance.post('/api/shopping', body)
  return data
}
