const productList = {
  products: [
    {
      title: 'Big Burito',
      imageUrl: 'img/01.jpg',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ],
  render() {
    const renderHook = document.getElementById('product-container');
    const prodList = document.createElement('ul');
    prodList.className = 'content__results';
    for (const prod of this.products) {
      const prodEl = document.createElement('li');
      prodEl.className = 'result__card';
      prodEl.innerHTML = `
            <img src="${prod.imageUrl}" alt="${prod.title}" />
            <div class="card__content">
                <h3>${prod.title}</h3>
                <div id="product-container" class="content__description">
                    ${prod.description}
                </div>
            </div>
        `;
    }
  },
};
// productList.render();