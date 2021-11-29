///////////////////////////////////////////// OBJECT TOP
////////////////////////////////////////////
function showBtnTopObj() {//displays or removes the relevant div element using a button 
  let x = document.querySelector("#objectTopChild");
  if (x.style.display === "none") {//changes the CSS style of the block depending on what it is currently
    x.style.display = "block";
  }else{
    x.style.display = "none";
  }
}

document.querySelector("#trailToggle").addEventListener("click", function
(){
  if (trailLimit == 0){
    trailLimit = trailChange;
  }else if (trailLimit != 0){
    trailLimit = 0; 
  }
});



///////////////////////////////////////////// OBJECT BOTTOM
////////////////////////////////////////////


function showBtnBotObj() {
  let x = document.querySelector("#objectBotChild");
  if (x.style.display === "none") {
    x.style.display = "block";
  }else{
    x.style.display = "none";
  }
}
document.querySelector("#massChange").value = 0.005;
document.querySelector("#updateMass").addEventListener("click", function(){
  if ((document.querySelector("#massChange").value) >= 100){
    document.querySelector("#massChange").value = 100;
  }else if ((document.querySelector("#massChange").value) <= 0){
    document.querySelector("#massChange").value = 0;
  }
  dragMass = document.querySelector("#massChange").value;
});

document.querySelector("#sizeChange").value = 5;
document.querySelector("#updateSize").addEventListener("click", function(){
  if ((document.querySelector("#sizeChange").value) >= 100){
    document.querySelector("#sizeChange").value = 100;
  }else if ((document.querySelector("#sizeChange").value) <= 0.05){
    document.querySelector("#sizeChange").value = 0.05;
  }
  dragSize = document.querySelector("#sizeChange").value;
});

///////////////////////////////////////////// PHYSICS MANIPULATION
////////////////////////////////////////////


function showBtnPhysics() {//displays or removes the relevant div element using a button 
  let x = document.querySelector("#physicsChild");
  if (x.style.display === "none") {//changes the CSS style of the block depending on what it is currently
     x.style.display = "block";
  }else{
      x.style.display = "none";
    }
  }
document.querySelector("#ugcChange").value = nBodyInstance.UGC; //sets textbox value to that of default
document.querySelector("#updateUGC").addEventListener("click",function() {
  if ((document.querySelector("#ugcChange").value) >= 750){
    document.querySelector("#ugcChange").value = 750;
  }else if ((document.querySelector("#ugcChange").value) <= -750){
    document.querySelector("#ugcChange").value = -750;
  }
  //validation check for in range
  nBodyInstance.UGC = document.querySelector("#ugcChange").value;
  //replaces the value of UGC with what is in the textbox
});

function slideUpdateUGC(value) { //updates textbox value based on slider value
  document.querySelector("#ugcChange").value = value;
}


/////////////////////////////////////////////// TIME DILATION
//////////////////////////////////////////////

function showBtnTime() {
  let x = document.querySelector("#timeChild");
  if (x.style.display ==="none") {
    x.style.display = "block";
  }else{
    x.style.display = "none";
  }
}
document.querySelector("#timeChange").value = 1;
document.querySelector("#updateTime").addEventListener("click", function()
{
  if ((document.querySelector("#timeChange").value) >= 10){
    document.querySelector("#timeChange").value = 10;
  }else if ((document.querySelector("#timeChange").value) <= -1){
    document.querySelector("#timeChange").value = -1;
  }
  nBodyInstance.dt = document.querySelector("#timeChange").value * dt;
   //normalises scale for time relative to the original time
});
function slideUpdateTime(value) {
  document.querySelector("#timeChange").value = value;
}

//////////////////////////////////////////CLEAR SIMULATION
//////////////////////////////////////////

function clearSim() {
  nBodyInstance.cBodies = []; 
  //clears array instance by assigning it an empty array
}

/////////////////////////////////////////
/////////////////////////////////////////
