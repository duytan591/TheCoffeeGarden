import caphesua from './src/assets/images/coffee/caphesua.jpg'
import latte from './src/assets/images/coffee/latte.jpg'
import bacxiu from './src/assets/images/coffee/bacxiu.jpg'

export const products = [
    {
      name: "ca phe sua",
      price: "2$",
      description:'day la ca phe sua',
      imageUrl: caphesua,
      favorite: false
    },
    {
      name: "latte",
      price: "3$",
      description:'no cap',
      imageUrl:latte,
      favorite: false
    },
    {
      name: "bac xiu",
      price: "3$",
      description:'no cap',
      imageUrl:bacxiu,
      favorite: false
    },
];

export const cartItems = [
    products[0],
    products[1],
    products[2],
];