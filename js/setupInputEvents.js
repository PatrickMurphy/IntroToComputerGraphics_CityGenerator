function onDocumentMouseDown(event) {
  switch (event.button) {
    case 0: //left
      var mouse = new THREE.Vector2;
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
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
    case 1: //middle
      break;
    case 2: //right
      var mouse = new THREE.Vector2;
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

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

var infoDispClicked = function(){
  var toggleBtn = document.getElementById("info-display-btn");
  var x = document.getElementById("info-content");
  if (x.style.display === "none") {
    x.style.display = "block";
    toggleBtn.innerHTML = "[close]";
  } else {
    x.style.display = "none";
    toggleBtn.innerHTML = "[view controls]";
  }
};

var authorDispClicked = function(){
  var toggleBtn = document.getElementById("author-display-btn");
  var x = document.getElementById("author-info-content");
  if (x.style.display === "none") {
    x.style.display = "block";
    toggleBtn.innerHTML = "[close]";
  } else {
    x.style.display = "none";
    toggleBtn.innerHTML = "[view authors]";
  }
};

// auto hide info buttons
infoDispClicked();
authorDispClicked();

document.getElementById("info-display-btn").addEventListener("click", infoDispClicked);
document.getElementById("author-display-btn").addEventListener("click", authorDispClicked);