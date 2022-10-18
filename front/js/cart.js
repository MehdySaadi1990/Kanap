//Récupération des données du localStorage sous forme de tableau
const getStorage = () =>{
    const storage = localStorage.getItem("basket");
    if(storage == null){
        return []
    }
    else{
        return JSON.parse(storage);
    }
}

//Affichage des articles
const getItems=(storage)=>{
    const basket = document.getElementById('cart__items');
    if(basket != null){
        //Boucle pour construction du DOM et insertion des données via le localStorage
        for(let i=0; i<storage.length; i++){
            const article = document.createElement('article');
            article.classList.add('cart__item');
            article.setAttribute('data-id',`${storage[i].id}`);
            article.setAttribute('data-color',`${storage[i].color}`);
            basket.appendChild(article);
            //Création de l'image
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
            //Création Description article et outils de changement quantité ou suppression
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
        total=total + (storage[i].price*storage[i].quantity);
    }
    const totalPrice=document.getElementById('totalPrice');
    totalPrice.textContent=total;
    return totalPrice;
}
//Fonction d'enregistrement dans le panier'
const saveBasket = (basket) =>{
    localStorage.setItem("basket",JSON.stringify(basket))
}
//Fonction de suppression d'un produit
const removeItem= (article) =>{
    let basket = getStorage();
    if(basket.length==1){
        localStorage.removeItem('basket');
    }
    else{
        basket = basket.filter(p => p.id != article.dataset.id && p.color != article.dataset.color)
        let cart =saveBasket(basket);
        return cart;
    }
    
}
//Fonction changement quantité dans le panier
const updateQuantity= (article, newValue) =>{
    let basket= getStorage();
    const updateItem = basket.find(p => p.id == article.dataset.id);
    updateItem.quantity=parseInt(newValue); 
    saveBasket(basket);
    getTotalQty(basket);
    getTotalPrice(basket);
}

const main=()=>{
const elements = getStorage();
getItems(elements);
getTotalQty(elements);
getTotalPrice(elements);
const removeBtn = document.querySelectorAll('.cart__item__content__settings__delete');
for(let i=0; i<removeBtn.length; i++){
    removeBtn[i].addEventListener('click', function(){
        const itemSetting = removeBtn[i].parentElement;
        const itemContent = itemSetting.parentElement;
        const item = itemContent.parentElement;
        removeItem(item);
        window.location.reload();
        
    })       
}
const itemQuantity = document.querySelectorAll('input');
for(let i=0; i<itemQuantity.length; i++)
{
    itemQuantity[i].addEventListener('input', function(e){

        let changeQty = e.target.value;
        let itemQty = itemQuantity[i].parentElement;
        const itemSetting = itemQty.parentElement;
        const itemContent = itemSetting.parentElement;
        const item = itemContent.parentElement;
        updateQuantity(item, changeQty);
    })
}

}

main();
