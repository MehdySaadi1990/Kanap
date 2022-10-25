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
    const items = document.getElementById('cart__items');
    if(items != null){
        //Boucle pour construction du DOM et insertion des données via le localStorage
        for(let i=0; i<storage.length; i++){
            const article = document.createElement('article');
            article.classList.add('cart__item');
            article.setAttribute('data-id',`${storage[i].id}`);
            article.setAttribute('data-color',`${storage[i].color}`);
            items.appendChild(article);
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
            const priceItem = document.createElement('p');
            //Récupération du prix via l'API pour affichage
            let id = storage[i].id.split('.')[0];
            fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
            .then(data=>priceItem.textContent = data.price + ' €')
            .catch(err => console.log(err))
            description.appendChild(name);
            description.appendChild(color);
            description.appendChild(priceItem);
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
    return items;
}

//Fonction de calcul quantité totale
const getTotalQty=(storage)=>{
    let total =0;
    for(let i=0; i<storage.length; i++){
        total=total + storage[i].quantity;
    }
    const totalQty=document.getElementById('totalQuantity');
    totalQty.textContent=total;
    return totalQty;
}
//Fonction de calcul prix total
const getTotalPrice=(storage)=>{
    let total =0;
    for(let i=0; i<storage.length; i++){
        let id = storage[i].id.split('.')[0];
            fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
            .then(data=>{
                let quantity = document.getElementsByClassName('itemQuantity');
                total+=data.price*quantity[i].value;
                const totalPrice=document.getElementById('totalPrice');
                totalPrice.textContent=total;
                return totalPrice})
            .catch(err => console.log(err))
    }
}
//Fonction d'enregistrement dans le panier'
const saveBasket = (basket) =>{
    localStorage.setItem("basket",JSON.stringify(basket))
}
//Fonction de suppression d'un produit du localStorage
const removeItemFromCart= (article) =>{
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
//Fonction suppression d'un produit du panier
const removeFromBasket= () =>{
    const removeBtn = document.querySelectorAll('.cart__item__content__settings__delete');
    for(let i=0; i<removeBtn.length; i++){
        removeBtn[i].addEventListener('click', function(){
            const itemSetting = removeBtn[i].parentElement;
            const itemContent = itemSetting.parentElement;
            const item = itemContent.parentElement;
            removeItemFromCart(item);
            window.location.reload();
            
        })       
    }
}
//Fonction changement quantité dans le localStorage
const updateQuantityFromCart= (article, newValue) =>{
    let basket= getStorage();
    const updateItem = basket.find(p => p.id == article.dataset.id);
    updateItem.quantity=parseInt(newValue); 
    saveBasket(basket);
    getTotalQty(basket);
    getTotalPrice(basket);
}
//Fonction de changement de quantité dans le panier
const updateQuantityFromBasket= () =>{
    const itemQuantity = document.querySelectorAll('.itemQuantity');
    for(let i=0; i<itemQuantity.length; i++)
    {
        itemQuantity[i].addEventListener('input', function(e){
    
            let changeQty = e.target.value;
            let itemQty = itemQuantity[i].parentElement;
            const itemSetting = itemQty.parentElement;
            const itemContent = itemSetting.parentElement;
            const item = itemContent.parentElement;
            updateQuantityFromCart(item, changeQty);
        })
    }
}
//Validation Prénom
const testFirstName=() =>{
    const firstName = document.getElementById('firstName');
    const firstNameEr = document.getElementById('firstNameErrorMsg');
        if(/^[a-zA-Z-]+$/gi.test(firstName.value)|| firstName.value==""){
            firstNameEr.textContent='';
            return true  
         }
         else{
            firstNameEr.textContent = 'Saisir un prénom correct'
            return false 
         }
    }
//Validation Nom
const testLastName=() =>{
    const lastName = document.getElementById('lastName');
    const lastNameEr = document.getElementById('lastNameErrorMsg');
        if(/^[a-zA-Z-]+$/gi.test(lastName.value)|| lastName.value==""){
            lastNameEr.textContent='';
            return true  
         }
         else{
            lastNameEr.textContent = 'Saisir un nom correct';
            return false  
         }
}
//Validation adresse
const testAdressName=()=>{
    const address = document.getElementById('address');
    const addressEr = document.getElementById('addressErrorMsg');
        if(/^[0-9a-zA-Z -]+$/gi.test(address.value) || address.value==""){
            addressEr.textContent='';
            return true 
         }
         else{
            addressEr.textContent = 'Saisir une adresse correct'
            return false 
           
         }
}
//Validation Ville
const testCityName=() =>{
    const cityName = document.getElementById('city');
    const cityNameEr = document.getElementById('cityErrorMsg');
    
        if(/^[a-zA-Z_é ]+$/gi.test(cityName.value)|| cityName.value==""){
            cityNameEr.textContent='';
            return true
         }
         else{
            cityNameEr.textContent = 'Saisir une ville correct';
            return false 
         }
}
//Validation E-mail
const testEmailName=() =>{
    const emailName = document.getElementById('email');
    const emailNameEr = document.getElementById('emailErrorMsg');
        if(/^[a-zA-Z0-9+_.-]+@(.+)$/gi.test(emailName.value)|| emailName.value==""){
            emailNameEr.textContent='';
            return true
         }
         else{
            emailNameEr.textContent = 'Saisir une adresse e-mail correcte';
            return false
         }
    }
//Récupération Id du LocalStorage pour requête POST
const getIdfromLocalStorage=()=>{
    let basket = getStorage();
    let order =[];
    for(let i=0; i<basket.length; i++){
        let idColor = basket[i].id;
        let id = idColor.split(".");
        id = id[0];
        order.push(id);
    }
    return order;
}
//Construction de la requête par récupération des éléments du formulaires et de l'ID des produits du panier
const requestToPost=()=>{
    const form = document.querySelector('form');
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;
    const order={
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
         },
         products : getIdfromLocalStorage(),
    }
        return order;
    
}
//Verification que le formulaire ne soit pas vide dans une des entrées
const isFormNotComplete=()=>{
const form = document.querySelector('form');
let inputs = form.querySelectorAll('input');
inputs.forEach(input => {if(input.value==""){
    window.alert('remplissez tout les champs du formulaire');
    window.location.reload();
    return true
}
else{
    return false
}
})
}
//Soumission du formulaire pour requête POST et récupération du numéro de commande 
const submitForm=(e) =>{
    const submitBtn = document.getElementById('order');
    let basket = getStorage();
    //Ecouteur clique bouton, vérification de la validité des informations
    submitBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(basket.length == 0){
            window.alert('selectionner des produits avant de commander');
            return
        }
        //Vérification du contenu du formulaire avant envoi requête
        isFormNotComplete();
        if(testFirstName() && testLastName() && testAdressName() && testCityName() && testEmailName()==true){
        const order = requestToPost();
        //Envoi requête POST avec les éléments du formulaire correctement remplis
        fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
          })
          //Récupération du numéro de commande et effacement du localStorage
          .then(res=> res.json())
          .then(data=>{ 
            const orderNumber = data.orderId;
            localStorage.setItem('orderId',`${orderNumber}`);
            window.location='confirmation.html'
          })
          .catch(err=>err)
        }
        
        }
       
    )}
//Fonction principale chargement page et gestion des évènements
const main=()=>{
const elements = getStorage();
getItems(elements);
getTotalQty(elements);
getTotalPrice(elements);
removeFromBasket();
updateQuantityFromBasket();
submitForm();
}

main();
