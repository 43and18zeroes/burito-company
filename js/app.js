class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
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
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
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
      'Lorem Ipsum is simply dummy text of the printing.',
      9.99
    ),
    new Product(
      'Saucy Burito',
      'img/02.jpg',
      'Lorem Ipsum is simply dummy text of the printing.',
      10.99
    ),
    new Product(
      'Hot Burito',
      'img/03.jpg',
      'Lorem Ipsum is simply dummy text of the printing.',
      11.99
    ),
    new Product(
      'Burito Bunch',
      'img/04.jpg',
      'Lorem Ipsum is simply dummy text of the printing.',
      12.99
    ),
    new Product(
      'Burito Deluxe',
      'img/05.jpg',
      'Lorem Ipsum is simply dummy text of the printing.',
      13.99
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
