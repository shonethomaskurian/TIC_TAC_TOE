    var win = new Array();
    var player1click = new Array();
    var player2click = new Array();
    var timer;
    var playername;
    var numberOfPlayers = 2;
    var currentPlayer = 0;
    var move = 0;
    var points1 = 0;    // player 1 points
    var points2 = 0;    // player 2 points
    var size = 3;

    function Board() {
        var Parent = document.getElementById("game");
        var counter = 1;

        while (Parent.hasChildNodes()) {
            Parent.removeChild(Parent.firstChild);
        }

        for (s = 0; s < 3; s++) {
            var row = document.createElement("tr");//initialisation of row

            for (r = 0; r < 3; r++) {
                var col = document.createElement("td");//initialisation of coloumn
                col.id = counter;

                var handler = function(e) {
                    if (currentPlayer == 0) {
                        this.innerHTML = "X";
                        player1click.push(parseInt(this.id));
                        player1click.sort(function(a, b) {
                           return a - b
                         });
                        d('player1').classList.remove('selected');
                        d('player2').classList.add('selected');
                    }

                    else {
                        this.innerHTML = "O";
                        player2click.push(parseInt(this.id));
                        player2click.sort(function(a, b) { return a - b });
                        d('player1').classList.add('selected');
                        d('player2').classList.remove('selected');
                    }

                    if (winner())
                    {
                        if(currentPlayer == 0)
                            points1++;
                        else
                            points2++;

                        document.getElementById("player1").innerHTML = points1;
                        document.getElementById("player2").innerHTML = points2;

                        reset();
                        Board();
                    }

                    else if (player2click.length + player1click.length == 9)
                    {
                        window.alert("Match Tied");
                        reset();
                        Board();
                    }
                    else
                    {
                        if (currentPlayer == 0)
                            currentPlayer = 1;
                        else
                            currentPlayer = 0;
                        this.removeEventListener('click', arguments.callee);
                    }
                };

                col.addEventListener('click', handler);

                row.appendChild(col);
                counter++;
            }

            Parent.appendChild(row);
        }

        loadAnswers();
    }

    function d(id)
    {
        var el = document.getElementById(id);
        return el;
    }
    function reset()
    {
        currentPlayer = 0;
        player1click = new Array();
        player2click = new Array();
        d('player1').classList.add('selected');
        d('player2').classList.remove('selected');
    }

    function loadAnswers()
    {
        win.push([1, 2, 3]);//row wise
        win.push([4, 5, 6]);
        win.push([7, 8, 9]);
        win.push([1, 4, 7]);//coloumn wise
        win.push([2, 5, 8]);
        win.push([3, 6, 9]);
        win.push([1, 5, 9]);//diagonal
        win.push([3, 5, 7]);
    }

    function winner() {
        // check if current player has a winning hand
        // only stsrt checking when player x has size number of selections
        var won = false;
        var playerSelections = new Array();

        if (currentPlayer == 0)
            playerSelections = player1click;
        else
    playerSelections = player2click;

        if (playerSelections.length >= size) {
            // check if any 'winners' are also in your selections

            for (i = 0; i < win.length; i++) {
                var sets = win[i];  // winning hand
                var setFound = true;

                for (r = 0; r < sets.length; r++) {
                    // check if number is in current players hand
                    // if not, break, not winner
                    var found = false;

                    // players hand
                    for (s = 0; s < playerSelections.length; s++) {
                        if (sets[r] == playerSelections[s]) {
                            found = true;
                            break;
                        }
                    }

                    // value not found in players hand
                    // not a valid set, move on
                    if (found == false) {

                        setFound = false;
                        break;
                    }
                }


                if (setFound == true) {
                   document.getElementById("appreciate").innerHTML = "CONGRAGULATIONS";

                  if(currentPlayer==0){
              window.alert("Player 1  won");  }
                  else{
                  window.alert("Player 2  won");}
                  currentPlayer==playername;
                    won = true;
                    $(document).ready(function() {
                      $('#appreciate').fadeOut(5000); // 5 seconds x 1000 milisec = 5000 milisec
                             });
                    break;
                }
            }
        }

        return won;

    }

    window.addEventListener('load', Board);
