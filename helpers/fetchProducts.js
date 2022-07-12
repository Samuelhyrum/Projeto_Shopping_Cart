const fetchProducts = async (computador) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.results;
  } catch (eer) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
