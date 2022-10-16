const getStorage=()=>{
    const storage = []
    for(let i=0; i<localStorage.length; i++){
        storage[i]=localStorage.getItem(localStorage.key(i));
        storage[i]=JSON.parse(storage[i])
    }
    return storage
}
const getItems=(storage)=>{
    const basket = document.getElementById('cart__items');
    if(basket != null){
        for(let i=0; i<storage.length; i++){
            const article = document.createElement('article');
            article.classList.add('cart__item');
            article.setAttribute('data-id',`${storage[i].id}`);
            article.setAttribute('data-color',`${storage[i].color}`);
            basket.appendChild(article);
            const divImage = document.createElement('div');
            divImage.classList.add('cart__item__img');
            const content = document.createElement('div');
            divImage.classList.add('cart__item__content');
            article.appendChild(divImage);
            article.appendChild(content);
            const image = document.createElement('img');
            image.setAttribute('src',`${storage[i].photo}`);
            image.setAttribute('alt',`${storage[i].text}`);
            divImage.appendChild(image);
            const description = document.createElement('div');
            description.classList.add('cart__item__content__description');
            const setting = document.createElement('div');
            setting.classList.add('cart__item__content__settings')
            content.appendChild(description);
            content.appendChild(setting);
            const name = document.createElement('h2');
            name.textContent=`${storage[i].name}`;
            const color = document.createElement('p');
            color.textContent=`${storage[i].color}`
            const price = document.createElement('p');
            price.textContent=`${storage[i].price}`+" €";
            description.appendChild(name);
            description.appendChild(price);
            description.appendChild(color);
            const quantity = document.createElement('div');
            quantity.classList.add('cart__item__content__settings__quantity');
            const remove = document.createElement('div');
            remove.classList.add('cart__item__content__settings__delete');
            setting.appendChild(quantity);
            setting.appendChild(remove);
            const label= document.createElement('p');
            label.textContent="Qté : ";
            const changeQuantity= document.createElement('input');
            changeQuantity.setAttribute('type','number');
            changeQuantity.setAttribute('name','itemQuantity');
            changeQuantity.setAttribute('min','1');
            changeQuantity.setAttribute('max','100');
            changeQuantity.setAttribute('value',`${storage[i].quantity}`);
            changeQuantity.classList.add('itemQuantity');
            quantity.appendChild(label);
            quantity.appendChild(changeQuantity);
            const removeItem = document.createElement('p');
            removeItem.classList.add('deleteItem');
            removeItem.textContent='Supprimer';
            remove.appendChild(removeItem);
        }
    }
    return basket;
}
const getTotalQty=(storage)=>{
    let total =0;
    for(let i=0; i<storage.length; i++){
        total=total + storage[i].quantity;
    }
    const totalQty=document.getElementById('totalQuantity');
    totalQty.textContent=total;
    return totalQty;
}
const getTotalPrice=(storage)=>{
    let total =0;
    for(let i=0; i<storage.length; i++){
        total=total + storage[i].price;
    }
    const totalPrice=document.getElementById('totalPrice');
    totalPrice.textContent=total;
    return totalPrice;
}

const main=()=>{
const elements = getStorage();
getItems(elements);
getTotalQty(elements);
getTotalPrice(elements);
}
main();
