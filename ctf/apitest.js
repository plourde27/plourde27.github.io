mtnName = "CALIFORNIA"

var p1 = "39.025956, -120.517633";
var p2 = "39.190635, -120.301001";

lat1 = parseFloat(p1.split(", ")[0]);
lon1 = parseFloat(p1.split(", ")[1]);

lat2 = parseFloat(p2.split(", ")[0]);
lon2 = parseFloat(p2.split(", ")[1]);

ZOOM = 12

var tilebelt = require('@mapbox/tilebelt');
var getPixels = require('get-pixels');
var tk = 'pk.eyJ1IjoicGxvdXJkZTI3IiwiYSI6ImNram4ybXM3NjBrcHcycXF1aHdiczJpOXgifQ.pEo5AC3M1pxGrFH_tUxk7w'

var tf = tilebelt.pointToTileFraction(-76.1, 43.5, 20);
var tile = tf.map(Math.floor);
var domain = 'https://api.mapbox.com/v4/';
var source = `mapbox.terrain-rgb/${tile[2]}/${tile[0]}/${tile[1]}.pngraw`;
var url = `${domain}${source}?access_token=${tk}`;
var url2 = "https://api.mapbox.com/v4/mapbox.terrain-rgb/" + ZOOM + "/4668/6036.pngraw?access_token=pk.eyJ1IjoicGxvdXJkZTI3IiwiYSI6ImNram4ybXM3NjBrcHcycXF1aHdiczJpOXgifQ.pEo5AC3M1pxGrFH_tUxk7w";






















function deg2num(lat_deg, lon_deg, zoom) {
  var lat_rad = lat_deg * (Math.PI / 180);
  var n = Math.pow(2.0, zoom);
  var xtile = parseInt((lon_deg + 180.0) / 360.0 * n)
  var ytile = parseInt((1.0 - Math.asinh(Math.tan(lat_rad)) / Math.PI) / 2.0 * n)
  return [xtile, ytile]
}



arr1 = deg2num(lat1, lon1, ZOOM);
arr2 = deg2num(lat2, lon2, ZOOM);

x1 = arr1[0];
y1 = arr1[1];

x2 = arr2[0];
y2 = arr2[1];

var data = [];
var strin = "";
var star = "";
var en = "";
var x = x1;
var y = y1;
var pst = "";

function find(url, x, y) {
  getPixels(url, function(err, pixels) {
    pixels = pixels.data;

    for (var i = 0 ; i < 512 ; i++) {
      for (var j = 0 ; j < 512 ; j++) {
        var ind = (i*512 + j) * 4;
        data[(y - y2) * 512 + i][(x - x1) * 512 + j] = [pixels[ind], pixels[ind+1], pixels[ind+2], pixels[ind+3]];
      }
    }

    //console.log(x + " " + y);
    //console.log(data[500][2000]);
    //console.log(data[(x - x1)*512][(y - y2)*512]);
  });
  if (data[(y - y2) * 512][(x - x1) * 512] != -1) {
    return true;
  }
  return false;
}

var stm = "";

function start(string, start, end) {

  data = [];
  for (var i = 0 ; i < 512 * (y1 - y2 + 1) ; i ++) {
    data.push([]);
    for (var j = 0 ; j < 512 * (x2 - x1 + 1) ; j++) {
      data[data.length-1].push(-1);
    }
  }





  strin = string;
  star = start;
  en = end;
}

var times = 0;

function print() {

  console.log(stm);
  console.log(data.length + " " + data[0].length);

  if (stm == "Pixels: ") {
    console.log("\n\n");
  }
  else {
    console.log("\n");
  }
  times++;
  var alrm = 0;
  for (var i = 0 ; i < data.length ; i++) {
    var st = "";
    for (var j = 0 ; j < data[i].length ; j++) {
      if (data[i][j][0] == undefined) {
        alrm++;
      }
      st += data[i][j][0] + "," + data[i][j][1] + "," + data[i][j][2] + "," + data[i][j][3];
      if (j < data[i].length - 1) {
        st += " ";
      }
    }


    console.log(st);
  }

  for (var i = 0 ; i < data.length ; i++) {
    //var st = "";
    for (var j = 0 ; j < data[i].length ; j++) {
      data[i][j] = -1;
    }
  }

  //console.log("ALARM: " + alrm);
  x = x1;
  y = y1;

  if (times == 1) {
    stm = "Elevation: ";
    go("Elevation: ", "https://api.mapbox.com/v4/mapbox.terrain-rgb/" + ZOOM + "/", "@2x.pngraw?access_token=pk.eyJ1IjoicGxvdXJkZTI3IiwiYSI6ImNram4ybXM3NjBrcHcycXF1aHdiczJpOXgifQ.pEo5AC3M1pxGrFH_tUxk7w");
  }
}

var ou = "";


function run() {
  url = star + x + "/" + y + en;
  if (url != ou) {
    //console.log(x + " " + y + " " + x1 + " " + y1 + " " + x2 + " " + y2);
    //console.log(stm);
  }
  ou = url;

  //console.log(x + " " + y);
  var status = find(url, x, y);

  if (status) {
    x++;
    if (x > x2) {
      x = x1;
      y--;
      if (y < y2) {
        pst = stm;
        setTimeout(print, 5000);
        return;
      }
    }
  }

  setTimeout(run, 500);
}

function go(url, string, end) {
  start(url, string, end);
  x = x1;
  y = y1;

  run(url);
}

stm = "Pixels: "


console.log("\n");
console.log("\n");
console.log(mtnName);
console.log("\n");
console.log("\n\n\n");


go("Pixels: ", "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/" + ZOOM + "/", "?access_token=pk.eyJ1IjoicGxvdXJkZTI3IiwiYSI6ImNram4ybXM3NjBrcHcycXF1aHdiczJpOXgifQ.pEo5AC3M1pxGrFH_tUxk7w");

console.log("\n");
console.log("\n");
console.log("\n\n");
