let scatter_submetric = 'gdp_per_capita';
let scatter_year = '2019';
let scatter_data = null;

const getSubMetricName = (columnName) => {
  return columnName.replace(/_/gi, ' ');
};

// Helper function to scale the y-axis.
const getMaxValueRoundedUp = () => {
  return Math.ceil(Math.max(...scatter_data.filter(d => d.year === scatter_year)
  .map(d => Number(d[scatter_submetric]))));
}

// Set the dimensions and margins of the scatter plot.
let scatter_margin = {top: 10, right: 30, bottom: 40, left: 50},
    scatter_width = 600 - scatter_margin.left - scatter_margin.right,
    scatter_height = 260 - scatter_margin.top - scatter_margin.bottom;

// Append the svg object to the body of the page.
let scatter_svg = d3.select("#scatter")
.append("svg")
.attr("width", scatter_width + scatter_margin.left + scatter_margin.right)
.attr("height", scatter_height + scatter_margin.top + scatter_margin.bottom)
.append("g")
.attr("transform", "translate(" + scatter_margin.left + "," + scatter_margin.top + ")");

// Add scatter plot styling.
scatter_svg.append("rect")
.attr("x",0)
.attr("y",0)
.attr("height", scatter_height)
.attr("width", scatter_width)
.style("fill", "EBEBEB");

// Update graph data on any user input change.
const update = () => {
  // Clear any stale state.
  scatter_svg.selectAll('text').remove();
  scatter_svg.selectAll('circle').remove();

  // Create x-axis.
  let scatter_x = d3.scaleLinear()
  .domain([0, getMaxValueRoundedUp()])
  .range([0, scatter_width ])
  
  scatter_svg.append("g")
  .attr("transform", "translate(0," + scatter_height + ")")
  .call(d3.axisBottom(scatter_x).tickSize(-scatter_height*1.3).ticks(10))
  .select(".domain").remove()

  // Create y-axis
  let scatter_y = d3.scaleLinear()
  .domain([2, 8])
  .range([scatter_height, 0])
  .nice()
  
  scatter_svg.append("g")
  .call(d3.axisLeft(scatter_y).tickSize(-scatter_width*1.3).ticks(7))
  .select(".domain").remove()

  // Customization
  scatter_svg.selectAll(".tick line").attr("stroke", "white")

  // Label x-axis.
  scatter_svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", scatter_width/2 + scatter_margin.left)
  .attr("y", scatter_height + scatter_margin.top + 20)
  .text(getSubMetricName(scatter_submetric));

  // Label y-axis.
  scatter_svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -scatter_margin.left + 20)
  .attr("x", -scatter_margin.top - scatter_height/2 + 20)
  .text("happiness score")

  // Assign point colour by region.
  let scatter_color = d3.scaleOrdinal()
  .domain([
    "Australia and New Zealand", 
    "Western Europe", 
    "Central and Eastern Europe", 
    "Eastern Asia",
    "Latin America and Caribbean",
    "Middle East and Northern Africa",
    "North America", 
    "Southeastern Asia", 
    "Southern Asia", 
    "Sub-Saharan Africa", 
  ]).range([ 
    "red", 
    "orange", 
    "yellow", 
    "green", 
    "blue", 
    "indigo", 
    "violet", 
    "black", 
    "gold", 
    "silver"]);

  // Add specified points to the scatter plot.
  scatter_svg.append('g')
  .selectAll("dot")
  .data(scatter_data.filter(d => d.year === scatter_year))
  .enter()
  .append("circle")
  .attr("cx", function (d) { return scatter_x(Number(d[scatter_submetric])); })
  .attr("cy", function (d) { return scatter_y(d.score); })
  .attr("r", 5)
  .style("fill", function (d) { return scatter_color(d.region) } )
}

// Load preprocessed data from Preprocessing/finaldf.csv.
d3.csv("./Preprocessing/finaldf.csv", function(d) {
  scatter_data = d;
  update();
});

// Fires when user toggles year dropdown.
const changeYear = () => {
  scatter_year = document.getElementById('year').value;
  update();
}

// Fires when user toggles submetric dropdown.
const changeSubmetric = () => {
  scatter_submetric = document.getElementById('submetric').value;
  update();
}












  