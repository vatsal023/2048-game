let states = []
let b1 = document.querySelectorAll(".row")
console.log(b1[0])
console.log(b1.length)
let boxes = document.querySelector(".row").children
console.log(boxes.length)
for (let i = 0; i < b1.length; i++) {
    let b2 = []
    for(let j = 0;j<boxes.length;j++)
    {
        b2.push(false)
    }
    states.push(b2)
}
console.log(states[1][2])

let score = document.querySelector(".score")
    let value =  parseInt(score.innerHTML)
    let best = document.querySelector(".best")
    let value2 = parseInt(best.innerHTML)
    let flag1 = false;

///function for generating single value
function singlegenerator(){
    let count = 0;
while(count<1){
    let rand1 = Math.floor(0+Math.random()*4)
    let rand2 = Math.floor(0+Math.random()*4)
    if(states[rand1][rand2]!=true)
    {
    let first = document.querySelectorAll(".row")[rand1]
    let second = first.getElementsByClassName("box")[rand2]
    let div = document.createElement("div")
    second.append(div)
    div.innerHTML = "2"
    count++;
    states[rand1][rand2]= true;
    }
}
}
///function for testing if board is filled or not
function test(){
    let flag2 = false
            for(let i = 0;i<b1.length;i++)
            {
                for(let j = 0;j<boxes.length;j++)
                {
                    if(states[i][j]==false)
                    {
                        flag2 = true
                        break;
                    }
                }
            }
            if(flag2==false)
            {
                alert("Game over")
                generator()
                score.innerHTML = "0"
                value = 0;
                return;
            }    
}
///function for generating random 2 numbers on the screen
function generator(){
    for (let i = 0; i < b1.length; i++) {
        for(let j = 0;j<boxes.length;j++){
            states[i][j] = false;
        }
    }
    let b2 = document.querySelectorAll(".box>div")
    console.log(b2)
    b2.forEach(e=>{
    e.innerHTML = "";
    e.remove();
})
let count = 0;
while(count<2){
    let rand1 = Math.floor(0+Math.random()*4)
    let rand2 = Math.floor(0+Math.random()*4)
    if(states[rand1][rand2]!=true)
    {
    let first = document.querySelectorAll(".row")[rand1]
    let second = first.getElementsByClassName("box")[rand2]
    let div = document.createElement("div")
    second.append(div)
    div.innerHTML = "2"
    count++;
    states[rand1][rand2]= true;
    }
}
}

///function for left arrow key
function leftkey(){
    for(let i = 0;i<b1.length;i++)
        {   
            let first = document.querySelectorAll(".row")[i]; 
            // console.log(first)
            let empty = -1;
            let last_fill  = -1;          
            for(let j = 0;j<boxes.length;j++)
            {
                let second = first.getElementsByClassName("box")[j]
                // console.log(second)
                let div = second.querySelector("div")
                // console.log(div)

                ///Checking if the box is empty or not
                if(div==null)
                {
                    if(empty==-1)  ///if empty == -1,update empty 
                    {
                       empty = j;
                    }
                }
                else
                {
                    if(empty==-1)  ///means we have not encountered a empty space till now
                    {
                        if(last_fill==-1)
                        {
                            last_fill = j;
                        }
                        else   ///merge if last fill equal with current element else just update last fill
                        {
                            let f1 = first.getElementsByClassName("box")[last_fill].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[i][j] = false
                                empty = j;
                                last_fill = -1;
                                value += 2*n1;
                                if(value>value2)
                                {
                                    best.innerHTML = `${value}`
                                    value2 = value;
                                }
                                score.innerHTML = `${value}`
                            }
                            else
                            {
                                last_fill = j;
                            }
                        }
                    }
                    else if(empty!=-1)
                    {
                        if(last_fill==-1)   ///just put in empty slot
                        {
                            let f1 = first.getElementsByClassName("box")[empty]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[i][empty] = true
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[i][j] = false
                            last_fill = empty;
                            if(empty+1<boxes.length)
                            {
                                empty = empty+1;
                            }
                        } 
                        else             ///check with last fill slot,if equal then merge,else put in empty slot
                        {
                            let f1 = first.getElementsByClassName("box")[last_fill].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[i][j] = false
                                last_fill = -1;
                                value += 2*n1;
                                score.innerHTML = `${value}`
                                if(value>value2)
                                    {
                                        best.innerHTML = `${value}`
                                        value2 = value;
                                    }
                            }
                            else
                            {
                                let f1 = first.getElementsByClassName("box")[empty]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[i][empty] = true;
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[i][j] = false;
                            last_fill = empty; 
                            if(empty+1<boxes.length)
                            {
                                empty = empty+1;
                            }   
                            }
                        }
                    }
                }
            }            
        }         
}

