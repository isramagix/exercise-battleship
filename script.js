//      GAME BOARD GAME

// 0-empty
// 1- part of a ship
// 3- a sunken part of a ship

let gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ship1 = [1, 1, 1, 1, 1];
const ship2 = [1, 1, 1, 1];
const ship3 = [1, 1, 1];
const ship4 = [1, 1, 1];
const ship5 = [1, 1];
const ship6 = [1, 1];

function insertarBarco(tablero, barco) {
  let fila = Math.floor(Math.random() * 10);
  let longPermitida = 10 - barco.length;
  let posbarco = Math.floor(Math.random() * longPermitida);

  // Comprobar si la posición elegida está ocupada o hay barcos adyacentes
  if (comprobarPosicion(tablero, fila, posbarco, barco.length)) {
    let parametro = { fil: fila, posb: posbarco };
    modifTablero(tablero, barco, parametro);
    return parametro;
  } else {
    // Intentar de nuevo si la posición no es válida
    return insertarBarco(tablero, barco);
  }
}

function comprobarPosicion(tablero, fila, posbarco, longitud) {
  // Verificar si la posición está dentro del tablero
  if (
    fila < 0 ||
    fila >= tablero.length ||
    posbarco < 0 ||
    posbarco + longitud > tablero[fila].length
  ) {
    return false;
  }

  // Comprobar si la posición está ocupada o si hay barcos adyacentes
  for (let i = fila - 1; i <= fila + 1; i++) {
    for (let j = posbarco - 1; j <= posbarco + longitud; j++) {
      // Verificar si la posición está dentro del tablero y si hay un barco en esa posición
      for (let k = posbarco; k < posbarco + longitud; k++) {
        if (
          (i === fila - 1 ||
            i === fila + 1 ||
            (i === fila && (j === k - 1 || j === k + 1))) &&
          i >= 0 &&
          i < tablero.length &&
          j >= 0 &&
          j < tablero[fila].length &&
          tablero[i][j] === 1
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

function modifTablero(tablero, barco, parametro) {
  tablero[parametro.fil].splice(parametro.posb, barco.length, ...barco);
}
insertarBarco(gameBoard, ship1);
insertarBarco(gameBoard, ship2);
insertarBarco(gameBoard, ship3);
insertarBarco(gameBoard, ship4);
insertarBarco(gameBoard, ship5);
insertarBarco(gameBoard, ship6);

console.log(gameBoard);

let contador = 0;
for (let i = 0; i < gameBoard.length; i++) {
  for (let j = 0; j < gameBoard[i].length; j++) {
    if (gameBoard[i][j] == 1) {
      contador = contador + 1;
    }
  }
}

console.log(contador);
let parrafo = document.getElementById("count");
parrafo.textContent = "Count: " + contador;

document.querySelectorAll(".BoardTab").forEach((element) => {
  element.addEventListener("click", function () {
    var idDelDiv = this.id;

    function getIDElement(idDelDiv) {
      if (idDelDiv.length == 3) {
        let divposX = Number(idDelDiv[1]) - 1;
        let divposY = Number(idDelDiv[2]) - 1;
        return { x: divposX, y: divposY };
      } else if (idDelDiv.length == 4) {
        if (idDelDiv[2] == "1") {
          let divposX = Number(idDelDiv[1]) - 1;
          let divposY = Number(idDelDiv[2] + idDelDiv[3]) - 1;
          return { x: divposX, y: divposY };
        } else if (idDelDiv[2] == "0") {
          let divposX = Number(idDelDiv[1] + idDelDiv[2]) - 1;
          let divposY = Number(idDelDiv[3]) - 1;
          return { x: divposX, y: divposY };
        }
      } else if (idDelDiv.length == 5) {
        let divposX = Number(idDelDiv[1] + idDelDiv[2]) - 1;
        let divposY = Number(idDelDiv[3] + idDelDiv[4]) - 1;
        return { x: divposX, y: divposY };
      }
    }

    let coor = getIDElement(idDelDiv);

    if (gameBoard[coor.x][coor.y] == 1) {
      let casilla = document.getElementById(idDelDiv);
      casilla.style.background = "url('./img/bomba.gif')";
      casilla.style.backgroundPosition = "0px 0px";
      gameBoard[coor.x][coor.y] = 3;

      contador = contador - 1;

      if (contador === 0) {
        // Obtener referencia al div que deseas mostrar
        let divAMostrar = document.getElementById("alerta");
        // Mostrar el div
        divAMostrar.style.display = "flex"; // O cualquier otro valor para mostrar el div
      } else {
        // Si el contador no es igual a 0, asegúrate de que el div esté oculto
        let divAMostrar = document.getElementById("alerta");
        divAMostrar.style.display = "none"; // Opcional, para asegurarse de que esté oculto
      }

      let parrafo = document.getElementById("count");
      parrafo.textContent = "Count: " + contador;
    } else if (gameBoard[coor.x][coor.y] == 0) {
      let casilla = document.getElementById(idDelDiv);
      casilla.style.background = "none";
      casilla.style.backgroundPosition = "0px 0px";
    }
  });
});

function alertFire() {
  let pos = window.prompt("Porfavor ingresa una posición de la forma X,X");
  if (pos != null) {
    function getPos(pos) {
      if (pos.length == 3) {
        let posX = Number(pos[0]);
        let posY = Number(pos[2]);
        return { x: posX, y: posY };
      } else if (pos.length == 4) {
        if (pos[2] == "1") {
          let posX = Number(pos[0]);
          let posY = Number(pos[2] + pos[3]);
          return { x: posX, y: posY };
        } else if (pos[1] == "0") {
          let posX = Number(pos[0] + pos[1]);
          let posY = Number(pos[3]);
          return { x: posX, y: posY };
        }
      } else if (pos.length == 5) {
        let posX = Number(pos[0] + pos[1]);
        let posY = Number(pos[3] + pos[4]);
        return { x: posX, y: posY };
      }
    }

    function getID(a, b) {
      let id = "b" + a + b;
      return id;
    }

    let coord = getPos(pos);
    console.log(pos);

    let Gid = getID(coord.x, coord.y);

    if (gameBoard[coord.x - 1][coord.y - 1] == 1) {
      document.getElementById(Gid).style.background = "url('./img/bomba.gif')";

      gameBoard[coord.x - 1][coord.y - 1] = 3;

      contador = contador - 1;

      if (contador === 0) {
        let divAMostrar = document.getElementById("alerta");
        divAMostrar.style.display = "flex";
      } else {
        let divAMostrar = document.getElementById("alerta");
        divAMostrar.style.display = "none";
      }

      let parrafo = document.getElementById("count");
      parrafo.textContent = "Count: " + contador;
    } else if (gameBoard[coord.x - 1][coord.y - 1] == 0) {
      document.getElementById(Gid).style.background = "none";
    }

    let long = pos.length;
    console.log(pos);
    console.log(long);
  }
}

function showShips() {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] == 1 || gameBoard[i][j] == 3) {
        let c = i + 1;
        let d = j + 1;

        let ID = "b" + c + d;
        console.log(ID);
        document.getElementById(ID).style.border = "2px solid orange";
      }
    }
  }
}

function Recargar() {
  location.reload();
}
