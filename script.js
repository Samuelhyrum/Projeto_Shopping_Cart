const buttonEsvaziar = document.querySelector('.empty-cart');
const carrinho = document.querySelector('.cart__items');
const container = document.querySelector('.container');
const loader = document.querySelector('.loading');

const carregando = ["carregando", "carregando", "carregando", "carregando"];

const interval = 125;

const load = (arr) => {
  setInterval(() => {
    loader.innerText = arr[Math.floor(Math.random() * arr.length)];
  }, interval);
};

const init = () => {
  load(carregando)
};

const get = () => {
  const gettin = carrinho.innerHTML;
  saveCartItems(gettin);
};
const valorTotal = () => {
  const listas = document.querySelectorAll('li');
  let soma = 0;
  listas.forEach((li) => {
    const valores = li.innerText.match(/[\d,.]+/g);
    soma += parseFloat(valores[valores.length - 1]);
  });
  document.querySelector('.total-price').innerText = soma;
};
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
  get();
  valorTotal();
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
  const { id, title, price } = result;
  const produtos = createCartItemElement({ sku: id, name: title, salePrice: price });
  carrinho.appendChild(produtos);
  get();
  valorTotal();
};
const empty = () => {
  buttonEsvaziar.addEventListener('click', () => {
    const listas = document.querySelectorAll('li');
    listas.forEach((li) => {
      li.remove();
    });
    get();
    valorTotal();
  });
};

const cart = () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((pegandoTodos) => {
    pegandoTodos.addEventListener('click', addCart);
  });
};

const products = async () => {
  const result = await fetchProducts('computador');
  // document.querySelector('.loading').style.display = "none";
  loader.remove();
  result.forEach(({ id, title, thumbnail }) => {
    const section = createProductItemElement({ sku: id, name: title, image: thumbnail });
    document.querySelector('.items').appendChild(section);
  });
};
const saveStorage = () => {
  const data = getSavedCartItems('cartItems');
  carrinho.innerHTML = data;
  const listas = document.querySelectorAll('li');
  listas.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};


window.onload = async () => {
  await products();
  cart();
  saveStorage();
  valorTotal();
  empty();
};
