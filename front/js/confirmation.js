//Récupération numéro de commande via URL
const getOrderId = () =>{
    const orderId = localStorage.getItem('orderId');
    return orderId
}
//Affichage numéro de commande
const displayOrdernumber= (orderId) =>{
const orderNumber = document.getElementById('orderId');
orderNumber.textContent=orderId;
}
//Fonction effacement du numéro de commande dans l'URL
const removeOrderIdFromURL = () =>{
    localStorage.clear();
}
//Fonction principale
const main = () =>{
    const orderNumber = getOrderId();
    displayOrdernumber(orderNumber);
    removeOrderIdFromURL()
    

}
main();