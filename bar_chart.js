var dataset;
var keys;

let bar_year = '2019';

var width = 600,
    height = 260;

var svg = d3.select(".ranking").attr("width", width).attr("height", height),
    margin = {top: 20, right: 20, bottom: 30, left: 250},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleBand()
    .rangeRound([0, height])
    .paddingInner(0.05)
    .align(0.1);

var x = d3.scaleLinear()
    .rangeRound([0, width]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

const bar_update = () => {
    d3.select('.ranking').selectAll('rect').remove();
    d3.select('.ranking').selectAll('text').remove();
    d3.selectAll('tick').remove();
    let datacsv = null;
d3.csv(`./Preprocessing/${bar_year}.csv`, function(d) {
    datacsv = d;
    var data = datacsv.slice(0, 10);
    console.log(data);
    dataset = data;
    if (bar_year === '2015') {
        keys = d.columns.slice(5,12);
    } else if (bar_year === '2016') {
        keys = d.columns.slice(6);
    } else if (bar_year === '2017') {
        keys = d.columns.slice(5);
    } else if (bar_year === '2018' || bar_year === '2019') {
        keys = d.columns.slice(3);
    }
    

    // Sort row on basis of Happiness Score
    if (bar_year === '2015' || bar_year === '2016') {
        data.sort(function(a, b) { return b['Happiness Score'] - a['Happiness Score']; });
    } else if (bar_year === '2017') {
        data.sort(function(a, b) { return b['Happiness.Score'] - a['Happiness.Score']; });
    } else if (bar_year === '2018' || bar_year === '2019') {
        data.sort(function(a, b) { return b['Score'] - a['Score']; });
    }
    
    if (bar_year === '2015' || bar_year === '2016') {
        y.domain(data.map(function(d) { return d['Country']; }));
    } else if (bar_year === '2017') {
        y.domain(data.map(function(d) { return d['Country']; }));
    } else if (bar_year === '2018' || bar_year === '2019') {
        y.domain(data.map(function(d) { return d['Country or region']; }));
    }
    if (bar_year === '2015' || bar_year === '2016') {
        x.domain([0, d3.max(data, function(d) { return d['Happiness Score']; })]).nice();
    } else if (bar_year === '2017') {
        x.domain([0, d3.max(data, function(d) { return d['Happiness.Score']; })]).nice();
    } else if (bar_year === '2018' || bar_year === '2019') {
        x.domain([0, d3.max(data, function(d) { return d['Score']; })]).nice();
    }
    z.domain(keys);

    g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
        .attr("y", function(d) { return y(d.data[
            bar_year === '2015' || bar_year === '2016' || bar_year === '2017' ? 'Country' : 'Country or region']); })
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("height", y.bandwidth());

        g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(y));

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,"+(height)+")")
        .call(d3.axisBottom(x).ticks(null, "s"))
    .append("text")
        .attr("y", 2)
        .attr("x", x(x.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#dddddd")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Happiness Score")
        .attr("transform", "translate("+ (-width) +",-10)");

    var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(-400," + (35 + i * 20) + ")"; });
    // .attr("transform", function(d, i) { return "translate(500," + (500 + i * 20) + ")"; });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("fill", "#dddddd")
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
  });

}

bar_update();

changeBarYear = () => {
    bar_year = document.getElementById('bar_year').value;
    bar_update();
  }



    