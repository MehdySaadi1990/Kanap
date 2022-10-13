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
    cadre.innerHTML=`<img src="${choiceById.imageUrl}" alt="${choiceById.altTxt}">`;
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
 
}

main()