const fetchProducts = async (Query) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${Query}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (eer) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
