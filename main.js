// Function to fetch data from maindb.json
async function fetchData() {
  try {
    const response = await fetch('maindb.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data from maindb.json');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

// Function to display product listings on the main page
function displayProducts(products) {
  const productContainer = document.querySelector('.product-list');

  // Clear existing product listings
  productContainer.innerHTML = '';

  // Loop through products and create HTML elements for each product
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;
    productDiv.appendChild(productImage);

    const productName = document.createElement('h2');
    productName.textContent = product.name;
    productDiv.appendChild(productName);

    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;
    productDiv.appendChild(productDescription);

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: $${product.price}`;
    productDiv.appendChild(productPrice);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', () => addToCart(product));
    productDiv.appendChild(addToCartButton);

    productContainer.appendChild(productDiv);
  });
}

// Function to add a product to the shopping cart
function addToCart(product) {
  const cartList = document.querySelector('.cart-list');

  // Create a new cart item element
  const cartItem = document.createElement('li');
  cartItem.textContent = `${product.name} - $${product.price}`;

  // Add the cart item to the shopping cart
  cartList.appendChild(cartItem);
}

// Function to handle the checkout process
function checkout() {
  const cartList = document.querySelector('.cart-list');

  // Check if the cart is empty
  if (cartList.children.length === 0) {
    alert('Your shopping cart is empty.');
  } else {
    // Perform the checkout process (you can add your logic here)
    alert('Checkout successful! Thank you for your purchase.');
    // Clear the shopping cart after checkout
    cartList.innerHTML = '';
  }
}

// Function to initialize the main page
async function initMainPage() {
  const products = await fetchData();
  displayProducts(products);

  // Add event listener for the checkout button
  const checkoutButton = document.getElementById('checkoutButton');
  checkoutButton.addEventListener('click', checkout);
}

// Call the initMainPage function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initMainPage);

// user profile eventlistener
document.addEventListener('DOMContentLoaded', () => {
  // Get the form element
  const userProfileForm = document.getElementById('userProfileForm');

  // Add a submit event listener to the form
  userProfileForm.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Save the user profile data (if needed)

  // Redirect to main.html
  window.location.href = 'main.html';
}


