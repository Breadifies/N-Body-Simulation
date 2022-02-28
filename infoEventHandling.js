let popupsOn = true;
function disablePopups() { //manipulate the state of the popup toggle button
    if (popupsOn == false){
        popupsOn = true;
        document.querySelector("#disableInfoBox").classList.remove("info"); //remove/apply the class styling for this element
        document.querySelector("#disableInfoBox").innerHTML = "POPUPS ON"; //replaces html in the element depending on state
    }else if (popupsOn == true){
        popupsOn = false; 
        document.querySelector("#disableInfoBox").classList.add("info");
        document.querySelector("#disableInfoBox").innerHTML = "POPUPS OFF";
    }
}

let planetBoxCheck = false; //event handling for when planetBdy is pressed
document.querySelector("#planetBtn").addEventListener("click", function(){
    if (planetBoxCheck == false && popupsOn == true){ //creating function to execute depending whether planetBdy is clicked and if its the first time being clicked
       setTimeout(function pbTimeout(){ //javascript version of sleep, waits a certain amount of time before executing the function
        document.querySelector("#planetBdyBox").style.display = "block";
        planetBoxCheck = true; //ensures that it doesn't display again after the first time
        }, 1000);
    } 
})
//repeated for every instance of popup in user interactions
let solarBoxCheck = false; 
document.querySelector("#solarBtn").addEventListener("click", function(){
    if (solarBoxCheck == false && popupsOn == true){ 
       setTimeout(function pbTimeout(){ 
        document.querySelector("#solarBdyBox").style.display = "block";
        solarBoxCheck = true; 
        }, 1000);
    } 
})
let asteroidBoxCheck = false; 
document.querySelector("#asteroidBtn").addEventListener("click", function(){
    if (asteroidBoxCheck == false && popupsOn == true){ 
       setTimeout(function pbTimeout(){ 
        document.querySelector("#asteroidBdyBox").style.display = "block";
        asteroidBoxCheck = true; 
        }, 1000);
    } 
})
let blackHoleBoxCheck = false; 
document.querySelector("#blackHoleBtn").addEventListener("click", function(){
    if (blackHoleBoxCheck == false && popupsOn == true){ 
       setTimeout(function pbTimeout(){ 
        document.querySelector("#blackHoleBdyBox").style.display = "block";
        blackHoleBoxCheck = true; 
        }, 1000);
    } 
})
let solarSysBoxCheck = false;
document.querySelector("#solarSysBtn").addEventListener("click", function(){
    if (solarSysBoxCheck == false && popupsOn == true){
        setTimeout(function pbTimeout(){
            document.querySelector("#solarSysBox").style.display = "block";
            solarSysBoxCheck = true;
        }, 1000);
    }
} )
let binarySysBoxCheck = false;
document.querySelector("#binarySysBtn").addEventListener("click", function(){
    if (binarySysBoxCheck == false && popupsOn == true){
        setTimeout(function pbTimeout(){
            document.querySelector("#binarySysBox").style.display = "block";
            binarySysBoxCheck = true;
        }, 1000);
    }
} )
let unstableSysBoxCheck = false;
document.querySelector("#unstableSysBtn").addEventListener("click", function(){
    if (unstableSysBoxCheck == false && popupsOn == true){
        setTimeout(function pbTimeout(){
            document.querySelector("#unstableSysBox").style.display = "block";
            unstableSysBoxCheck = true;
        }, 1000);
    }
} )
let lagrSysBoxCheck = false;
document.querySelector("#lagrSysBtn").addEventListener("click", function(){
    if (lagrSysBoxCheck == false && popupsOn == true){
        setTimeout(function pbTimeout(){
            document.querySelector("#lagrSysBox").style.display = "block";
            lagrSysBoxCheck = true;
        }, 1000);
    }
} )

let eightSysBoxCheck = false;
document.querySelector("#eightSysBtn").addEventListener("click", function(){
    if (eightSysBoxCheck == false && popupsOn == true ){
        setTimeout(function pbTimeout(){
            document.querySelector("#eightSysBox").style.display = "block";
            eightSysBoxCheck = true;
        }, 1000);
    }
} )


