import * as utils from '../utils/utils.js';

let keys;
let bar_year = '2019';

let svg = d3.select("#bar"),
    margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let scaleX = d3.scaleBand()
    .rangeRound([0, width])
    //.paddingInner(0.01)
    //.paddingOuter(0.01)
    .align(0.1);

let scaleY = d3.scaleLinear()
    .rangeRound([0, height]);

let z = d3.scaleOrdinal()
    .range(["RGB(243,202,34)", "RGB(237,233,37)", "RGB(52,161,153)", "RGB(70,180,12)",
    "RGB(153,148,194)", "RGB(211,102,153)", "RGB(194,63,118)"]);

let color_seq = d3.scaleSequential()
    .interpolator(d3.interpolateCool);

let color_seq2 = d3.scaleSequential()
    .interpolator(d3.interpolatePlasma);

const bar_update = () => {
    d3.select('#bar').selectAll('rect').remove();
    d3.select('#bar').selectAll('text').remove();
    d3.selectAll('#bar tick').remove();

    d3.csv(`./Preprocessing/finaldf1.csv`, function (d) {
        //bar_year
        let data = d.filter(obj => obj.year===bar_year);

        color_seq.domain([0, data.length]);
        color_seq2.domain([-150, data.length]);

        keys = d.columns.slice(5, 11);
        console.log(keys)
        let key_data = d3.stack().keys(keys)(data);

        // Sort row on basis of Happiness Score
        data.sort(function (a, b) {
            return b.score - a.score;
        });

        data.map((d, i) => d.idx0 = i);
        d3.shuffle(data);
        data.map((d, i) => d.idx1 = i);
        // console.log(Object.keys(data));

        scaleX.domain(data.map((d) => {
            return d.country;
        }));


        scaleY.domain([0, d3.max(data, function (d) {
            return d.score;
        })]).nice();

        //console.log(d3.stack().keys(keys)(data));
        //console.log(data);

        z.domain(keys);

        g.selectAll("g")
            .data(data.map((d, i) => d))
            .enter().append("g")
            .append('rect')
            .attr('class', 'gbarrect')
            .attr("x", function (d) {
                return scaleX(d.country);
            })
            .attr("y", function (d) {
                return scaleY(0);
            })
            .transition()
            .ease(d3.easeSin)
            .duration(400)
            .delay(function (d, i) {
                return i * 5;
            })
            .attr("height", function (d) {
                return scaleY(d.score);
            })
            .attr("width", 0.60 * scaleX.bandwidth())
            .attr("fill", (d, i) => {
                return color_seq(d.idx0);
            });


        g.selectAll('.gbarrect')
            .on("mouseover", onMapOver) //Add listener for the mouseover event
            .on("mouseout", onMapOut);   //Add listener for the mouseout event


        // g.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(0,0)");


        //.call(d3.axisLeft(scaleY));

        // g.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(" + width + ",0)")
        //     .call(d3.axisBottom(scaleX).ticks(null, "s"))
        //     .append("text")
        //     .attr("x", 2)
        //     .attr("y", scaleY(scaleY.ticks().pop()) + 0.5)
        //     .attr("dx", "0.32em")
        //     .attr("fill", "#dddddd")
        //     .attr("font-weight", "bold")
        //     .attr("text-anchor", "start")
        //     .text("Happiness Score")
        //     .attr("transform", "translate(-10," + (-width) + ")");

        // legend no more needed
        //
        // let legend = g.append("g")
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", 10)
        //     .attr("font-weight", "bold")
        //     .attr("text-anchor", "end")
        //     .selectAll("g")
        //     .data(keys.slice().reverse())
        //     .enter().append("g")
        //     .attr("transform", function (d, i) {
        //         return "translate(" + (35 + i * 20) + ",-400)";
        //     });

        // .attr("transform", function(d, i) { return "translate(500," + (500 + i * 20) + ")"; });

        // legend.append("rect")
        //     .attr("x", width - 19)
        //     .attr("width", 19)
        //     .attr("height", 19)
        //     .attr("fill", z);
        //
        // legend.append("text")
        //     .attr("x", width - 20)
        //     .attr("y", 9.5)
        //     .attr("fill", "#dddddd")
        //     .attr("dx", "0.32em")
        //     .text(function (d) {
        //         return d;
        //     });

        function onMouseOver(d, i) {
            d3.select(this).attr('class', 'highlight');
            d3.select(this)
                .transition()     // adds animation
                .duration(400)
                .attr('width', scaleX.bandwidth() * 1)
                .attr("x", function (d) {
                    return scaleX(d.country) - scaleX.bandwidth() * 0.2;
                })
                .attr('fill', '#D4AF37');//#D4AF37
        }

        function onMouseOut(d, i) {
            d3.select(this).attr('class', 'bar');
            d3.select(this)
                .transition()     // adds animation
                .duration(400)
                .delay(400)
                .attr('width', scaleX.bandwidth() * 0.6)
                .attr("x", function (d) {
                    return scaleX(d.country);
                })
                .attr('fill', color_seq2(d.idx1))
                .transition()     // adds animation
                .duration(400)
                .delay(600)
                .attr('fill', color_seq(d.idx0));
        }

        function onMapOver(d, i) {
            g.append('rect')
                .attr('class', 'motherfucker')
                .attr("x", function () {
                    return scaleX(d.country) - scaleX.bandwidth() * 3;
                })
                .attr("y", function () {
                    return scaleY(0);
                })
                .transition()
                .ease(d3.easeSin)
                .duration(400)
                .attr("height", function () {
                    return scaleY(10);
                })
                .attr("width", 7 * scaleX.bandwidth())
                .attr("fill", "rgb(241,241,241)");

            let elem_idx = d.idx0;

            key_data.forEach((item, key_idx) => {
                g.append('rect')
                    .attr("class", "brushed")
                    .attr("x", function () {
                        return scaleX(d.country) - scaleX.bandwidth() * 2;
                    })
                    .attr("y", () => scaleY(item[elem_idx][0]))
                    .attr("height", function () {
                        return scaleY(item[elem_idx][1] - item[elem_idx][0] + 0.1);
                    })
                    .attr("width", 5 * scaleX.bandwidth())
                    .attr('fill', z(key_idx))
            })
        }

        function onMapOut(d, i) {
            d3.transition()
                .delay(700)
                .duration(400)
                .select('#bar').selectAll('.motherfucker')
                .attr("height", 0)
                .remove();

            d3.transition()
                .delay(800)
                .duration(100)
                .attr("height", 0)
                .select('#bar').selectAll('.brushed').remove()
        }
    });
};


bar_update();

const changeBarYear = () => {
    bar_year = document.getElementById('bar_year').value;
    bar_update();
};
