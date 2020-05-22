let dataset;
let keys;

let bar_year = '2019';

let svg = d3.select("#bar"),
    margin = {top: 0, right: 20, bottom: 30, left: 20},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let scaleX = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.01)
    .paddingOuter(0.01)
    .align(0.1);

let scaleY = d3.scaleLinear()
    .rangeRound([0, height]);

let z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

let color_seq = d3.scaleSequential();


const bar_update = () => {
    d3.select('#bar').selectAll('rect').remove();
    d3.select('#bar').selectAll('text').remove();
    d3.selectAll('#bar tick').remove();
    let datacsv = null;

    d3.csv(`./Preprocessing/${bar_year}.csv`, function (d) {
        datacsv = d;
        let data = datacsv;
        dataset = data;
        //data = data.map((x,i) => data.idx0 = i);

        //data = data.map((x,i) => data.idx1 = i);
        color_seq
            .domain([0, data.length])
            .interpolator(d3.interpolatePlasma);

        if (bar_year === '2015') {
            keys = d.columns.slice(5, 12);
        } else if (bar_year === '2016') {
            keys = d.columns.slice(6);
        } else if (bar_year === '2017') {
            keys = d.columns.slice(5);
        } else if (bar_year === '2018' || bar_year === '2019') {
            keys = d.columns.slice(3);
        }


        // Sort row on basis of Happiness Score
        if (bar_year === '2015' || bar_year === '2016') {
            data.sort(function (a, b) {
                return b['Happiness Score'] - a['Happiness Score'];
            });
        } else if (bar_year === '2017') {
            data.sort(function (a, b) {
                return b['Happiness.Score'] - a['Happiness.Score'];
            });
        } else if (bar_year === '2018' || bar_year === '2019') {
            data.sort(function (a, b) {
                return b.Score - a.Score;
            });
        }

        if (bar_year === '2015' || bar_year === '2016') {
            scaleX.domain(data.map(function (d) {
                return d.Country;
            }));
        } else if (bar_year === '2017') {
            scaleX.domain(data.map(function (d) {
                return d.Country;
            }));
        } else if (bar_year === '2018' || bar_year === '2019') {
            scaleX.domain(data.map(function (d) {
                return d['Country or region'];
            }));
        }
        if (bar_year === '2015' || bar_year === '2016') {
            scaleY.domain([0, d3.max(data, function (d) {
                return d['Happiness Score'];
            })]).nice();
        } else if (bar_year === '2017') {
            scaleY.domain([0, d3.max(data, function (d) {
                return d['Happiness.Score'];
            })]).nice();
        } else if (bar_year === '2018' || bar_year === '2019') {
            scaleY.domain([0, d3.max(data, function (d) {
                return d.Score;
            })]).nice();
        }

        data.map((d,i) => d.idx0 = i)
        d3.shuffle(data);
        data.map((d,i) => d.idx1 = i)

        console.log(data);
        // console.log(keys)
        // console.log(d3.stack().keys(keys)(data))
        z.domain(keys);

        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            //.attr("fill", function (d,i) {
                // d contains all the diff data for new key
            //    return z(d.key);
            //})
            .selectAll("rect")
            .data(function (d, i) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return scaleX(d.data[
                    bar_year === '2015' || bar_year === '2016' || bar_year === '2017' ? 'Country' : 'Country or region']);
            })
            .attr("y", function (d) {
                return scaleY(d[0]);
            })
            .attr("height", function (d) {
                return scaleY(d[1]) - scaleY(d[0]);
            })
            .attr("width", 0.8*scaleX.bandwidth())
            .attr("fill", (d,i) => {
                console.log(color_seq(i))
                color_seq(i);
            });

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(scaleY));

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(d3.axisBottom(scaleX).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", scaleY(scaleY.ticks().pop()) + 0.5)
            .attr("dx", "0.32em")
            .attr("fill", "#dddddd")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Happiness Score")
            .attr("transform", "translate(-10," + (-width) + ")");

        let legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + (35 + i * 20) + ",-400)";
            });

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
            .attr("dx", "0.32em")
            .text(function (d) {
                return d;
            });
    });

};

bar_update();

changeBarYear = () => {
    bar_year = document.getElementById('bar_year').value;
    bar_update();
};
