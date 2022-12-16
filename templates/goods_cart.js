// < !--Start Single Product-- >
// <div class="col-md-4 col-lg-4 col-sm-4 col-xs-12">
//     <div class="product">
//         <div class="product__inner">
//             <div class="pro__thumb">
//                 <a href="#">
//                     <img src="images/product/1.png" alt="product images">
//                 </a>
//             </div>
//             <div class="product__hover__info">
//                 <ul class="product__action">
//                     <li><a data-toggle="modal" data-target="#productModal" title="Quick View"
//                             class="quick-view modal-view detail-link" href="#"><span class="ti-plus"></span></a></li>
//                     <li><a title="Add To Cart" href="cart.html"><span class="ti-shopping-cart"></span></a></li>
//                 </ul>
//             </div>
//         </div>
//         <div class="product__details">
//             <h2><a href="product-details.html">Simple Black Clock</a></h2>
//             <ul class="product__price">
//                 <li class="new__price">5 000 ₽</li>
//             </ul>
//         </div>
//     </div>
// </div>
// <!--End Single Product-- >




{/* < !--Start List Content-- >
    <div class="single__list__content clearfix">
        <div class="col-md-3 col-lg-3 col-sm-4 col-xs-12">
            <div class="list__thumb">
                <a href="product-details.html">
                    <img src="images/product/1.png" alt="list images">
                </a>
            </div>
        </div>
        <div class="col-md-9 col-lg-9 col-sm-8 col-xs-12">
            <div class="list__details__inner">
                <h2><a href="product-details.html">Ninja Silhouette</a></h2>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
                    ultricies eget, tempor sit amet, ante. Donec eu libero sit amet…</p>
                <span class="product__price">${productInfo.price}</span>
                <div class="shop__btn">
                    <a class="htc__btn" href="cart.html"><span class="ti-shopping-cart"></span>Добавить в корзину</a>
                </div>
            </div>
        </div>
    </div>
    <!--End List Content-- > */}



//див внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

//отслеживаем клик на странице
window.addEventListener('click', function (event) {

    //отслеживаем что клик совершен на кнопку "добавитьв корзину"
    if (event.target.hasAttribute('data-cart')) {
        //находим карточку товара, которая была добавлена
        const card = event.target.closest('.card');

        //собираем данные с товара и записываем в единый объект productInfo
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInbox: card.querySelector('[data-items-in-box]').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        //проверка, есть ли уже такой товар в корзине
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            //если товара нет в корзине
            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
                                    <div class="cart-item__top">
                                        <div class="cart-item__img">
                                            <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                                        </div>
                                
                                        <div class="cart-item__desc">
                                            <div class="cart-item__title">${productInfo.title}</div>
                                            <div class="cart-item__weight">${productInfo.itemsInbox} / ${productInfo.weight}</div>
                                
                                            <!-- cart-item__details -->
                                            <div class="cart-item__details">
                                
                                                <div class="items items--small counter-wrapper">
                                                    <div class="items__control" data-action="minus">-</div>
                                                    <div class="items__current" data-counter="">${productInfo.counter}</div>
                                                    <div class="items__control" data-action="plus">+</div>
                                                </div>
                                
                                                <div class="price">
                                                    <div class="price__currency">${productInfo.price}</div>
                                                </div>
                                
                                            </div>
                                            <!-- // cart-item__details -->
                                
                                        </div>
                                    </div>
                                </div>`;
            //отображаем весь товар в корзине
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);


        }

        //сбарсывание счетчика добавленного товара до одного
        card.querySelector('[data-counter]').innerText = '1';


        //отображение статуса корзины Пустая / Полная
        toggleCartStatus();

        //Пересчет общей стоимости товаров в корзине
        calcCartPriceAndDelivery();

    }


})