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

let presetSelect = false; //Duo data confirmation for selecting which body will be created
let planetBodyCheck = false;
let solarBodyCheck = false;
let asteroidBodyCheck = false;
let blackHoleCheck = false;

function presetReset(){ //shorthanded to save repeated writing in selection statements
  planetBodyCheck = false;
  solarBodyCheck = false;
  asteroidBodyCheck = false;
  blackHoleCheck = false;
  document.querySelector("#planetBtn").classList.remove("active"); //removes styling for pressed down button for every button when another is clicked
  document.querySelector("#solarBtn").classList.remove("active");
  document.querySelector("#asteroidBtn").classList.remove("active");
  document.querySelector("#blackHoleBtn").classList.remove("active");
}


//what the HTML button calls upon being clicked
function planetBdy() {
  if (planetBodyCheck == false && presetSelect == false){//if no body has been selected and this body specifically hasnt been clicked
    presetReset();
    planetBodyCheck = true;
    presetSelect = true;
    document.querySelector("#planetBtn").classList.add("active"); //CSS handling so that object remains clicked when pressed
  }else if (planetBodyCheck == false && presetSelect == true){// if a body has been selected but not this one
    presetReset();
    planetBodyCheck = true;
    document.querySelector("#planetBtn").classList.add("active");
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
    document.querySelector("#solarBtn").classList.add("active");
  }else if (solarBodyCheck == false && presetSelect == true){
    presetReset();
    solarBodyCheck = true;
    document.querySelector("#solarBtn").classList.add("active");
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
    document.querySelector("#asteroidBtn").classList.add("active");
  }else if (asteroidBodyCheck == false && presetSelect == true){
    presetReset();
    asteroidBodyCheck = true;
    document.querySelector("#asteroidBtn").classList.add("active");
  }else if (asteroidBodyCheck == true && presetSelect == true){
    presetReset();
    presetSelect = false;
  }   
}

function blackHoleBdy() {//similar to planetBdy()
  if (blackHoleCheck == false && presetSelect == false){
    presetReset();
    blackHoleCheck = true;
    presetSelect = true;
    document.querySelector("#blackHoleBtn").classList.add("active");
  }else if (blackHoleCheck == false && presetSelect == true){
    presetReset();
    blackHoleCheck = true;
    document.querySelector("#blackHoleBtn").classList.add("active");
  }else if (blackHoleCheck == true && presetSelect == true){
    presetReset();
    presetSelect = false;
  }   
}

//function to input which preset to choose depending on which ubutton pressed
function setPreset(){
  if (planetBodyCheck == true){ //planet preset
    presetMass = 3e-6;
    presetSize = 7.1;
    presetColor = "46, 204, 113";
  }else if (solarBodyCheck == true){ //sun preset
    presetMass = 1;
    presetSize = 18;
    presetColor = "249,215,28";
  }else if (asteroidBodyCheck == true){ //asteroid preset
    presetMass = 3.318e-20;
    presetSize = Math.random() * (2 - 0.05) + 0.05; //random value between 2 and 0.05 to determine radius
    presetColor = "180,210,205";
  }else if (blackHoleCheck == true){ //black hole
    presetMass = 50;
    presetSize = 9;
    presetColor = "0,0,0";
  }
}


///////////////////////////////////////// PRESET SCENARIOS
/////////////////////////////////////////

function showBtnScenario() {//displays or removes the relevant div element using a button 
  let x = document.querySelector(".scenarioBtn");
  if (getComputedStyle(x).display === "none") {//changes the CSS style of the block depending on what it is currently
    document.querySelector("#solarSysBtn").style.display = "block";
    document.querySelector("#binarySysBtn").style.display = "block";
    document.querySelector("#unstableSysBtn").style.display = "block";
    document.querySelector("#eightSysBtn").style.display = "block";
    document.querySelector("#lagrSysBtn").style.display = "block";
  }else{
    document.querySelector("#solarSysBtn").style.display = "none";
    document.querySelector("#binarySysBtn").style.display = "none";
    document.querySelector("#unstableSysBtn").style.display = "none";
    document.querySelector("#eightSysBtn").style.display = "none";
    document.querySelector("#lagrSysBtn").style.display = "none";
  }
}

