/*
  Scatter plot component.
*/

// Initialize default metric and year.
let scatter_metric = 'gdp_per_capita';
let scatter_year = '2019';

// Global variables to manage scatter plot state.
let scatter_zoomable = false;
let scatter_initialRender = true;

// Map storing field name/label pairs. 
let scatter_metricNames = new Map([
  ['gdp_per_capita', 'GDP'],
  ['corruption_perceptions', 'Societal Trust'],
  ['generosity', 'Generosity'],
  ['freedom_to_life_choice', 'Freedom'],
  ['healthy_life_expectancy', 'Healthy Life Expectancy'],
]);

// Helper function to lighten color tones upon mouseover.
const scatter_lighten = (color, factor) => {
  return `rgba${color.slice(3, -1)}, ${factor})`;
}

// Global declaration of the keydown event listener function.
let keydownEventResponse;

var scatter_margin = { top: 20, right: 20, bottom: 30, left: 30 };
  width = 900 - scatter_margin.left - scatter_margin.right,
  height = 578 - scatter_margin.top - scatter_margin.bottom;

// Set the color scale.
let scatter_colorScale = d3.scaleSequential()
.interpolator(d3.interpolateCool)
.domain([7.8,2]).clamp(true);

// Update the plot based on the currently selected data.
const scatter_update = () => {
  d3.csv('./Preprocessing/finaldf.csv', function(d) {
    let scatter_svg = d3.select("#scatter").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (margin.left + 10) + "," + margin.top + ")");

    let data = d.filter((entry) => entry.year === scatter_year);

    let tooltip = d3.select("#scatter")
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "red")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("display", "none");
      

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        d3.select(this).attr("fill", scatter_lighten(map_colorScale(d.score), 0.8))
        .style("cursor", "pointer");
        tooltip
          .style("display", null)
      
      radar_onMapMouseover(d.country);
      display_onMouseover(map_codes.get(d.country))
      document.querySelector('.project-text').innerHTML = d.country + '<br>' + 'Happiness score: ' + d.score;

        
          
      }
      var mousemove = function(d) {
        tooltip
          .html(`${d.country}<br>Happiness Score: ${d.score}<br>${scatter_metric}: ${d[scatter_metric]}`)
          .style("left", (d3.mouse(this)[0]) + "px")
          .style("top", (d3.mouse(this)[1]) - 30 + "px")
      }
      var mouseleave = function(d) {
        tooltip
          .style("display", "none")
        radar_onMapMouseout(d.country);
        display_onMouseout();
        d3.select(this).attr("fill", function (d) {return scatter_colorScale(+d.score); })
        document.querySelector('.project-text').innerHTML = 'Mouse over a country on the map.';
      }

      var click = function(d) {
        radar_onMapClick(d.country);
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

  
  var clip = scatter_svg.append("defs").append("svg:clipPath")
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

  var scatter = scatter_svg.append("g")
        .attr("id", "scatterplot")
        .attr("clip-path", "url(#clip)");
      
  scatter.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", function (d) { return x(+d[scatter_metric]); })
      .attr("cy", function (d) { return y(+d.score); })
      .attr("opacity", 1)
      .attr("fill", function (d) {return scatter_colorScale(+d.score); })
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave)
      .on('click', click);

  // x axis
  scatter_svg.append("g")
      .attr("class", "x axis")
      .attr('id', "axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  scatter_svg.append("text")
    .style("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 8)
      .attr('id', "x-label-text")
    .text(scatter_metricNames.get(scatter_metric));

  // y axis
  if (scatter_initialRender) {
  scatter_svg.append("g")
      .attr("class", "y axis")
      .attr('id', "axis--y")
      .call(yAxis);

  
    scatter_svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .attr('id', "y-label-text")
      .text("Happiness Score");
  }
      
  keydownEventResponse = (event) => {
    if (event.shiftKey) {
      event.shiftKey = false;
      console.log('keydown detected');
      if (scatter_zoomable) {
        d3.selectAll('.brush').remove();
      } else {
        scatter.append("g")
        .attr("class", "brush")
        .call(brush);
      }
      scatter_zoomable = !scatter_zoomable;
    }
  }

    document.addEventListener('keydown', keydownEventResponse);
  

  

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
      scatter_svg.select("#axis--x").transition(t).call(xAxis);
      scatter_svg.select("#axis--y").transition(t).call(yAxis);
      scatter.selectAll("circle").transition(t)
      .attr("cx", function (d) {
        console.log(x(+d[scatter_metric]))
         return x(+d[scatter_metric]); })
      .attr("cy", function (d) { return y(+d.score); });
  }

  })
}

scatter_update();

      
// Fires when user toggles year dropdown.
const scatter_changeYear = () => {
  d3.select('#scatter').selectAll('*').remove();
  document.removeEventListener('keydown', keydownEventResponse);
  scatter_year = document.getElementById('year').value;
  scatter_update();
}

// Fires when user toggles submetric dropdown.
const scatter_changeSubmetric = () => {
  d3.select('#scatter').selectAll('*').remove();
  document.removeEventListener('keydown', keydownEventResponse);
  // d3.select('#scatter').selectAll('circle').remove();
  // d3.selectAll('#axis--x').remove();
  // d3.selectAll('#x-label-text').remove();
  scatter_metric = document.getElementById('submetric').value;
  scatter_update();
}

// Hide the map and show the scatter.
const scatter_show = () => {
  document.getElementById('map').classList.add('project-hide');
  document.getElementById('scatter').classList.remove('project-hide');
  document.getElementById('submetric').classList.remove('project-hide');
}