///function for right arrow click
function rightkey(){
    for(let i = 0;i<b1.length;i++)
        {   
            let first = document.querySelectorAll(".row")[i]; 
            // console.log(first)
            let empty = -1;
            let last_fill  = -1;          
            for(let j = boxes.length-1;j>=0;j--)
            {
                let second = first.getElementsByClassName("box")[j]
                // console.log(second)
                let div = second.querySelector("div")
                // console.log(div)

                ///Checking if the box is empty or not
                if(div==null)
                {
                    if(empty==-1)  ///if empty == -1,update empty 
                    {
                       empty = j;
                    }
                }
                else
                {
                    if(empty==-1)  ///means we have not encountered a empty space till now
                    {
                        if(last_fill==-1)
                        {
                            last_fill = j;
                        }
                        else   ///merge if last fill equal with current element else just update last fill
                        {
                            let f1 = first.getElementsByClassName("box")[last_fill].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[i][j] = false
                                value += 2*n1
                                score.innerHTML = `${value}`
                                if(value>value2)
                                    {
                                        best.innerHTML = `${value}`
                                        value2 = value;
                                    }
                                empty = j;
                                last_fill = -1;
                            }
                            else
                            {
                                last_fill = j;
                            }
                        }
                    }
                    else if(empty!=-1)
                    {
                        if(last_fill==-1)   ///just put in empty slot
                        {
                            let f1 = first.getElementsByClassName("box")[empty]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[i][empty] = true
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[i][j] = false
                            last_fill = empty;
                            if(empty-1>=0)
                            {
                                empty = empty-1;
                            }
                        } 
                        else             ///check with last fill slot,if equal then merge,else put in empty slot
                        {
                            let f1 = first.getElementsByClassName("box")[last_fill].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[i][j] = false
                                value += 2*n1
                                score.innerHTML = `${value}`
                                if(value>value2)
                                    {
                                        best.innerHTML = `${value}`
                                        value2 = value;
                                    }
                                last_fill = -1;
                            }
                            else
                            {
                                let f1 = first.getElementsByClassName("box")[empty]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[i][empty] = true;
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[i][j] = false;
                            last_fill = empty; 
                            if(empty-1>=0)
                            {
                                empty = empty-1;
                            }   
                            }
                        }
                    }
                }
            }            
        }     
}
///function for clicking on up arrowkey
function upkey(){
    for(let i = 0;i<boxes.length;i++)
        {   
            let empty = -1;
            let last_fill  = -1;          
            for(let j = 0;j<b1.length;j++)
            {
                let first = document.querySelectorAll(".row")[j]; 
                let second = first.getElementsByClassName("box")[i]
                // console.log(second)
                let div = second.querySelector("div")
                // console.log(div)

                ///Checking if the box is empty or not
                if(div==null)
                {
                    if(empty==-1)  ///if empty == -1,update empty 
                    {
                       empty = j;
                    }
                }
                else
                {
                    if(empty==-1)  ///means we have not encountered a empty space till now
                    {
                        if(last_fill==-1)
                        {
                            last_fill = j;
                        }
                        else   ///merge if last fill equal with current element else just update last fill
                        {
                            let f1 = document.querySelectorAll(".row")[last_fill].getElementsByClassName("box")[i].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[j][i] = false
                                value += 2*n1
                                score.innerHTML = `${value}`
                                if(value>value2)
                                {
                                    best.innerHTML = `${value}`
                                    value2 = value;
                                }
                                empty = j;
                                last_fill = -1;
                            }
                            else
                            {
                                last_fill = j;
                            }
                        }
                    }
                    else if(empty!=-1)
                    {
                        if(last_fill==-1)   ///just put in empty slot
                        {
                            let f1 = document.querySelectorAll(".row")[empty].getElementsByClassName("box")[i]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[empty][i] = true
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[j][i] = false
                            last_fill = empty;
                            if(empty+1<b1.length)
                            {
                                empty = empty+1;
                            }
                        } 
                        else             ///check with last fill slot,if equal then merge,else put in empty slot
                        {
                            let f1 = document.querySelectorAll(".row")[last_fill].getElementsByClassName("box")[i].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[j][i] = false
                                value += 2*n1
                                score.innerHTML = `${value}`
                                if(value>value2)
                                {
                                    best.innerHTML = `${value}`
                                    value2 = value;
                                }
                                last_fill = -1;
                            }
                            else
                            {

                              let f1 =  document.querySelectorAll(".row")[empty].getElementsByClassName("box")[i]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[empty][i] = true;
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[j][i] = false;
                            last_fill = empty; 
                            if(empty+1<b1.length)
                            {
                                empty = empty+1;
                            }   
                            }
                        }
                    }
                }
            }            
        }     
}
///function for down arrowkey
function downkey(){
    for(let i = 0;i<boxes.length;i++)
        {   
            let empty = -1;
            let last_fill  = -1;          
            for(let j = b1.length-1;j>=0;j--)
            {
                let first = document.querySelectorAll(".row")[j]; 
                let second = first.getElementsByClassName("box")[i]
                // console.log(second)
                let div = second.querySelector("div")
                // console.log(div)

                ///Checking if the box is empty or not
                if(div==null)
                {
                    if(empty==-1)  ///if empty == -1,update empty 
                    {
                       empty = j;
                    }
                }
                else
                {
                    if(empty==-1)  ///means we have not encountered a empty space till now
                    {
                        if(last_fill==-1)
                        {
                            last_fill = j;
                        }
                        else   ///merge if last fill equal with current element else just update last fill
                        {
                            let f1 = document.querySelectorAll(".row")[last_fill].getElementsByClassName("box")[i].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[j][i] = false
                                value += 2*n1
                                score.innerHTML = `${value}`
                                if(value>value2)
                                {
                                    best.innerHTML = `${value}`
                                    value2 = value;
                                }
                                empty = j;
                                last_fill = -1;
                            }
                            else
                            {
                                last_fill = j;
                            }
                        }
                    }
                    else if(empty!=-1)
                    {
                        if(last_fill==-1)   ///just put in empty slot
                        {
                            let f1 = document.querySelectorAll(".row")[empty].getElementsByClassName("box")[i]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[empty][i] = true
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[j][i] = false
                            last_fill = empty;
                            if(empty-1>=0)
                            {
                                empty = empty-1;
                            }
                        } 
                        else             ///check with last fill slot,if equal then merge,else put in empty slot
                        {
                            let f1 = document.querySelectorAll(".row")[last_fill].getElementsByClassName("box")[i].querySelector("div")
                            let n1 = parseInt(f1.innerHTML)
                            let n2 = parseInt(div.innerHTML)
                            if(n1==n2)
                            {
                                flag1 = true
                                f1.innerHTML = `${2*n1}`
                                div.innerHTML = ""
                                div.remove()
                                states[j][i] = false
                                value += 2*n1
                                score.innerHTML = `${value}`
                                if(value>value2)
                                {
                                    best.innerHTML = `${value}`
                                    value2 = value;
                                }
                                last_fill = -1;
                            }
                            else
                            {

                              let f1 =  document.querySelectorAll(".row")[empty].getElementsByClassName("box")[i]
                            let n1 = parseInt(div.innerHTML)
                            let div1 = document.createElement("div")
                            f1.append(div1)
                            states[empty][i] = true;
                            div1.innerHTML = `${n1}`
                            div.innerHTML = ""
                            div.remove()
                            states[j][i] = false;
                            last_fill = empty; 
                            if(empty-1>=0)
                            {
                                empty = empty-1;
                            }   
                            }
                        }
                    }
                }
            }            
        }     
}

