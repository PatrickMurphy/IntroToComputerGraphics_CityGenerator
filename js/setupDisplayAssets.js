// TODO: clean this up with array / loop
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

var TextureL1 = new THREE.TextureLoader().load("./assets/img-ground/hills_dn.png");
TextureL1.wrapS = TextureL1.wrapT = THREE.RepeatWrapping;
TextureL1.repeat.set(350, 350);

var TextureL2 = new THREE.TextureLoader().load("./assets/img-ground/1.jpg");
TextureL2.wrapS = TextureL2.wrapT = THREE.RepeatWrapping;
TextureL2.repeat.set(350, 350);

var TextureL3 = new THREE.TextureLoader().load("./assets/img-ground/2.jpg");
TextureL3.wrapS = TextureL3.wrapT = THREE.RepeatWrapping;
TextureL3.repeat.set(350, 350);

var TextureL4 = new THREE.TextureLoader().load("./assets/img-ground/3.jpg");
TextureL4.wrapS = TextureL4.wrapT = THREE.RepeatWrapping;
TextureL4.repeat.set(350, 350);

var TextureL5 = new THREE.TextureLoader().load("./assets/img-ground/4.jpg");
TextureL5.wrapS = TextureL5.wrapT = THREE.RepeatWrapping;
TextureL5.repeat.set(350, 350);

var TextureL6 = new THREE.TextureLoader().load("./assets/img-ground/5.jpg");
TextureL6.wrapS = TextureL6.wrapT = THREE.RepeatWrapping;
TextureL6.repeat.set(550, 550);

var TextureL7 = new THREE.TextureLoader().load("./assets/img-ground/6.jpg");
TextureL7.wrapS = TextureL7.wrapT = THREE.RepeatWrapping;
TextureL7.repeat.set(350, 350);

var TextureL8 = new THREE.TextureLoader().load("./assets/img-ground/7.jpg");
TextureL8.wrapS = TextureL8.wrapT = THREE.RepeatWrapping;
TextureL8.repeat.set(350, 350);

var TextureL9 = new THREE.TextureLoader().load("./assets/img-ground/8.jpg");
TextureL9.wrapS = TextureL9.wrapT = THREE.RepeatWrapping;
TextureL9.repeat.set(50, 50);

var baseMaterial = new THREE.MeshPhongMaterial({
  map: TextureL1,
  // transparent: true,
  //opacity: 0.8, //set the Transparency
  side: THREE.DoubleSide
});

var baseGeometry = new THREE.PlaneGeometry(20000, 20000);
var baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
baseMesh.rotation.set(Math.PI / 2, 0, 0);
baseMesh.receiveShadow = true;
baseMesh.castShadow = false;
scene.add(baseMesh);

// road geom and material
var roadGeometry = new THREE.PlaneGeometry(roadSize, roadSize);
var roadMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("./assets/road/asphalt.png"),
  side: THREE.DoubleSide
});
