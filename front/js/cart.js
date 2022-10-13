const getStorage=()=>{
    const storage = []
    for(let i=0; i<localStorage.length; i++){
        storage[i]=localStorage.getItem(localStorage.key(i));
        storage[i]=JSON.parse(storage[i])
    }
    return storage
}
const getItems=(storage)=>{
    const basket = document.getElementById('cart__item');
    for(let i=0; i<storage.length; i++){
        document.createElement('article')
    }
}

