import * as THREE2 from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import { BufferGeometryUtils } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/utils/BufferGeometryUtils.js';

var wall = 'draw.png';
var floor = 'stone.png'
function main() {
  var keys = [];

  for (var i = 0 ; i < 500 ; i++) {
    keys[i] = false;
  }


  document.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
  });

  document.addEventListener("keyup", function(event) {
    keys[event.keyCode] = false;
  });
  var mouseX = 0;
  var mouseY = 0;
  //const canvas = document.querySelector("#can");
  var scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //camera.position.set(0, 0, 48);
  //camera.lookAt(0, 0, 0);
  camera.position.y = 27;



  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three").appendChild(renderer.domElement);

  var quad_vertices =
[
-30.0,  30.0, 0.0,
30.0,  30.0, 0.0,
30.0, -30.0, 0.0,
-30.0, -30.0, 0.0
];

var quad_uvs =
[
0.0, 0.0,
1.0, 0.0,
1.0, 1.0,
0.0, 1.0
];

var quad_indices =
[
0, 2, 1, 0, 3, 2
];

var geometry = new THREE.BufferGeometry();

var vertices = new Float32Array( quad_vertices );
// Each vertex has one uv coordinate for texture mapping
var uvs = new Float32Array( quad_uvs);
// Use the four vertices to draw the two triangles that make up the square.
var indices = new Uint32Array( quad_indices )

// itemSize = 3 because there are 3 values (components) per vertex
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

