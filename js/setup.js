//setup the scene
var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;

var camera = new THREE.PerspectiveCamera(80, ratio, 4, 50000);

var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var prevTime = performance.now();

var settings = {
  gui:{
    highlightGenerateBtn: true
  },
  infowindows:{
    autohide:false
  }
};

// state toggles for movement
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var firstPersonMode = false;

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

//Skybox
var r1 = "./assets/skybox/1/";
var urls1 = [r1 + "FieryNebula_front5.jpg", r1 + "FieryNebula_back6.jpg",
    r1 + "FieryNebula_top3.jpg", r1 + "FieryNebula_bottom4.jpg",
    r1 + "FieryNebula_left2.jpg", r1 + "FieryNebula_right1.jpg"
];
var textureCube1 = new THREE.CubeTextureLoader().load(urls1);

var r2 = "./assets/skybox/2/";
var urls2 = [r2 + "px.jpg", r2 + "nx.jpg",
    r2 + "py.jpg", r2 + "ny.jpg",
    r2 + "pz.jpg", r2 + "nz.jpg"
];
var textureCube2 = new THREE.CubeTextureLoader().load(urls2);

var r5 = "./assets/skybox/5/";
var urls5 = [r5 + "rt.png", r5 + "lt.png",
    r5 + "up.png", r5 + "dn.png",
    r5 + "bk.png", r5 + "ft.png"
];
var textureCube5 = new THREE.CubeTextureLoader().load(urls5);
scene.background = textureCube5;

var r7 = "./assets/skybox/7/";
var urls7 = [r7 + "posx.jpg", r7 + "negx.jpg",
    r7 + "posy.jpg", r7 + "negy.jpg",
    r7 + "posz.jpg", r7 + "negz.jpg"
];
var textureCube7 = new THREE.CubeTextureLoader().load(urls7);

var r8 = "./assets/skybox/8/";
var urls8 = [r8 + "px.jpg", r8 + "nx.jpg",
    r8 + "py.jpg", r8 + "ny.jpg",
    r8 + "pz.jpg", r8 + "nz.jpg"
];
var textureCube8 = new THREE.CubeTextureLoader().load(urls8);

var r9 = "./assets/skybox/9/";
var urls9 = [r9 + "posx.png", r9 + "negx.png",
    r9 + "posy.png", r9 + "negy.png",
    r9 + "posz.png", r9 + "negz.png"
];
var textureCube9 = new THREE.CubeTextureLoader().load(urls9);

function loadTexture(url,size){
  size = size || 350;
  var T = new THREE.TextureLoader().load(url);
  T.wrapS = T.wrapT = THREE.RepeatWrapping;
  T.repeat.set(size, size);
  return T;
}

var TextureL1 = loadTexture("./assets/img-ground/hills_dn.png");
var TextureL2 = loadTexture("./assets/img-ground/1.jpg");
var TextureL3 = loadTexture("./assets/img-ground/2.jpg");
var TextureL4 = loadTexture("./assets/img-ground/3.jpg");
var TextureL5 = loadTexture("./assets/img-ground/4.jpg");
var TextureL6 = loadTexture("./assets/img-ground/5.jpg",550);
var TextureL7 = loadTexture("./assets/img-ground/6.jpg");
var TextureL8 = loadTexture("./assets/img-ground/7.jpg");
var TextureL9 = loadTexture("./assets/img-ground/8.jpg",50);

var baseMaterial = new THREE.MeshPhongMaterial({
    map: TextureL1,
    side: THREE.DoubleSide
});

var baseGeometry = new THREE.PlaneGeometry(20000, 20000);
var baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
baseMesh.rotation.set(Math.PI / 2, 0, 0);
baseMesh.receiveShadow = true;
baseMesh.castShadow = false;
scene.add(baseMesh);

document.getElementById("info-btn").addEventListener("click", function () {
    var infoBtn = document.getElementById("info-btn");
    var infoContent = document.getElementById("info-content");
    if (infoContent.style.display === "none") {
        infoContent.style.display = "block";
        infoBtn.innerHTML = "[hide]";
    } else {
        infoContent.style.display = "none";
        infoBtn.innerHTML = "[show]";
    }
});

// auto hide info panel option
if(settings.infowindows.autohide){
    document.getElementById("info-content").style.display = "none";
}