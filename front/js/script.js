const items = document.getElementById('items');
const retrieveKanapData = () => fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(product=>product)
.catch(err => console.log(err))

const createKanap = (kanap) =>{
    const kanapPhoto = document.createElement('img');
    kanapPhoto.setAttribute('src',`${kanap.imageUrl}`);
    kanapPhoto.setAttribute('alt', `${kanap.altTxt}`);
    
    const kanapTitle = document.createElement('h3');
    kanapTitle.classList.add('productName');
    kanapTitle.textContent=`${kanap.name}`;
    
    const kanapDescribe = document.createElement('p');
    kanapDescribe.classList.add('productDescription');
    kanapDescribe.textContent=`${kanap.description}`;
    
    const kanapCard = document.createElement('article');
    kanapCard.appendChild(kanapPhoto);
    kanapCard.appendChild(kanapTitle);
    kanapCard.appendChild(kanapDescribe);
    
    const kanapLink = document.createElement('a');
    kanapLink.classList.add('choix_produit')
    kanapLink.setAttribute('href',`./product.html?id=${kanap._id}`);
    kanapLink.appendChild(kanapCard);

    return kanapLink
}

const main = async() =>{
    const kanaps = await retrieveKanapData()
    for(product of kanaps){
        createKanap(product);
        items.appendChild(createKanap(product))
    }
}
main();


