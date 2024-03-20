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

  function modifTablero(tablero, barco, parametro) {
    tablero[parametro.fil].splice(parametro.posb, barco.length, ...barco);
  }

  function insertarBarco(tablero, barco) {
    let fila = Math.floor(Math.random() * 10);
    let longPermitida = 10 - barco.length;
    let posbarco = Math.floor(Math.random() * longPermitida);
    let parametro = { fil: fila, posb: posbarco };

    let contador = 0;
    for (let i = posbarco; i < posbarco + barco.length; i++) {
      if (tablero[fila][i] == 1) {
        contador = contador + 1;
      }
    }

    console.log(fila, longPermitida, posbarco, parametro, contador);

    if (contador == 0) {
      modifTablero(tablero, barco, parametro);
    } else if (contador != 0) {
      insertarBarco(tablero, barco);
    }
    return parametro;
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
        document.getElementById(idDelDiv).style.backgroundColor = "red";

        gameBoard[coor.x][coor.y] = 3;

        contador = contador - 1;
        let parrafo = document.getElementById("count");
        parrafo.textContent = "Count: " + contador;
      } else if (gameBoard[coor.x][coor.y] == 0) {
        document.getElementById(idDelDiv).style.backgroundColor =
          "rgb(0,232,240)";
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
        document.getElementById(Gid).style.backgroundColor = "red";

        gameBoard[coord.x - 1][coord.y - 1] = 3;
        contador = contador - 1;
        let parrafo = document.getElementById("count");
        parrafo.textContent = "Count: " + contador;
      } else if (gameBoard[coord.x - 1][coord.y - 1] == 0) {
        document.getElementById(Gid).style.backgroundColor = "rgb(0,232,240)";
      }

      let long = pos.length;
      console.log(pos);
      console.log(long);
    }
  }

  function showShips() {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] == 1) {
          let c = i + 1;
          let d = j + 1;

          let ID = "b" + c + d;
          console.log(ID);
          document.getElementById(ID).style.border = "2px solid orange";
        }
      }
    }
  }
