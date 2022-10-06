const retrieveKanapData = () => fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(product=>product)
.catch(err => console.log(err))

const kanapInfoDetail = kanap =>{
   const cadre = document.getElementsByClassName('item_img');
   const image = document.createElement('img')
   image.setAttribute('src',`${kanap.imageUrl}`);
   image.setAttribute('alt',`${kanap.altTxt}`);
   cadre.appendChild(image);

   const title = document.getElementById('title');
   title.textContent=`${kanap.name}`;

   const description = document.getElementById('description')
   description.textContent = `${kanap.description}`;

    const selector = document.getElementById('colors')
    const option = document.createElement('option')
    const colors = `${kanap.colors}`
    for(color of colors){
        option.setAttribute('value',`${kanap.color}`)
        option.textContent=`${kanap.color}`
        selector.appendChild(option)
    }
}

const main = async() =>{
    

}