function createSolar() { //solar system orbit out to Jupiter
  clearSim();
  nBodyInstance.cBodies.push({m: 1.66e-7,x: -0.346,y: -0.272,vx: 4.251,vy: -7.62, cobject: new cObject(c, parseFloat(5), "0, 12, 153",)});
  nBodyInstance.cBodies.push({m: 2.45e-6,x: -0.168,y: 0.698,vx: 7.21,vy: 1.77, cobject: new cObject(c, parseFloat(5.8), "100, 240, 150",)});
  nBodyInstance.cBodies.push({m: 3e-6,x: -0.479,y: 0.867,vx: -5.62,vy: -3.032, cobject: new cObject(c, parseFloat(6.2), "210, 200, 24",)});
  nBodyInstance.cBodies.push({m: 3.2e-7,x: -0.57,y: -1.39,vx: 4.92,vy: -1.51, cobject: new cObject(c, parseFloat(6.25), "230, 80, 40",)});
  nBodyInstance.cBodies.push({m: 9.54e-4,x: 4.41,y: -2.35,vx: 1.263,vy: 2.56, cobject: new cObject(c, parseFloat(12), "200, 110, 200",)});
  nBodyInstance.cBodies.push({m: 1, x: 0, y: 0, vx: 0, vy: 0, cobject: new cObject(c, parseFloat(20), "249, 215, 28",)});
}

function createBinary() { //binary star system
  clearSim();
  nBodyInstance.cBodies.push({m:1, x:0, y:1, vx:-3.05, vy:0, cobject: new cObject(c, parseFloat(9.5), "125, 249, 255",)});
  nBodyInstance.cBodies.push({ m:1, x:0, y:-1, vx:3.05, vy:0, cobject: new cObject(c, parseFloat(9.5), "125, 249, 255",)});

}

function createUnstable() { //demonstrates instability of system
  clearSim();
  nBodyInstance.cBodies.push({m:1, x:0, y:-2, vx:-0, vy:0, cobject: new cObject(c, parseFloat(7), "230, 100, 100",)});
  nBodyInstance.cBodies.push({m:1, x:1.732, y:1, vx:0, vy:0, cobject: new cObject(c, parseFloat(7), "230, 100, 100",)});
  nBodyInstance.cBodies.push({m:1, x:-1.732, y:1, vx:0, vy:0, cobject: new cObject(c, parseFloat(7), "230, 100, 100",)});
 
}

let normal = 2.5; //math to calculate stable orbit
let normalX = Math.sin(1/6 * Math.PI)* normal;
let normalY = Math.cos(1/6 * Math.PI)* normal;
let length = 2.5;
let lengthX = Math.sin(1/3 * Math.PI)*length;
let lengthY = Math.cos(1/3 * Math.PI)*length;

function createLagrange(){ //3 body example (easily disrupted)
  clearSim();
  nBodyInstance.cBodies.push({m:1, x:0, y:-length, vx:-normalX, vy:normalY, cobject: new cObject(c, parseFloat(7), "255, 0, 0",)});
  nBodyInstance.cBodies.push({m:1, x:lengthX, y:lengthY, vx:-normalX, vy:-normalY, cobject: new cObject(c, parseFloat(7), "255, 0, 0",)});
  nBodyInstance.cBodies.push({m:1, x:-lengthX, y:lengthY, vx:normal, vy:0, cobject: new cObject(c, parseFloat(7), "255, 0, 0",)});
}

function createEight() { //3 body pesudo stable orbit (figure 8)
  clearSim();
  nBodyInstance.cBodies.push({m:1, x:0, y:0, vx:-4.82, vy:4.82, cobject: new cObject(c, parseFloat(7), "255, 0, 0",)});
  nBodyInstance.cBodies.push({ m:1, x:1.5, y:0, vx:2.41, vy:-2.41, cobject: new cObject(c, parseFloat(7), "0, 255, 0",)});
  nBodyInstance.cBodies.push({m:1, x:-1.5, y:0, vx:2.41, vy:-2.41, cobject: new cObject(c, parseFloat(7), "0, 0, 255",)});
}
