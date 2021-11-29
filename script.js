
const canvas = document.querySelector("canvas"); //c stands for context
const c = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

window.addEventListener("resize", function(){ //function to resize canvas when you resize window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})


//a scale reference is made when basing upon what the values of the cObjects should be, in this scenarion, m is equal to 1 solar mass
const cBodies = [
{m: 1.66e-7,x: -0.346,y: -0.272,vx: 4.251,vy: -7.62,radius: 5,color:"0, 12, 153",}, //mercury
{m: 2.45e-6,x: -0.168,y: 0.698,vx: 7.21,vy: 1.77,radius: 5.8,color:"100, 240, 150",}, //venus
{m: 3e-6,x: 0.649,y: 0.748,vx: -4.85,vy: 4.97,radius: 6.2,color:"210, 200, 24",}, //earth
{m: 3.2e-7,x: -0.57,y: -1.39,vx: 4.92,vy: -1.51,radius: 6.25,color:"230, 80, 40",}, //mars
{m: 9.54e-4,x: 4.41,y: -2.35,vx: 1.263,vy: 2.56,radius: 12,color:"200, 150, 20",}, //jupiter
{m: 1, x: 0, y: 0, vx: 0, vy: 0, radius: 20, color:"249, 215, 28",} //sun
]

let UGC = 35;
const dt = 0.008; //measured in years
const softeningConstant = 0.15;
const scale = 70;
let trailLimit = 0;
let trailChange = 35;
const velocityDragMult = 18;


//nBodySimulation creates an isolated instance of an n body simulation
class nBodySimulation {

  //encapsulating the global variables this way allow for easier manipulation especially when the user starts to change the values of of these parameters for themselves
  constructor(params) {
    this.UGC = params.UGC;
    this.dt = params.dt;
    this.softeningConstant = params.softeningConstant;
    this.cBodies = params.cBodies;
  }
  
  updatePos() { //separate function to update cObject positions
    const cBodiesLen = this.cBodies.length;
    //for loop for every element in cBodies array
    for (let i = 0; i < cBodiesLen; i++) {
      const thisBody = this.cBodies[i];
      thisBody.x += thisBody.vx * this.dt; //v = d/t
      thisBody.y += thisBody.vy * this.dt;
    }
     return this;
  }
  
  updateVel() { //separate function to update cObject velocities
    const cBodiesLen = this.cBodies.length;
    for (let i = 0; i < cBodiesLen; i++) {
      const thisBody = this.cBodies[i];
      thisBody.vx += thisBody.ax * this.dt; //a = v/t
      thisBody.vy += thisBody.ay * this.dt;
    }
  }
  
  updateAccel() { //acceleration update utlising law of gravitation
    const cBodiesLen = this.cBodies.length;
    for (let i = 0; i < cBodiesLen; i++) {
      //initialising acceleration which is reset to 0 after loop after its calculation has been passed onto velocity.
      let ax = 0;
      let ay = 0;
      //defining this body and the body acting on it
      const thisBody = this.cBodies[i];
      //nested for loop checks 1 object against all other objects then repeats for every other object
      for (let j = 0; j < cBodiesLen; j++) {
        if (i !== j) { //more concise than (thisBody != otherBody) prevents checking the same object against itself
          const otherBody = this.cBodies[j];
          const dx = otherBody.x - thisBody.x;
          const dy = otherBody.y - thisBody.y;
          //sum of the distances between the objects squared
          const distSq = dx * dx + dy * dy;
          const force = (this.UGC * otherBody.m) / (distSq * Math.sqrt(distSq + this.softeningConstant));//fun experiment, try puttng /distSq after this.softeningConstant
          //Law of gravitation for one body's force acting on another, softening constant exists to prevent error of infintesimaly small distances as the objects are treated as particles rather than objects with pass
          ax += dx * force;
          ay += dy * force;
          }
        }
      thisBody.ax = ax;
      thisBody.ay = ay;
      }
    return this;
    }

  }

class cObject { //class for construction of a cObject 
  constructor(c, radius, color) {
    this.c = c; //retrieves drawing context from canvas
    this.radius = radius;
    this.color = color;
    this.trailLine = [];
  }

  drawObj(x, y) {//draws every animation frame
    this.c.beginPath(); //drawing of the actual circle on canvas
    this.c.arc(x, y, this.radius,0, Math.PI*2, false);
    this.c.fillStyle = `rgb(${this.color})`,
    this.c.fill();
  }

  storeTrail(x, y){
    this.trailLine.push({x, y});//pushes x and y values into trailLine element, storing values of where the object was and currently is
    if (this.trailLine.length > trailLimit){
      this.trailLine.shift(); //shifts all elements in array to the right, deleting the oldest position of the cObject
      if (trailLimit == 0){
      this.trailLine.length = 0;
      }
    }
  }
  drawTrail(x, y){//draws the actual trail using lines. Pre existing code used smaller fading circles but increasing tail length lagged the system much more. Lines allow for more ease of following trajectory and lessens load on device
    this.storeTrail(x, y);
    const trailLineLen = this.trailLine.length;

    for (let i = 1; i < trailLineLen;i++){//drawing with line
      this.c.beginPath();
      c.moveTo(this.trailLine[i].x, this.trailLine[i].y);//starts at current position 
      c.lineTo(this.trailLine[i-1].x, this.trailLine[i-1].y);//extends to point before
      c.strokeStyle = `rgb(${this.color})`;
      c.stroke();

    };
  }
}

 //takes objects from cBodies array and instantiates a cObject 
 const populatecObjects = function(cBodies){
  cBodies.forEach(function(cBody){(cBody["cobject"] = new cObject(c, cBody.radius, cBody.color))});
};

//constant creates an nBodySimulation using the parameters provided
const nBodyInstance = new nBodySimulation({UGC, dt, cBodies: JSON.parse(JSON.stringify(cBodies)),softeningConstant});
   //passing a copy of cBodies as set in the JSON format, stringified then parsed so that its interpreted as objects, prevents original cBodies from being affected  
  
  
populatecObjects(nBodyInstance.cBodies);



//MOUSE INTERACTION

let mousePressX = 0;
let mousePressY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let dragging = false;

canvas.addEventListener("mousedown", 
 function(e) {
    mousePressX = e.clientX; //taken directly frrom the window's data on the relative mouse parameters for x and y values 
    mousePressY = e.clientY;
    dragging = true;//mousedown vs mouseup discerns the positions and distances that are calculated
  },
  false
);

canvas.addEventListener("mousemove", 
  function(e) {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
  },
  false
);

//////////////MOUSE OBJECT VARIABLES
//////////////

let dragMass = 0.005;
let dragSize = 5;

canvas.addEventListener("mouseup",
  function(e) {
    const x = (mousePressX - width / 2) / scale;
    const y = (mousePressY - height / 2) / scale;
    const vx = -(e.clientX - mousePressX) / velocityDragMult;
    const vy = -(e.clientY - mousePressY) / velocityDragMult;
    //negative to simulate slingshot-like input feedback

    nBodyInstance.cBodies.push({
      m: dragMass, x, y, vx, vy, cobject: new cObject(c, dragSize, "255, 255, 255"),
      m: dragMass, x, y, vx, vy, cobject: new cObject(c, dragSize, "255, 255, 255")
    });
    dragging = false;
  //placeholder cBody which pushes a pre determined object into the simulation at the mouse's position.
    },
    false
  );


//MOUSE INTERACTION


//animates and iteratively draws the objects visually on the canvas
  const animate = function(){
    nBodyInstance.updatePos().updateAccel().updateVel();//Accel update runs before Velocity
    c.clearRect(0, 0, width, height);  //clears the canvas screen of any objects (to input new positions of objects)
    const cBodiesLen = nBodyInstance.cBodies.length;
    for (let i = 0; i < cBodiesLen; i++) {
      const thisBody = nBodyInstance.cBodies[i];
      //centers the position of the bodies relative to the canvas screen
      const x = width / 2 + thisBody.x * scale;
      const y = height / 2 + thisBody.y * scale;
      thisBody.cobject.drawObj(x, y);
      thisBody.cobject.drawTrail(x, y);

    }
    if (dragging){
      c.beginPath();
      c.moveTo(mousePressX, mousePressY);
      c.lineTo(currentMouseX, currentMouseY);
      c.strokeStyle = "red";
      c.stroke();
    }
    requestAnimationFrame(animate);
  };
  
animate();
