let area = [
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let idInterval // intervale pour le tir
let test = ""
/////////Variable canon
let canon = 1;
let indexCanon = 7
let memoryCanon = indexCanon
area[12][indexCanon] = canon
///////////////Variable Fire
let fire = 4;
let indeyFire = "10"
////////////////Variable explosion
let kill = 5;
let canShoot = true;

///////
function refresh() {
    let game = document.getElementById("game");
    let tab = document.createElement("table");  // Crée un tableau à afficher dans le HTML
    game.innerHTML = ""
    for (let i = 0; i < area.length; i++) {  // Parcourt chaque ligne du tableau et crée une ligne de tableau HTML correspondante
        let row = document.createElement("tr");
        for (let j = 0; j < area[i].length; j++) {  // Parcourt chaque cellule de la ligne et crée une cellule HTML correspondante
            let cell = document.createElement("td");
            // Remplit la cellule du tableau html avec le contenu de la cellule du array
            if (area[i][j] == 1) {
                cell.innerHTML = "<img src='./assets/img/canon.png' >";
                canon = area[i][j];
            }
            if (area[i][j] == 2) {
                cell.innerHTML = "<img src='./assets/img/meduse.gif' >"
            }
            if (area[i][j] == 3) {
                cell.innerHTML = "<img src='./assets/img/alien.gif' >"
            }
            if (area[i][j] == 4) {
                cell.innerHTML = "<img src='./assets/img/fire.png' >"
            }
            if (area[i][j] == 5) {
                cell.innerHTML = "<img src='./assets/img/explosion.gif' >"
            }
            row.appendChild(cell);    // Ajoute la cellule à la ligne
        }
        tab.appendChild(row); // Ajoute la ligne au tableau
    }
    console.log(area);
    game.appendChild(tab); //ajoute le tableau terminé
}

refresh();

window.addEventListener('keyup', (event) => {
    if (event.code == "ArrowRight") {  ////dépalcements vers la droite
        if (indexCanon < 14) {
            indexCanon++;
            area[12][indexCanon] = canon;
            area[12][indexCanon - 1] = 0
            refresh();
        }
    }
    if (event.code == "ArrowLeft") {    ///dépalcements vers la gauche
        if (indexCanon > 0) {
            indexCanon--;
            area[12][indexCanon] = canon;
            area[12][indexCanon + 1] = 0
            
        }
    }
    if (event.code == "Space") {        /////appel de la fonction tir sur espace
        if (canShoot) {
            canShoot = false            ////empeche de tirer plus d'un missile
            memoryCanon = indexCanon
            idInterval = setInterval(() => {   /////permet d'afficher le missile frame par frame
                moveFire()
            }, 200);
        }
    }

    refresh();
})
/////////fonction pour gérer le tir
function moveFire(indexCanon) {
    area[indeyFire][memoryCanon] = fire; /// donne à l'index l'image du tir
    if (indeyFire > 0) { ////tant que le tir n'est pas en haut l'index remonte
        indeyFire--;
    }
    area[indeyFire + 2][memoryCanon] = 0 //efface l'ancienne position du tir
    refresh()

    if (area[indeyFire][memoryCanon] != 0) { //si le tir rencontre autre chose que du vide
        area[indeyFire + 1][memoryCanon] = 0;   //efface le missile qui a touché
        area[indeyFire][memoryCanon] = kill;    //remplace l'ennemi touché par explosion
        setTimeout(() => {
            area[indeyFire][memoryCanon] = 0;   //remplace l'explosion par du vide au bout de 200 milisecondes
            refresh()
            indeyFire = "10";
        }, 200)
        clearInterval(idInterval);             //fin de la boucle interval
        canShoot = true;                        // possibilité de retirer
    }
    //area[indeyFire][memoryCanon] = "0"   
    refresh();
}

///////Fonction déplacements des ennemis
let mobInterval // intervale pour le mouvements des ennemis
let moveRight = false;
mobInterval =setInterval(countDown , 800)
let index = 0;
function moveMob() {
    if (!moveRight && area[index][0] == 0) {
        for (let i = index; i < index+5; i++) {
            let firstElement = area[i].shift();
            area[i].push(firstElement);
            console.log("left");
        }
    } else if (moveRight == true && area[index][14] == 0) {
        console.log("right34");
        for (let i = index; i < index+5; i++) {
            area[i].unshift(0);
            area[i].splice(15, 1)
        }
    }
    else if (!moveRight && area[index][0] != 0) {
        area.splice(9, 1)
        area.unshift([])
        index++
        moveRight = true
    }
    else if (moveRight = true && area[index][14] != 0) {
        area.splice(9, 1)
        area.unshift([])
        index++
        moveRight = false
    }
    console.log(index);

}
let time = 40
function countDown() {
    time--
    moveMob()
    refresh()
    if (time <= 0) {
        clearInterval(mobInterval)
        
    }
}
countDown()