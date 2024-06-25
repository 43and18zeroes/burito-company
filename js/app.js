class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  discountApplied = false;

  set cartItems(value) {
    this.items = value;
    this.updateTotal();
  }

  get totalAmount() {
    return this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price * curItem.quantity,
      0
    );
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const existingProduct = this.items.find(
      item => item.title === product.title
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.cartItems = [...this.items];
  }

  applyDiscount() {
    this.discountApplied = true;
    this.updateTotal();
  }

  updateTotal() {
    const total = this.totalAmount;
    const discount = this.discountApplied ? total * 0.1 : 0;
    this.totalOutput.innerHTML = `<h2>Total: \$${(total - discount).toFixed(
      2
    )}</h2>`;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
      <button id="discount-btn">Apply 10% Discount</button>
    `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts);
    const discountButton = cartEl.querySelector('#discount-btn');
    discountButton.addEventListener('click', this.applyDiscount.bind(this));
    this.totalOutput = cartEl.querySelector('h2');
    this.updateTotal();
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'result__card');
    prodEl.innerHTML = `
      <div class="image__container">
        <img src="${this.product.imageUrl}" alt="${this.product.title}" />
      </div>
      <div class="card__content">
        <div class="content__left">
          <div class="card__header">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
          </div>
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
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        'Big Burito',
        'img/01.jpg',
        'Lorem Ipsum is simply dummy text of the printing.',
        10
      ),
      new Product(
        'Saucy Burito',
        'img/02.jpg',
        'Lorem Ipsum is simply dummy text of the printing.',
        20
      ),
      new Product(
        'Hot Burito',
        'img/03.jpg',
        'Lorem Ipsum is simply dummy text of the printing.',
        30
      ),
      new Product(
        'Burito Bunch',
        'img/04.jpg',
        'Lorem Ipsum is simply dummy text of the printing.',
        40
      ),
      new Product(
        'Burito Deluxe',
        'img/05.jpg',
        'Lorem Ipsum is simply dummy text of the printing.',
        50
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'content__results', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('product-container');
    new ProductList('product-container');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
