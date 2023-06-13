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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
let score = 0;
let idInterval // intervale pour le tir
/////////Variable canon
let canon = 1;
let indexCanon = 7;
let memoryCanon = indexCanon;
area[13][indexCanon] = canon;
///////////////Variable Fire
let fire = 4;
let indeyFire = "10";
////////////////Variable explosion
let kill = 5;
let canShoot = true;

//////Démmarrage du jeu
let startGame = document.getElementById('startGame');
function gameInit() {            //démarrer le jeu en cliquant sur le bouton startGame
    document.getElementById("loby").style.display = 'none'; //masquer le loby
    document.getElementById("gameSection").style.display = 'flex'; //afficher le jeu et score
    document.getElementById("score").style.display = 'flex';
    console.log("iebfibekzf");
    let mobInterval // intervale pour le mouvements des ennemis
    mobInterval = setInterval(countDown, 1300)// toutes les 800 ms déclenche countdown
    function countDown() { // temps résuit de 1, appelle la fonction moveMob, réaffiche le nouveau tableau,  
        moveMob();
        refresh();
        let endGame = false;
        for (let j = 0; j < area[12].length; j++) {   //si un ennemi arrive en bas gameOver
            if (area[12][j] == 2 || area[12][j] == 3) {
                endGame = true;
                clearInterval(mobInterval);
            }
        }
        if (endGame) {
            gameOver();
        }
        let checkWin = 0;
        for (let i = 0; i < area.length; i++) {
            for (let j = 0; j < area[i].length; j++) {
                if (area[i][j] == 2 || area[i][j] == 3) {
                    checkWin++;
                }
            }
        }
        if (checkWin == 0) {
            victory();
            clearInterval(mobInterval);
        }
        checkWin = 0
    }
};


///////
function refresh() {
    let game = document.getElementById("game");
    let tab = document.createElement("table");  // Crée un tableau à afficher dans le HTML
    game.innerHTML = "";
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
    game.appendChild(tab); //ajoute le tableau terminé

    let scoreDiv = document.getElementById("score");
    scoreDiv.innerHTML = "";
    let scoreP = document.createElement("p"); //creation de la ligne de score
    scoreP.innerHTML = "score : " + score
    scoreDiv.appendChild(scoreP);

}



window.addEventListener('keyup', (event) => {
    if (event.code == "ArrowRight") {  ////dépalcements vers la droite
        if (indexCanon < 14) {
            indexCanon++;
            area[13][indexCanon] = canon;
            area[13][indexCanon - 1] = 0
            refresh();
        }
    }
    if (event.code == "ArrowLeft") {    ///dépalcements vers la gauche
        if (indexCanon > 0) {
            indexCanon--;
            area[13][indexCanon] = canon;
            area[13][indexCanon + 1] = 0

        }
    }
    if (event.code == "Space") {        /////appel de la fonction tir sur espace
        if (canShoot) {
            canShoot = false            ////empeche de tirer plus d'un missile
            memoryCanon = indexCanon
            idInterval = setInterval(() => {   /////permet d'afficher le missile frame par frame
                moveFire()
            }, 100);
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
    if (area[indeyFire][memoryCanon] == 3 || area[indeyFire][memoryCanon] == 2 || indeyFire == 0 ) { //si le tir rencontre autre chose que du vide
        if (area[indeyFire][memoryCanon] == 3 || area[indeyFire][memoryCanon]==2){
            score += 100;
        }
        area[indeyFire][memoryCanon] = kill;    //remplace l'ennemi touché par explosion
        area[indeyFire + 1][memoryCanon] = 0;   //efface le missile qui a touché
        setTimeout(() => {
            for (let i = 0; i < area.length; i++) {
                for (let j = 0; j < area[i].length; j++) {  //remplace l'explosion par du vide au bout de 500 milisecondes
                    if (area[i][j] === 5) {
                        area[i][j] = 0;
                    }
                }
            }
            refresh()
           
        }, 500)
        setTimeout(() => {
            for (let i = 0; i < area.length; i++) {
                for (let j = 0; j < area[i].length; j++) {  
                    if (area[i][j] === 4) {
                        area[i][j] = 0;
                    }
                }
            }
            refresh()
        }, 5)
        clearInterval(idInterval);             //fin de la boucle interval
        indeyFire = "10"; //remet le départ du tir en bas
        canShoot = true;                        // possibilité de retirer
    }
    //area[indeyFire][memoryCanon] = "0"   
    refresh();
}

///////Déplacements des ennemis

let moveRight = false;///permet de donner la direction de déplacement
let index = 0; //ligne de réference
function moveMob() {
    if (!moveRight && area[index][0] == 0) { //permet de déplacer les ennemis vers la gauche
        for (let i = index; i < index + 5; i++) {
            let firstElement = area[i].shift();
            area[i].push(firstElement);

        }
    } else if (moveRight == true && area[index][14] == 0) { //déplacement vers la droite
        for (let i = index; i < index + 5; i++) {
            area[i].unshift(0);;
            area[i].splice(15, 1);
        }
    }
    else if (!moveRight && area[index][0] != 0) { //descend d'une ligne quand les ennemis touchent le bord gauche
        area.splice(index + 6, 1);
        area.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        index++;
        moveRight = true;
    }
    else if (moveRight = true && area[index][14] != 0) { //descend d'une ligne quand les ennemis touchent le bord froit
        area.splice(index + 6, 1);
        area.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        index++;
        moveRight = false;
    }
    console.log(area);
}
///////Fonction pour la défaite
function gameOver() {
    console.log("hgeiyug");
    let gameDiv = document.getElementById('game'); //fait clignoter l'affichage toutes les 500ms
    let visible = true;
    let flash = setInterval(() => {
        if (visible) {
            gameDiv.style.display = 'none';
        } else {
            gameDiv.style.display = 'block';
        }
        visible = !visible;
    }, 500);

    setTimeout(() => {               //pendant 3Secondes
        clearInterval(flash);        //stop le flash
        gameDiv.style.display = 'none';  //masque le tableau 
        let body = document.querySelector("section");
        let message = document.createElement("h2");    //Affichage du tableau gameOver
        let finalScore = document.createElement("h2");
        message.innerHTML = "VOUS AVEZ  PERDU";
        finalScore.innerHTML = "Score : " + score;
        let divGameOver = document.createElement("div")
        divGameOver.innerHTML = " <button onclick='reload()' >REJOUER</button>"
        body.appendChild(message);
        body.appendChild(finalScore);
        body.appendChild(divGameOver);
    }, 3000);

}


/////Fonction victoire
function victory() {
    let gameDiv = document.getElementById('game');
    gameDiv.style.display = 'none';  //masque le tableau 
    let body = document.querySelector("section");
    let message = document.createElement("h2");    //Affichage de la page victoire
    let finalScore = document.createElement("h2");
    let divGameOver = document.createElement("div")
    message.innerHTML = "VICTOIRE";
    finalScore.innerHTML = "Score : " + score;
    divGameOver.innerHTML = " <button onclick='reload()' >REJOUER</button>"
    body.appendChild(message);
    body.appendChild(finalScore);
    body.appendChild(divGameOver);

}

function reload(){
    window.location.reload();
}

