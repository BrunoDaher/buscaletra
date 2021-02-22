var el               = document.getElementById('submenu'),
		startPosition    = 0,     // start position mousedown event
		currentPosition  = 0,     // count current translateX value
    distancePosition = 0,     // count distance between "down" & "move" event
    isMouseDown      = false, // check if mouse is down or not
    needForRAF       = true;  // to prevent redundant rAF calls
    
function mouseDown(e) {
	e.preventDefault(); // reset default behavior
  isMouseDown     = true;
  currentPosition = getTranslateX(); // get current translateX value
  startPosition   = e.clientX;       // get position X
}    

function mouseMove(e) {
	e.preventDefault();
  distancePosition = (e.clientX - startPosition) + currentPosition; // count it!  
  if (needForRAF && isMouseDown) {
    needForRAF = false;            // no need to call rAF up until next frame
    requestAnimationFrame(update); // request 60fps animation
  }; 
}

function mouseUp(e) {
	e.preventDefault();
	isMouseDown = false; // reset mouse is down boolean
}

function getTranslateX() {
var translateX = parseInt(getComputedStyle(el, null).getPropertyValue("transform").split(",")[4]);

return translateX; // get translateX value

}

function update() {
    needForRAF = true; // rAF consumes the movement instruction a new one can come
    el.style.transform = "translateX(" + distancePosition + "px)";// move it!
}
    
function menuDragInit(){        
  let tgButton = document.querySelector('.head');
  tgButton.addEventListener('click', ()=> toggleEvent(tgButton));
}



let dragIsOn = false;

function toggleEvent(tgButton){
    let main = document.querySelector('main');
    
    dragIsOn = !dragIsOn;

    if(dragIsOn){
        main.addEventListener('mouseover', togglesub);
    }
    else{
        main.addEventListener('click', myRemoveFunct());
    }
}

function togglesub(){
    var e = window.event;    
    let floatMenu = document.querySelector('#submenu');    
    floatMenu.style.opacity = 0.2;
    floatMenu.style.left = (e.clientX + 10)  + 'px';
    floatMenu.style.top = (e.clientY + 10) + 'px';
}

function myRemoveFunct() {  
    let main = document.querySelector('main');
    main.removeEventListener('mouseover', togglesub);
  }
