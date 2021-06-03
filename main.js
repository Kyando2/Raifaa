const ALIVE = "⬛";
const DEAD = "⬜";
const SIZE = 6400;
const DELAY = 200;
let DUOS = [
[-1, -1],
[-1, 0],
[-1, 1],
[0, -1]
[0,0],
[0,1],
[1, -1],
[1,0],
[1,1],
]

function generateStartConfig(num) {
    console.log(num);
    console.log(num.length);
    var startSize = Math.sqrt(num.length);
    if (!Number.isInteger(startSize)) {
        throw "Not a square number";
    }
    var numAsArray = Array.from(num.toString());
    var obj = [];
    for (i = 0; i < startSize; i++) {
        obj[i] = numAsArray.slice(i*startSize, (i+1)*startSize);
    }
    return obj
}

function printToScreen(data) {
    var game = document.getElementById("game");
    var myString = "";
    for (i = 0; i < data.length; i++) {
        row = data[i];
        myString = myString + "<div>"
        for (j = 0; j < row.length; j++) {
            myString = myString.concat(row[j] == 1 ? ALIVE : DEAD);
        }
        myString = myString + "</div>"
    }
    console.log(ALIVE);
    game.innerHTML = myString;
}

function randomBigNumber() {
    return makeBigInt(SIZE);
}

function makeBigInt(length) {
    var result = [];
    var characters = '001';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() *
 charactersLength)));
   }
   return result.join('');
}

function updateTick(data) {
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data.length; j++) {
            isLive = data[i][j];
            // Adjacent
            var total = 0;
            for (k = 0; k < DUOS.length; k++) {
                duo = DUOS[k];
                total += getFromData(data, duo[0]+i, duo[1]+j);
            }
            if ((total > 3 || total < 2) && isLive == 1) {
                data[i][j] = 0;
            }
            if (total == 3 && isLive == 0) {
                data[i][j] = 1;
            }
        }
    }
}

function getFromData(data, i, j) {
    if (i > 0 && i < data.length && j > 0 && j < data.length) {
        return parseInt(data[i][j]);
    }  else {
        return 0;
    }
}

async function start() {
    var g_data = generateStartConfig(randomBigNumber());
    window.setInterval(() => {
        updateTick(g_data);
        printToScreen(g_data);
    },
        DELAY
    )
}

start();