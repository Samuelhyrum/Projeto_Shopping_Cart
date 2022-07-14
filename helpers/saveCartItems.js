const saveCartItems = (parametro) => {
  if (parametro === undefined) {
    return new Error('So... nothing was added');
  } localStorage.setItem('cartItems', parametro);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
