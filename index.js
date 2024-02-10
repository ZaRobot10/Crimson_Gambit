
var is_selected = 0;

var possible_moves = [];
var prev_index = -1;
var whos_playing = 0; // 0 for white and 1 for black
var playing = ["White's Turn", "Black's Turn"];


var white_rook_level = 2;
var black_rook_level = 2;


var white_queen_level = 2;
var black_queen_level = 3;

var gameover = false;

var black_pieces = 8;
var white_pieces = 8;

var promotion = false;

var moves_left = 6;

// make a random cell in the top 2 rows red and a an random cell in the bottom 2 cell have a class called victory

$(".upgrade").toggle();

// 1 to 8
// 9 to 16
var top_red = Math.floor(Math.random() * 8) + 1;
top_red += 8;

// if it is in corner find it again
while (top_red == 1 || top_red == 8 || top_red == 9 || top_red == 16)
{
    console.log(top_red);
    top_red = Math.floor(Math.random() * 8) + 1;
    top_red += 8;
    
}


// 1 to 8
var bottom_red = Math.floor(Math.random() * 8) + 1;
bottom_red += 48;

while (bottom_red == 49 || bottom_red == 56 || bottom_red == 57 || bottom_red == 64)
{
    console.log(bottom_red);
    bottom_red = Math.floor(Math.random() * 8) + 1;
    bottom_red += 48;
    
}

$("." + top_red).toggleClass("victory black-v");

$("." + bottom_red).toggleClass("victory white-v");

var moves = 1;

surroundWhiteRedPiece();
surroundBlackRedPiece();

$(".upgrade").click(function()
{
  
    if (moves >= 5 && moves <= 14)
    {
        var is_queen = $(this).hasClass("daqueen");
        

        if (is_queen)
        {
            moves ++;

            if (whos_playing % 2 == 0)
            {
                white_queen_level ++;
                $(".w-queen").html(white_queen_level);
            }

            else
            {
                black_queen_level ++;
                $(".b-queen").html(black_queen_level);
            }
            
        }

        else
        {
            moves ++;

            if (whos_playing % 2 == 0)
            {
                white_rook_level ++;
                $(".w-rook").html(white_rook_level);
            }

            else
            {
                black_rook_level ++;
                $(".b-rook").html(black_rook_level);

            }
        }

       

        whos_playing ++;

        if (whos_playing % 2 == 0)
        {
            $(".small_icon_queen").attr("src", "./images/white_queen.png");
            $(".small_icon_rook").attr("src", "./images/white_rook.png");


            moves_left --;
            $(".whos-turn h3").html("Moves left before the battle begins: " + moves_left);

        }

        else
        {
            $(".small_icon_queen").attr("src", "./images/black_queen.png");
            $(".small_icon_rook").attr("src", "./images/black_rook.png");
        }
        $(".whos-turn h1").html(playing[whos_playing % 2]);

        if (moves == 15)
        {
            $(".whos-turn h2").html("Win the game");
            $(".upgrade").fadeOut();
            $(".whos-turn h3").toggle();

            $(".daqueen").html('Promote to Knight <img class="small_icon_queen" src="./images/white_queen.png" alt="">');
            $(".darook").html('Promote to Bishop <img class="small_icon_rook" src="./images/white_rook.png" alt="">');
           
        }


    }

    if (promotion)
    {
        
        // the first option will be the knight, which has a class of daqueen

        var is_knight = $(this).hasClass("daqueen");
        if (whos_playing % 2 == 0)
        {
            if (is_knight)
            {
                
                $("." + (prev_index + 1) + " img").attr("src", "./images/white_knight.png");
                $("." + (prev_index + 1) + " img").toggleClass("knight");
                $("." + (prev_index + 1) + " img").toggleClass("pawn");
            }

            else
            {
                $("." + (prev_index + 1) + " img").attr("src", "./images/white_bishop.png");
                $("." + (prev_index + 1) + " img").toggleClass("bishop");
                $("." + (prev_index + 1) + " img").toggleClass("pawn");
            }
        }

        else
        {
            if (is_knight)
            {
                $("." + (prev_index + 1) + " img").attr("src", "./images/black_knight.png");
                $("." + (prev_index + 1) + " img").toggleClass("knight");
                $("." + (prev_index + 1) + " img").toggleClass("pawn");
            }

            else
            {
                $("." + (prev_index + 1) + " img").attr("src", "./images/black_bishop.png");
                $("." + (prev_index + 1) + " img").toggleClass("bishop");
                $("." + (prev_index + 1) + " img").toggleClass("pawn");
            }
        }

        promotion = false;
        $(".upgrade").fadeOut();

        whos_playing ++;
        $(".whos-turn h2").html("Win the game");
        $(".whos-turn h1").html(playing[whos_playing % 2]);


       
    }
})

