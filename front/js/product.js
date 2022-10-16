const getId = () =>{
    const searchId = new URL(location.href).searchParams.get('id');
    return searchId
}

const getChoiceById = async(searchId) =>{
    try {
    const fetchItem = await fetch(`http://localhost:3000/api/products/${searchId}`)
    return fetchItem.json();

    } catch (error) {
        console.log("error");
    }
    
}

const kanapImg = choiceById =>{
   const cadre = document.querySelector('.item__img');
   if(cadre != null){
    cadre.innerHTML=`<img src="${choiceById.imageUrl}" alt="${choiceById.altTxt}" id=image-article>`;
    return cadre
   }
}
const kanapTitle = choiceById =>{
    const titlePrice=document.getElementsByClassName('item__content__titlePrice');
    const title = document.getElementById('title');
    title.textContent=`${choiceById.name}`;
    const price = document.getElementById('price');
    price.textContent = `${choiceById.price}`;
    return titlePrice
}
const kanapDescript = choiceById =>{
    const description = document.getElementById('description')
    description.textContent = `${choiceById.description}`;
    return description
}
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

const main = async() =>{
 const getUrlId =  getId()
 const getDataChoice = await getChoiceById(getUrlId)
 kanapTitle(getDataChoice);
 kanapDescript(getDataChoice);
 kanapColor(getDataChoice);
 kanapImg(getDataChoice);

 const button = document.getElementById('addToCart');
 button.addEventListener('click', function storage(){
    const photo = getDataChoice.imageUrl;
    const text = getDataChoice.altTxt;
    const price = getDataChoice.price;
    const name = getDataChoice.name;
    const colorChoice = document.querySelector('#colors').value;
    const numberChoice = document.querySelector('#quantity').value;
    const key = getUrlId + " "+colorChoice
    if(colorChoice == null || colorChoice == "" || numberChoice == 0 ){
        window.alert('choisir une couleur et une quantité');
    }
    const article = {
        id:getUrlId,
        photo:photo,
        text:text,
        price:price,
        name:name,
        color:colorChoice,
        quantity:parseInt(numberChoice),
    }
        try {
            localStorage.setItem(key,JSON.stringify(article));

        } catch (error) {
            console.log("error");
        }
        window.location.href='index.html';
 })
 
}

main()