
export let cart =[
  {
    productId: 'Italian-pizza',
    quantity:1
  }, {
    productId: 'North-rajmachawal',
    quantity:2
  }
];

export function addToCart(productId){
    let matchingItem;
  
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
        });
      }
  };

  export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    cart = newCart;
  }
  