$('.container > *').click(function() {



    var index = $(this).index();
    var is_piece = $(this).hasClass("piece");
    // console.log(this);
    
    if (moves <= 14)
    {
        // whites move
        // console.log(moves);
        if (whos_playing % 2 == 0)
        {
            
            // place your queen and rook
            if (moves == 1)
            {
                
                if ((index + 1) >= 41 && $("." + (index + 1)).hasClass("victory") == 0 && $("." + (index + 1)).hasClass("piece") == 0)
                {
                    $("." + (index + 1)).html('<img class="white-piece queen" src="./images/white_queen.png" alt="white-rook"> <div class="top-right w-queen">' + white_queen_level + '</div>');
                    $("." + (index + 1)).toggleClass("piece");
                    moves ++;
                    $(".whos-turn h2").html("Place Your Rook");
                    
                   
                }
            }

            else if (moves == 2)
            {
                if ((index + 1) >= 41 && $("." + (index + 1)).hasClass("victory") == 0 && $("." + (index + 1)).hasClass("piece") == 0)
                {
                    $("." + (index + 1)).html('<img class="white-piece rook" src="./images/white_rook.png" alt="white-rook"> <div class="top-right w-rook">' + white_rook_level + '</div>');
                    $("." + (index + 1)).toggleClass("piece");
                    moves ++;
                    whos_playing ++;
                    $(".whos-turn h1").html(playing[whos_playing % 2]);
                    $(".whos-turn h2").html("Place Your Queen");
                }
            }

            else
            {
                if ((index + 1) >= 41 && $("." + (index + 1)).hasClass("victory") == 0 && $("." + (index + 1)).hasClass("piece") == 0)
                {
                    $("." + (index + 1)).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
                    $("." + (index + 1)).toggleClass("piece");
                    moves ++;
                    whos_playing ++;
                    $(".whos-turn h1").html(playing[whos_playing % 2]);
                    $(".small_icon_queen").attr("src", "./images/black_queen.png");
                    $(".small_icon_rook").attr("src", "./images/black_rook.png");
                    white_pieces ++;
                   
                }
            }

           
            
        }
        
        //  blacks move
        else
        {
            // place your queen and rook

            if (moves == 3)
            {
                if ((index + 1) < 25 && $("." + (index + 1)).hasClass("victory") == 0 && $("." + (index + 1)).hasClass("piece") == 0)
                {
                    $("." + (index + 1)).html('<img class="black-piece queen" src="./images/black_queen.png" alt="white-rook"> <div class="top-right b-queen">' + black_queen_level+ '</div>');
                    $("." + (index + 1)).toggleClass("piece");
                    moves ++;
                    $(".whos-turn h2").html("Place Your Rook");
                   
                }
            }

            else if (moves == 4)
            {
                if ((index + 1) < 25 && $("." + (index + 1)).hasClass("victory") == 0 && $("." + (index + 1)).hasClass("piece") == 0)
                {
                    $("." + (index + 1)).html('<img class="black-piece rook" src="./images/black_rook.png" alt="white-rook"> <div class="top-right b-rook">' + black_rook_level + '</div>');
                    $("." + (index + 1)).toggleClass("piece");
                    moves ++;
                    whos_playing ++;
                    $(".whos-turn h1").html(playing[whos_playing % 2]);
                    $(".whos-turn h2").html("Either place your pawn or upgrade your queen or rook");
                    $(".upgrade").fadeIn();

                    moves_left --;
                    $(".whos-turn h3").html("Moves left before the battle begins: " + moves_left);
                }
            }

            else
            {
                if ((index + 1) < 25 && $("." + (index + 1)).hasClass("victory") == 0 && $("." + (index + 1)).hasClass("piece") == 0)
                {
                    $("." + (index + 1)).html('<img class="black-piece pawn" src="./images/black_pawn.png" alt="white-rook">');
                    $("." + (index + 1)).toggleClass("piece");
                    moves ++;
                    whos_playing ++;
                    $(".whos-turn h1").html(playing[whos_playing % 2]);
                    black_pieces ++;
                    $(".small_icon_queen").attr("src", "./images/white_queen.png");
                    $(".small_icon_rook").attr("src", "./images/white_rook.png");

                    moves_left --;
                    $(".whos-turn h3").html("Moves left before the battle begins: " + moves_left);
                    
                }
            }
        }
        console.log(moves);

        if (moves == 15)
        {
            $(".whos-turn h2").html("Win the game");
            $(".upgrade").fadeOut();
            $(".whos-turn h3").toggle();
        }

    }

    else
    { 
        if (gameover == false && promotion == false)
        {

        
            if (is_piece == 1)
            {
                // we will make two cases, one when the same piece is selecte and the other when a different piece is selected

                // if 
                var current_s = "." + (index + 1);
                var s = "." + (index + 1) + " img";
                var is_black_piece = $(s).hasClass("black-piece");



                // console.log(s);
                
                if (is_selected == 0)
                {
                    if (whos_playing % 2 == 0 && is_black_piece == 0 || whos_playing % 2 == 1 && is_black_piece == 1)
                    {
                        is_selected = 1;
                        prev_index = index;
                        $(s).toggleClass("selected");
                        
                        if ($(s).hasClass("white-piece") && $(s).hasClass("pawn"))
                        {
                            moveWhitePawn(index);
                        }

                        else if ($(s).hasClass("black-piece") && $(s).hasClass("pawn"))
                        {
                            moveBlackPawn(index);
                        }

                        else if ($(s).hasClass("white-piece") && $(s).hasClass("rook"))
                        {
                            moveWhiteRook(index);
                        }

                        else if ($(s).hasClass("black-piece") && $(s).hasClass("rook"))
                        {
                            moveBlackRook(index);
                        }

                        else if ($(s).hasClass("white-piece") && $(s).hasClass("queen"))
                        {
                            moveWhiteQueen(index);
                        }

                        else if ($(s).hasClass("black-piece") && $(s).hasClass("queen"))
                        {
                            moveBlackQueen(index);
                        }

                        else if ($(s).hasClass("white-piece") && $(s).hasClass("knight"))
                        {
                            moveWhiteKnight(index);
                        }

                        else if ($(s).hasClass("black-piece") && $(s).hasClass("knight"))
                        {
                            moveBlackKnight(index);
                        }

                        else if ($(s).hasClass("white-piece") && $(s).hasClass("bishop"))
                        {
                            moveWhiteBishop(index);
                        }

                        else if ($(s).hasClass("black-piece") && $(s).hasClass("bishop"))
                        {
                            moveBlackBishop(index);
                        }

                    }
                
                }

                else
                {
                    // if the same piece is selected again
                    if (prev_index == index)
                    {
                        is_selected = 0;
                        remove_moves(to_skip = index + 1);
                        $(s).toggleClass("selected");
                
                    }

                    // if a different piece is selected
                    else
                    {
                        if ($(s).hasClass("circle"))
                        {

                            
                            is_selected = 0;
                            var s1 = "." + (index + 1);

                            remove_moves(to_skip = index + 1);
                            s = "." + (prev_index + 1) + " img";

                            $(s).toggleClass("selected");
                            s = "." + (prev_index + 1);
                            $(s).toggleClass("piece");

                            $(s1).html($(s).html());

                            $(s).html("");
                            
                            
                        
                            // $(s1).html($(s).html());
                        
                            // $(s).html = "";
                            // $(s).toggleClass("piece");
                            prev_index = index;
                            whos_playing += 1;
                            if (whos_playing % 2 == 0)
                            {
                                white_pieces --;
                            }

                            else
                            {
                                black_pieces --;
                            }


                            $(".whos-turn h1").html(playing[whos_playing % 2]);

                            if (white_pieces == 0)
                            {
                                $("h1").html("Black Wins");
                                $("h2").html("Press R to restart the game");
                                gameover = true;
                            }

                            else if (black_pieces == 0)
                            {
                                $("h1").html("White Wins");
                                $("h2").html("Press R to restart the game");
                                gameover = true;
                            
                            }
                            
                            if (!gameover)
                            {

                                if ( $("." + (index + 1) + " img").hasClass("white-piece") && $("." + (index + 1) + " img").hasClass("pawn") && index + 1 <= 8)
                                {
                                    whos_playing ++;
                                    $(".whos-turn h1").html(playing[whos_playing % 2]);
                                    console.log("upgrade");
                                    $(".whos-turn h2").html("Promote your pawn to a knight or a bishop");
                                    promotion = true;
                                    $(".upgrade").fadeIn();

                                    $(".small_icon_queen").attr("src", "./images/white_knight.png");
                                    $(".small_icon_rook").attr("src", "./images/white_bishop.png");
                                }

                                else if ( $("." + (index + 1) + " img").hasClass("black-piece") && $("." + (index + 1) + " img").hasClass("pawn") && index + 1 >= 57)
                                {
                                    whos_playing ++;
                                    $(".whos-turn h1").html(playing[whos_playing % 2]);
                                    console.log("upgrade");
                                    $(".whos-turn h2").html("Promote your pawn to a knight or a bishop");
                                    promotion = true;
                                    $(".upgrade").fadeIn();

                                    $(".small_icon_queen").attr("src", "./images/black_knight.png");
                                    $(".small_icon_rook").attr("src", "./images/black_bishop.png");
                                }
                                
                            }

                        }

                        // to select a different piece of the same color
                        else if (whos_playing % 2 == 0 && is_black_piece == 0 || whos_playing % 2 == 1 && is_black_piece == 1)
                        {
                            remove_moves(to_skip = index + 1);
                            var prev_s = "." + (prev_index + 1) + " img";
                            is_selected = 1;
                            $(prev_s).toggleClass("selected");
                            
                            prev_index = index;
                            $(s).toggleClass("selected");
                            
                            if ($(s).hasClass("white-piece") && $(s).hasClass("pawn"))
                            {
                                moveWhitePawn(index);
                            }

                            else if ($(s).hasClass("black-piece") && $(s).hasClass("pawn"))
                            {
                                moveBlackPawn(index);
                            }

                            else if ($(s).hasClass("white-piece") && $(s).hasClass("rook"))
                            {
                                moveWhiteRook(index);
                            }

                            else if ($(s).hasClass("black-piece") && $(s).hasClass("rook"))
                            {
                                moveBlackRook(index);
                            }

                            else if ($(s).hasClass("white-piece") && $(s).hasClass("queen"))
                            {
                                moveWhiteQueen(index);
                            }

                            else if ($(s).hasClass("black-piece") && $(s).hasClass("queen"))
                            {
                                moveBlackQueen(index);
                            }

                            else if ($(s).hasClass("white-piece") && $(s).hasClass("knight"))
                            {
                                moveWhiteKnight(index);
                            }

                            else if ($(s).hasClass("black-piece") && $(s).hasClass("knight"))
                            {
                                moveBlackKnight(index);
                            }

                            else if ($(s).hasClass("white-piece") && $(s).hasClass("bishop"))
                            {
                                moveWhiteBishop(index);
                            }

                            else if ($(s).hasClass("black-piece") && $(s).hasClass("bishop"))
                            {
                                moveBlackBishop(index);
                            }
                        }

                    
                    }
                }
        
        }

            else
            {
                console.log("is_piece == 0");

                // if piece is selected and cell is empty
                if (is_selected == 1) 
                {
                    
                    // console.log("is_selected == 1");
                    var current_s = "." + (index + 1);
                    var prev_s = "." + (prev_index + 1) + " img";

                    // move should go ahead only if the index is in the possible moves array
                    // if the current cell has an image with class move

                    if ($(current_s + " img").hasClass("move") == 1)
                    {

                    

                        // console.log(current_s);
                        remove_moves(to_skip = index + 1);
                        // $(current_s).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
                        is_selected = 0;

                    
                        $(prev_s).toggleClass("selected");
                    
                        $(current_s).toggleClass("piece");
                        
                        
                        

                        prev_s = "." + (prev_index + 1);
                        $(prev_s).toggleClass("piece");
                        $(current_s).html($(prev_s).html());

                        
                        
                    
                        $(prev_s).html("");
                        prev_index = index;
                        whos_playing += 1;
                        $(".whos-turn h1").html(playing[whos_playing % 2]);


                        if ($(current_s).hasClass("victory"))
                        {
                            $("h1").html(whos_playing % 2 == 1 ? "White Wins" : "Black Wins");
                            $("h2").html("Press R to restart the game");
                            gameover = true;
                        }

                        if (!gameover)
                        {
                            if ( $("." + (index + 1) + " img").hasClass("white-piece") && $("." + (index + 1) + " img").hasClass("pawn") && index + 1 <= 8)
                            {
                                whos_playing ++;
                                $(".whos-turn h1").html(playing[whos_playing % 2]);
                                console.log("upgrade");
                                $(".whos-turn h2").html("Promote your pawn to a knight or a bishop");
                                promotion = true;
                                $(".upgrade").fadeIn();

                                $(".small_icon_queen").attr("src", "./images/white_knight.png");
                                $(".small_icon_rook").attr("src", "./images/white_bishop.png");
                            }

                            else if ( $("." + (index + 1) + " img").hasClass("black-piece") && $("." + (index + 1) + " img").hasClass("pawn") && index + 1 >= 57)
                            {
                                whos_playing ++;
                                $(".whos-turn h1").html(playing[whos_playing % 2]);
                                console.log("upgrade");
                                $(".whos-turn h2").html("Promote your pawn to a knight or a bishop");
                                promotion = true;
                                $(".upgrade").fadeIn();

                                $(".small_icon_queen").attr("src", "./images/black_knight.png");
                                $(".small_icon_rook").attr("src", "./images/black_bishop.png");
                            }
                        }


                    }

                    
                    

                }
            }
        }

    }
    console.log(this);
    // alert('Clicked on cell ' + (index + 1));
   
        
  });

  // move pawn

  function moveWhitePawn(index)
  { 
    console.log("moveWhitePawn");
    
      var current_s = "." + (index + 1);
      var up_index = (index + 1) - 8;
      var next_s = "." + up_index;
      
      if (up_index >= 1)
      {
        // if that cell is empty
        if ($(next_s).hasClass("piece") == 0)
        {
            if ($(next_s).hasClass("victory white-v") == 0)
            {
                $(next_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(up_index);
            }
           
        }
      }

      var right = up_index + 1;
      var left = up_index - 1;

      if (right >= 1 && up_index % 8 != 0)
      {
        var right_s = "." + right;
        // if that piece is black-piece

        if ($(right_s).hasClass("piece") == 1 && $(right_s + " img").hasClass("black-piece") == 1)
        {
            // $(right_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
            $(right_s + " img").toggleClass("circle");
            possible_moves.push(right);
        }

      }



      if (left >= 1 && up_index % 8 != 1)
      {   
        //   console.log("left");

          var left_s = "." + left;
          // if that piece is black-piece

          if ($(left_s).hasClass("piece") == 1 && $(left_s + " img").hasClass("black-piece") == 1)
          {
            console.log("left");
            //   $(left_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
              $(left_s + " img").toggleClass("circle");
              possible_moves.push(left);
          }
            
      }
  }

  function moveBlackPawn(index)
  { 
    console.log("moveBlackPawn");
    
      var current_s = "." + (index + 1);
      var down_index = (index + 1) + 8;
      var next_s = "." + down_index;
      
      if (down_index >= 1)
      {
        // if that cell is empty
        if ($(next_s).hasClass("piece") == 0)
        {
            if ($(next_s).hasClass("victory black-v") == 0)
            {
                $(next_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(down_index);``
            }
         
        }
      }

      var right = down_index + 1;

      var left = down_index - 1;
      

      if (right >= 1 && down_index % 8 != 0)
      {
        var right_s = "." + right;
        // if that piece is black-piece

        if ($(right_s).hasClass("piece") == 1 && $(right_s + " img").hasClass("white-piece") == 1)
        {
            // $(right_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
            $(right_s + " img").toggleClass("circle");
            possible_moves.push(right);
        }

      }



      if (left >= 1 && down_index % 8 != 1)
      {   
        //   console.log("left");

          var left_s = "." + left;
          // if that piece is black-piece

          if ($(left_s).hasClass("piece") == 1 && $(left_s + " img").hasClass("white-piece") == 1)
          {
            console.log("left");
            //   $(left_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
              $(left_s + " img").toggleClass("circle");
              possible_moves.push(left);
          }
            
      }
  }

  function moveWhiteRook(index)
  {

    var current_s = "." + (index + 1);

    var up_index = (index + 1) - 8;
    var up_s = "." + up_index;

    var right = index + 1 + 1;
    var left = index + 1 - 1;

    var right_s = "." + right;
    var left_s = "." + left;


    var down_index = (index + 1) + 8;
    var down_s = "." + down_index;

    
    var count = 0;
    while (up_index >= 1)
    {

        if ($(up_s).hasClass("piece") == 0)
        {
            if ($(up_s).hasClass("victory white-v") == 0)
            {
                $(up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(up_index);
            }
            
            up_index -= 8;
            up_s = "." + up_index;
        }

        else
        {
            if ($(up_s + " img").hasClass("black-piece") == 1)
            {
                $(up_s + " img").toggleClass("circle");
                possible_moves.push(up_index);
            }

            break;
        }

        count ++;

        if (count == white_rook_level)
        {
            break;
        }
    }

    count = 0;

    while (down_index <= 64)

    {
        if ($(down_s).hasClass("piece") == 0)
        {
            if ($(down_s).hasClass("victory white-v") == 0)
            {
                $(down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(down_index);
            }
           
            down_index += 8;
            down_s = "." + down_index;
        }

        else
        {
            if ($(down_s + " img").hasClass("black-piece") == 1)
            {
                $(down_s + " img").toggleClass("circle");
                possible_moves.push(down_index);
            }

            break;
        }

        count ++;

        if (count == white_rook_level)
        {
            break;
        }
    }

    count = 0;

    while (right <= 64)
    {
        if (right % 8 == 1)
        {
            break;
        }

        if ($(right_s).hasClass("piece") == 0)
        {
            if ($(right_s).hasClass("victory white-v") == 0)
            {
                $(right_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(right);
            }
           
            right += 1;
            right_s = "." + right;
        }

        else
        {
            if ($(right_s + " img").hasClass("black-piece") == 1)
            {
                $(right_s + " img").toggleClass("circle");
                possible_moves.push(right);
            }

            break;
        }

        count ++;

        if (count == white_rook_level)
        {
            break;
        }
    }

    count = 0;

    while (left >= 1)
    {
        if (left % 8 == 0)
        {
            break;
        }

        if ($(left_s).hasClass("piece") == 0)
        {
            if ($(left_s).hasClass("victory white-v") == 0)
            {
                $(left_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(left);
            }
            left -= 1;
            left_s = "." + left;
        }

        else
        {
            if ($(left_s + " img").hasClass("black-piece") == 1)
            {
                $(left_s + " img").toggleClass("circle");
                possible_moves.push(left);
            }

            break;
        }

        count ++;

        if (count == white_rook_level)
        {
            break;
        }

    }



  }


    function moveBlackRook(index)
    {
            
            var current_s = "." + (index + 1);
    
            var up_index = (index + 1) - 8;
            var up_s = "." + up_index;
    
            var right = index + 1 + 1;
            var left = index + 1 - 1;
    
            var right_s = "." + right;
            var left_s = "." + left;

            var down_index = (index + 1) + 8;

            var down_s = "." + down_index;

            var count = 0;

            while (up_index >= 1)

            {
                if ($(up_s).hasClass("piece") == 0)
                {
                    if ($(up_s).hasClass("victory black-v") == 0)
                    {
                        $(up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                        possible_moves.push(up_index);
                    }
                    up_index -= 8;
                    up_s = "." + up_index;
                }

                else
                {
                    if ($(up_s + " img").hasClass("white-piece") == 1)
                    {
                        $(up_s + " img").toggleClass("circle");
                        possible_moves.push(up_index);
                    }

                    break;
                }

                count ++;

                if (count == black_rook_level)
                {
                    break;
                }
            }

            count = 0;

            while (down_index <= 64)
            {
                if ($(down_s).hasClass("piece") == 0)
                {
                    if ($(down_s).hasClass("victory black-v") == 0)
                    {
                        $(down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                        possible_moves.push(down_index);
                    }
                    down_index += 8;
                    down_s = "." + down_index;
                }

                else
                {
                    if ($(down_s + " img").hasClass("white-piece") == 1)
                    {
                        $(down_s + " img").toggleClass("circle");
                        possible_moves.push(down_index);
                    }

                    break;
                }

                count ++;

                if (count == black_rook_level)
                {
                    break;
                }
                
            }

            count = 0;


            while (right <= 64)
            {
                if (right % 8 == 1)
                {
                    break;
                }

                if ($(right_s).hasClass("piece") == 0)
                {
                    if ($(right_s).hasClass("victory black-v") == 0)
                    {
                        $(right_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                        possible_moves.push(right);
                    }
                    right += 1;
                    right_s = "." + right;
                }

                else
                {
                    if ($(right_s + " img").hasClass("white-piece") == 1)
                    {
                        $(right_s + " img").toggleClass("circle");
                        possible_moves.push(right);
                    }

                    break;
                }

                count ++;

                if (count == black_rook_level)
                {
                    break;
                }
            }

            count = 0;

            while (left >= 1)
            {
                if (left % 8 == 0)
                {
                    break;
                }

                if ($(left_s).hasClass("piece") == 0)
                {
                    if ($(left_s).hasClass("victory black-v") == 0)
                    {
                        $(left_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                        possible_moves.push(left);
                    }
                    
                    left -= 1;
                    left_s = "." + left;
                }

                else
                {
                    if ($(left_s + " img").hasClass("white-piece") == 1)
                    {
                        $(left_s + " img").toggleClass("circle");
                        possible_moves.push(left);
                    }

                    break;
                }

                count ++;

                if (count == black_rook_level)
                {
                    break;
                }
            }


    }



  function moveWhiteQueen(index)
  {
    var current_s = "." + (index + 1);

    var up_index = (index + 1) - 8;
    var up_s = "." + up_index;

    var right = index + 1 + 1;
    var left = index + 1 - 1;

    var right_s = "." + right;
    var left_s = "." + left;

    var down_index = (index + 1) + 8;
    var down_s = "." + down_index;

    
    var count = 0;
    while (up_index >= 1)
    {

        if ($(up_s).hasClass("piece") == 0)
        {
            if ($(up_s).hasClass("victory white-v") == 0)
            {
                $(up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(up_index);
            }
            
            up_index -= 8;
            up_s = "." + up_index;
        }

        else
        {
            if ($(up_s + " img").hasClass("black-piece") == 1)
            {
                $(up_s + " img").toggleClass("circle");
                possible_moves.push(up_index);
            }

            break;
        }

        count ++;

        if (count == white_queen_level)
        {
            break;
        }


    }

    count = 0;

    while (down_index <= 64)

    {
        if ($(down_s).hasClass("piece") == 0)
        {
            if ($(down_s).hasClass("victory white-v") == 0)
            {
                $(down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(down_index);
            }

            down_index += 8;
            down_s = "." + down_index;
        }

        else
        {
            if ($(down_s + " img").hasClass("black-piece") == 1)
            {
                $(down_s + " img").toggleClass("circle");
                possible_moves.push(down_index);
            }

            break;
        }

        count ++;

        if (count == white_queen_level)
        {
            break;
        }
    }

    count = 0;

    while (right <= 64)
    {
        if (right % 8 == 1)
        {
            break;
        }

        if ($(right_s).hasClass("piece") == 0)
        {
            if ($(right_s).hasClass("victory white-v") == 0)
            {
                $(right_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(right);
            }
            
            right += 1;
            right_s = "." + right;
        }

        else
        {
            if ($(right_s + " img").hasClass("black-piece") == 1)
            {
                $(right_s + " img").toggleClass("circle");
                possible_moves.push(right);
            }

            break;
        }
        
        count ++;

        if (count == white_queen_level)
        {
            break;
        }
            
  }

    count = 0;

    while (left >= 1)

    {
        if (left % 8 == 0)
        {
            break;
        }

        if ($(left_s).hasClass("piece") == 0)
        {
            if ($(left_s).hasClass("victory white-v") == 0)
            {
                $(left_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(left);
            }

            left -= 1;
            left_s = "." + left;
        }

        else
        {
            if ($(left_s + " img").hasClass("black-piece") == 1)
            {
                $(left_s + " img").toggleClass("circle");
                possible_moves.push(left);
            }

            break;
        }

        count ++;

        if (count == white_queen_level)
        {
            break;
        }
    }

    count = 0;

    var right_up = (index + 1) - 8 + 1;

    var right_down = (index + 1) + 8 + 1;

    var left_up = (index + 1) - 8 - 1;

    var left_down = (index + 1) + 8 - 1;


    var right_up_s = "." + right_up;

    var right_down_s = "." + right_down;

    var left_up_s = "." + left_up;

    var left_down_s = "." + left_down;

    while (right_up >= 1 && right_up % 8 != 1)
    {
        if ($(right_up_s).hasClass("piece") == 0)
        {
            if ($(right_up_s).hasClass("victory white-v") == 0)
            {
                $(right_up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(right_up);
            }
            
            right_up -= 8;
            right_up += 1;
            right_up_s = "." + right_up;
        }

        else
        {
            if ($(right_up_s + " img").hasClass("black-piece") == 1)
            {
                $(right_up_s + " img").toggleClass("circle");
                possible_moves.push(right_up);
            }

            break;
        }

        count ++;

        if (count == white_queen_level)
        {
            break;
        }
    }

    count = 0;

    while (right_down <= 64 && right_down % 8 != 1)

    {

        if ($(right_down_s).hasClass("piece") == 0)
        {
            if ($(right_down_s).hasClass("victory white-v") == 0)
            {
                $(right_down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(right_down);
            }
           
            right_down += 8;
            right_down += 1;
            right_down_s = "." + right_down;
        }

        else
        {
            if ($(right_down_s + " img").hasClass("black-piece") == 1)
            {
                $(right_down_s + " img").toggleClass("circle");
                possible_moves.push(right_down);
            }

            break;
        }

        count ++;

        if (count == white_queen_level)
        {
            break;
        }
    }

    count = 0;

    while (left_up >= 1 && left_up % 8 != 0)
    
        {
    
            if ($(left_up_s).hasClass("piece") == 0)
            {
                if ($(left_up_s).hasClass("victory white-v") == 0)
                {
                    $(left_up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_up);
                }
                
                left_up -= 8;
                left_up -= 1;
                left_up_s = "." + left_up;
            }
    
            else
            {
                if ($(left_up_s + " img").hasClass("black-piece") == 1)
                {
                    $(left_up_s + " img").toggleClass("circle");
                    possible_moves.push(left_up);
                }
    
                break;
            }
    
            count ++;
    
            if (count == white_queen_level)
            {
                break;
            }
        }

        count = 0;

        while (left_down <= 64 && left_down % 8 != 0)

        {
            if ($(left_down_s).hasClass("piece") == 0)
            {
                if ($(left_down_s).hasClass("victory white-v") == 0)
                {
                    $(left_down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_down);
                }

                left_down += 8;
                left_down -= 1;
                left_down_s = "." + left_down;
            }

            else
            {
                if ($(left_down_s + " img").hasClass("black-piece") == 1)
                {
                    $(left_down_s + " img").toggleClass("circle");
                    possible_moves.push(left_down);
                }

                break;
            }

            count ++;

            if (count == white_queen_level)
            {
                break;
            }
        }


}

function moveBlackQueen(index)
{
    var current_s = "." + (index + 1);

    var up_index = (index + 1) - 8;
    var up_s = "." + up_index;

    var right = index + 1 + 1;
    var left = index + 1 - 1;

    var right_s = "." + right;
    var left_s = "." + left;

    var down_index = (index + 1) + 8;
    var down_s = "." + down_index;

    
    var count = 0;
    while (up_index >= 1)
    {

        if ($(up_s).hasClass("piece") == 0)
        {
            if ($(up_s).hasClass("victory black-v") == 0)
            {
                $(up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(up_index);
            }
            
            up_index -= 8;
            up_s = "." + up_index;
        }

        else
        {
            if ($(up_s + " img").hasClass("white-piece") == 1)
            {
                $(up_s + " img").toggleClass("circle");
                possible_moves.push(up_index);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    }

    count = 0;

    while (down_index <= 64)
    {
        if ($(down_s).hasClass("piece") == 0)
        {
            if ($(down_s).hasClass("victory black-v") == 0)
            {
                $(down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(down_index);
            }
            
            down_index += 8;
            down_s = "." + down_index;
        }

        else
        {
            if ($(down_s + " img").hasClass("white-piece") == 1)
            {
                $(down_s + " img").toggleClass("circle");
                possible_moves.push(down_index);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    
    }

    count = 0;

    while (right <= 64)
    {
        if (right % 8 == 1)
        {
            break;
        }

        if ($(right_s).hasClass("piece") == 0)
        {
            if ($(right_s).hasClass("victory black-v") == 0)
            {
                $(right_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(right);
            }
            
            right += 1;
            right_s = "." + right;
        }

        else
        {
            if ($(right_s + " img").hasClass("white-piece") == 1)
            {
                $(right_s + " img").toggleClass("circle");
                possible_moves.push(right);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    
    }

    count = 0;

    while (left >= 1)
    {
        if (left % 8 == 0)
        {
            break;
        }

        if ($(left_s).hasClass("piece") == 0)
        {
            if ($(left_s).hasClass("victory black-v") == 0)
            {
                $(left_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(left);
            }
            
            left -= 1;
            left_s = "." + left;
        }

        else
        {
            if ($(left_s + " img").hasClass("white-piece") == 1)
            {
                $(left_s + " img").toggleClass("circle");
                possible_moves.push(left);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    }

    count = 0;

    var right_up = (index + 1) - 8 + 1;

    var right_down = (index + 1) + 8 + 1;

    var left_up = (index + 1) - 8 - 1;

    var left_down = (index + 1) + 8 - 1;



    var right_up_s = "." + right_up;

    var right_down_s = "." + right_down;

    var left_up_s = "." + left_up;

    var left_down_s = "." + left_down;

    while (right_up >= 1 && right_up % 8 != 1)
    {
        if ($(right_up_s).hasClass("piece") == 0)
        {
            if ($(right_up_s).hasClass("victory black-v") == 0)
            {
                $(right_up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(right_up);
            }
            
            right_up -= 8;
            right_up += 1;
            right_up_s = "." + right_up;
        }

        else
        {
            if ($(right_up_s + " img").hasClass("white-piece") == 1)
            {
                $(right_up_s + " img").toggleClass("circle");
                possible_moves.push(right_up);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    
    }

    count = 0;

    while (right_down <= 64 && right_down % 8 != 1)
    {
        if ($(right_down_s).hasClass("piece") == 0)
        {
            if ($(right_down_s).hasClass("victory black-v") == 0)
            {
                $(right_down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(right_down);
            }
            
            right_down += 8;
            right_down += 1;
            right_down_s = "." + right_down;
        }

        else
        {
            if ($(right_down_s + " img").hasClass("white-piece") == 1)
            {
                $(right_down_s + " img").toggleClass("circle");
                possible_moves.push(right_down);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    }

    count = 0;

    while (left_up >= 1 && left_up % 8 != 0)
    {
        if ($(left_up_s).hasClass("piece") == 0)
        {
            if ($(left_up_s).hasClass("victory black-v") == 0)
            {
                $(left_up_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(left_up);
            }
           
            left_up -= 8;
            left_up -= 1;
            left_up_s = "." + left_up;
        }

        else
        {
            if ($(left_up_s + " img").hasClass("white-piece") == 1)
            {
                $(left_up_s + " img").toggleClass("circle");
                possible_moves.push(left_up);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    }

    count = 0;

    while (left_down <= 64 && left_down % 8 != 0)
    {
        if ($(left_down_s).hasClass("piece") == 0)
        {
            if ($(left_down_s).hasClass("victory black-v") == 0)
            {
                $(left_down_s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                possible_moves.push(left_down);
            }
            
            left_down += 8;
            left_down -= 1;
            left_down_s = "." + left_down;
        }

        else
        {
            if ($(left_down_s + " img").hasClass("white-piece") == 1)
            {
                $(left_down_s + " img").toggleClass("circle");
                possible_moves.push(left_down);
            }

            break;
        }

        count ++;

        if (count == black_queen_level)
        {
            break;
        }
    }




}


    function moveWhiteKnight(index)
    {

        var current_s = "." + (index + 1);
        var up_right = (index + 1) - 8 - 8 + 1;
        var up_left = (index + 1) - 8 - 8 - 1;

        var down_right = (index + 1) + 8 + 8 + 1;
        var down_left = (index + 1) + 8 + 8 - 1;

        var right_up = (index + 1) - 8 + 2;
        var right_down = (index + 1) + 8 + 2;

        var left_up = (index + 1) - 8 - 2;
        var left_down = (index + 1) + 8 - 2;

        if (up_right >= 1 && up_right % 8 != 1)
        {
            var s = "." + up_right;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(up_right);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(up_right);
                }
            }
        }
        
        if (up_left >= 1 && up_left % 8 != 0)
        {
            var s = "." + up_left;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(up_left);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(up_left);
                }
            }
        }

        if (down_right <= 64 && down_right % 8 != 1)
        {
            var s = "." + down_right;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(down_right);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(down_right);
                }
            }
        }

        if (down_left <= 64 && down_left % 8 != 0)
        {
            var s = "." + down_left;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(down_left);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(down_left);
                }
            }
        }

        if (right_up >= 1 && right_up % 8 != 1 && right_up % 8 != 2)
        {
            var s = "." + right_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_up);
                }
            }
        }

        if (right_down <= 64 && right_down % 8 != 1 && right_down % 8 != 2)
        {
            var s = "." + right_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_down);
                }
            }
        }

        if (left_up >= 1 && left_up % 8 != 0 && left_up % 8 != 7)
        {
            var s = "." + left_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_up);
                }
            }
        }

        if (left_down <= 64 && left_down % 8 != 0 && left_down % 8 != 7)
        {
            var s = "." + left_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_down);
                }
            }
        }



    }

    function moveBlackKnight(index)
    {
        var s = "." + (index + 1);

        var up_right = (index + 1) - 8 - 8 + 1;
        var up_left = (index + 1) - 8 - 8 - 1;

        var down_right = (index + 1) + 8 + 8 + 1;
        var down_left = (index + 1) + 8 + 8 - 1;

        var right_up = (index + 1) - 8 + 2;
        var right_down = (index + 1) + 8 + 2;

        var left_up = (index + 1) - 8 - 2;
        var left_down = (index + 1) + 8 - 2;

        if (up_right >= 1 && up_right % 8 != 1)
        {
            var s = "." + up_right;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(up_right);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(up_right);
                }
            }
        }

        if (up_left >= 1 && up_left % 8 != 0)
        {
            var s = "." + up_left;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(up_left);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(up_left);
                }
            }
        }

        if (down_right <= 64 && down_right % 8 != 1)
        {
            var s = "." + down_right;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(down_right);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(down_right);
                }
            }
        }

        if (down_left <= 64 && down_left % 8 != 0)
        {
            var s = "." + down_left;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(down_left);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(down_left);
                }
            }
        }

        if (right_up >= 1 && right_up % 8 != 1 && right_up % 8 != 2)
        {
            var s = "." + right_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_up);
                }
            }
        }

        if (right_down <= 64 && right_down % 8 != 1 && right_down % 8 != 2)
        {
            var s = "." + right_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_down);
                }
            }
        }

        if (left_up >= 1 && left_up % 8 != 0 && left_up % 8 != 7)
        {
            var s = "." + left_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_up);
                }
            }
        }

        if (left_down <= 64 && left_down % 8 != 0 && left_down % 8 != 7)
        {
            var s = "." + left_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_down);
                }
            }
        }


    }

    function moveWhiteBishop(index)
    {
        var s = "." + (index + 1);

        var right_up = (index + 1) - 8 + 1;

        var right_down = (index + 1) + 8 + 1;

        var left_up = (index + 1) - 8 - 1;

        var left_down = (index + 1) + 8 - 1;

        var count = 0;

        while (right_up >= 1 && right_up % 8 != 1)
        {
            var s = "." + right_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_up);
                }

                break;
            }

            right_up -= 8;
            right_up += 1;
        }

        count = 0;

        while (right_down <= 64 && right_down % 8 != 1)
        {
            var s = "." + right_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_down);
                }

                break;
            }

            right_down += 8;
            right_down += 1;
        }

        count = 0;

        while (left_up >= 1 && left_up % 8 != 0)
        {
            var s = "." + left_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_up);
                }

                break;
            }

            left_up -= 8;
            left_up -= 1;
        }

        count = 0;

        while (left_down <= 64 && left_down % 8 != 0)
        {
            var s = "." + left_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory white-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("black-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_down);
                }

                break;
            }

            left_down += 8;
            left_down -= 1;
        }


    }

    function moveBlackBishop(index)
    {
        var s = "." + (index + 1);

        var right_up = (index + 1) - 8 + 1;

        var right_down = (index + 1) + 8 + 1;

        var left_up = (index + 1) - 8 - 1;

        var left_down = (index + 1) + 8 - 1;

        var count = 0;

        while (right_up >= 1 && right_up % 8 != 1)
        {
            var s = "." + right_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_up);
                }

                break;
            }

            right_up -= 8;
            right_up += 1;
        }

        count = 0;

        while (right_down <= 64 && right_down % 8 != 1)
        {
            var s = "." + right_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(right_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(right_down);
                }

                break;
            }

            right_down += 8;
            right_down += 1;
        }

        count = 0;

        while (left_up >= 1 && left_up % 8 != 0)
        {
            var s = "." + left_up;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_up);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_up);
                }

                break;
            }

            left_up -= 8;
            left_up -= 1;
        }

        count = 0;

        while (left_down <= 64 && left_down % 8 != 0)
        {
            var s = "." + left_down;
            if ($(s).hasClass("piece") == 0)
            {
                if ($(s).hasClass("victory black-v") == 0)
                {
                    $(s).html('<img class = "move" src="./images/new_dot.png" alt="">');
                    possible_moves.push(left_down);
                }
            }

            else
            {
                if ($(s + " img").hasClass("white-piece") == 1)
                {
                    $(s + " img").toggleClass("circle");
                    possible_moves.push(left_down);
                }

                break;
            }

            left_down += 8;
            left_down -= 1;
        }


    }

  function remove_moves(to_skip)
  {
        for (var i = 0; i < possible_moves.length; i++)
        {
            if (possible_moves[i] == to_skip)
            {
                continue;
            }

            
            var s = "." + possible_moves[i];

            if ($(s + " img").hasClass("circle") == 1)
            {
                $(s + " img").toggleClass("circle");
            }

            else
            {
                $(s).html("");
            }
            
        }

        possible_moves = [];
  }


  function create_game_temp()
  {
        for (var i = 49; i <= 56; i++)
        {
            var s = "." + i;
            $(s).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
            $(s).toggleClass("piece");
        }

        for (var i = 9; i <= 16; i++)
        {
            var s = "." + i;
            $(s).html('<img class="black-piece pawn" src="./images/black_pawn.png" alt="white-rook">');
            $(s).toggleClass("piece");
        
        }

        

        var s = ".33";
        $(s).toggleClass("piece");
        $(s).html('<img class="black-piece queen" src="./images/black_queen.png" alt="white-rook">');


        s = ".36";
        $(s).toggleClass("piece");
        $(s).html('<img class="black-piece rook" src="./images/black_rook.png" alt="white-rook">');


        s = ".38";
        $(s).toggleClass("piece");
        $(s).html('<img class="white-piece rook" src="./images/white_rook.png" alt="white-rook">');


        s = ".44";
        $(s).toggleClass("piece");
        $(s).html('<img class="white-piece queen" src="./images/white_queen.png" alt="white-rook">');




       
  }

