window.onload = function(){
    Snake.load();
};

var Snake = {
    table: undefined,
    SnakeHeadCell: undefined,
    positionArray: [],
    direction: "R",
    load: function(){
        var self = this; 
        
        this.table = document.getElementById("content");
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
                    self.direction = "U";
                    break;
                case "a":
                    self.direction = "L";
                    break;
                case "s":
                    self.direction = "D";
                    break;
                case "d":
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
                if(newCell == undefined){
                    console.log("GAME OVER");
                    return;
                }
                
                //Hit pellet
                else if(newCell.classList.contains("pellet")){
                    newCell.classList.add("Snake");
                    newCell.classList.remove("pellet");
                    self.positionArray.unshift(newCell);
                    self.placePellet();
                }
                
                //Normal move
                else{
                    var moveCell = self.positionArray[self.positionArray.length - 1];
                    moveCell.classList.remove("Snake");
                    self.positionArray.splice(-1);
                    
                    newCell.classList.add("Snake");
                    self.positionArray.unshift(newCell);
                }
                self.move();
            //}
        }, 100);
    }
    
    
};