//Recupération de l'identifiant du produit dans l'URL
const getId = () =>{
    const searchId = new URL(location.href).searchParams.get('id');
    return searchId
}
//Récupération des données d'un seul produit via une requête précise à l'API
const getChoiceById = async(searchId) =>{
    try {
    const fetchItem = await fetch(`http://localhost:3000/api/products/${searchId}`)
    return fetchItem.json();

    } catch (error) {
        console.log("error");
    }
    
}
//Fonction de construction de l'image
const kanapImg = choiceById =>{
   const cadre = document.querySelector('.item__img');
   if(cadre != null){
    cadre.innerHTML=`<img src="${choiceById.imageUrl}" alt="${choiceById.altTxt}" id=image-article>`;
    return cadre
   }
}
//Fonction de construction du titre
const kanapTitle = choiceById =>{
    const titlePrice=document.getElementsByClassName('item__content__titlePrice');
    const title = document.getElementById('title');
    title.textContent=`${choiceById.name}`;
    const price = document.getElementById('price');
    price.textContent = `${choiceById.price}`;
    return titlePrice
}
//Fonction de construction du texte de description
const kanapDescript = choiceById =>{
    const description = document.getElementById('description')
    description.textContent = `${choiceById.description}`;
    return description
}
//Ajout des couleurs récupérées via l'API dans le selecteur de couleur
const kanapColor = choiceById =>{
    const selector = document.getElementById('colors')
    const colors = choiceById.colors;
    for(let i=0; i<colors.length; i++){
        const option = document.createElement('option')
        option.setAttribute('value',`${choiceById.colors[i]}`)
        option.textContent=`${choiceById.colors[i]}`
        selector.appendChild(option)
    }
    return selector
}
//Fonction d'enregistrement dans le panier'
const saveBasket = (basket) =>{
    localStorage.setItem("basket",JSON.stringify(basket))
}
//Fonction de récupération du panier
const getBasket = () =>{
    const basket = localStorage.getItem("basket");
    if(basket == null){
        return []
    }
    else{
        return JSON.parse(basket);
    }
}
//Fonction d'ajout d'un article
const addItem= (article) =>{
let basket = getBasket();
let findProduct = basket.find(p => p.id == article.id)
if(findProduct != undefined){
    findProduct.quantity+=article.quantity;
}
else{
basket.push(article);
}
saveBasket(basket)
}
//Fonction principal de chargement de la page et de gestion des évènements
const main = async() =>{
 const getUrlId =  getId()
 const getDataChoice = await getChoiceById(getUrlId)
 kanapTitle(getDataChoice);
 kanapDescript(getDataChoice);
 kanapColor(getDataChoice);
 kanapImg(getDataChoice);
//Ecoute de l'évènement clique sur le bouton "Ajouter au panier"
 const button = document.getElementById('addToCart');
 button.addEventListener('click', function storage(){

    const photo = getDataChoice.imageUrl;
    const text = getDataChoice.altTxt;
    const name = getDataChoice.name;
    const price = getDataChoice.price;
    const colorChoice = document.querySelector('#colors').value;
    const numberChoice = document.querySelector('#quantity').value;
    //Message alerte si manque information quantité ou couleur
    if(colorChoice == null || colorChoice == "" || numberChoice == 0 ){
        window.alert('choisir une couleur et une quantité');
    }else{
//Creation des articles a envoyer au localStorage
const article = {
    id:getUrlId +"."+colorChoice,
    photo:photo,
    text:text,
    name:name,
    color:colorChoice,
    price:price,
    quantity:parseInt(numberChoice),
}

addItem(article);

//Redirection sur la page d'accueil après choix
window.location.href='index.html';
    }
    
 })
 
}

main()