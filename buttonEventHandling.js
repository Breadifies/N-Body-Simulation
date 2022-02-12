///////////////////////////////////////////// OBJECT TOP
////////////////////////////////////////////
function showBtnTopObj() {//displays or removes the relevant div element using a button 
  let x = document.querySelector("#objectTopChild");
  if (getComputedStyle(x).display === "none") {//changes the CSS style of the block depending on what it is currently
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

document.querySelector("#collisionToggle").addEventListener("click", function(){
  if (collisionMode == false){
    collisionMode = true;
  }else{
    collisionMode = false;
  }
});


///////////////////////////////////////////// OBJECT BOTTOM
////////////////////////////////////////////


function showBtnBotObj() {//event handling for oopening the popup div element
  let x = document.querySelector("#objectBotChild");
  if (getComputedStyle(x).display === "none") {
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
    document.querySelector("#massChange").value = 1;
  }
  dragMass = parseInt(document.querySelector("#massChange").value);
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

document.querySelector("#colorPicker").value = "#ffffff";
document.querySelector("#colorPicker").addEventListener('input', function() {
  dragColor = hexToRgb(document.querySelector("#colorPicker").value.substring(1, 7));
});

function hexToRgb(hex) { //converts hex to rgb
  var arrBuff = new ArrayBuffer(4);
  var vw = new DataView(arrBuff); //allows for reading and writing of multiple values to the array Buffer
  vw.setUint32(0,parseInt(hex, 16),false); //stores integer as 32 bit, using parseInt to convert hex to decimal
  var arrByte = new Uint8Array(arrBuff);
  return arrByte[1] + "," + arrByte[2] + "," + arrByte[3]; //concatenation
}



///////////////////////////////////////////// PHYSICS MANIPULATION
////////////////////////////////////////////


function showBtnPhysics() {//displays or removes the relevant div element using a button 
  let x = document.querySelector("#physicsChild");
  if (getComputedStyle(x).display === "none") {//changes the CSS style of the block depending on what it is currently
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
  if (getComputedStyle(x).display ==="none") {
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



///////////////////////////////////////// PRESET CELESTIAL OBJECTS
/////////////////////////////////////////

presetMass = 0;
presetSize = 0;
presetColor = 0;

let presetSelect = false;
let planetBodyCheck = false;
let solarBodyCheck = false;
let asteroidBodyCheck = false;

function presetReset(){
  planetBodyCheck = false;
  solarBodyCheck = false;
  asteroidBodyCheck = false;
}

//what the HTML button calls upon being clicked
function planetBdy() {
  if (planetBodyCheck == false && presetSelect == false){//if no body has been selected and this body specifically hasnt been clicked
    presetReset();
    planetBodyCheck = true;
    presetSelect = true;
  }else if (planetBodyCheck == false && presetSelect == true){// if a body has been selected but not this one
    presetReset();
    planetBodyCheck = true;
  }else if (planetBodyCheck == true && presetSelect == true){// if this body has been selected and it has been clicked once
    presetReset();
    presetSelect = false;
  }   
}

function solarBdy() {//same function purpose as planetBdy() for differnet preset
  if (solarBodyCheck == false && presetSelect == false){
    presetReset();
    solarBodyCheck = true;
    presetSelect = true;
  }else if (solarBodyCheck == false && presetSelect == true){
    presetReset();
    solarBodyCheck = true;
  }else if (solarBodyCheck == true && presetSelect == true){
    presetReset();
    presetSelect = false;
  }   
}

function asteroidBdy() {//similar to planetBdy()
  if (asteroidBodyCheck == false && presetSelect == false){
    presetReset();
    asteroidBodyCheck = true;
    presetSelect = true;
  }else if (asteroidBodyCheck == false && presetSelect == true){
    presetReset();
    asteroidBodyCheck = true;
  }else if (asteroidBodyCheck == true && presetSelect == true){
    presetReset();
    presetSelect = false;
  }   
}

//function to input which preset to choose depending on which ubutton pressed
function setPreset(){
  if (planetBodyCheck == true){ //planet preset
    presetMass = 3e-6;
    presetSize = 5.1;
    presetColor = "100,100,100";
  }else if (solarBodyCheck == true){ //sun preset
    presetMass = 1;
    presetSize = 18;
    presetColor = "249,215,28";
  }else if (asteroidBodyCheck == true){ //asteroid preset
    presetMass = 3.318e-20;
    presetSize = Math.random() * (2 - 0.05) + 0.05; //random value between 2 and 0.05 to determine radius
    presetColor = "180,210,205";
  }
}