//   create_game_temp();


  // 1. to do make move black pawn function - done
  // 2. make the pieces only move to where there are dots and circles - done
  // 3. can do - when a person has already selected his piece and he selects another piece, the previous piece should be deselected and
  // the new piece should be selected - done


  // to fix
    // 1. the rook is not moving properly
    // after the pawn is selected and the rook is selected immediatiely after that, the rook's move are not shown - done

// add numbers to the rooks and queens, indicating their level


document.addEventListener("keypress", function(event) {
    // Check if the pressed key is "r"
    if (event.key === "r" && gameover == true) 
    {
        // Reload the page
        location.reload();
    }
});


// surround whites red piece with pawn pieces

function surroundWhiteRedPiece()
{


    var s_right = "." + (bottom_red + 1);
    var s_left = "." + (bottom_red - 1);
    var s_up = "." + (bottom_red - 8);
    var s_up_right = "." + (bottom_red - 7);
    var s_up_left = "." + (bottom_red - 9);

    var s_down = "." + (bottom_red + 8);

    $(s_right).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
    $(s_right).toggleClass("piece");

    $(s_left).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
    $(s_left).toggleClass("piece");

    $(s_up).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
    $(s_up).toggleClass("piece");

    $(s_up_right).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
    $(s_up_right).toggleClass("piece");

    $(s_up_left).html('<img class="white-piece pawn" src="./images/pawn.png" alt="white-rook">');
    $(s_up_left).toggleClass("piece");

    $(s_down).html('<img class="white-piece knight" src="./images/white_knight.png" alt="white-rook">');
    $(s_down).toggleClass("piece");
    
}

