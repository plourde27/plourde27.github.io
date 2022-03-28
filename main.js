import * as THREE2 from '/ctf/js/three2.js';
import { BufferGeometryUtils } from '/ctf/js/bgu.js';
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmNBHJPDEIXEN9U8-gjvwzY3sTU2lvxnk",
  authDomain: "multiplayer-game-test-e40aa.firebaseapp.com",
  databaseURL: "https://multiplayer-game-test-e40aa-default-rtdb.firebaseio.com",
  projectId: "multiplayer-game-test-e40aa",
  storageBucket: "multiplayer-game-test-e40aa.appspot.com",
  messagingSenderId: "63937020805",
  appId: "1:63937020805:web:0813a4feed2953f833faec",
  measurementId: "G-SK3XG7R2ZW"
};


// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);  //Data Object Change Listener
firebase.initializeApp(firebaseConfig);


  var playerCols = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [255, 0, 255],
    [0, 255, 255],
    [255, 125, 0],
    [255, 0, 125],
    [125, 255, 0],
    [125, 0, 255],
    [0, 255, 125],
    [0, 125, 255],
    [255, 255, 255]
  ];

  var playerCount = 1;
  var you = -1;
  var code;



function main() {
  runMenu();
  //run3D();
}

function runMenu() {
  var scene = "menu";



  var mouseX = 0;
  var mouseY = 0;
  var fc = 0;
  var clicked = false;
  var lets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var playerNames = [];
  var names = [];


  function animate() {
    fc++;

    window.requestAnimationFrame(animate);

    //firebase.database().ref("test/" + Date.now() + "/" + fc).set({x0: 5, y0: 6});
    /*firebase.database().ref("ABCDEF").on("value", function(snapshot) {
      console.log(snapshot.val().x0);
    });*/

    if (scene == "menu") {
      var g = document.getElementById("menu").getContext('2d');
      document.getElementById("menu").width = window.innerWidth;
      document.getElementById("menu").height = window.innerHeight;
      g.fillStyle = 'rgb(255, 255, 255)';
      var w = window.innerWidth;
      var h = window.innerHeight;
      g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '80px AvenirNext-Bold';
      g.textAlign = 'center';
      g.fillText("CAPTURE THE FLAG", w/2, 160);
      g.fillStyle = 'rgb(100, 100, 100, 0.25)';
      g.fillRect(0, 450, w, 50);
      g.fillRect(0, 510, w, 50);
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '24px Avenir';
      g.fillText("Start Game", w/2, 484);
      g.fillText("Join Game", w/2, 544);
      if (clicked && mouseY >= 450 && mouseY <= 500) {
        scene = "start";
        you = 0;
        code = "";
        var username = document.getElementById("inp2").value;
        for (var i = 0 ; i < 6 ; i++) {
          code += lets[parseInt(Math.random() * 26)];
        }
        firebase.database().ref(code + "/count").set(1);
        firebase.database().ref(code + "/names").set({1: username});
        document.getElementById("username").hidden=true;
      }
      if (clicked && mouseY >= 510 && mouseY <= 560) {
        scene = "entercode";
        username = document.getElementById("inp2").value;
        document.getElementById("username").hidden=true;
      }
      clicked = false;
    }
    else if (scene == "start") {
      var g = document.getElementById("menu").getContext('2d');
      document.getElementById("menu").width = window.innerWidth;
      document.getElementById("menu").height = window.innerHeight;
      g.fillStyle = 'rgb(255, 255, 255)';
      var w = window.innerWidth;
      var h = window.innerHeight;
      g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '40px Avenir';
      g.textAlign = 'center';
      g.fillText("Game Code: " + code, w/2, 60);

      var username = document.getElementById("inp2").value;
      var lml = -1;
      var dbRef = firebase.database().ref(code + "/count");
      dbRef.on("value", function(snapshot) {
        playerCount = snapshot.val();
      });
      for (var i = 0 ; i < playerCount ; i++) {
        var dbRef = firebase.database().ref(code + "/names/" + (i+1));
        dbRef.on("value", function(snapshot) {
          names[i] = snapshot.val();
        });
      }
      g.fillText(playerCount + " players currently in game", w/2, 120);
      for (var i = 0 ; i < playerCount ; i++) {
        g.fillStyle = 'rgba(' + playerCols[i][0] + ',' + playerCols[i][1] + ',' + playerCols[i][2]+ ',0.3)';
        g.fillRect(0, 200 + i*60, window.innerWidth, 50);
        g.font = '32px AvenirNext-Bold';
        g.fillStyle = 'rgb(0, 0, 0)';
        if (names[i] != undefined) {
          g.fillText(names[i].toUpperCase(), window.innerWidth/2, 200 + i*60 + 37);
        }
      }
      if (you == 0) {
        g.fillStyle = 'rgba(100, 100, 100, 0.5)';
        g.fillRect(0, window.innerHeight - 90, window.innerWidth, 50);
        g.font = '24px Avenir';
        g.fillStyle = 'rgb(0, 0, 0)';
        g.fillText("Start Game", window.innerWidth/2, window.innerHeight - 55);
        if (mouseY >= window.innerHeight - 90 && mouseY <= window.innerHeight - 40) {
          if (clicked) {

            document.getElementById("menu").width = 0;
            document.getElementById("menu").height = 0;
            document.getElementById("inptag").hidden = true;
            document.getElementById("username").hidden = true;
            run3D();
            scene = "game";

          }
        }
      }
      else {
        
      }

    }
    else if (scene == "entercode") {
      var g = document.getElementById("menu").getContext('2d');
      document.getElementById("menu").width = window.innerWidth;
      document.getElementById("menu").height = window.innerHeight;
      g.fillStyle = 'rgb(255, 255, 255)';
      var w = window.innerWidth;
      var h = window.innerHeight;
      g.fillRect(0, 0, w, h);
      document.getElementById("inptag").hidden = false;
      g.fillStyle = 'rgb(100, 100, 100, 0.25)';
      g.fillRect(0, 360, window.innerWidth, 50);
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '24px Avenir';
      g.textAlign = 'center';
      g.fillText("Go", window.innerWidth/2, 393);
      if (clicked && mouseY >= 360 && mouseY <= 410) {
        scene = "start";
        code = document.getElementById("inp").value;
        var username = document.getElementById("inp2").value;
        var lml = -1;
        var dbRef = firebase.database().ref(code + "/count");
        dbRef.once("value", function(snapshot) {
          var num = snapshot.val() + 1;
          you = num - 1;
          firebase.database().ref(code + "/count/").set(num);
          firebase.database().ref(code + "/names/" + num).set(username);
        });
        document.getElementById("inptag").hidden = true;
      }
    }
  }

  animate();

  var elem = document.getElementById("menu");
  var left = elem.offsetLeft + elem.clientLeft;
  var etop = elem.offsetTop + elem.clientTop;

  elem.addEventListener('mousedown', function(event) {
    var x = event.pageX - left;
    var y = event.pageY - etop;
    mouseX = x;
    mouseY = y;
    clicked = true;
  });
}

