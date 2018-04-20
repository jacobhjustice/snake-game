window.onload = function(){
    document.getElementById("play").addEventListener("click", function(){
        Snake.load();
    });
    
};

var Snake = {
    table: undefined,
    positionArray: [],
    direction: "R",
    lastMove: "R",
    speed: 400,
    pellets: 0,
    load: function(){
        var self = this; 
        document.getElementById("menu").style.display = "none";
        this.table = document.getElementById("content");
        this.table.style.display = "table";
        this.speed = 400;
        this.pellets = 0;
        this.lastMove = "R";
        this.direction = "R";
        this.positionArray = [];
        var html = "";
        for(y = 0; y < 15; y++){
            html += "<div class='row'>";
            for(x = 0; x < 25; x++){
                html += "<div class='tile' data-x='" + x +"' data-y='" + y + "'></div>";
            }
            html += "</div>";
        }
        this.table.innerHTML = html;
        
        var cell = document.querySelector("[data-x='5'][data-y='5']");
        cell.classList.add("Snake");
        this.positionArray.push(cell);
        this.placePellet();
        this.move();
        
        document.addEventListener("keypress", function(e){
            switch(e.key){
                case "w":
                    if(self.lastMove != "D")
                        self.direction = "U";
                    break;
                case "a":
                    if(self.lastMove != "R")
                        self.direction = "L";
                    break;
                case "s":
                    if(self.lastMove != "U")
                        self.direction = "D";
                    break;
                case "d":
                    if(self.lastMove != "L")
                        self.direction = "R";
                    break;
            }
        });
    },
    placePellet: function(){
        var cell = document.querySelector("[data-x='" + Math.floor(Math.random() * 25) +"'][data-y='" + Math.floor(Math.random() * 15) +"']");
        while(cell.classList.contains("Snake")){
            cell = document.querySelector("[data-x='" + Math.floor(Math.random() * 25) +"'][data-y='" + Math.floor(Math.random() * 15) +"']");
        }
        cell.classList.add("pellet");
    },
    move: function(){
        var self = this;
        setTimeout(function(){
            //for(x = 0; x < self.positionArray.length; x++){
                var cell = self.positionArray[0];
                var _x = cell.dataset.x;
                var _y = cell.dataset.y;
                if(self.direction == "R")
                    _x++;
                else if(self.direction == "L")
                    _x--;
                else if(self.direction == "U")
                    _y--;
                else if(self.direction == "D")
                    _y++;
                
                var newCell = document.querySelector("[data-x='" + _x + "'][data-y='" + _y +"']");
                
                //Off of the board
                if(newCell == undefined || newCell.classList.contains("snake")){
                    self.gameOver();
                    return;
                }
                
                //Hit pellet
                else if(newCell.classList.contains("pellet")){
                    newCell.classList.add("Snake");
                    newCell.classList.remove("pellet");
                    self.positionArray.unshift(newCell);
                    self.placePellet();
                    self.pellets++;
                    self.speed = self.speed > 50 ? self.speed * .9 : self.speed;
                    
                }
                
                //Normal move
                else{
                    var moveCell = self.positionArray[self.positionArray.length - 1];
                    moveCell.classList.remove("Snake");
                    self.positionArray.splice(-1);
                    
                    newCell.classList.add("Snake");
                    self.positionArray.unshift(newCell);
                }
                self.lastMove = self.direction;
                self.move();
            //}
        }, self.speed);
    },
    gameOver: function(){
        var self = this;
        setTimeout(function(){
            self.table.style.display = "none";
            document.getElementById("retry").style.display = "block";
            document.getElementById("retry").addEventListener("click",  function(){
                document.getElementById("retry").style.display = "none";
                self.load();
            });
        }, 200);
    }
    
    
};