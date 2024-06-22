class Product {
  constructor(title, image, desc) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
  }
}

class ShoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`;
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'result__card';
    prodEl.innerHTML = `
      <div class="image__container">
        <img src="${this.product.imageUrl}" alt="${this.product.title}" />
      </div>
      <div class="card__content">
        <div class="content__left">
          <h3>${this.product.title}</h3>
          <div id="product-container" class="content__description">
            ${this.product.description}
          </div>
        </div>
        <div class="content__right">
          <button>Add to cart</button>
        </div>
      </div>
    `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'Big Burito',
      'img/01.jpg',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    ),
    new Product(
      'Saucy Burito',
      'img/02.jpg',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    ),
    new Product(
      'Hot Burito',
      'img/03.jpg',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    ),
    new Product(
      'Burito Bunch',
      'img/04.jpg',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    ),
    new Product(
      'Burito Deluxe',
      'img/05.jpg',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    ),
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'content__results';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('product-container');
    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
