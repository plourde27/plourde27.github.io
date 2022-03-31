import * as THREE2 from './js/three2.js';
import { BufferGeometryUtils } from './js/bgu.js';
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
    [255, 255, 255],
    [125, 125, 125]
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

    //if (!quitt) {
      window.requestAnimationFrame(animate);
    //}

    //firebase.database().ref("test/" + Date.now() + "/" + fc).set({x0: 5, y0: 6});
    /*firebase.database().ref("ABCDEF").on("value", function(snapshot) {
    });*/

    if (scene == "menu") {
      var g = document.getElementById("menu").getContext('2d');
      document.getElementById("menu").width = window.innerWidth;
      document.getElementById("menu").height = window.innerHeight;
      g.fillStyle = 'rgb(255, 255, 255)';
      var w = window.innerWidth;
      var h = window.innerHeight;
      g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgb(200, 200, 200)';
      g.font = '80px Montserrat';
      g.textAlign = 'center';
      g.fillText("CONQUER THE".split("").join(String.fromCharCode(8201)), w/2, 110);
      g.fillStyle = 'rgb(50, 200, 80)';
      g.font = '260px Montserrat';
      g.fillText("FOREST", w/2, 340);
      var Ly = 540;
      document.getElementById("menu").style.cursor = "auto";


      if (mouseY >= Ly && mouseY <= Ly + 50) {
        g.fillStyle = 'rgb(200, 100, 100, 0.25)';
        g.fillRect(0, Ly - 2, w, 54);
        document.getElementById("menu").style.cursor = "pointer";
      }
      else {
        g.fillStyle = 'rgb(100, 100, 100, 0.25)';
        g.fillRect(0, Ly, w, 50);
      }
      if (mouseY >= Ly + 60 && mouseY <= Ly + 110) {
        g.fillStyle = 'rgb(200, 100, 100, 0.25)';
        g.fillRect(0, Ly + 58, w, 54);
        document.getElementById("menu").style.cursor = "pointer";
      }
      else {
        g.fillStyle = 'rgb(100, 100, 100, 0.25)';
        g.fillRect(0, Ly + 60, w, 50);
      }
      if (mouseY >= Ly + 120 && mouseY <= Ly + 170) {
        g.fillStyle = 'rgb(200, 100, 100, 0.25)';
        g.fillRect(0, Ly + 118, w, 54);
        document.getElementById("menu").style.cursor = "pointer";
      }
      else {
        g.fillStyle = 'rgb(100, 100, 100, 0.25)';
        g.fillRect(0, Ly + 120, w, 50);
      }
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '24px Lato';
      g.fillText("Start Game", w/2, Ly + 34);
      g.fillText("Join Game", w/2, Ly + 94);
      g.fillText("Instructions", w/2, Ly + 154);
      g.fillText("A multiplayer game made by Xavier Plourde in 2022", w/2, 770);
      if (clicked && mouseY >= Ly && mouseY <= Ly + 50) {
        scene = "start";
        you = 0;
        code = "";
        var username = document.getElementById("inp2").value;
        for (var i = 0 ; i < 5 ; i++) {
          code += parseInt(Math.random() * 10);
        }
        firebase.database().ref(code + "/count").set(1);
        firebase.database().ref(code + "/names").set({1: username});
        document.getElementById("username").hidden=true;
      }
      if (clicked && mouseY >= Ly + 60 && mouseY <= Ly + 110) {
        scene = "entercode";
        username = document.getElementById("inp2").value;
        document.getElementById("username").hidden=true;
      }
      if (clicked && mouseY >= Ly + 120 && mouseY <= Ly + 170) {
        document.getElementById("username").hidden = true;
        scene = "instructions";
      }
    }
    else if (scene == "instructions") {
      document.getElementById("menu").style.cursor = "auto";
      var g = document.getElementById("menu").getContext('2d');
      document.getElementById("menu").width = window.innerWidth;
      document.getElementById("menu").height = window.innerHeight;
      g.fillStyle = 'rgb(255, 255, 255)';
      var w = window.innerWidth;
      var h = window.innerHeight;
      g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '36px Lato';
      g.textAlign = 'center';


      var instr = [
        "Welcome to Conquer the Forest!",
        "This is a multiplayer game played with 2-12 players (on different devices).",
        "The game is played in a 3D forest with lakes. You (and all the other players) have to travel on specific marked trails through the forest.",
        "At the start of the game, the circular map is sliced evenly into zones, along with a small neutral zone in the center of the map, with each player controlling one zone.",
        "The goal of the game is to control all of the map, and to be the last player standing. If you no longer control any zones on the map, you are eliminated from the game.",
        "Each player starts out with a certain number of movable orbs (the exact number depends on the number of players in the game). Any player can pick up an orb and move it to a different location.",
        "If an orb is moved to a part of the map controlled by a different player, it will change its color to the color of the zone it is moved to.",
        "If a zone no longer has any orbs, it will turn into a neutral zone, and the first player to move an orb of their color into the zone will take control the zone.",
        "If you are in a zone that you control and you tag (collide with) another player, they will respawn at their start location (or anywhere else that they control, if they no longer control their start point), and they will lose one of their orbs.",
        "Additionally, there are rods present in the center of the map, and in other neutral or border areas across the map. Each rod will give you a certain amount of bonus points, and for every hundred bonus points you earn, you will gain an extra orb.",

      ];

      g.font = '24px Lato';

      var y = 50;

      for (var i = 0 ; i < instr.length ; i++) {
        if (i==0) {
          g.font = '42px Lato';
        }
        else {
          g.font = '21px Lato';
        }

        var st = "";
        for (var j = 0 ; j < instr[i].length ; j++) {
          st += instr[i][j];
          if (st.length >= 110 && st[st.length-1] == " ") {
            g.fillText(st, w/2, y);
            y += 28;
            st = "";
          }
        }
        if (st.length) {
          g.fillText(st, w/2, y);
          y += 28;
        }
        y += 12;
        if (i==0) {
          y+=12;
        }
      }

      var Ly = window.innerHeight - 60;

      if (mouseY >= Ly && mouseY <= Ly + 50) {
        g.fillStyle = 'rgba(200, 100, 100, 0.25)';
        g.fillRect(0, Ly - 2, window.innerWidth, 54);
        document.getElementById("menu").style.cursor = "pointer";
      }
      else {
        g.fillStyle = 'rgba(100, 100, 100, 0.25)';
        g.fillRect(0, Ly, window.innerWidth, 50);
      }
      g.font = '24px Lato';
      g.fillStyle = 'rgb(0, 0, 0)';
      g.fillText("Back to Menu", window.innerWidth/2, Ly + 35);
      if (mouseY >= Ly && mouseY <= Ly + 50) {
        if (clicked) {
          document.getElementById("username").hidden = false;
          scene = "menu";

        }
      }
    }
    else if (scene == "start") {
      document.getElementById("menu").style.cursor = "auto";
      var g = document.getElementById("menu").getContext('2d');
      document.getElementById("menu").width = window.innerWidth;
      document.getElementById("menu").height = window.innerHeight;
      g.fillStyle = 'rgb(255, 255, 255)';
      var w = window.innerWidth;
      var h = window.innerHeight;
      g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '36px Lato';
      g.textAlign = 'center';
      g.fillText("Game Code: " + code, w/2, 48);

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
      g.fillText(playerCount + " players currently in game", w/2, 93);
      for (var i = 0 ; i < playerCount ; i++) {
        g.fillStyle = 'rgba(' + playerCols[i][0] + ',' + playerCols[i][1] + ',' + playerCols[i][2]+ ',0.15)';
        g.fillRect(0, 140 + i*45, window.innerWidth, 38);
        g.font = '25px Montserrat';
        g.fillStyle = 'rgb(0, 0, 0)';
        if (names[i] != undefined) {
          g.fillText(names[i], window.innerWidth/2, 150 + i*45 + 20);
        }
      }
      if (you == 0) {
        if (mouseY >= window.innerHeight - 90 && mouseY <= window.innerHeight - 40) {
          g.fillStyle = 'rgba(200, 100, 100, 0.25)';
          g.fillRect(0, window.innerHeight - 92, window.innerWidth, 54);
          document.getElementById("menu").style.cursor = "pointer";
        }
        else {
          g.fillStyle = 'rgba(100, 100, 100, 0.25)';
          g.fillRect(0, window.innerHeight - 90, window.innerWidth, 50);
        }
        g.font = '24px Lato';
        g.fillStyle = 'rgb(0, 0, 0)';
        g.fillText("Start Game", window.innerWidth/2, window.innerHeight - 55);
        if (mouseY >= window.innerHeight - 90 && mouseY <= window.innerHeight - 40) {
          if (clicked) {

            document.getElementById("menu").width = 0;
            document.getElementById("menu").height = 0;
            document.getElementById("inptag").hidden = true;
            document.getElementById("username").hidden = true;

            firebase.database().ref(code + "/started").set(1);

            run3D();
            scene = "game";

          }
        }
      }
      else {
        g.font = '24px Lato';
        g.fillStyle = 'rgb(0, 0, 0)';
        g.fillText("Waiting for the host to start the game...", window.innerWidth/2, window.innerHeight - 55);

        var dbRef = firebase.database().ref(code + "/started");
        dbRef.once("value", function(snapshot) {
          if (snapshot != null && snapshot.val() != null && snapshot.val() == 1) {
            document.getElementById("menu").width = 0;
            document.getElementById("menu").height = 0;
            document.getElementById("inptag").hidden = true;
            document.getElementById("username").hidden = true;

            run3D();
            scene = "game";
          }
        });
      }

    }
    else if (scene == "entercode") {
      document.getElementById("menu").style.cursor = "auto";
      var g = document.getElementById("menu").getContext('2d');
      document.getElementById("menu").width = window.innerWidth;
      document.getElementById("menu").height = window.innerHeight;
      g.fillStyle = 'rgb(255, 255, 255)';
      var w = window.innerWidth;
      var h = window.innerHeight;
      g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgb(200, 200, 200)';
      g.font = '80px Montserrat';
      g.textAlign = 'center';
      g.fillText("CONQUER THE".split("").join(String.fromCharCode(8201)), w/2, 110);
      g.fillStyle = 'rgb(50, 200, 80)';
      g.font = '260px Montserrat';
      g.fillText("FOREST", w/2, 340);
      document.getElementById("menu").style.cursor = "auto";

      var Ly = 550;

      document.getElementById("inptag").hidden = false;
      if (mouseY >= Ly && mouseY <= Ly + 50) {
        g.fillStyle = 'rgb(200, 100, 100, 0.25)';
        g.fillRect(0, Ly - 2, window.innerWidth, 54);
        document.getElementById("menu").style.cursor = "pointer";
      }
      else {
        g.fillStyle = 'rgb(100, 100, 100, 0.25)';
        g.fillRect(0, Ly, window.innerWidth, 50);
      }
      g.fillStyle = 'rgb(0, 0, 0)';
      g.font = '24px Lato';
      g.textAlign = 'center';
      g.fillText("Go", window.innerWidth/2, Ly + 34);
      if (clicked && mouseY >= Ly && mouseY <= Ly + 50) {
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
    clicked = false;

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

  elem.addEventListener('mousemove', function(event) {
    var x = event.pageX - left;
    var y = event.pageY - etop;
    mouseX = x;
    mouseY = y;
  });
}

var wall = 'draw.png';
var floor = 'stone.png';
function run3D() {
  var quitt = false;


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
  scene.background = new THREE.Color('rgb(230, 255, 255)');

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
  //camera.position.set(0, 0, 48);
  //camera.lookAt(0, 0, 0);
  camera.position.y = 27;



  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight - 40);
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

  var MS = 600;

  var nx = 2048;
  var mx = 2048;
  var n = MS;
  var m = MS;

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
      grid[i][j] = 2000 + Math.sin(ds / 6) * MS
      grid[i][j] = 0;
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
      var HT = (Math.random()*500 + 1450);
      //HT = 1350;
      var geometry = new THREE2.CylinderGeometry(26, 26, HT, 6);

      geometry.translate(x, z + HT/2, y);
      geometries.push(geometry);
      var extratop = HT * (Math.random() + 1.5);
      var bot = HT * (Math.random()*0.1 + 0.1);
      var WT = 350 + Math.random()*120;
      var geometry1101 = new THREE2.CylinderGeometry(50, WT, (extratop - bot), 6);
      geometry1101.translate(x, z + bot + (extratop - bot) / 2, y);
      leafgeometries.push(geometry1101);
  }

  function makeBonus(x, y, z, w, t, i) {
      var HT = 5;
      //HT = 1350;
      var geometry = new THREE2.CylinderGeometry(w * MS, w * MS, 720, 120);

      geometry.translate(x, z + 755, y);
      var ci = 0;
      if (t == 5) {
        ci = 0;
      }
      else if (t == 10) {
        ci = 1;
      }
      else if (t == 25) {
        ci = 2;
      }
      else {
        ci = 3;
      }

      var bcols = ['rgb(100, 100, 100)', 'rgb(0, 0, 150)', 'rgb(0, 200, 0)', 'rgb(250, 0, 0)'];
      var material = new THREE.MeshBasicMaterial({color: bcols[ci]});
      var mesh = new THREE.Mesh(geometry, material);

      bonuses[i][4] = mesh;
      scene.add(mesh);

  }

  function makeLake(x, y, z, w) {
      var HT = 5;
      //HT = 1350;
      var geometry = new THREE2.CylinderGeometry(w * MS, w * MS, HT, 120);

      geometry.translate(x, z + 75, y);
      lakegeometries.push(geometry);
  }

  for (var i = 0 ; i < 500 ; i ++) {
    for (var j = 0 ; j < 500 ; j++) {

    }
  }


  function makeGround(i, j, colNum) {

    var fac = 15;
    var xf = MS;
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

  var arcs = [];
  var lakes = [];
  var bonuses = [];

  function makeLine(x1, y1, x2, y2) {
    var x3 = (x1+x2)/2;
    var y3 = (y1+y2)/2;
    var ang = Math.atan((y2-y1)/(x2-x1));
    if (x2 < x1) {
      ang += Math.PI;
    }
    ang += Math.PI/2;

    var cx = x3 + Math.cos(ang) * 1000000000;
    var cy = y3 + Math.sin(ang) * 1000000000;

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
  for (var i = 0 ; i < playerCount ; i++) {
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
    constructor(num, x, y, z, ol) {
      this.x = x;
      this.z = z;
      this.y = getElevation(this.x/MS, this.z/MS)*15 + 360;
      this.num = num;
      if (ol != undefined) {
        firebase.database().ref(code + "/orb/" + (ol+1)).set({x: this.x, y: this.y, z: this.z, num: this.num, ind: ol});
      }
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
      this.cube.position.y = this.y;
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
      this.beacon.position.y = this.y + s*3 + 50000;
      this.beacon.position.z = this.z;
      this.s = s;

      scene.add(this.beacon);
    }

    animate() {

      var oind = orbs.indexOf(this);
      var dbRef = firebase.database().ref(code + "/orb/" + (oind+1));
      dbRef.on("value", function(snapshot) {
        if (snapshot.val() != null) {
          orbs[oind].x = snapshot.val().x;
          orbs[oind].z = snapshot.val().z;
          orbs[oind].y = snapshot.val().y;
          orbs[oind].cube.position.x = orbs[oind].x;
          orbs[oind].cube.position.y = orbs[oind].y;
          orbs[oind].cube.position.z = orbs[oind].z;
          orbs[oind].beacon.position.x = orbs[oind].x;
          orbs[oind].beacon.position.y = orbs[oind].y;
          orbs[oind].beacon.position.z = orbs[oind].z;
          var oldnum = orbs[oind].num;
          orbs[oind].num = snapshot.val().num;
          if (orbs[oind].num < 12 && players[orbs[oind].num].dead) {
            orbs[oind].num = 12;
          }
          if (orbs[oind].num != oldnum) {

            scene.remove(orbs[oind].cube);
            scene.remove(orbs[oind].beacon);

            if (orbs[oind].num < 12) {
              orbs[oind].geometry = new THREE.BoxGeometry();
              orbs[oind].material = [];
              orbs[oind].material = new THREE.MeshBasicMaterial({
                color: 'rgb(' + playerCols[orbs[oind].num][0] + ',' + playerCols[orbs[oind].num][1] + ',' + playerCols[orbs[oind].num][2] + ')',
                transparent: true,
                opacity: 0.8
              });
              orbs[oind].cube = new THREE.Mesh(orbs[oind].geometry, orbs[oind].material);

              var s = 360;
              orbs[oind].cube.scale.x = s;
              orbs[oind].cube.scale.y = s;
              orbs[oind].cube.scale.z = s;
              orbs[oind].cube.position.x = orbs[oind].x;
              orbs[oind].cube.position.y = orbs[oind].y + s;
              orbs[oind].cube.position.z = orbs[oind].z;

              scene.add(orbs[oind].cube);

              orbs[oind].bgeometry = new THREE.BoxGeometry();
              orbs[oind].bmaterial = new THREE.MeshBasicMaterial({
                color: 'rgb(' + playerCols[orbs[oind].num][0] + ',' + playerCols[orbs[oind].num][1] + ',' + playerCols[orbs[oind].num][2] + ')',
                transparent: true,
                opacity: 0.49
              });
              orbs[oind].beacon = new THREE.Mesh(orbs[oind].bgeometry, orbs[oind].bmaterial);

              orbs[oind].beacon.scale.x = s / 9;
              orbs[oind].beacon.scale.y = 100000;
              orbs[oind].beacon.scale.z = s / 9;
              orbs[oind].beacon.position.x = orbs[oind].x;
              orbs[oind].beacon.position.y = -100000000;
              orbs[oind].beacon.position.z = orbs[oind].z;
              orbs[oind].s = s;

              scene.add(orbs[oind].beacon);
            }
          }
        }
      });

      if (this.num == 12) return;

      //this.animate();

      this.cube.rotation.y += 0.01;
      this.cube.rotation.x += 0.02;
      this.cube.rotation.z += 0.03;



      if (this.held != -1) {
        this.beacon.position.y = -10000000000;
        var efx = this.x / MS;
        var efy = this.z / MS;
        var ang = Math.atan((efy - (MS/2)) / (efx - (MS/2)));
        if (efx < MS/2) {
          ang += Math.PI;
        }
        ang = (ang + 2*Math.PI)%(2*Math.PI);
        var ozone = (parseInt((ang / (2 * Math.PI)) * playerCount) + playerCount)%playerCount;
        if (Math.sqrt((efx-(MS/2))*(efx-(MS/2))+(efy-(MS/2))*(efy-(MS/2))) <= 30) {
          ozone = 12;
        }
        var oh = this.num;
        this.x = players[this.held].x;
        this.z = players[this.held].z;
        this.y = getElevation(this.x/MS, this.z/MS)*15 + 360;
        this.cube.position.x = this.x;
        this.cube.position.y = this.y;
        this.cube.position.z = this.z;
      }

      var efx = this.x / MS;
      var efy = this.z / MS;
      var ang = Math.atan((efy - MS/2) / (efx - MS/2));
      if (efx < MS/2) {
        ang += Math.PI;
      }
      ang = (ang + 2*Math.PI)%(2*Math.PI);
      this.zone = (parseInt((ang / (2 * Math.PI)) * playerCount) + playerCount)%playerCount;
      if (Math.sqrt((efx-MS/2)*(efx-MS/2)+(efy-MS/2)*(efy-MS/2)) <= 30) {
        this.zone = 12;
      }

      this.ozone = this.zone;

      if (owned.length > 0) {
        this.zone = owned[this.zone];
      }

      if (Math.sqrt((efx-MS/2)*(efx-MS/2)+(efy-MS/2)*(efy-MS/2)) <= 30) {
        this.zone = 12;
      }

      this.onum = this.num;

      if (this.zone < 12) {
        this.num = this.zone;
      }


      if (this.ozone != 12) {
        orbin[this.ozone][this.num]++;
      }

        if (this.num != this.onum) {

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

      /*else {
        if (this.beacon.position.y < 0) {
          this.beacon.position.x = this.x;
          this.beacon.position.z = this.z;
          this.beacon.position.y = this.y + this.s*3 + 50000;
        }
      }*/


    }


  }




  class Player {
    constructor(num, x, y, z) {
      this.side = num;

      this.x = x;
      this.y = y;
      this.z = z;
      this.sx = x;
      this.sy = y;
      this.sz = z;
      this.ox = x;
      this.oy = y;
      this.oz = z;
      this.num = num;



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

      this.points = 0;

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
        scene.add(this.head);
        scene.add(this.neck);
        scene.add(this.lleg);
        scene.add(this.rleg);
        scene.add(this.chest);
      }

      this.body = [this.chest, this.rleg, this.lleg, this.neck, this.head];

      this.orbi = -1;
      this.jc = [0,0,0,0,0,0,0,0,0,0,0,0];
    }

    animate() {
      for (var i=0 ; i < 12 ; i++) {
        this.jc[i]--;
      }
      this.y = getElevation(this.x/MS, this.z/MS) * 15;

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

      if (this.points >= 100) {
        orbs.push(undefined);
        this.lx = this.sx;
        this.lz = this.sz;
        for (var i = 0 ; i < orbs.length ; i++) {
          if (orbs[i] && orbs[i].num == this.num) {
            this.lx = orbs[i].x;
            this.lz = orbs[i].z;
          }
        }
        orbs[orbs.length - 1] = new Orb(this.num, this.lx + Math.random()*4000, getElevation(this.lx/MS, this.lz/MS) * 15, this.lz + Math.random()*4000, orbs.length-1);
        this.points -= 100;
      }
      if (this.num==0) {
      }

      var COOL = 4500;



      if (this.num==you) {
        for (var i = 0 ; i < bonuses.length ; i++) {
          var ds = Math.sqrt((this.x-bonuses[i][0]*MS)*(this.x-bonuses[i][0]*MS) + (this.z-bonuses[i][1]*MS)*(this.z-bonuses[i][1]*MS));

          if (ds < 800 && bonuses[i][3] <= 0) {
            this.points += bonuses[i][2];
            bonuses[i][3] = COOL;
            //bonuses[i][4].translate(100000, 100000, 100000);
            scene.remove(bonuses[i][4]);
            firebase.database().ref(code + "/bonus/" + (i+1)).set(bonuses[i][3]);
          }
        }
      }

      for (var i = 0 ; i < bonuses.length ; i++) {
        var ob = bonuses[i][3];
        bonuses[i][3]--;
        if (bonuses[i][3]<=0 && ob > 0) {
          scene.add(bonuses[i][4]);
        }
      }

      for (var i = 0 ; i < bonuses.length ; i++) {
        var dbRef = firebase.database().ref(code + "/bonus/" + (i+1));
        dbRef.on("value", function(snapshot) {
          if (snapshot != null && snapshot.val() != null) {
            var ob = bonuses[i][3];
            bonuses[i][3] = snapshot.val();
            if (bonuses[i][3] > ob && bonuses[i][3] > 0) {
              scene.remove(bonuses[i][4]);
            }
          }
        });
      }



      var alive = false;
      for (var i = 0 ; i < orbs.length ; i++) {
        if (orbs[i].num == this.num) {
          alive = true;
        }
      }

      if (!alive) {
        this.dead = true;
      }

      var efx = this.x / MS;
      var efy = this.z / MS;
      var ang = Math.atan((efy - MS/2) / (efx - MS/2));
      if (efx < MS/2) {
        ang += Math.PI;
      }
      ang = (ang + 2*Math.PI)%(2*Math.PI);
      this.zone = (parseInt((ang / (2 * Math.PI)) * playerCount) + playerCount)%playerCount;

      if (owned.length > 0) {
        this.zone = owned[this.zone];
      }


      for (var i = 0 ; i < players.length ; i++) {
        if (i  == this.num) continue;
        var dst = Math.sqrt((players[i].x-this.x)*(players[i].x-this.x) + (players[i].z-this.z)*(players[i].z-this.z));
        if (dst < 1000 && this.zone == this.num && !this.dead && !players[i].dead && this.jc[i] <= 0) {
          players[i].captured = true;
          var mn = 1000000000000;
          var mni = -1;
          for (var j = 0 ; j < orbs.length ; j++) {
            var d = Math.sqrt((orbs[j].x-this.x)*(orbs[j].x-this.x)+(orbs[j].z-this.z)*(orbs[j].z-this.z));
            if (d < mn && orbs[j].num == i) {
              mn = d;
              mni = j;
            }
          }
          if (mni != -1) {
            //firebase.database().ref(code + "/orb/" + (mni+1)).set({x: orbs[mni].x, y: orbs[mni].y, z: orbs[i].z, num: 12});
          }
          this.jc[i] = 50;
          players[i].x = players[i].sx;
          players[i].y = players[i].sy;
          players[i].z = players[i].sz;
          firebase.database().ref(code + "/pos/" + (i+1)).set({x: players[i].x, y: players[i].y, z: players[i].z});
          firebase.database().ref(code + "/cap/" + (i+1)).set(1);
        }
      }


      if (this.num == you) {
        var dbRef = firebase.database().ref(code + "/cap/" + (you+1));
        dbRef.on("value", function(snapshot) {
          //if (!players[pind].captured) {
            if (snapshot != null && snapshot.val() == 1) {
              players[you].captured = true;
            }
        });

        firebase.database().ref(code + "/cap/" + (you+1)).set(0);

        if (!this.captured) {
          this.x = camera.position.x;
          this.z = camera.position.z;
        }
        else {
          this.x = this.sx;
          this.z = this.sz;
          this.y = this.sy;

          this.captured = false;
          var mn = 0;
          var mni = -1;
          for (var j = 0 ; j < orbs.length ; j++) {
            var d = Math.sqrt((orbs[j].x-this.x)*(orbs[j].x-this.x)+(orbs[j].z-this.z)*(orbs[j].z-this.z));
            if (d > mn && orbs[j].num == this.num) {
              mn = d;
              mni = j;
            }
          }
          if (mni != -1) {
            firebase.database().ref(code + "/orb/" + (mni+1)).set({x: orbs[mni].x, y: orbs[mni].y, z: orbs[i].z, num: 12});
          }

          camera.position.x = this.x;
          camera.position.z = this.z;
        }

        if (!this.dead) {
          for (var i = 0 ; i < orbs.length ; i++) {
            if (Math.sqrt((orbs[i].x-this.x)*(orbs[i].x-this.x) + (orbs[i].z-this.z)*(orbs[i].z-this.z)) <= 650) {
              if (keys[80] && orbs[i].held == -1 && this.orbi == -1) {
                orbs[i].held = this.num;
                this.orbi = i;
              }
            }
          }
        }

          if ((keys[79] || this.dead) && this.orbi != -1) {
            orbs[this.orbi].held = -1;
            orbs[this.orbi].beacon.x = this.x;
            orbs[this.orbi].beacon.z = this.z;
            this.orbi = -1;
          }

      }

      //this.x = this.x + ((200*MS) - this.x) * 0.001;
      //this.z = this.z + ((200*MS) - this.z) * 0.001;


      for (var i = 0 ; i < players.length ; i++) {
        var dbRef = firebase.database().ref(code + "/pos/" + (i+1));
        dbRef.on("value", function(snapshot) {
          //if (!players[pind].captured) {
          if (snapshot != null && snapshot.val() != null && players[i] != undefined) {

            players[i].x = snapshot.val().x;
            players[i].z = snapshot.val().z;
          }
          /*}
          else {
            //players[pind].captured = false;
          }*/
        });
      }

      this.animate();
    }


  }


  var t = 0;

  function makeMap(n) {

    if (n == 1) {
      for (var x = 0 ; x < nx ; x++) {
        for (var y = 0 ; y < mx ; y++) {
          grid[x][y] = ((y - 200) * (y - 200) + (x - 200) * (x - 200)) / 25;
        }
      }

      var op = 170;
      MS = 400;
      var t = 0;
      for (var i = (2*Math.PI)/(2*playerCount) ; i < 2*Math.PI ; i += (2*Math.PI) / playerCount) {
        makeLine(MS/2, MS/2, MS/2 + Math.cos(i)*MS/2, MS/2 + Math.sin(i)*MS/2);
        arcs.push([MS/2 + 175.5*Math.cos(i), MS/2 + 175.5*Math.sin(i), 0, 24, 0, 2*Math.PI]);
        var x = MS/2 + (op + 5.5)*Math.cos(i);
        var y = MS/2 + (op + 5.5)*Math.sin(i);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        /*var x = MS/2 + (op + 5.5)*Math.cos(i-0.04);
        var y = MS/2 + (op + 5.5)*Math.sin(i-0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (op + 5.5)*Math.cos(i+0.04);
        var y = MS/2 + (op + 5.5)*Math.sin(i+0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));*/
        var x = MS/2 + op*Math.cos(i);
        var y = MS/2 + op*Math.sin(i);
        players.push(new Player(t, x*MS, getElevation(x, y) * 15, y * MS));
        t++;

        bonuses.push([200 + Math.cos(i + (Math.PI/playerCount)) * 75, 200 + Math.sin(i + (Math.PI/playerCount)) * 75, 25, 0]);
        bonuses.push([200 + Math.cos(i + (Math.PI/playerCount)) * 120, 200 + Math.sin(i + (Math.PI/playerCount)) * 120, 10, 0]);


      }

      var a = 0;

      for (var i = 0 ; i < playerCount ; i++) {
        bonuses.push([200 + Math.cos(a)* 12, 200 + Math.sin(a)*12, 10, 0]);
        a += (2*Math.PI/playerCount);
      }

      for (var i = 0 ; i < playerCount * 2 ; i++) {
        bonuses.push([200 + Math.cos(a)* 24, 200 + Math.sin(a)*24, 5, 0]);
        a += (Math.PI/playerCount);
      }


      bonuses.push([200, 200, 100, 0]);

      arcs.push([200, 200, 70, 80, 0, 2*Math.PI]);
      arcs.push([200, 200, 115, 125, 0, 2*Math.PI]);
      arcs.push([200, 200, 0, 30, 0, 2*Math.PI]);
    }
    else if (n == 2) {
      var op = 280;
      MS = 600;

      for (var x = 0 ; x < nx ; x++) {
        for (var y = 0 ; y < mx ; y++) {
          grid[x][y] = Math.min(800, ((y - 300) * (y - 300) + (x - 300) * (x - 300)) / 35);
        }
      }
      var t = 0;
      for (var i = (2*Math.PI)/(2*playerCount) ; i < 2*Math.PI ; i += (2*Math.PI) / playerCount) {
        makeLine(MS/2, MS/2, MS/2 + Math.cos(i)*MS/2, MS/2 + Math.sin(i)*MS/2);
        //arcs.push([MS/2 + 175.5*Math.cos(i), MS/2 + 175.5*Math.sin(i), 0, 24, 0, 2*Math.PI]);
        var x = MS/2 + (op + 5.5)*Math.cos(i);
        var y = MS/2 + (op + 5.5)*Math.sin(i);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (op + 5.5)*Math.cos(i-0.04);
        var y = MS/2 + (op + 5.5)*Math.sin(i-0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (op + 5.5)*Math.cos(i+0.04);
        var y = MS/2 + (op + 5.5)*Math.sin(i+0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (op+8.5)*Math.cos(i);
        var y = MS/2 + (op+8.5)*Math.sin(i);
        players.push(new Player(t, x*MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (op - 22)*Math.cos(i);
        var y = MS/2 + (op - 22)*Math.sin(i);
        lakes.push([x, y, 35]);
        var x = MS/2 + 185*Math.cos(i + (2*Math.PI)/(2*playerCount));
        var y = MS/2 + 185*Math.sin(i + (2*Math.PI)/(2*playerCount));
        arcs.push([x, y, 0, 20, 0, 2*Math.PI]);
        t++;

        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 185, 300 + Math.sin(i + (Math.PI/playerCount)) * 185, 25, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 180, 300 + Math.sin(i + (Math.PI/playerCount)) * 180, 10, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 190, 300 + Math.sin(i + (Math.PI/playerCount)) * 190, 10, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 175, 300 + Math.sin(i + (Math.PI/playerCount)) * 175, 5, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 195, 300 + Math.sin(i + (Math.PI/playerCount)) * 195, 5, 0]);

      }

      var a = 0;
      for (var i = 0 ; i < playerCount ; i++) {
        bonuses.push([300 + Math.cos(a)* 12, 300 + Math.sin(a)*12, 10, 0]);
        a += (2*Math.PI/playerCount);
      }

      for (var i = 0 ; i < playerCount * 2 ; i++) {
        bonuses.push([300 + Math.cos(a)* 24, 300 + Math.sin(a)*24, 5, 0]);
        a += (Math.PI/playerCount);
      }


      bonuses.push([300, 300, 100, 0]);
      arcs.push([300, 300, 178, 192, 0, 2*Math.PI]);
      arcs.push([300, 300, 104, 118, 0, 2*Math.PI]);
      arcs.push([300, 300, 0, 30, 0, 2*Math.PI]);

    }
    else if (n == 3) {
      MS = 600;

      for (var x = 0 ; x < nx ; x++) {
        for (var y = 0 ; y < mx ; y++) {
          grid[x][y] = 0;
        }
      }

      var mnd = 1000000000;

      for (var x = 0 ; x < nx ; x++) {
        for (var y = 0 ; y < mx ; y++) {
          if (x>600 || y>600) continue;
          var mnd = 1000000000;
          var ang = (Math.PI)/playerCount;
          for (var i = 0 ; i < playerCount ; i++) {
            var xx = 300 + 250 * Math.cos(ang);
            var yy = 300 + 250 * Math.sin(ang);
            mnd = Math.min(mnd, Math.sqrt((x-xx)*(x-xx)+(y-yy)*(y-yy)));
            ang += (2*Math.PI)/playerCount;
          }
          var omd = mnd;
          var fc = 2700;
          var ps = -mnd/18 + 3.5;
          var op1 = (1 / (1 + Math.pow(2.71828, -ps))) * fc;
          mnd = Math.sqrt((x-300)*(x-300)+(y-300)*(y-300)) / 0.8;
          fc = 3600;
          ps = -mnd/23 + 5;
          var op2 = (1 / (1 + Math.pow(2.71828, -ps))) * fc;
          grid[x][y] = Math.max(op1, op2);

        }
      }

      var t = 0;
      for (var i = (2*Math.PI)/(2*playerCount) ; i < 2*Math.PI ; i += (2*Math.PI) / playerCount) {
        /*makeLine(MS/2, MS/2, MS/2 + Math.cos(i)*MS/2, MS/2 + Math.sin(i)*MS/2);
        //arcs.push([MS/2 + 175.5*Math.cos(i), MS/2 + 175.5*Math.sin(i), 0, 24, 0, 2*Math.PI]);
        var x = MS/2 + (op + 5.5)*Math.cos(i);
        var y = MS/2 + (op + 5.5)*Math.sin(i);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (op + 5.5)*Math.cos(i-0.04);
        var y = MS/2 + (op + 5.5)*Math.sin(i-0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));*/
        var x = MS/2 + (250 + 5.5)*Math.cos(i+0.04);
        var y = MS/2 + (250 + 5.5)*Math.sin(i+0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (250+8.5)*Math.cos(i);
        var y = MS/2 + (250+8.5)*Math.sin(i);
        players.push(new Player(t, x*MS, getElevation(x, y) * 15, y * MS));
        makeLine(300, 300, x, y);
        arcs.push([x, y, 0, 20, 0, 2*Math.PI]);
        arcs.push([300+Math.cos(i+Math.PI/playerCount)*150, 300+Math.sin(i+Math.PI/playerCount)*150, 0, 22, 0, 2*Math.PI]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 135, 300 + Math.sin(i + (Math.PI/playerCount)) * 135, 5, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 140, 300 + Math.sin(i + (Math.PI/playerCount)) * 140, 10, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 145, 300 + Math.sin(i + (Math.PI/playerCount)) * 145, 25, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 150, 300 + Math.sin(i + (Math.PI/playerCount)) * 150, 100, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 155, 300 + Math.sin(i + (Math.PI/playerCount)) * 155, 25, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 160, 300 + Math.sin(i + (Math.PI/playerCount)) * 160, 10, 0]);
        bonuses.push([300 + Math.cos(i + (Math.PI/playerCount)) * 165, 300 + Math.sin(i + (Math.PI/playerCount)) * 165, 5, 0]);

        t++;
      }

      var a = 0;
      for (var i = 0 ; i < playerCount ; i++) {
        bonuses.push([300 + Math.cos(a)* 12, 300 + Math.sin(a)*12, 10, 0]);
        a += (2*Math.PI/playerCount);
      }

      for (var i = 0 ; i < playerCount * 2 ; i++) {
        bonuses.push([300 + Math.cos(a)* 24, 300 + Math.sin(a)*24, 5, 0]);
        a += (Math.PI/playerCount);
      }

      bonuses.push([300, 300, 100, 0]);
      arcs.push([300, 300, 0, 30, 0, 2*Math.PI]);
      arcs.push([300, 300, 145, 155, 0, 2*Math.PI]);

    }
    else if (n == 4) {
      MS = 800;
      for (var x = 0 ; x < nx ; x++) {
        for (var y = 0 ; y < mx ; y++) {
          grid[x][y] = 0;
          if (x>800 || y>800) continue;
          var d = Math.max(0, Math.sqrt((x-400)*(x-400) + (y-400)*(y-400)) - 150);
          grid[x][y] = (d * d) / 10;
        }
      }
      var t = 0;
      for (var i = (2*Math.PI)/(2*playerCount) ; i < 2*Math.PI ; i += (2*Math.PI) / playerCount) {
        /*makeLine(MS/2, MS/2, MS/2 + Math.cos(i)*MS/2, MS/2 + Math.sin(i)*MS/2);
        //arcs.push([MS/2 + 175.5*Math.cos(i), MS/2 + 175.5*Math.sin(i), 0, 24, 0, 2*Math.PI]);
        var x = MS/2 + (op + 5.5)*Math.cos(i);
        var y = MS/2 + (op + 5.5)*Math.sin(i);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (op + 5.5)*Math.cos(i-0.04);
        var y = MS/2 + (op + 5.5)*Math.sin(i-0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));*/
        var x = MS/2 + (140 + 5.5)*Math.cos(i+0.04);
        var y = MS/2 + (140 + 5.5)*Math.sin(i+0.04);
        orbs.push(new Orb(t, x * MS, getElevation(x, y) * 15, y * MS));
        var x = MS/2 + (145)*Math.cos(i);
        var y = MS/2 + (145)*Math.sin(i);
        players.push(new Player(t, x*MS, getElevation(x, y) * 15, y * MS));

        makeLine(400, 400, 400 + Math.cos(i) * 360, 400 + Math.sin(i) * 360);
        arcs.push([400 + Math.cos(i+Math.PI/playerCount) * 250, 400 + Math.sin(i+Math.PI/playerCount) * 250, 0, 25, 0, 2*Math.PI]);
        var bx = 400 + Math.cos(i+Math.PI/playerCount) * 250;
        var by = 400 + Math.sin(i+Math.PI/playerCount) * 250;
        bonuses.push([bx, by, 100, 0]);
        for (var j = 0 ; j < 2*Math.PI ; j += (2*Math.PI)/5) {
          bonuses.push([bx + Math.cos(j) * 9, by + Math.sin(j) * 9, 25, 0]);
        }
        for (var j = 0 ; j < 2*Math.PI ; j += (2*Math.PI)/5) {
          bonuses.push([bx + Math.cos(j) * 18, by + Math.sin(j) * 18, 10, 0]);
        }
        for (var j = (2*Math.PI)/10 ; j < 2*Math.PI ; j += (2*Math.PI)/5) {
          bonuses.push([bx + Math.cos(j) * 18, by + Math.sin(j) * 18, 5, 0]);
        }
        t++;
      }

      arcs.push([400, 400, 355, 365, 0, 2*Math.PI]);
      arcs.push([400, 400, 245, 255, 0, 2*Math.PI]);


      lakes.push([400, 400, 150]);


    }

  }


  makeMap(parseInt(Math.random() * 4) + 1);

  camera.position.x = players[you].x;
  camera.position.z = players[you].z;
  //makeLine(150, 150, 250, 250);

  var cx = MS/2;
  var cy = MS/2;

  var lakegeometries = [];
  var bonusgeometries = [[], [], [], []];

  for (var i = 0 ; i < lakes.length ; i++) {
    var HT = (Math.random()*500 + 1450);
    //HT = 1350;
    /*var geometry = new THREE2.CylinderGeometry(lakes[i][2], lakes[i][2], 500, 6);

    geometry.translate(lakes[i][0] * MS, getElevation(lakes[i][0], lakes[i][1]), lakes[i][1] * MS);
    lakegeometries.push(geometry);*/
    makeLake(lakes[i][0] * MS, lakes[i][1] * MS, getElevation(lakes[i][0], lakes[i][1]) * 15, lakes[i][2] - 10);
  }

  for (var i = 0 ; i < bonuses.length ; i++) {
    makeBonus(bonuses[i][0] * MS, bonuses[i][1] * MS, getElevation(bonuses[i][0], bonuses[i][1]) * 15, 0.35, bonuses[i][2], i);
  }

  if (lakegeometries.length) {
    var mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(lakegeometries, false);
    var txt = new THREE.TextureLoader();
    var tex = txt.load('water.png');
    var material = new THREE.MeshBasicMaterial({map: tex, color:'rgb(0, 0, 200)'});
    var mesh = new THREE.Mesh(mergedGeometry, material);
    scene.add(mesh);
  }




  for (var i = 0 ; i < MS ; i++) {
    for (var j = 0 ; j < MS ; j++) {
      var ang = Math.atan((j-cy)/(i-cx));
      if (i<cx) {
        ang += Math.PI;
      }
      ang = (ang + 2*Math.PI)%(2*Math.PI);
      if (Math.sqrt((i-cx)*(i-cx)+(j-cy)*(j-cy)) <= 30) {
        makeGround(i, j, 12);
      }
      else {
        var mod = 1000000000;
        var dds = Math.sqrt((i-cx)*(i-cx)+(j-cy)*(j-cy));
        for (var k = 0 ; k < playerCount ; k++) {
          var nang = k * (2 * Math.PI) / playerCount;
          var dst = Math.sqrt((j-cy)*(j-cy)+(i-cx)*(i-cx));
          var hx = cx + Math.cos(nang) * dst;
          var hy = cy + Math.sin(nang) * dst;
          var od = Math.sqrt((i-hx)*(i-hx)+(j-hy)*(j-hy));
          mod = Math.min(mod, od);
        }

        if (mod > 5 && dds > 40) {
          makeGround(i,j,12);
        }
        else {
          makeGround(i, j,parseInt((ang/(2*Math.PI))*playerCount));
        }
      }
      var dens = 3;
      if (i%dens == 0 && j%dens == 0) {
        var x = (i+Math.random()*dens);
        var y = (j+Math.random()*dens);
        if (i<40 && j<40) {
        }
        var collide = false;
        for (var k = 0 ; k < arcs.length ; k++) {
          var dist = Math.sqrt((arcs[k][0]-x)*(arcs[k][0]-x) + (arcs[k][1]-y)*(arcs[k][1]-y));
          var ang = Math.atan((arcs[k][1]-y)/(arcs[k][0]-x));
          if (arcs[k][0] < x) {
            ang += Math.PI;
          }

          ang = (ang + Math.PI*2)%(2*Math.PI);
          if (dist >= arcs[k][2] && dist <= arcs[k][3] && ((arcs[k][4] <= arcs[k][5] && ang >= arcs[k][4] && ang <= arcs[k][5]) || (arcs[k][4] >= arcs[k][5] && (ang <= arcs[k][5] || ang >= arcs[k][4])))) {
            collide = true;
          }
        }
        for (var k = 0 ; k < lakes.length ; k++) {
          var dist = Math.sqrt((lakes[k][0]-i)*(lakes[k][0]-i) + (lakes[k][1]-j)*(lakes[k][1]-j));
          var ang = Math.atan((arcs[k][1]-j)/(arcs[k][0]-i));
          if (arcs[k][0] < i) {
            ang += Math.PI;
          }

          if (dist <= lakes[k][2]) {
            collide = true;
          }
        }
        if (!collide) {
          makeTree(x*MS, y*MS, getElevation(x,y) * 15);
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


    var mnd = 1000000000;
    var mni = -1;
    for (var i = 0 ; i < orbs.length ; i++) {
      var dss = Math.sqrt((camera.position.x-orbs[i].x)*(camera.position.x-orbs[i].x)+(camera.position.z-orbs[i].z)*(camera.position.z-orbs[i].z));
      if (dss < mnd) {
        mnd = dss;
        mni = i;
      }
    }

    requestAnimationFrame(animate);

    var g = document.getElementById("minimap").getContext('2d');
    if (owned.length > 0) {
      g.fillStyle = 'rgb(255, 255, 255)';
      g.fillRect(0, 0, 200, 200);
      var blok = 2;
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
            g.fillStyle = 'rgba(' + playerCols[owned[zone]][0] + ',' + playerCols[owned[zone]][1] + ',' + playerCols[owned[zone]][2] + ', 0.2)';
          }
          g.fillRect(ii / 2, jj / 2, blok, blok);
        }
      }

      for (var i = 0 ; i < orbs.length ; i++) {
        if (orbs[i].num == 12) continue;
        var xx = orbs[i].x / MS;
        var yy = orbs[i].z / MS;

        g.fillStyle = 'rgb(' + playerCols[orbs[i].num][0] + ',' + playerCols[orbs[i].num][1] + ',' + playerCols[orbs[i].num][2] + ')';

        g.fillRect(xx * (200 / MS) - 1.5, yy * (200 / MS) - 1.5, 3, 3);
      }


      for (var i = 0 ; i < players.length ; i++) {
        if (players[i].dead) continue;
        var xx = players[i].x / MS;
        var yy = players[i].z / MS;
        g.beginPath();
        g.arc(xx * (200 / MS), yy * (200 / MS), 3.5, 0, 2*Math.PI, false);
        g.fillStyle = 'rgb(' + playerCols[i][0] + ',' + playerCols[i][1] + ',' + playerCols[i][2] + ')';
        g.fill();
        g.strokeStyle = 'rgb(0,0,0)';
        g.stroke();
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
      var col = -1;
      for (var j = 0 ; j < orbin[i].length ; j++) {
        if (orbin[i][j]) {

          col = j;
        }
        /*if (orbin[i][j] >= 3) {
          ind = j;
        }*/
      }
      st += '\n';
      if (col == -1 && owned[i] != 13) {
        ownchange = true;
        owned[i] = 13;
      }
      else if (col != -1 && col != owned[i]) {
        ownchange = true;
        owned[i] = col;
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
        ownchange = false;
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

    var ms = 470;

    var ox = camera.position.x;
    var oy = camera.position.y;
    var oz = camera.position.z;

    var godmode = true;

    if (keys[81] && godmode) {
      camera.position.x += Math.cos(theta) * ms * 10;
      camera.position.z += Math.sin(theta) * ms * 10;
    }
    else if (keys[87]) {
      camera.position.x += Math.cos(theta) * ms;
      camera.position.z += Math.sin(theta) * ms;
    }

    else if (keys[83]) {
      camera.position.x -= Math.cos(theta) * (ms/2);
      camera.position.z -= Math.sin(theta) * (ms/2);
    }
    else if (keys[65]) {
      camera.position.x += Math.cos(theta) * (ms/4);
      camera.position.z -= Math.sin(theta) * (ms/4);
    }
    else if (keys[68]) {
      camera.position.x -= Math.cos(theta) * (ms/4);
      camera.position.z += Math.sin(theta) * (ms/4);
    }

    var i = camera.position.x / MS;
    var j = camera.position.z / MS;



    var collide = false;
    var lake = false;

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
    for (var k = 0 ; k < lakes.length ; k++) {
      var dist = Math.sqrt((lakes[k][0]-i)*(lakes[k][0]-i) + (lakes[k][1]-j)*(lakes[k][1]-j));
      var ang = Math.atan((arcs[k][1]-j)/(arcs[k][0]-i));
      if (arcs[k][0] < i) {
        ang += Math.PI;
      }

      if (dist <= lakes[k][2]) {
        collide = true;
        if (dist <= lakes[k][2]-10) {
          lake = true;
        }
      }
    }

    if ((!collide || lake) && !godmode) {
      camera.position.x = (ox + (camera.position.x - ox) / 40);
      camera.position.y = (oy + (camera.position.y - oy) / 40);
      camera.position.z = (oz + (camera.position.z - oz) / 40);
    }

    var px2 = camera.position.x;
    var py2 = camera.position.z;


    if (keys[16] && godmode) {
      cty -= 135;
    }
    if (keys[13] && godmode) {
      cty += 135;
    }

    if (keys[79] && !quitt) {
      quitt = true;
      quit();
    }

    var lol = orbs.length;

    for (var i = 0 ; i < 100 ; i++) {
      var dbRef = firebase.database().ref(code + "/orb/" + (i+1));
      dbRef.on("value", function(snapshot) {
        if (snapshot != null && snapshot.val() != null) {
          var x = snapshot.val().x;
          var y = snapshot.val().y;
          var z = snapshot.val().z;
          var ii = snapshot.val().ind;
          var num = snapshot.val().num;
          if (ii >= orbs.length && orbs.length == lol) {
            orbs.push(new Orb(num, x, y, z));
          }
        }
      });
    }

/*



*/


    document.getElementById("topbar").hidden = false;
    var orbc = 0;
    for (var i = 0 ; i < orbs.length ; i++) {
      if (orbs[i] && orbs[i].num == you) {
        orbc++;
      }
    }
    var plays = 0;
    for (var i = 0 ; i < players.length ; i++) {
      if (!players[i].dead) plays++;
    }
    document.getElementById("topbar").innerHTML = "Bonus Points: " + players[you].points + "                  Orbs: " + orbc + "              Players Remaining: " + plays;
    if (players[you].dead) {
      document.getElementById("topbar").innerHTML = "You were eliminated from the game. You can spectate the rest of the game, or press O to exit to the menu.";
    }
    else if (plays == 1) {
      document.getElementById("topbar").innerHTML = "You won the game! Press O to exit to the menu.";
    }

    camera.position.y = getElevation(camera.position.x / MS, camera.position.z / MS) * 15 + cty;

    firebase.database().ref(code + "/pos/" + (you+1)).set({x: camera.position.x, y: camera.position.y, z: camera.position.z});

    if (players[you].orbi != -1) {
      firebase.database().ref(code + "/orb/" + (players[you].orbi+1)).set({num: orbs[players[you].orbi].num, x: orbs[players[you].orbi].x, y: orbs[players[you].orbi].y, z: orbs[players[you].orbi].z, ind: players[you].orbi});
    }

    renderer.render(scene, camera);

  }

  function quit() {

    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }


    document.exitPointerLock();

    document.getElementById("minimap").width = 0;
    document.getElementById("minimap").height = 0;

    //document.getElementById("minimap").getContext('2d').fillStyle = 'rgb(255,255,255)';
    //document.getElementById("minimap").getContext('2d').fillRect(-1000, -1000, 2000, 2000);

    document.getElementById("topbar").innerHTML = "";

    document.getElementById("menu").width = window.innerWidth;
    document.getElementById("menu").height = 300 + 60 * 207 + 50;

    document.getElementById("three").removeChild(renderer.domElement);
    document.getElementById("three").innerHTML = "";
    //num++;
  }

  animate();
}

window.onload = function() {
  main();
}
