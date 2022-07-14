const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect.assertions(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems ', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect.assertions(1);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
  it('Sem parametro retorna um erro personalizado', () => {
    const response = saveCartItems();
    expect.assertions(1);
    expect(response).toEqual(new Error('So... nothing was added'));
  });
});
