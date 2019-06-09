function textureT(xxx) {
  if (xxx == 1) {
    baseMaterial.map = TextureL1;
  } else if (xxx == 2) {
    baseMaterial.map = TextureL2;
  } else if (xxx == 3) {
    baseMaterial.map = TextureL3;
  } else if (xxx == 4) {
    baseMaterial.map = TextureL4;
  } else if (xxx == 5) {
    baseMaterial.map = TextureL5;
  } else if (xxx == 6) {
    baseMaterial.map = TextureL6;
  } else if (xxx == 7) {
    baseMaterial.map = TextureL7;
  } else if (xxx == 8) {
    baseMaterial.map = TextureL8;
  } else if (xxx == 9) {
    baseMaterial.map = TextureL9;
  }
}

function AddSquareRoad(x, y, z) {
  var roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
  roadMesh.receiveShadow = true;
  roadMesh.castShadow = false;

  roadMesh.position.y = y;
  roadMesh.position.z = z;
  roadMesh.position.x = x;
  roadMesh.rotation.set(Math.PI / 2, 0, 0);

  scene.add(roadMesh);
}

function AddRoads(x, y, z, width) {
  var freeSpace = true;

  for (var b = 0; b < roadLocations.length; b++) {
    if (roadLocations[b].x == x && roadLocations[b].z == z) {
      freeSpace = false;
    }
  }

  if (freeSpace) {
    roadLocations.push({
      x,
      z
    });

    var loader2 = new THREE.ObjectLoader();
    loader2.load('./assets/lightpole/light-pole.json', function (obj) {

      var combined = new THREE.Matrix4();

      var scale = new THREE.Matrix4();
      scale.makeScale(1, 1, 1);
      combined.multiply(scale);

      if (Math.round(Math.random()) == 0) {
        var rot = new THREE.Matrix4();
        rot.makeRotationY(Math.PI / 2);
        combined.multiply(rot);
      }

      obj.applyMatrix(combined);

      obj.mesh

      obj.position.y = 12;
      obj.position.x = x * roadSize + 12;
      obj.position.z = z * roadSize + 12;


      scene.add(obj);

    });

    for (var w = 0; w < width; w++) {
      AddSquareRoad((w + x) * roadSize, y, z * roadSize);
    }

    for (var q = 0; q < width; q++) {
      AddSquareRoad(x * roadSize, y, (q + z) * roadSize);
    }
  }
}

function AddBuilding(startingX, startingZ, randomX, randomZ) {
  var buildingWidth = 1.5 + (Math.random() * 1);
  var buildingHeight = 1.2 + (Math.random() * 1.8);

  var buildingX = (startingX + randomX) * 20 * 5;
  var buildingY = (buildingHeight / 2);
  var buildingZ = (startingZ + randomZ) * 20 * 5;

  var freeSpace = true;

  for (var b = 0; b < buildingLocations.length; b++) {
    if (buildingLocations[b].buildingX == buildingX && buildingLocations[b].buildingZ == buildingZ) {
      freeSpace = false;
    }
  }

  if (freeSpace) {
    buildingLocations.push({
      buildingX,
      buildingZ
    });

    var isWideRand = Math.floor(Math.random() * 30) + 1;

    var wideBuildingWidth = 0;
    var wideBuildingDepth = 0;

    if (isWideRand < 5) {
      var freeSpaceAdj = true;

      for (var b = 0; b < buildingLocations.length; b++) {
        if (buildingLocations[b].buildingX == buildingX + 100 && buildingLocations[b].buildingZ == buildingZ) {
          freeSpaceAdj = false;
        }
      }

      if (freeSpaceAdj) {
        wideBuildingWidth = buildingWidth;
        buildingX += 100;

        buildingLocations.push({
          buildingX,
          buildingZ
        });
        buildingX -= 50;
      }
    } else if (isWideRand > 25) {
      var freeSpaceAdj = true;

      for (var b = 0; b < buildingLocations.length; b++) {
        if (buildingLocations[b].buildingZ == buildingZ + 100 && buildingLocations[b].buildingX == buildingX) {
          freeSpaceAdj = false;
        }
      }

      if (freeSpaceAdj) {
        wideBuildingDepth = buildingWidth;
        buildingZ += 100;

        buildingLocations.push({
          buildingX,
          buildingZ
        });
        buildingZ -= 50;
      }
    }

    var baseColor = 0.2 + (Math.random() * 0.8);
    AddBuild(Math.floor((Math.random() * 8) + 1), baseColor - (Math.random() / 10), baseColor - (Math.random() /
        10), baseColor - (Math.random() / 10), buildingWidth + wideBuildingWidth, buildingHeight,
      buildingWidth + wideBuildingDepth, buildingX, buildingY,
      buildingZ);
  }
}

//AddBuild(name of model, red, blue, green, width, height, depth, x translation, y translation, z translation)
//AddBuild(1, 0.5, 0.5, 0.5, 1, 1, 1, 0, 0, 0);
function AddBuild(model, r, g, b, width, height, depth, xTra, yTra, zTra) {
  var loader = new THREE.PLYLoader();
  var mesh = null;
  loader.load('assets/building_models/b' + model + '.ply', function (geometry) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(r, g, b);
    material.shininess = 100;
    geometry.computeVertexNormals();
    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "building";

    geometry.computeBoundingBox();

    //var center = geometry.boundingBox.getCenter();
    var size = geometry.boundingBox.getSize();

    var sca = new THREE.Matrix4();
    //var tra = new THREE.Matrix4();
    //var rot = new THREE.Matrix4();
    var combined = new THREE.Matrix4();

    sca.makeScale(2 * size.length() * width, 2 * size.length() * height, 2 * size.length() * depth);
    //tra.makeTranslation (center.x + xTra, center.y + yTra, center.z + zTra);
    //rot.makeRotationX(- Math.PI / 2);

    combined.multiply(sca);
    //combined.multiply(tra);
    //combined.multiply(rot);

    mesh.applyMatrix(combined);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.x = xTra;
    mesh.position.y = yTra;
    mesh.position.z = zTra;

    scene.add(mesh);
  });
}

function RandomWalk(startingX, startingZ, stepsLeft, spacing) {
  var randomRoadCoords = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0]
  ][Math.random() * 4 | 0];

  var newX = startingX + randomRoadCoords[0];
  var newZ = startingZ + randomRoadCoords[1];

  AddRoads(newX * 5, 1, newZ * 5, 5);


  var randomBuildingCoords = [
    [0.5, 0.5],
    [0.5, -0.5],
    [-0.5, 0.5],
    [-0.5, -0.5]
  ][Math.random() * 4 | 0];

  AddBuilding(startingX, startingZ, randomBuildingCoords[0], randomBuildingCoords[1]);


  var newStepsLeft = stepsLeft - 1;
  if (newStepsLeft > 0) {
    RandomWalk(newX, newZ, newStepsLeft, spacing);
  }
}

function GenerateCity(steps) {
  for (var x = 0; x < steps; x++) {
    RandomWalk(0, 0, x, 5);
  }
}