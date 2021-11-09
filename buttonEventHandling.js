function showBtnPhysics() {//displays or removes the relevant div element using a button 
    let x = document.querySelector("#physicsChild");
    if (x.style.display === "none") {//changes the CSS style of the block depending on what it is currently
      x.style.display = "block";
    }else{
      x.style.display = "none";
    }
  }




document.querySelector("#ugcChange").value = nBodyInstance.UGC;

document.querySelector("#updateUGC").addEventListener("click",function() {
  nBodyInstance.UGC = document.querySelector("#ugcChange").value;
  //replaces the value of UGC with what is in the textbox
});

function slideUpdate(value) {
  document.querySelector("#ugcChange").value = value;
}
