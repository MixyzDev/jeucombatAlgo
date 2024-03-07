const prompt = require("prompt-sync")()
// fonction randomize
function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
// variablede l'algo
console.log("Salut l'ami et bienvenu dans ce tout nouveau jeu de combat du futur! Tu auras la possibilité d'incarner le Guerrier du Feu dans ce combat équipe contre le Sombre Lutin!");
let lap = 1
let choice = ""
let attackOne = {
    nom: "Frappe Rapide",
    damage: -10,
    accu: 2
}
let attackTwo = {
    nom: "Soin léger",
    damage: 15,
    accu: 3
}
let attackThree = {
    nom: "Coup Puissant",
    damage: -20,
    accu: 3
}
let attackFour = {
    nom: "Frappe Dévastatrice",
    damage: -30,
    accu: 4
}
let player = {
    nom: "Guerrier du Feu",
    pv: 100,
    attack: [attackOne, attackTwo, attackThree, attackFour]
}
let bot = {
    nom: "Sombre Lutin",
    pv: 100,
    attack: [attackOne, attackTwo, attackThree, attackFour]
}

//fonction qui va nous permettre de choisir parmis les attaques

function choiceAttack() {
    do {
        console.log("Vous avez le choix entre 4 attaques!");
        for (let i = 0; i < player.attack.length; i++) {
            console.log(`${player.attack[i].nom + " " + "- " + [i + 1]}`);
        }
        choice = parseInt(prompt("Quelle attaque voulez-vous lancer?"))
    } while (choice < 1 || choice > 4);
    console.log(`Vous lancer ${player.attack[choice - 1].nom}`);
    attck(player.attack[choice - 1])
}

//fonction qui va faire l'action d'attaquer

function attck(atk) {
    let hit = randomize(1, atk.accu)
    if (hit == atk.accu) {
        if (atk.damage > 0) {
            player.pv += atk.damage
            console.log(`Vous buvez une potion de soin! pv : ${player.pv}`);

        } else {
            console.log(`Vous touchz Sombre Lutin avec ${atk.nom}`);
            bot.pv += atk.damage
        }

    } else {
        if (atk.damage > 0) {
            console.log("rater");

        } else {
            console.log("Votre sort ne touche pas Sombre Lutin!");
        }

    }
    console.log(`Il reste ${bot.pv} PV à ${bot.nom}`);
}
choiceAttack()

// fonction qui choisi l'attaque random de votre adversaire

function choiceAttackBot() {
    for (let i = 0; i < bot.attack.length; i++) {
        console.log(bot.attack[i].nom + " " + [i + 1]);
    }
    do {
        choice = randomize(0, bot.attack.length - 1)
    } while (choice < 1 || choice > 4);
    console.log(`Votre adversaire lance ${bot.attack[choice].nom}!`);
    botattck(bot.attack[choice])

}

// fonction qui fait attaquer le bot

function botattck(atck) {
    let hit = randomize(0, atck.accu)
    if (hit == atck.accu) {
        if (atck.damage > 0) {
            bot.pv += atck.damage
            console.log(`Sombre Lutin bois une potion de soin! pv : ${bot.pv}`);

        } else {
            console.log(`Vous etes touché par ${atck.nom}`);
            player.pv += atck.damage
        }

    } else {
        if (atck.damage > 0) {
            console.log("Sombre Lutin fait tomber la potion par terre!");

        } else {
            console.log("Vous escquivez le sort de Sombre Lutin!");
        }

    }
    console.log(`Il reste ${player.pv} PV à ${player.nom}`);
}
choiceAttackBot()

// while qui fait jouer tant que les PV des joueurs ne sont pas a 0

while (true) {
    console.log(`C'est au tour de ${player.nom}`);
    choiceAttack();
    if (bot.pv <= 0) {
        console.log("Sombre Lutin est K.O. You WIN!");
        break;


    }
    console.log(`C'est au tour de ${bot.nom}`);
    choiceAttackBot()
    if (player.pv <= 0) {
        console.log("Vous etes K.O. You Loose!");
        break;


    }
}