function main(){

generator()

// event listener to new game option
let button = document.querySelector(".btn1 button")
button.addEventListener("click",()=>{
    console.log("New button clicked");
    generator();
    let score = document.querySelector(".score")
    score.innerHTML = "0"
    value =  0;
})

//event listener for swipe function on mobile
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.getElementsByClassName("card")[0];

gestureZone.addEventListener('touchstart', function (event) {
  touchstartX = event.changedTouches[0].screenX;
  touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function (event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture();
}, false);

function handleGesture() {
  const deltaX = touchendX - touchstartX;
  const deltaY = touchendY - touchstartY;

       flag1 = false;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 50) {
        rightkey();
      console.log('Swiped right');

    } else if (deltaX < -50) {
        leftkey();
      console.log('Swiped left');
    }
    else{
        return;
    }
   }  else{
      if(deltaY>50){
        downkey();
        console.log('Swiped down');
      }
      else if (deltaY < -50) {
        upkey();
      console.log('Swiped up');
    }
    else
    {
        return;
    }
  }
  if(flag1==false)
    {
        test();
    }    
    singlegenerator();
}
// event listener for arrowkeyoperations on laptop
document.addEventListener("keydown",function(e)
{
    // value =  parseInt(score.innerHTML)
    flag1 = false;
    if(e.key=="ArrowUp"){
        upkey();        
    }
    else if(e.key=="ArrowDown")
    {
       downkey();
    }
    else if(e.key == "ArrowLeft")
    {   
        leftkey();
    }
    else if(e.key == "ArrowRight")
    {
        rightkey();
    }
    if(flag1==false)
        {
            test();
        }    
    singlegenerator();
})
}

main()
