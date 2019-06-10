//create the scene
var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(80, ratio, 4, 100000); // https://threejs.org/docs/#api/cameras/PerspectiveCamera

var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var prevTime = performance.now();

var settings = {
  infowindows:{
    autohide:true
  }
};

// state toggles for movement
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;

// first person state toggle
var firstPersonMode = false;

//Setup for road
var roadSize = 20;

//Setup for buildings and roads
var buildingLocations = [];
var roadLocations = [];

//Amount of buildings to generate
var genSteps = 20;


//set the camera position
var Pos = new THREE.Vector3(-360, 700, 360);
camera.position.set(Pos.x, Pos.y, Pos.z);

// and the direction
var Dir = new THREE.Vector3(0, 0, 0);
camera.lookAt(Dir.x, Dir.y, Dir.z);

//create the webgl renderer
var renderer = new THREE.WebGLRenderer();

//set the size of the rendering window
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//add the renderer to the current document
document.body.appendChild(renderer.domElement);

//Controls
var moveSpeed = 10;
keyboardControls = new THREE.PointerLockControls(camera);
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0;
controls.dampingFactor = 1.5;
camera.position = Pos;
camera.lookAt(Dir);

keyboardControls.enabled = false;
scene.add(keyboardControls.getObject());


//move this to the controls section, double check for duplica
var raycaster = new THREE.Raycaster();
var selectedObject = new THREE.Mesh();
selected_building = selectedObject.name;
var selectedObjectColor = new THREE.Color();
var selectedObjectScale;
var isSelected = false;

var windowWidth = window.innerWidth;
blockedWidth = windowWidth - 245;

//Lighting Settings
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
var light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
light.position.y = 1000;
light.position.x = 500;
light.position.z = 500;
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.camera.left = -2000;
light.shadow.camera.right = 2000;
light.shadow.camera.top = 2000;
light.shadow.camera.bottom = -2000;
light.shadow.camera.far = 4000;
var helper = new THREE.CameraHelper(light.shadow.camera);

