const fetchItem = async (ItemID) => {
  try{
    const url = `https://api.mercadolibre.com/items/${ItemID}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch(err){
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
