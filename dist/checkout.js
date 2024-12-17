
import { cart, removeFromCart } from "./cart.js";
import { products } from "./products.js";


let cartSummaryHTML ='';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    })

    cartSummaryHTML += 
    ` <div class="flex items-center justify-between border-b pb-4">
    <div class="flex items-center space-x-4">
      <img src="${matchingProduct.image}" alt="Dish Image" class="h-16 w-16 rounded object-cover" />
      <div>
        <h3 class="text-lg font-semibold">${matchingProduct.name}</h3>
        <p class="text-sm text-gray-500">${cartItem.quantity}</p>
        <p class="text-sm text-gray-500">Plate-size: half</p>
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <p class="text-lg font-bold">${matchingProduct.pricePaise/100}</p>
      <button class="text-red-600" id="js-delete-link" data-product-id="${matchingProduct.id}">
        <i class="fa-solid fa-circle-minus"></i>
      </button>
    </div>
  </div>
        
`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('#js-delete-link').forEach((link)=>{
link.addEventListener('click',()=>{
  const productId = link.dataset.productId
  removeFromCart(productId);
  console.log(cart)
})
})