// Load the texture asynchronously
var textureLoader = new THREE.TextureLoader();
textureLoader.load('texture.png', function (texture){

var material = new THREE.MeshBasicMaterial( {map: texture });
var mesh = new THREE.Mesh( geometry, material );
mesh.position.z = -100;


renderer.render(scene, camera);
}, undefined, function (err) {
});


  //imageList = ["beach", "forest", "skimountain", "ecstasy", "glass", "stpeter", "love", "nature", "mountains", "meat", "flower", "flirtation", "girl", "building", "skyscraper", "tinycity", "diagram1", "dome", "ocean", "eco", "plant", "darkbeach", "diagram2"];

  var cubes = [];

  const sinespeed = 0.004;

  camera.position.z = 5;

  var buffs = [];

  var total = [];
  var totalu = [];

  class Cube {

    constructor(x1, y1, x2, y2) {

      //this.rot = rot;
      var HT = 300;
      this.x = (x1+x2)/2;
      this.y = HT/2;
      this.z = (y1+y2)/2;
      this.w1 = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
      this.w2 = HT;
      this.w3 = 0.1;
      this.rx = 0;

      this.rx = 0;//Math.atan((y2 - y1) / (x2 - x1 + 0.0001));
      this.ry = -Math.atan((y2 - y1) / (x2 - x1 + 0.0001));
      //if (x2 > x1) {
      //  this.ry += Math.PI;
      //}
      this.rz = 0;//Math.atan((y2 - y1) / (x2 - x1 + 0.0001));




      this.geometry = new THREE2.BoxGeometry(1, 1, 1);
      this.geometry.scale(this.w1, this.w2, this.w3);
      this.geometry.rotateY(this.ry);
      this.geometry.translate(this.x, this.y, this.z);
      //this.material = new THREE.MeshBasicMaterial({ color: 0x00ffaa});
      //this.cube = new THREE.Mesh(this.geometry, this.material);
      /*this.cube.scale.x = this.w1;
      this.cube.scale.y = this.w2;
      this.cube.scale.z = this.w3;
      this.cube.position.x = this.x;
      this.cube.position.y = this.y;
      this.cube.position.z = this.z;
      this.cube.rotation.x = this.rx;
      this.cube.rotation.y = this.ry;
      this.cube.rotation.z = this.rz;*/


      /*this.cube.scale.x = this.w1;
      this.cube.scale.y = this.w2;
      this.cube.scale.z = this.w3;
      this.cube.position.x = this.x;
      this.cube.position.y = this.y;
      this.cube.position.z = this.z;
      this.cube.rotation.x = this.rx;
      this.cube.rotation.y = this.ry;
      this.cube.rotation.z = this.rz;*/



      buffs.push(this.geometry);
      //var material = new THREE.MeshBasicMaterial({ color: 0x00ffaa});

      //material.alphaMap = arr;


      //materials = new THREE.MeshFaceMaterial(materials);

      //var material = new THREE.MeshBasicMaterial({map: loader.load("flower.jpg")});

      //this.cube = new THREE.Mesh(this.geometry, this.material);

      this.speed = (Math.random() * 0.01 + 0.006) / 2;

      this.sinepos = 0;
      this.totalpos = 0;

    }

    draw() {

      scene.add(this.cube);

    }

    update() {
      if (this.f) {

        //this.cube.rotation.x += 0.005;
        //this.cube.rotation.x = Math.PI;
      }
      this.sinepos += sinespeed;
      this.totalpos += sinespeed;
      //this.cube.position.z = 1 * Math.sin(this.totalpos) * this.y - 1;
      //this.cube.position.y = 1 * Math.cos(this.totalpos) * this.y;
      //this.cube.rotation.x = this.totalpos;
      if (this.rot) {
        //this.cube.rotation.x += 0.01;
      }
      //this.
      //this.cube.rotation.x = 0.04;
      //this.cube.position.z = Math.sin(this.sinepos) * 2;
      //this.cube.rotation.y += this.speed;
      //this.cube.position.y += 0.01;
    }
  }
  //camera.lookAt(0, 0, 0);



  //cubes.push(new Cube(-0.4, 4.2, -2, 0.6, 4.2, -1, true));
  //cubes.push(new Cube(-0.5, 0.5, -0.5, 0.1, 1.1, 0.1, true));
  //cubes.push(new Cube(0, 0, 0, 1, 1, 1));
  //cubes.push(new Cube(0, 0, 0, 2));

  for (var i = 0 ; i < cubes.length ; i++) {
    //cubes[i].draw();
  }

    var total = [];
    var totalu = [];
    var total2 = [];
    var totalu2 = [];

    function makeFloor(x1, z1, x2, z2) {
      var vtotal = [x1, 0, z1, x1, 0, z2, x2, 0, z2, x2, 0, z2, x2, 0, z1, x1, 0, z1];
      var vtotalu = [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1];

      for (var i = vtotal.length - 1 ; i >= 0 ; i -= 3) {
        vtotal.push(vtotal[i-2]);
        vtotal.push(vtotal[i-1]);
        vtotal.push(vtotal[i]);
      }
      for (var i = vtotalu.length - 1 ; i >= 0 ; i -= 2) {
        vtotalu.push(vtotalu[i-1]);
        vtotalu.push(vtotalu[i]);
      }

      for (var i = 0 ; i < vtotal.length ; i++) {
        total2.push(vtotal[i]);
      }
      for (var i = 0 ; i < vtotalu.length ; i++) {
        totalu2.push(vtotalu[i]);
      }
    }

    var dwalls = [];
    var SF = 5;

  function makeWall(x1, z1, x2, z2, parm) {
    //if (dwalls.length>0) return;
    if (parm && Math.random() < 0.45) return;
    dwalls.push([x1*SF,z1*SF,x2*SF,z2*SF]);
    console.log("hello " + walls);
    var y1 = 0;
    var y2 = 60;

    var vtotal = [x1, y1, z1, x1, y2, z1, x2, y2, z2, x2, y2, z2, x2, y1, z2, x1, y1, z1];
    var vtotalu = [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1];

    for (var i = vtotal.length - 1 ; i >= 0 ; i -= 3) {
      vtotal.push(vtotal[i-2]);
      vtotal.push(vtotal[i-1]);
      vtotal.push(vtotal[i]);
    }
    for (var i = vtotalu.length - 1 ; i >= 0 ; i -= 2) {
      vtotalu.push(vtotalu[i-1]);
      vtotalu.push(vtotalu[i]);
    }

    for (var i = 0 ; i < vtotal.length ; i++) {
      total.push(vtotal[i]);
    }
    for (var i = 0 ; i < vtotalu.length ; i++) {
      totalu.push(vtotalu[i]);
    }
  }
  /*var fix = total.length;
  for (var i = 0 ; i < fix ; i++) {
    total.push(total[fix-i-1]);
  }
  fix = totalu.length;
  for (var i = 0 ; i < fix ; i++) {
    totalu.push(totalu[fix-i-1]);
  }*/




  //var material = new THREE.MeshBasicMaterial({ color: 0x00ffaa});

  //var mesh1 = new THREE2.Mesh(merg, material);

  //scene.add(mesh1);

  var path = [];

  var start = 0;

  var SIZE = 16;

  for (var rad = 0 ; rad < SIZE*10 ; rad += 10) {
    var lim = parseInt((2 * Math.PI * rad) / 20);
    /*if (rad%20 == 0) {
      start = parseInt(lim*(7/9));
    }
    else {
      start = -parseInt(0);
    }*/
    path.push([start, lim]);
    //start+=4;
    start += parseInt(Math.random() * (lim * 1.5) - (lim * 0.75));
  }

  var ti = 0.003;
  var t = 0;

  var holes = [[]];

  //makeWall(0, 0, 100, 100);

  for (var rad = 20 ; rad < SIZE*10 ; rad += 10) {
    holes.push([]);
  var lim = parseInt((2 * Math.PI * rad) / 20);
  for (var i = 0 ; i < lim ; i++) {
    var ang = i * (Math.PI * 2 / lim);
    var ang2 = (i+1) * (Math.PI * 2 / lim);

    if (i != (path[rad/10][0] + lim*10000) % lim) {
      if (Math.random() > 0.05) {
        makeWall(Math.cos(ang)*rad, Math.sin(ang)*rad, Math.cos(ang2)*rad, Math.sin(ang2)*rad);

      }
      else {
        holes[holes.length - 1].push([i, ang, ang2]);
      }
    }
    else {
      holes[holes.length - 1].push([i, ang, ang2]);
    }
  }
}

  var win = false;

  for (var i = 1 ; i < SIZE-1 ; i++) {
    var walls = [];
    for (var j = 0 ; j < 500 ; j++) {
      var lim = parseInt((2 * Math.PI * (i+1) * 10) / 20);

      var r1 = i*10;
      var r2 = (i+1)*10;
      var ang = Math.random()*(2*Math.PI);
      var s1 = parseInt((2 * Math.PI * r1) / 20);
      var inc1 = (2*Math.PI)/s1;
      var a1 = parseInt(ang / inc1) * inc1;
      var a2 = a1 + inc1;
      var x1 = Math.cos(a1)*r1;
      var z1 = Math.sin(a1)*r1;
      var x2 = Math.cos(a2)*r1;
      var z2 = Math.sin(a2)*r1;
      var x3 = (x1 * (1 - (ang % inc1) / inc1)) + (x2 * ((ang % inc1) / inc1));
      var z3 = (z1 * (1 - (ang % inc1) / inc1)) + (z2 * ((ang % inc1) / inc1));
      var s2 = parseInt((2 * Math.PI * r2) / 20);
      var inc2 = (2*Math.PI)/s2;
      var a3 = parseInt(ang / inc2) * inc2;
      var a4 = a3 + inc2;
      var x4 = Math.cos(a3)*r2;
      var z4 = Math.sin(a3)*r2;
      var x5 = Math.cos(a4)*r2;
      var z5 = Math.sin(a4)*r2;
      var x6 = (x4 * (1 - (ang % inc2) / inc2)) + (x5 * ((ang % inc2) / inc2));
      var z6 = (z4 * (1 - (ang % inc2) / inc2)) + (z5 * ((ang % inc2) / inc2));

      var lm1 = parseInt((2 * Math.PI * (i) * 10) /20);
      var closer = path[i][0] / path[i][1];
      var lm2 = parseInt((2 * Math.PI * (i+1) * 10)/20);
      var further = path[i+1][0] / path[i+1][1];

      closer = closer * (Math.PI*2);
      further = further * (Math.PI*2);
      closer = (closer + Math.PI * 200) % (Math.PI * 2);
      if (j==0) {
      }


      further = (further + Math.PI * 200) % (Math.PI * 2);

      var l = Math.min(closer, further);
      var r = Math.max(closer, further);


      var tooclose = false;

      for (var k = 0 ; k < walls.length ; k++) {
        var dist = Math.abs(walls[k] - ang);
        dist = Math.min(2*Math.PI - dist, dist);
        if (dist * i * 20 < 80) {
          tooclose = true;
        }
      }

      var hole = false;


      var hh = holes[i];

      var rlim = parseInt((2 * Math.PI * (i+1) * 10) / 20);

      for (var k = 0 ; k < hh.length ; k++) {
        if (ang >= hh[k][1] && ang <= hh[k][2]) {
          hole = true;
        }
      }

      var hh = holes[i-1];

      var rlim = parseInt((2 * Math.PI * (i) * 10) / 20);

      for (var k = 0 ; k < hh.length ; k++) {
        if (ang >= hh[k][1] && ang <= hh[k][2]) {
          hole = true;
        }
      }


      if (!(ang >= l && ang <= r) && !hole && !tooclose) {
        makeWall(x3, z3, x6, z6, true);
        walls.push(ang);
      }
    }
  }

  var inc = 60;

  for (var i = -2500 ; i < 2500 ; i += inc) {
    for (var j = -2500 ; j < 2500 ; j += inc) {
      makeFloor(i, j, i + inc, j + inc);
    }
  }


  for (var i = 0 ; i < total.length ; i += 3) {
    total[i] *= SF;
    total[i+2] *= SF;
  }

    var snowgeo = new THREE.BufferGeometry();
    snowgeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(total), 3));

  snowgeo.setAttribute(
      'uv',
      new THREE.BufferAttribute(new Float32Array(totalu), 2));

        const txt = new THREE.TextureLoader()
        const texture = txt.load(wall);
        //const material2 = new THREE2.MeshBasicMaterial({color:'rgb(' + parseInt(i*12.5) + ',' + parseInt(255 - i*12.5) + ',0)'});
        var col = parseInt(255);
        const material2 = new THREE2.MeshBasicMaterial({map: texture, color: 'rgb(230, 255, 230)'});
        const mesh2 = new THREE2.Mesh(snowgeo, material2);
        scene.add(mesh2);

        var snowgeo2 = new THREE.BufferGeometry();
        snowgeo2.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(total2), 3));

      snowgeo2.setAttribute(
          'uv',
          new THREE.BufferAttribute(new Float32Array(totalu2), 2));

            const texture2 = txt.load(floor);
            //const material2 = new THREE2.MeshBasicMaterial({color:'rgb(' + parseInt(i*12.5) + ',' + parseInt(255 - i*12.5) + ',0)'});
            var col = parseInt(255);
            const material3 = new THREE2.MeshBasicMaterial({map: texture2, color: 'rgb(255,255,255)'});
            const mesh3 = new THREE2.Mesh(snowgeo2, material3);
            scene.add(mesh3);


  var owd = [];
  for (var i = 0 ; i < 100000 ; i++) {
    owd.push(1000000000);
  }
  var lasts = [];
  for (var i = 0 ; i < 100000 ; i++) {
    lasts.push(false);
  }
  function animate() {
    if (Math.sqrt(camera.position.x*camera.position.x+camera.position.z*camera.position.z)>=10*SF*(SIZE-1) + 5) {
      document.getElementById("win").innerHTML = "You escaped. Congratulations! Press ENTER to fly above the maze and view it from above";
      win = true;
    }
    requestAnimationFrame(animate);

    var mouseX = parseInt(document.getElementById("extra2").innerHTML.split(" ")[0]);
    var mouseY = parseInt(document.getElementById("extra2").innerHTML.split(" ")[1]);

    /*camera.position.x = mouseX;
    camera.position.z = mouseY;*/

    var theta = (mouseX / 800) * (2 * Math.PI);
    var phi = (mouseY / 400) * (Math.PI);

    //camera.lookAt(camera.position.x + Math.cos(theta), camera.position.y, camera.position.z + Math.sin(theta));
    camera.lookAt(camera.position.x + Math.cos(theta) * Math.sin(phi), camera.position.y + Math.cos(phi), camera.position.z + Math.sin(theta) * Math.sin(phi));

    var px1 = camera.position.x;
    var py1 = camera.position.z;

    var ms = 2.5;
    if (win) ms = 8;

    if (keys[87]) {
      camera.position.x += Math.cos(theta) * ms;
      camera.position.z += Math.sin(theta) * ms;
    }
    else if (keys[83]) {
      camera.position.x -= Math.cos(theta) * ms;
      camera.position.z -= Math.sin(theta) * ms;
    }
    else if (keys[65]) {
      camera.position.x += Math.sin(theta) * ms;
      camera.position.z += Math.cos(theta) * ms;
    }
    else if (keys[68]) {
      camera.position.x -= Math.sin(theta) * ms;
      camera.position.z -= Math.cos(theta) * ms;
    }

    var px2 = camera.position.x;
    var py2 = camera.position.z;

    for (var i = 0 ; i < dwalls.length ; i++) {
      var wx1 = dwalls[i][0];
      var wy1 = dwalls[i][1];
      var wx2 = dwalls[i][2];
      var wy2 = dwalls[i][3];

      var m1 = (wy2 - wy1) / (wx2 - wx1 + 0.0000001);
      m1 = -1 / (m1 + 0.00000001);
      var b1 = py1 - px1 * m1;
      var m2 = (wy2 - wy1) / (wx2 - wx1 + 0.0000001);
      var b2 = wy2 - wx2 * m2;
      var ix2 = (b2 - b1) / (m1 - m2);
      var iy2 = m1 * ix2 + b1;
      var b3 = py2 - px2 * m1;
      var ix1 = (b2 - b3) / (m1 - m2);
      var iy1 = m1 * ix1 + b3;

      if (i==0 && keys[89]) {
        console.log(ix1 + " " + iy1 + " " + ix2 + " " + iy2);
      }

      /*if (i==0 && keys[88]) {
        console.log(Math.sqrt((px1-wx1)*(px1-wx1)+(py1-wy1)*(py1-wy1)));
        console.log(m1 + " " + b1);
        console.log(m2 + " " + b2);
        console.log(px1+" "+py1+" "+px2+" "+py2);
        console.log(ix + " " + iy);
        console.log(px1+" "+py1+" "+px2+" "+py2+" "+wx1+" "+wy1+" "+wx2+" "+wy2);
        console.log((ix >= Math.min(wx1,wx2) - 0.01) + " " + (ix <= Math.max(wx1,wx2) + 0.01) + " " + (ix >= Math.min(px1,px2) - 0.01)  + " " + (ix <= Math.max(px1,px2) + 0.01) + " " + (iy >= Math.min(wy1,wy2) - 0.01) + " " + (iy <= Math.max(wy1,wy2) + 0.01) + " " + (iy >= Math.min(py1,py2) - 0.01) + " " + (iy <= Math.max(py1,py2) + 0.01));
      }*/
      var OF = 4;
      var wallDist = Math.sqrt((px1-ix1)*(px1-ix1)+(py1-iy1)*(py1-iy1));
      var lfd = Math.sqrt((px1-wx1)*(px1-wx1)+(py1-wy1)*(py1-wy1));
      var rfd = Math.sqrt((px1-wx2)*(px1-wx2)+(py1-wy2)*(py1-wy2));
      var od = Math.sqrt((wx2-wx1)*(wx2-wx1)+(wy2-wy1)*(wy2-wy1));
      /*if (i==0 && keys[88]) {console.log(wallDist + " " + owd[i]);
    console.log(lffd + " " + rfd + " " + od);}*/
    var goalAng = Math.atan((wy2-wy1)/(wx2-wx1));
    if (wx2<wx1) goalAng += Math.PI;
    var ac = Math.abs(theta - goalAng);
    ac = Math.min(ac, 2 * Math.PI - ac);
    if (i==0&&keys[88]) {
    //console.log("DIST: " + wallDist);
    //console.log("Angle: " + ac);
    console.log(px2 + " " + px1);}

    var cur = camera.position.z > (m2 * camera.position.x + b2);
    console.log(cur + " " + lasts[i]);
      //if (wallDist < 10 && ix >= Math.min(wx1,wx2) - OF && ix <= Math.max(wx1,wx2) + OF && ix >= Math.min(px1,px2) - OF && ix <= Math.max(px1,px2) + OF && iy >= Math.min(wy1,wy2) - OF && iy <= Math.max(wy1,wy2) + OF && iy >= Math.min(py1,py2) - OF && iy <= Math.max(py1,py2) + OF) {
      if (!win && wallDist < 5 && cur != lasts[i] && px1 >= Math.min(wx1,wx2) - OF && px1 <= Math.max(wx1,wx2) + OF && py1 >= Math.min(wy1,wy2) - OF && py1 <= Math.max(wy1,wy2) + OF) {
        camera.position.x = px1;
        camera.position.z = py1;
        if (i==0&&keys[88]) {
        console.log("STOPPED");
      }
    }
      else {

      }

      lasts[i] = camera.position.z > (m2 * camera.position.x + b2);

      //owd[i] = wallDist;
    }
    if (win) {
    if (keys[16]) {
      camera.position.y -= 3;
    }
    if (keys[13]) {
      camera.position.y += 3;
    }
  }

    renderer.render(scene, camera);

  }
  animate();
}

window.onload = function() {
  main();
}
