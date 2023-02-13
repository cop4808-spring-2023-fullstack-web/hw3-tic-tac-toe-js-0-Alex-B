/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this 
 * script in a browser page and play.  A tic-tac-toe game will be 
 * included as a child element of the element with id "tictactoe".  
 * If the page has no such element, it will just be added at the end 
 * of the body.
 */

$(function () {
    //Sets up the Event Handles When the Page loads
    $("#formselectthree").on("click", Handle3by3Click);
    $("#formselectfull").on("click", Handle4by4Click);
    $("#formselectthree_com").on("click", Handle3by3ClickCOM);
    $("#formselectfull_com").on("click", Handle4by4ClickCOM);
    $("#massdelete").on("click", ResetScore);
    var four = 0;
    var squares = [], 
        SIZE = 3,
        Com = 0,
        STOP = 0,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        sizemode,

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],
    wins2 = [15, 240, 3840, 61440, 4369, 8738, 17446, 34952, 33825, 4680, 1632]
    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        STOP = 0;
        if (Com === 1)
        {
            let x = Math.floor(Math.random() * 2);
            turn = "O"
            if (x == 0)
            {
                turn = "X";
            }

        }
        else
        {
            turn = "X";
        }
        $("#CTurn").html("Turn: "+turn)
        score = {"X": 0, "O": 0};
        moves = 0;
        if (four == '1')
        {
            SIZE = 4;
            //alert(SIZE);
        }
        else if (four == '0')
        {
            SIZE = 3;
            //alert(SIZE);
        }
        squares.forEach(function (square) {square.html(EMPTY);});
        complay();
    },

    /*
     * Returns whether the given score is a winning score.
     */
    win = function (score) {
        switch (sizemode) {
            case 0:
                for (var i = 0; i < wins2.length; i += 1) {
                    if ((wins2[i] & score) === wins2[i]) {
                        return true;
                    }
                }
                break;        
            default:
                for (var i = 0; i < wins.length; i += 1) {
                    if ((wins[i] & score) === wins[i]) {
                        return true;
                    }
                }
                break;
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {
        if ($(this).html() !== EMPTY || STOP == 1) {
            return;
        }
        $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) {
            alert(turn + " wins!");
            STOP = 1;
            if (turn === "X")
            {
                TwinX += 1;
            }
            else {
                TWinO += 1;
            }
            Tmoves += 1;
            $(document.getElementById("nohistoryfound")).html("");
            $(document.getElementById("nohistoryfound")).append("<p> X Wins: " + TwinX + " | O Wins: " + TWinO + " | Tied: " + Ttie + "</p>");
            $(document.getElementById("nohistoryfound")).append("<p> Total Moves: " + Tmoves);
            display(score[turn]);
            //startNewGame();
        } else if (moves === SIZE * SIZE) {
            alert("Tied Game!");
            Tmoves += 1;
            Ttie += 1;
            $(document.getElementById("nohistoryfound")).html("");
            $(document.getElementById("nohistoryfound")).append("<p> X Wins: " + TwinX + " | O Wins: " + TWinO + " | Tied: " + Ttie + "</p>");
            $(document.getElementById("nohistoryfound")).append("<p> Total Moves: " + Tmoves);
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
            $("#CTurn").html("Turn: "+turn)
            Tmoves += 1;
            complay();
        }
    },

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = $("<table border=1 cellspacing=0>"), indicator = 1;
        squares.length = 0
        for (var i = 0; i < SIZE; i += 1) {
            //alert(SIZE);
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                console.error("Added Square")
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe")).append(board);
        startNewGame();
    };
    var TwinX = 0, TWinO = 0, Ttie = 0, Tmoves = 0, Active = 0;
    var $history = $(document.getElementById("nohistoryfound"));

    //Orginaly used to display the winning rows while using the instance route
    display = function (score) {
        console.log("Passed into Function");
        console.log("Score:"+score);
        squares.forEach(x => {x[0].innerText = ""});
        let com_square = []
        squares.forEach(x => {com_square.push(x);});
        let pass = -1
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                pass = i;
                switch (pass) {
                    case 0:
                        com_square[0][0].innerText = turn;
                        com_square[1][0].innerText = turn;
                        com_square[2][0].innerText = turn;
                        break;
                    case 1:
                        com_square[3][0].innerText = turn;
                        com_square[4][0].innerText = turn;
                        com_square[5][0].innerText = turn;
                        break;
                    case 2:
                        com_square[6][0].innerText = turn;
                        com_square[7][0].innerText = turn;
                        com_square[8][0].innerText = turn;
                        break;
                    case 3:
                        com_square[0][0].innerText = turn;
                        com_square[3][0].innerText = turn;
                        com_square[6][0].innerText = turn;
                        break;
                    case 4:
                        com_square[1][0].innerText = turn;
                        com_square[4][0].innerText = turn;
                        com_square[7][0].innerText = turn;
                        break;
                    case 5:
                        com_square[2][0].innerText = turn;
                        com_square[5][0].innerText = turn;
                        com_square[8][0].innerText = turn;
                        break;
                    case 6:
                        com_square[0][0].innerText = turn;
                        com_square[4][0].innerText = turn;
                        com_square[8][0].innerText = turn;
                        break;
                    case 7:
                        com_square[2][0].innerText = turn;
                        com_square[4][0].innerText = turn;
                        com_square[6][0].innerText = turn;
                        break;
                    default:
                        break;
                }        
            }
        }
        com_square.length = 0;        
    }

    //Handles Setting Up 3 X 3 board
    function Handle3by3Click() {
        SIZE = 3;
        sizemode = 1;
        four = 0;
        Com = 0;
        $(document.getElementById("tictactoe")).text("");
        play();
    }
    
    //Handles Setting Up 4 X 4 board
    function Handle4by4Click() {
        SIZE = 4;
        sizemode = 0;
        four = 1;
        Com = 0;
        $(document.getElementById("tictactoe")).text("");
        play();
    }

    //Handles Setting Up 3 X 3 board COM
    function Handle3by3ClickCOM() {
        SIZE = 3;
        sizemode = 1;
        four = 0;
        Com = 1;
        $(document.getElementById("tictactoe")).text("");
        play();
    }
    
    //Handles Setting Up 4 X 4 board COM
    function Handle4by4ClickCOM() {
        SIZE = 4;
        sizemode = 0;
        four = 1;
        Com = 1;
        $(document.getElementById("tictactoe")).text("");
        play();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    complay = async function() {
        if (turn === "O" && Com === 1)
        {
            await sleep(500)
            let sq = 0;
            let com_square = []
            console.error("Found:" + sq);
            squares.forEach(x => {
                if(x[0].innerText != "X" && x[0].innerText != "O")
                {
                    console.log("Found Score:"+ x[0].indicator)
                    sq += 1;
                    com_square.push(x);
                    //console.log("HI");
                }
                else
                {
                    console.error("Found Score:" + x[0].indicator)
                }
            });
            console.log("Total Found:" +sq);
            let x = Math.floor((Math.random() * sq));
            sq = x;
            console.log("Computer Moved on:" + sq);
            console.log("Chosen Space:" + com_square[sq][0].indicator)
            com_square[sq].trigger("click");
            com_square.length = 0
        }
    }

    ResolveScore = function() {
            if (TwinX !== "0" && TwinO !== "0") 
            {
                $(document.getElementById("nohistoryfound")).append("<p> X wins:" + TwinX + "</p>");
            }
            return 0;
    }

    //Resets all scores
    function ResetScore() {
        TwinX = 0, TWinO = 0, Ttie = 0, Tmoves = 0, Active = 0;
        alert("Rested Scores");
        $(document.getElementById("nohistoryfound")).html("<p>There are NO Past Games Locally</p>");
    }
    play();
});
