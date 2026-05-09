export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));

  // Notify navbar instantly
  window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (product, category) => {
  const confirmAdd = window.confirm(
    `Do you want to add this product to cart?`
  );

  if (!confirmAdd) return;

  const cart = getCart();

  const index = cart.findIndex(
    (item) =>
      item.id === product.id &&
      item.category === category
  );

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      ...product,
      category,
      quantity: 1,
    });
  }

  saveCart(cart);

  window.alert(`${product.name} added to cart successfully!`);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
};