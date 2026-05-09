import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // LOAD CART
  useEffect(() => {
    const cart =
      JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // UPDATE CART
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event('cartUpdated'));
  };

  // INCREASE
  const increaseQty = (id, category) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.category === category
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updated);
  };

  // DECREASE
  const decreaseQty = (id, category) => {
    const updated = cartItems
      .map((item) =>
        item.id === id && item.category === category
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  // REMOVE cart
  const removeItem = (id, category) => {
    const itemToRemove = cartItems.find(
      (item) =>
        item.id === id && item.category === category
    );

    const confirmDelete = window.confirm(
      `Do you want to remove "${itemToRemove?.title}" from cart?`
    );

    if (!confirmDelete) return;

    const updated = cartItems.filter(
      (item) =>
        !(item.id === id && item.category === category)
    );

    updateCart(updated);

    window.alert('Product removed successfully!');
  };

  // CLEAR CART WITH CONFIRMATION
  const clearCart = () => {
    const confirmClear = window.confirm(
      'Are you sure you want to clear the entire cart?'
    );

    if (!confirmClear) return;

    localStorage.removeItem('cart');
    setCartItems([]);

    window.dispatchEvent(new Event('cartUpdated'));

    window.alert('Cart cleared successfully!');
  };

  // TOTAL
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5 mb- myorders">

      <h2 className="text-center fw-bold mb-4">
        Shopping Cart
      </h2>

      {cartItems.length > 0 ? (
        <>
          <div className="table-responsive">

            <table className="table table-bordered text-center align-middle">

              <thead className="table-dark">
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={`${item.id}-${item.category}`}>

                    {/* PRODUCT */}
                    <td className="text-start d-flex align-items-center gap-2">

                      <img
                        src={
                          item.imageUrl
                            ? item.imageUrl
                            : `http://127.0.0.1:8000/uploads/${item.category.toLowerCase()}/${item.image}`
                        }
                        alt={item.title}
                        width="50"
                        height="50"
                        className="rounded"
                      />

                      <p>{item.title}</p>

                    </td>

                    {/* CATEGORY */}
                    <td>
                      <span className="badge bg-secondary">
                        {item.category}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td>${item.price}</td>

                    {/* QTY */}
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            decreaseQty(item.id, item.category)
                          }
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            increaseQty(item.id, item.category)
                          }
                        >
                          +
                        </button>

                      </div>
                    </td>

                    {/* TOTAL */}
                    <td className="fw-bold">
                      ${item.price * item.quantity}
                    </td>

                    {/* REMOVE */}
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          removeItem(item.id, item.category)
                        }
                      >
                        Remove
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-between align-items-center mt-4">

            <button
              className="btn btn-danger"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <h4 className="fw-bold">
              Total: ${totalPrice}
            </h4>

            <button
              className="btn btn-primary"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </button>

          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <h4>Your cart is empty</h4>
        </div>
      )}

    </div>
  );
};

export default Cart;