// surround blacks red piece with pawn pieces


function surroundBlackRedPiece()
{
    var s_right = "." + (top_red + 1);
    var s_left = "." + (top_red - 1);
    var s_down = "." + (top_red  + 8);
    var s_down_right = "." + (top_red + 7);
    var s_down_left = "." + (top_red + 9);

    var s_up = "." + (top_red - 8);
    

     
    $(s_right).html('<img class="black-piece pawn" src="./images/black_pawn.png" alt="white-rook">');
    $(s_right).toggleClass("piece");

    $(s_left).html('<img class="black-piece pawn" src="./images/black_pawn.png" alt="white-rook">');
    $(s_left).toggleClass("piece");

    $(s_down).html('<img class="black-piece pawn" src="./images/black_pawn.png" alt="white-rook">');
    $(s_down).toggleClass("piece");

    $(s_down_right).html('<img class="black-piece pawn" src="./images/black_pawn.png" alt="white-rook">');
    $(s_down_right).toggleClass("piece");


    $(s_down_left).html('<img class="black-piece pawn" src="./images/black_pawn.png" alt="white-rook">');
    $(s_down_left).toggleClass("piece");

   
    $(s_up).html('<img class="black-piece knight" src="./images/black_knight.png" alt="white-rook">');
    $(s_up).toggleClass("piece");

}

// to do -
// pawn promotion done
