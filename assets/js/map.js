var width = 960,
    height = 960,
    speed = -1e-2,
    start = Date.now();

var sphere = {type: "Sphere"};

var projection = d3.geo.orthographic()
    .scale(width / 2.1)
    .clipAngle(90)
    .translate([width / 2, height / 2]);

var graticule = d3.geo.graticule();

var canvas = d3.select("#map").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

d3.json("assets/js/world.json", function(error, topo) {


  var land = topojson.feature(topo, topo.objects.countries),
      grid = graticule();

    // everything is inside this function  
    d3.timer(function() {
        var λ = speed * (Date.now() - start),
            φ = -15;

        // seems better horizon line
        context.clearRect(0, 0, width, height);

        // creates the horizon line
        context.beginPath();
        path(sphere);
        context.lineWidth = 3;
        context.strokeStyle = "#000";
        context.stroke();
        context.fillStyle = "#fff";
        context.fill();

        // seems to make it trasparent
        context.save();
        context.translate(width / 2, 0);
        context.scale(-1, 1);
        context.translate(-width / 2, 0);
        projection.rotate([λ + 180, -φ]);

        // shows the back shadow --> path(land)
        context.beginPath();
        path(land);
        context.fillStyle = "#dadac4";
        context.fill();

        // grid (lines) back shadow
        context.beginPath();
        path(grid);
        context.lineWidth = .5;
        context.strokeStyle = "rgba(119,119,119,.5)";
        context.stroke();

        // not clear
        context.restore();
        projection.rotate([λ, φ]);

        // grid front
        context.beginPath();
        path(grid);
        context.lineWidth = .5;
        context.strokeStyle = "rgba(119,119,119,.5)";
        context.stroke();

        // shows the front states --> path(land)
        context.beginPath();
        path(land);
        context.fillStyle = "#737368";
        context.fill();
        context.lineWidth = .5;
        context.strokeStyle = "#000";
        context.stroke();
    });
});

// not clear
d3.select(self.frameElement).style("height", height + "px");

