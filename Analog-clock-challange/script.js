// Séléctionner les aiguilles de montre
const AIGUILLEHR = document.querySelector("#hour");
const AIGUILLEMIN = document.querySelector("#minute");
const AIGUILLESEC = document.querySelector("#second");

//Extraire l'heure actuel à l'aide de l'objet Date()

//Ajouter l'heure , minite , seconde  dans des varaiables


// console.log(s);



// Calculer de degré de mouvement de l'aiguille heure, de l'aiguille minute, de l'aiguille seconde
// Hint : Tous les aiguilles doivent se déplacer chaque second selon un degré


// Déplacer les aiguilles 
function demarrerLaMontre() {
let date = new Date();
let secondsRatio = date.getSeconds() / 60; // 0 - 59
let miniteRatio = (secondsRatio + date.getMinutes()) / 60; // 0 - 59
let hourRatio =(miniteRatio + date.getHours()) / 12; // 0 - 12

triggerRotation(AIGUILLESEC, secondsRatio);
triggerRotation(AIGUILLEMIN, miniteRatio);
triggerRotation(AIGUILLEHR, hourRatio);

}

function triggerRotation(el , rotationRatio) {
el.style.transform = ` rotate(${rotationRatio * 360}deg)`;
}

// Exercuter la fonction chaque second
setInterval(demarrerLaMontre, 1000);

demarrerLaMontre();