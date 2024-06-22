class Product {
  constructor(title, image, desc) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'result__card';
    prodEl.innerHTML = `
      <div class="image__container">
        <img src="${this.product.imageUrl}" alt="${this.product.title}" />
      </div>
      <div class="card__content">
          <h3>${this.product.title}</h3>
          <div id="product-container" class="content__description">
              ${this.product.description}
          </div>
      </div>
    `;
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'Big Burito',
      'img/01.jpg',
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ),
    new Product(
      'Saucy Burito',
      'img/02.jpg',
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ),
    new Product(
      'Hot Burito',
      'img/03.jpg',
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ),
    new Product(
      'Burito Bunch',
      'img/04.jpg',
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ),
    new Product(
      'Burito Deluxe',
      'img/05.jpg',
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ),
  ];

  constructor() {};

  render() {
    const renderHook = document.getElementById('product-container');
    const prodList = document.createElement('ul');
    prodList.className = 'content__results';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
};
const productList = new ProductList();
productList.render();