var wall = 'draw.png';
var floor = 'stone.png';
function run3D() {

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

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
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

  var totals = [];
  var totalsu = [];
  for (var i = 0 ; i < 13 ; i++) {
    totals.push([]);
    totalsu.push([]);
  }

  var toAdd = [];

  var grid = [];

  /*function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;

          allText = allText.split("\n");

          var ind = 0;


          var line = allText[1].split(" ");
          var n = parseInt(line[0]);
          var m = parseInt(line[1]);




          for (var i = 0 ; i < n ; i++) {
            grid.push([]);
            for (var j = 0 ; j < m ; j++) {
              grid[i].push(-1);
            }
          }

          for (var i = 0 ; i < n ; i++) {
            var line = allText[i + 2].split(" ");
            for (var j = 0 ; j < m ; j++) {

              grid[i][j] = parseFloat(line[j]);

            }
          }


        }
      }
    }
    rawFile.send(null);
  }*/

  //readTextFile("m1f.txt");

  var nx = 2048;
  var mx = 2048;
  var n = 400;
  var m = 400;

  for (var i = 0 ; i < 2048 ; i++) {
    grid.push([]);
    for (var j = 0 ; j < 2048 ; j++) {
      grid[i].push(-1);
    }
  }

  for (var i = 0 ; i < nx ; i++) {
    for (var j = 0 ; j < mx ; j++) {

      //grid[i][j] = 2000 - (Math.abs(i - n/2) * Math.abs(i - n/2) + Math.abs(j - m/2) * Math.abs(j - m/2)) / 20;
      var ds = Math.sqrt((i-n/2)*(i-n/2) + (j-m/2)*(j-m/2));
      grid[i][j] = 2000 + Math.sin(ds / 6) * 400
    }
  }

  var sx = grid.length;
  var sy = grid[0].length;
  var leafgeometries = [];
  var geometries = [];

  var CHUNK = 1;
  var DV = 13;
  var LIM = DV * 50;
  var XF = 12;

  function getElevation(x, y) {

    var leftI = parseInt(x/CHUNK) * CHUNK;
    var rightI = parseInt(x/CHUNK) * CHUNK  + CHUNK;
    var leftJ = parseInt(y/CHUNK) * CHUNK;
    var rightJ = parseInt(y/CHUNK) * CHUNK + CHUNK;


    var x0, y0, x1, y1, x2, y2;

    if (y - leftJ < x - leftI) {
      x0 = leftI;
      y0 = leftJ;
      x1 = rightI;
      y1 = leftJ;
      x2 = rightI;
      y2 = rightJ;
    }
    else {
      x0 = leftI;
      y0 = leftJ;
      x1 = leftI;
      y1 = rightJ;
      x2 = rightI;
      y2 = rightJ;
    }

    if (x0 == NaN) {
      return 0;
    }

    if (x0 < 0 || x0 > grid.length) {
      return -1;
    }
    if (x1 < 0 || x1 > grid.length) {
      return -1;
    }
    if (x2 < 0 || x2 > grid.length) {
      return -1;
    }

    if (y0 < 0 || y0 > grid[x0].length) {
      return -1;
    }
    if (y1 < 0 || y1 > grid[x1].length) {
      return -1;
    }
    if (y2 < 0 || y2 > grid[x2].length) {
      return -1;
    }


    var z0 = grid[x0][y0];
    var z1 = grid[x1][y1];
    var z2 = grid[x2][y2];

    var vec1 = [x1 - x0, y1 - y0, z1 - z0];
    var vec2 = [x2 - x0, y2 - y0, z2 - z0];
    var cros = [vec1[1] * vec2[2] - vec1[2] * vec2[1], vec1[2] * vec2[0] - vec1[0] * vec2[2], vec1[0] * vec2[1] - vec1[1] * vec2[0]];
    var mx = cros[0];
    var my = cros[1];
    var mz = cros[2];
    var z = (mz * z0 + my * y0 + mx * x0 - mx * x - my * y) / mz;

    //mx(x - x0) + my(y - y0) + mz(z - z0) = 0
    //mx * x - mx * x0 + my * y - my * y0 + mz * z - mz * z0 = 0
    //mz * z = mz * z0 + my * y0 + mx * x0 - mx * x - mx * y
    //z = (mz * z0 + my * y0 + mx * x0 - mx * x - mx * y) / mz

    var leftAns = (grid[leftI][leftJ] * (1 - x % 1) + grid[rightI][leftJ] * (x % 1)) / DV;
    var rightAns = (grid[leftI][rightJ] * (1 - x % 1) + grid[rightI][rightJ] * (x % 1)) / DV;
    var ans = (leftAns * (1 - y % 1) + rightAns * (y % 1)) / DV;

    return z;

    //return z / DV;
  }

  function makeTree(x, y, z) {
      var HT = (Math.random()*40 + 220) * 1.8;
      var geometry = new THREE2.CylinderGeometry(25, 25, HT, 6);

      geometry.translate(x, z + HT/2, y);
      geometries.push(geometry);
      var extratop = HT * (Math.random() + 1.5);
      var bot = HT * (Math.random()*0.3 + 0.1);
      var geometry1101 = new THREE2.CylinderGeometry(50, 150 + Math.random()*120, (extratop - bot), 6);
      geometry1101.translate(x, z + bot + (extratop - bot) / 2, y);
      leafgeometries.push(geometry1101);
  }

  for (var i = 0 ; i < 500 ; i ++) {
    for (var j = 0 ; j < 500 ; j++) {

    }
  }

  function makeGround(i, j, colNum) {
    var fac = 15;
    var xf = 400;
    var gfac = 4;

    var li = i * xf;
    var lj = j * xf;
    var ri = (i+1) * xf;
    var rj = (j+1) * xf;

    //if (!(colNum >= 0 && colNum < 12)) colNum = 0;

    var r = colNum;

    var rand = totals[r];
    var randu = totalsu[r];

    var lox = (i%gfac)/gfac;
    var hix = (i%gfac)/gfac + 1/gfac;
    var loy = (j%gfac)/gfac;
    var hiy = (j%gfac)/gfac + 1/gfac;

    var ntotal = [li, grid[i][j]*fac, lj, ri, grid[i+1][j]*fac, lj, ri, grid[i+1][j+1]*fac, rj, ri, grid[i+1][j+1]*fac, rj, li, grid[i][j+1]*fac, rj, li, grid[i][j]*fac, lj];
    var ntotalu = [lox, loy, hix, loy, hix, hiy, hix, hiy, lox, hiy, lox, loy];

    for (var i = 0 ; i < ntotal.length;i++) { rand.push(ntotal[i]); }
    for (var i = 0 ; i < ntotalu.length;i++) { randu.push(ntotalu[i]); }

    for (var i = ntotal.length-3 ; i >= 0 ; i -= 3) { rand.push(ntotal[i]);rand.push(ntotal[i+1]);rand.push(ntotal[i+2]); }
    for (var i = ntotalu.length-2 ; i >= 0 ; i -= 2) { randu.push(ntotalu[i]);randu.push(ntotalu[i+1]); }

  };

  total = [];
  totalu = [];

  var arcs = [[200, 200, 73, 80, 0, 2*Math.PI], [200, 200, 115, 123, 0, 2*Math.PI], /*[200, 200, 172, 179, 0, 2*Math.PI], */[200, 200, 0, 30, 0, 2*Math.PI]];

  function makeLine(x1, y1, x2, y2) {
    var x3 = (x1+x2)/2;
    var y3 = (y1+y2)/2;
    var ang = Math.atan((y2-y1)/(x2-x1));
    if (x2 < x1) {
      ang += Math.PI;
    }
    ang += Math.PI/2;
    var cx = x3 + Math.cos(ang) * 100000;
    var cy = y3 + Math.sin(ang) * 100000;

    var a1 = Math.atan((y1-cy)/(x1-cx));
    if (x1 > cx) {
      a1 += Math.PI;
    }

    a1 = (a1 + 2*Math.PI)%(2*Math.PI);

    var a2 = Math.atan((y2-cy)/(x2-cx));
    if (x2 > cx) {
      a2 += Math.PI;
    }

    a2 = (a2 + 2*Math.PI)%(2*Math.PI);

    var ds = Math.sqrt((cx - x3)*(cx-x3) + (cy-y3)*(cy-y3));

    arcs.push([cx, cy, ds - 3, ds + 3, a1, a2]);
  };


      var players = [];



  var owned = [];
  for (var i = 0 ; i < playerCount.length ; i++) {
    owned.push(i);
  }

  var orbin = [];
  for (var i = 0 ; i < playerCount ; i++) {
    orbin.push([]);
    for (var j = 0 ; j < playerCount ; j++) {
      orbin[orbin.length - 1].push(0);
    }
  }
  for (var i = 0 ; i < playerCount ; i++) {
    orbin[i][i] = 3;
  }

  var players = [];

  var orbs = [];

  class Orb {
    constructor(num, x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.num = num;

      this.held = -1;

      this.geometry = new THREE.BoxGeometry();
      this.material = [];
      this.material = new THREE.MeshBasicMaterial({
        color: 'rgb(' + playerCols[this.num][0] + ',' + playerCols[this.num][1] + ',' + playerCols[this.num][2] + ');',
        transparent: true,
        opacity: 0.8
      });
      this.cube = new THREE.Mesh(this.geometry, this.material);

      var s = 360;
      this.cube.scale.x = s;
      this.cube.scale.y = s;
      this.cube.scale.z = s;
      this.cube.position.x = this.x;
      this.cube.position.y = this.y + s;
      this.cube.position.z = this.z;

      toAdd.push(this.cube);

      this.bgeometry = new THREE.BoxGeometry();
      this.bmaterial = new THREE.MeshBasicMaterial({
        color: 'rgb(' + playerCols[this.num][0] + ',' + playerCols[this.num][1] + ',' + playerCols[this.num][2] + ')',
        transparent: true,
        opacity: 0.49
      });
      this.beacon = new THREE.Mesh(this.bgeometry, this.bmaterial);

      this.beacon.scale.x = s / 9;
      this.beacon.scale.y = 100000;
      this.beacon.scale.z = s / 9;
      this.beacon.position.x = this.x;
      this.beacon.position.y = this.y + s*3 + 50000;
      this.beacon.position.z = this.z;
      this.s = s;

      toAdd.push(this.beacon);
    }

    animate() {



      this.cube.rotation.y += 0.01;
      this.cube.rotation.x += 0.02;
      this.cube.rotation.z += 0.03;

      var efx = this.x / 400;
      var efy = this.z / 400;
      var ang = Math.atan((efy - 200) / (efx - 200));
      if (efx < 200) {
        ang += Math.PI;
      }
      ang = (ang + 2*Math.PI)%(2*Math.PI);
      this.zone = (parseInt((ang / (2 * Math.PI)) * playerCount) + playerCount)%playerCount;
      if (Math.sqrt((efx-200)*(efx-200)+(efy-200)*(efy-200)) <= 30) {
        this.zone = 12;
      }

      if (this.zone != 12) {
        orbin[this.zone][this.num]++;
      }

      if (this.held != -1) {
        this.beacon.position.y = -10000000000;
        var efx = this.x / 400;
        var efy = this.z / 400;
        var ang = Math.atan((efy - 200) / (efx - 200));
        if (efx < 200) {
          ang += Math.PI;
        }
        ang = (ang + 2*Math.PI)%(2*Math.PI);
        var ozone = (parseInt((ang / (2 * Math.PI)) * playerCount) + playerCount)%playerCount;
        if (Math.sqrt((efx-200)*(efx-200)+(efy-200)*(efy-200)) <= 30) {
          ozone = 12;
        }
        var oh = this.num;
        this.x = players[this.held].x;
        this.z = players[this.held].z;
        this.y = getElevation(this.x/400, this.z/400)*15 + 360;
        this.cube.position.x = this.x;
        this.cube.position.y = this.y;
        this.cube.position.z = this.z;


        if (this.zone == this.held && this.held != this.num) {
          console.log("NEW ORB");
          this.num = this.held;

          scene.remove(this.cube);
          scene.remove(this.beacon);

          this.geometry = new THREE.BoxGeometry();
          this.material = [];
          this.material = new THREE.MeshBasicMaterial({
            color: 'rgb(' + playerCols[this.num][0] + ',' + playerCols[this.num][1] + ',' + playerCols[this.num][2] + ')',
            transparent: true,
            opacity: 0.8
          });
          this.cube = new THREE.Mesh(this.geometry, this.material);

          var s = 360;
          this.cube.scale.x = s;
          this.cube.scale.y = s;
          this.cube.scale.z = s;
          this.cube.position.x = this.x;
          this.cube.position.y = this.y + s;
          this.cube.position.z = this.z;

          scene.add(this.cube);

          this.bgeometry = new THREE.BoxGeometry();
          this.bmaterial = new THREE.MeshBasicMaterial({
            color: 'rgb(' + playerCols[this.num][0] + ',' + playerCols[this.num][1] + ',' + playerCols[this.num][2] + ')',
            transparent: true,
            opacity: 0.49
          });
          this.beacon = new THREE.Mesh(this.bgeometry, this.bmaterial);

          this.beacon.scale.x = s / 9;
          this.beacon.scale.y = 100000;
          this.beacon.scale.z = s / 9;
          this.beacon.position.x = this.x;
          this.beacon.position.y = -100000000;
          this.beacon.position.z = this.z;
          this.s = s;

          scene.add(this.beacon);
        }
      }
      else {
        if (this.beacon.position.y < 0) {
          this.beacon.position.x = this.x;
          this.beacon.position.z = this.z;
          this.beacon.position.y = this.y + this.s*3 + 50000;
        }
      }
    }
  }




  class Player {
    constructor(num, x, y, z) {
      this.side = num;

      this.x = x;
      this.y = y;
      this.z = z;
      this.ox = x;
      this.oy = y;
      this.oz = z;
      this.num = num;

      console.log("NUMBER: " + this.num);
      console.log(playerCols[this.num][0] + " " + playerCols[this.num][1] + " " + playerCols[this.num][2]);


      this.geometry = new THREE.SphereGeometry(150, 5, 5);
      this.material = new THREE.MeshBasicMaterial({
        color: 'rgb(220, 180, 50)'
      });
      this.head = new THREE.Mesh(this.geometry, this.material);
      var s = 790;
      this.head.position.x = this.x;
      this.head.position.y = this.y + s;
      this.head.position.z = this.z;



      this.neckg = new THREE.CylinderGeometry(40, 40, 80, 5);
      this.neckm = new THREE.MeshBasicMaterial({
        color: 'rgb(220, 180, 50)'
      });
      this.neck = new THREE.Mesh(this.neckg, this.neckm);
      this.neck.position.x = this.x;
      this.neck.position.y = this.y + s - 170;
      this.neck.position.z = this.z;


      this.llegg = new THREE.CylinderGeometry(45, 45, 290, 5);
      this.llegm = new THREE.MeshBasicMaterial({
        color: 'rgb(220, 180, 50)'
      });
      this.lleg = new THREE.Mesh(this.llegg, this.llegm);

      this.lleg.position.x = this.x - 80;
      this.lleg.position.y = this.y + s - 680;
      this.lleg.position.z = this.z;
      this.lleg.rotation.z = -0.15;



      this.rlegg = new THREE.CylinderGeometry(45, 45, 290, 5);
      this.rlegm = new THREE.MeshBasicMaterial({
        color: 'rgb(220, 180, 50)'
      });
      this.rleg = new THREE.Mesh(this.rlegg, this.rlegm);

      this.rleg.position.x = this.x + 80;
      this.rleg.position.y = this.y + s - 680;
      this.rleg.position.z = this.z;
      this.rleg.rotation.z = 0.15;



      this.chestg = new THREE.BoxGeometry(300, 360, 110);
      this.chestm = new THREE.MeshBasicMaterial({
        color: 'rgb(' + playerCols[this.num][0] + ',' + playerCols[this.num][1] + ',' + playerCols[this.num][2] + ')'
      });
      this.chest = new THREE.Mesh(this.chestg, this.chestm);
      this.chest.position.x = this.x;
      this.chest.position.y = this.y + s - 390;
      this.chest.position.z = this.z;

      if (this.num != you) {
        toAdd.push(this.head);
        toAdd.push(this.neck);
        toAdd.push(this.lleg);
        toAdd.push(this.rleg);
        toAdd.push(this.chest);
      }

      this.body = [this.chest, this.rleg, this.lleg, this.neck, this.head];

      this.orbi = -1;
    }

    animate() {
      this.y = getElevation(this.x/400, this.z/400) * 15;

      var tx = this.x - this.ox;
      var ty = this.y - this.oy;
      var tz = this.z - this.oz;
      this.ox = this.x;
      this.oy = this.y;
      this.oz = this.z;
      for (var i = 0 ; i < this.body.length ; i++) {
        this.body[i].position.x += tx;
        this.body[i].position.y += ty;
        this.body[i].position.z += tz;
      }
    }

    update() {

      if (this.num == you) {
        this.x = camera.position.x;
        this.z = camera.position.z;

        for (var i = 0 ; i < orbs.length ; i++) {
          if (Math.sqrt((orbs[i].x-this.x)*(orbs[i].x-this.x) + (orbs[i].z-this.z)*(orbs[i].z-this.z)) <= 650) {
            if (keys[80] && orbs[i].held == -1 && this.orbi == -1) {
              orbs[i].held = this.num;
              this.orbi = i;
            }
          }
        }

        if (keys[79] && this.orbi != -1) {
          orbs[this.orbi].held = -1;
          orbs[this.orbi].beacon.x = this.x;
          orbs[this.orbi].beacon.z = this.z;
          this.orbi = -1;
        }
      }

      //this.x = this.x + ((200*400) - this.x) * 0.001;
      //this.z = this.z + ((200*400) - this.z) * 0.001;

      var pind = players.indexOf(this);
      var dbRef = firebase.database().ref(code + "/pos/" + (players.indexOf(this)+1));
      dbRef.on("value", function(snapshot) {
        players[pind].x = snapshot.val().x;
        players[pind].z = snapshot.val().z;
      });

      this.animate();
    }


  }


  var t = 0;

  for (var i = (2*Math.PI)/(2*playerCount) ; i < 2*Math.PI ; i += (2*Math.PI) / playerCount) {
    makeLine(200, 200, 200 + Math.cos(i)*200, 200 + Math.sin(i)*200);
    arcs.push([200 + 175.5*Math.cos(i), 200 + 175.5*Math.sin(i), 0, 24, 0, 2*Math.PI]);
    var x = 200 + 175.5*Math.cos(i);
    var y = 200 + 175.5*Math.sin(i);
    orbs.push(new Orb(t, x * 400, getElevation(x, y) * 15, y * 400));
    var x = 200 + 175.5*Math.cos(i-0.04);
    var y = 200 + 175.5*Math.sin(i-0.04);
    orbs.push(new Orb(t, x * 400, getElevation(x, y) * 15, y * 400));
    var x = 200 + 175.5*Math.cos(i+0.04);
    var y = 200 + 175.5*Math.sin(i+0.04);
    orbs.push(new Orb(t, x * 400, getElevation(x, y) * 15, y * 400));
    var x = 200 + 170*Math.cos(i);
    var y = 200 + 170*Math.sin(i);
    players.push(new Player(t, x*400, getElevation(x, y) * 15, y * 400));
    t++;
  }

  camera.position.x = players[you].x;
  camera.position.z = players[you].z;
  //makeLine(150, 150, 250, 250);

  var cx = 200;
  var cy = 200;

  for (var i = 0 ; i < 400 ; i++) {
    for (var j = 0 ; j < 400 ; j++) {
      var ang = Math.atan((j-cy)/(i-cx));
      if (i<cx) {
        ang += Math.PI;
      }
      ang = (ang + 2*Math.PI)%(2*Math.PI);
      if (Math.sqrt((i-cx)*(i-cx)+(j-cy)*(j-cy)) <= 30) {
        makeGround(i, j, 12);
      }
      else {
        makeGround(i,j,parseInt((ang/(2*Math.PI))*playerCount));
      }
      var dens = 2;
      if (i%dens == 0 && j%dens == 0) {
        var x = (i+Math.random()*dens);
        var y = (j+Math.random()*dens);
        if (i<40 && j<40) {
        }
        var collide = false;
        for (var k = 0 ; k < arcs.length ; k++) {
          var dist = Math.sqrt((arcs[k][0]-i)*(arcs[k][0]-i) + (arcs[k][1]-j)*(arcs[k][1]-j));
          var ang = Math.atan((arcs[k][1]-j)/(arcs[k][0]-i));
          if (arcs[k][0] < i) {
            ang += Math.PI;
          }

          ang = (ang + Math.PI*2)%(2*Math.PI);
          if (dist >= arcs[k][2] && dist <= arcs[k][3] && ((arcs[k][4] <= arcs[k][5] && ang >= arcs[k][4] && ang <= arcs[k][5]) || (arcs[k][4] >= arcs[k][5] && (ang <= arcs[k][5] || ang >= arcs[k][4])))) {
            collide = true;
          }
        }
        if (!collide) {
          makeTree(x*400, y*400, getElevation(x,y) * 15);
        }

      }
    }
  }

  /*var ntotal = [-200, 0, -200, 200, 0, -200, 200, 0, 200, 200, 0, 200, -200, 0, 200, -200, 0, -200];
  var ntotalu = [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0];
  for (var i = 0 ; i < ntotal.length;i++) { total.push(ntotal[i]); }
  for (var i = 0 ; i < ntotalu.length;i++) { totalu.push(ntotalu[i]); }

  for (var i = ntotal.length-3 ; i >= 0 ; i -= 3) { total.push(ntotal[i]);total.push(ntotal[i+1]);total.push(ntotal[i+2]); }
  for (var i = ntotalu.length-2 ; i >= 0 ; i -= 2) { totalu.push(ntotalu[i]);totalu.push(ntotalu[i+1]); }
*/

var turfs1 = [];
var turfs2 = [];

  for (var i = 0 ; i < 13 ; i++) {
    if (totals[i].length == 0) continue;
    var snowgeo = new THREE.BufferGeometry();
    snowgeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(totals[i]), 3));
  snowgeo.setAttribute(
      'uv',
      new THREE.BufferAttribute(new Float32Array(totalsu[i]), 2));

        var txt = new THREE.TextureLoader();
        var tex = txt.load('grass4.png');
        //const material2 = new THREE2.MeshBasicMaterial({color:'rgb(' + parseInt(i*12.5) + ',' + parseInt(255 - i*12.5) + ',0)'});
        var col = parseInt(255);

        var material3 = new THREE2.MeshBasicMaterial({map: tex, color: 'rgb(255,255,255)'});//, color: 'rgb(' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ')'});
        var mesh3 = new THREE2.Mesh(snowgeo, material3);
        scene.add(mesh3);
        turfs1.push(mesh3);
        var material2 = new THREE2.MeshBasicMaterial({/*map: tex, */opacity: 0.27, transparent: true, color: 'rgb(' + playerCols[i][0] + ',' + playerCols[i][1] + ',' + playerCols[i][2] + ')'});//, color: 'rgb(' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ')'});
        var mesh2 = new THREE2.Mesh(snowgeo, material2);
        scene.add(mesh2);
        turfs2.push(mesh2);
    }

      var mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false);
      var material = new THREE.MeshBasicMaterial({color:'rgb(140,70,0)'});
      var mesh = new THREE.Mesh(mergedGeometry, material);
      scene.add(mesh);

      var mergedGeometry1101 = BufferGeometryUtils.mergeBufferGeometries(leafgeometries, false);
      var tx = new THREE.TextureLoader()
      var material1101 = new THREE.MeshBasicMaterial({color:'rgb(0,82,0)'});
      var mesh1101 = new THREE.Mesh(mergedGeometry1101, material1101);
      scene.add(mesh1101);

      for (var i = 0 ; i < toAdd.length ; i++) {
        //if (i==2) {
          scene.add(toAdd[i]);
        //}
      }

        /*var snowgeo2 = new THREE.BufferGeometry();
        snowgeo2.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(total2), 3));

      snowgeo2.setAttribute(
          'uv',
          new THREE.BufferAttribute(new Float32Array(totalu2), 2));

            //const material2 = new THREE2.MeshBasicMaterial({color:'rgb(' + parseInt(i*12.5) + ',' + parseInt(255 - i*12.5) + ',0)'});
            var col = parseInt(255);
            const material3 = new THREE2.MeshBasicMaterial({color: 'rgb(255,255,255)'});
            const mesh3 = new THREE2.Mesh(snowgeo2, material3);
            scene.add(mesh3);*/


  var owd = [];
  for (var i = 0 ; i < 100000 ; i++) {
    owd.push(1000000000);
  }
  var lasts = [];
  for (var i = 0 ; i < 100000 ; i++) {
    lasts.push(false);
  }
  var cty = 1330;
  function animate() {

    //console.log(camera.position.x + " " + camera.position.y + " " + camera.position.z);

    var mnd = 1000000000;
    var mni = -1;
    for (var i = 0 ; i < orbs.length ; i++) {
      var dss = Math.sqrt((camera.position.x-orbs[i].x)*(camera.position.x-orbs[i].x)+(camera.position.z-orbs[i].z)*(camera.position.z-orbs[i].z));
      if (dss < mnd) {
        mnd = dss;
        mni = i;
      }
    }
    console.log(mni);

    requestAnimationFrame(animate);

    var g = document.getElementById("minimap").getContext('2d');
    if (owned.length > 0) {
      g.fillStyle = 'rgb(255, 255, 255)';
      g.fillRect(0, 0, 200, 200);
      var blok = 4;
      for (var i = 0 ; i < 200/blok ; i++) {
        for (var j = 0 ; j < 200/blok ; j++) {
          var ii = i * blok * 2;
          var jj = j * blok * 2;
          var ang = Math.atan((jj - 200) / (ii - 200));
          if (ii < 200) {
            ang += Math.PI;
          }
          ang = (ang + 2*Math.PI)%(2*Math.PI);
          var zone = (parseInt((ang / (2 * Math.PI)) * playerCount) + playerCount)%playerCount;
          if (Math.sqrt((ii-200)*(ii-200)+(jj-200)*(jj-200)) <= 30) {
            zone = 12;
          }
          if (Math.sqrt((ii-200)*(ii-200)+(jj-200)*(jj-200)) > 200) {
            g.fillStyle = 'rgba(0, 0, 0, 0)';
          }
          else if (zone == 12) {
            g.fillStyle = 'rgb(255, 255, 255)';
          }
          else {
            g.fillStyle = 'rgba(' + playerCols[owned[zone]][0] + ',' + playerCols[owned[zone]][1] + ',' + playerCols[owned[zone]][2] + ', 0.5)';
          }
          g.fillRect(ii / 2, jj / 2, blok, blok);
        }
      }
    }

    for (var i = 0 ; i < orbin.length ; i++) {
      for (var j = 0 ; j < orbin[i].length ; j++) {
        orbin[i][j] = 0;
      }
    }



    for (var i = 0 ; i < orbs.length ; i++) {
      orbs[i].animate();
    }

    for (var i = 0 ; i < players.length ; i++) {
      players[i].update();
    }

    var ownchange = false;
    var st = "";

    for (var i = 0 ; i < orbin.length ; i++) {
      var ind = -1;
      var sm = 0;
      for (var j = 0 ; j < orbin[i].length ; j++) {
        st += orbin[i][j] + " ";
        sm += orbin[i][j];
        if (orbin[i][j] >= 3) {
          ind = j;
        }
      }
      st += '\n';
      if (sm >= 3 && ind != -1 && ind != owned[i]) {
        ownchange = true;
        owned[i] = ind;
      }
    }

    if (ownchange) {
      for (var i = 0 ; i < 12 ; i++) {
        if (totals[i].length == 0) continue;
        var snowgeo = new THREE.BufferGeometry();
        snowgeo.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(totals[i]), 3));
      snowgeo.setAttribute(
          'uv',
          new THREE.BufferAttribute(new Float32Array(totalsu[i]), 2));

            var txt = new THREE.TextureLoader();
            var tex = txt.load('grass4.png');
            //const material2 = new THREE2.MeshBasicMaterial({color:'rgb(' + parseInt(i*12.5) + ',' + parseInt(255 - i*12.5) + ',0)'});
            var col = parseInt(255);

            var material3 = new THREE2.MeshBasicMaterial({map: tex, color: 'rgb(255,255,255)'});//, color: 'rgb(' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ')'});
            var mesh3 = new THREE2.Mesh(snowgeo, material3);
            scene.add(mesh3);
            scene.remove(turfs1[i]);
            turfs1[i] = mesh3;
            var material2 = new THREE2.MeshBasicMaterial({/*map: tex, */opacity: 0.27, transparent: true, color: 'rgb(' + playerCols[owned[i]][0] + ',' + playerCols[owned[i]][1] + ',' + playerCols[owned[i]][2] + ')'});//, color: 'rgb(' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ')'});
            var mesh2 = new THREE2.Mesh(snowgeo, material2);
            scene.add(mesh2);
            scene.remove(turfs2[i]);
            turfs2[i] = mesh2;
        }
      }

    var mouseX = parseInt(document.getElementById("extra2").innerHTML.split(" ")[0]);
    var mouseY = parseInt(document.getElementById("extra2").innerHTML.split(" ")[1]);

    /*camera.position.x = mouseX;
    camera.position.z = mouseY;*/

    var theta = (mouseX / 800) * (2 * Math.PI);
    var phi = ((mouseY + 200) / 400) * (Math.PI);

    //camera.lookAt(camera.position.x + Math.cos(theta), camera.position.y, camera.position.z + Math.sin(theta));
    camera.lookAt(camera.position.x + Math.cos(theta) * Math.sin(phi), camera.position.y + Math.cos(phi), camera.position.z + Math.sin(theta) * Math.sin(phi));

    var px1 = camera.position.x;
    var py1 = camera.position.z;

    var ms = 30;

    if (keys[81]) {
      camera.position.x += Math.cos(theta) * ms * 20;
      camera.position.z += Math.sin(theta) * ms * 20;
    }
    else if (keys[87]) {
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


    if (keys[16]) {
      cty -= 135;
    }
    if (keys[13]) {
      cty += 135;
    }

    camera.position.y = getElevation(camera.position.x / 400, camera.position.z / 400) * 15 + cty;

    firebase.database().ref(code + "/pos/" + (you+1)).set({x: camera.position.x, y: camera.position.y, z: camera.position.z});


    renderer.render(scene, camera);

  }
  animate();
}

window.onload = function() {
  main();
}
