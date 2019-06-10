function getMouseLocation(){
  var mouse = new THREE.Vector2;
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  return mouse;
}

// function to handle mouse input
function onDocumentMouseDown(event) {
  switch (event.button) {
    case 0: //left mouse button
      var mouse = getMouseLocation();

      if (event.clientX < blockedWidth) {
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children, false);

        if (intersects.length > 0) {
          if ((intersects[0].object.name == "building") && (!isSelected)) {
            selectedObject = intersects[0].object;
            selectedObjectColor = selectedObject.material.color;
            selectedObjectScale = selectedObject.scale.y;
            selectedObject.material.color = new THREE.Color(1, 0.5, 0.5);
            isSelected = true;
            selectCheck();
          }
          if ((intersects[0].object.name != "building") && (isSelected)) {
            selectedObject.material.color = selectedObjectColor;
            var pos = intersects[0].point;
            selectedObject.position.x = pos.x;
            selectedObject.position.z = pos.z;
            isSelected = false;
          }
        }
      }
      break;
    case 1: //middle mouse button
      break;
    case 2: //right mouse button
      var mouse = getMouseLocation();

      selectedObject.material.color = selectedObjectColor;
      isSelected = false;
      break;
  }
}

document.addEventListener('mousedown', onDocumentMouseDown, false);



var onKeyDown = function (event) {

  switch (event.keyCode) {

    case 38: // forward
    case 87: // w
      moveForward = true;
      break;

    case 37: // left
    case 65: // a
      moveLeft = true;
      break;

    case 40: // backward
    case 83: // s
      moveBackward = true;
      break;

    case 39: // right
    case 68: // d
      moveRight = true;
      break;

      // down
    case 16: // shift
      moveDown = true;
      break;

      // up 
    case 32: // space
      moveUp = true;
      break;
  }

};

var onKeyUp = function (event) {

  switch (event.keyCode) {

    case 38: // forward
    case 87: // w
      moveForward = false;
      break;

    case 37: // left
    case 65: // a
      moveLeft = false;
      break;

    case 40: // backward
    case 83: // s
      moveBackward = false;
      break;

    case 39: // right
    case 68: // d
      moveRight = false;
      break;

      // down
    case 16: // shift
      moveDown = false;
      break;

      // up 
    case 32: // space
      moveUp = false;
      break;

  }
};

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// Code added by Patrick Murphy for opening and closing the info windows
var dispClicked = function(ele1, ele2, title){
  var toggleBtn = document.getElementById(ele1);
  var x = document.getElementById(ele2);
  if (x.style.display === "none") {
    x.style.display = "block";
    toggleBtn.innerHTML = "[close]";
  } else {
    x.style.display = "none";
    toggleBtn.innerHTML = "[view " + title + "]";
  }
};

// auto hide info buttons
if(settings.infowindows.autohide){
  dispClicked("info-display-btn","info-content","controls");
  dispClicked("author-display-btn","author-info-content","authors");
}

// add listeners
document.getElementById("info-display-btn").addEventListener("click", function(){
  dispClicked("info-display-btn","info-content","controls");
});

document.getElementById("author-display-btn").addEventListener("click", function(){
  dispClicked("author-display-btn","author-info-content","authors");
});