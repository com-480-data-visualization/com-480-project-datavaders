// Create data


let scatter_year = '2019';
let scatter_metric = 'gdp_per_capita';
let scatter_zoomable = false;

var margin = { top: 20, right: 20, bottom: 30, left: 30 };
  width = 900 - margin.left - margin.right,
  height = 480 - margin.top - margin.bottom;

var svg = d3.select("#scatter").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const scatter_update = () => {
  d3.csv('./Preprocessing/finaldf.csv', function(d) {
    var data = d.filter((entry) => entry.year === scatter_year);

    var Tooltip = d3.select("#scatter")
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "red")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute");
      

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        console.log('Mouseover fired!');
        Tooltip
          .style("display", null)
      }
      var mousemove = function(d) {
        Tooltip
          .html(`${d.country}<br>Happiness Score: ${d.score}<br>${scatter_metric}: ${d[scatter_metric]}`)
          .style("left", (d3.mouse(this)[0]) + 700 + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("display", "none")
      }

  var x = d3.scaleLinear()          
        .range([0, width])
        .nice();

  var y = d3.scaleLinear()
      .range([height, 0]);

  var xAxis = d3.axisBottom(x).ticks(12),
      yAxis = d3.axisLeft(y).ticks(12 * height / width);

  var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
      idleTimeout,
      idleDelay = 350;

  
  var clip = svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0) 
      .attr("y", 0); 

  var xExtent = d3.extent(data, function (d) { return +d[scatter_metric]; });
  var yExtent = d3.extent(data, function (d) { return +d.score; });
  x.domain(d3.extent(data, function (d) { return +d[scatter_metric]; })).nice();
  y.domain(d3.extent(data, function (d) { return +d.score; })).nice();

  var scatter = svg.append("g")
        .attr("id", "scatterplot")
        .attr("clip-path", "url(#clip)");
      
  scatter.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", function (d) { return x(+d[scatter_metric]); })
      .attr("cy", function (d) { return y(+d.score); })
      .attr("opacity", 0.5)
      .style("fill", "#4292c6")
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

  // x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr('id', "axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("text")
    .style("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 8)
      .attr('id', "x-label-text")
    .text(scatter_metric);

  // y axis
  svg.append("g")
      .attr("class", "y axis")
      .attr('id', "axis--y")
      .call(yAxis);

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .attr('id', "y-label-text")
      .text("Happiness Score");

  document.addEventListener('keydown', event => {
    if (event.shiftKey) {
      if (scatter_zoomable) {
        d3.selectAll('.brush').remove();
      } else {
        scatter.append("g")
        .attr("class", "brush")
        .call(brush);
      }
      scatter_zoomable = !scatter_zoomable;
    }
  });

  

  function brushended() {

      var s = d3.event.selection;
      if (!s) {
          if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
          x.domain(d3.extent(data, function (d) { return +d[scatter_metric]; })).nice();
          y.domain(d3.extent(data, function (d) { return +d.score; })).nice();
      } else {
          
          x.domain([s[0][0], s[1][0]].map(x.invert, x));
          y.domain([s[1][1], s[0][1]].map(y.invert, y));
          scatter.select(".brush").call(brush.move, null);
      }
      zoom();
  }

  function idled() {
      idleTimeout = null;
  }

  function zoom() {

      var t = scatter.transition().duration(750);
      svg.select("#axis--x").transition(t).call(xAxis);
      svg.select("#axis--y").transition(t).call(yAxis);
      scatter.selectAll("circle").transition(t)
      .attr("cx", function (d) { return x(+d[scatter_metric]); })
      .attr("cy", function (d) { return y(+d.score); });
  }

  })
}

scatter_update();

      
// Fires when user toggles year dropdown.
const changeYear = () => {
  d3.select('#scatter').selectAll('circle').remove();
  d3.selectAll('#axis--x').remove();
  d3.selectAll('#x-label-text').remove();
  d3.selectAll('#y-label-text').remove();
  d3.selectAll('#axis--y').remove();
  scatter_year = document.getElementById('year').value;
  scatter_update();
}

// Fires when user toggles submetric dropdown.
const changeSubmetric = () => {
  d3.select('#scatter').selectAll('circle').remove();
  d3.selectAll('#axis--x').remove();
  d3.selectAll('#x-label-text').remove();
  d3.selectAll('#y-label-text').remove();
  d3.selectAll('#axis--y').remove();
  scatter_metric = document.getElementById('submetric').value;
  scatter_update();
}