// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchItem } = require("./helpers/fetchItem");

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
};


const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addCart = async (sku) => {
  const father = getSkuFromProductItem(sku.target.parentNode);
  const result = await fetchItem(father);
  const carrinho = document.querySelector('.cart__items');
  const { id, title, price } = result;
  const produtos = createCartItemElement({ sku: id, name: title, salePrice: price });
  carrinho.appendChild(produtos);
};

const cart = () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((pegandoTodos) => {
    pegandoTodos.addEventListener('click', addCart);
  });
};

const products = async () => {
  const result = await fetchProducts('computador');
  result.forEach(({ id, title, thumbnail }) => {
    const section = createProductItemElement({ sku: id, name: title, image: thumbnail });
    document.querySelector('.items').appendChild(section);
  });
};
window.onload = async () => {
  await products();
  cart();
};
