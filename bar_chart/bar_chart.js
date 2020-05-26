let keys;
let data_year = '2019';
let data_region = "";
let vizScale = "world";

let svg = d3.select("#bar"),
    margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('id', 'barG')

let scaleX = d3.scaleBand()
    .rangeRound([0, width])
    .paddingOuter(0.01)
    .align(0.1);

let scaleY = d3.scaleLinear()
    .rangeRound([0, height*0.80])
    .domain([0, 10]);

let z = d3.scaleOrdinal()
    .range(["RGB(243,202,34)", "RGB(237,233,37)", "RGB(52,161,153)", "RGB(70,180,12)",
        "RGB(153,148,194)", "RGB(211,102,153)", "RGB(194,63,118)"]);

let color_seq = d3.scaleSequential()
    .interpolator(d3.interpolateCool);

let color_seq2 = d3.scaleSequential()
    .interpolator(d3.interpolatePlasma);


const bar_draw = () => {
    g.selectAll().remove()
    console.log(vizScale, data_region);

    d3.csv(`./Preprocessing/df2.csv`, function (data) {
        keys = data.columns.slice(4, 11);
        let key_data = d3.stack().keys(keys)(data);
        z.domain(keys);

        data = prepareData(data);

        // Sort row on basis of Happiness Score
        data.sort(function (a, b) {
            return a.posx - b.posx;
        });
        data.map((d, i) => d.idx1 = i);
        // Change the x axis
        scaleX.domain(data.map((d) => {
            return d.country;
        }));

        // Drawing
        g.selectAll("g")
            .data(data)
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
            .on("mouseover", onMouseOver) //Add listener for the mouseover event
            .on("mouseout", onMouseOut)   //Add listener for the mouseout event
            .on("click", onClick);

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
        function onClick(d,i) {
            if (vizScale === "region"){
                data_region = "";
                vizScale ="world";
            }
            else if (vizScale === "world"){
                data_region = d.region;
                vizScale ="region";
            }
            bar_draw();
        }

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
    });
};


bar_draw();

const bar_test = ()=>{
    console.log('pippo pappo');
};

const bar_update = (updateType, countryName) => {

    d3.csv(`./Preprocessing/df2.csv`, function (data) {

        keys = data.columns.slice(4, 11);
        let key_data = d3.stack().keys(keys)(data);
        z.domain(keys);

        data = prepareData(data);

        // Sort row on basis of Happiness Score
        data.sort(function (a, b) {
            return a.posx - b.posx;
        });
        data.map((d, i) => d.idx1 = i);

        // Change the x axis
        scaleX.domain(data.map((d) => {
            return d.country;
        }));

        // Call backs
        if (updateType === 'mapHover') {
            onMapOver(d_from_country(countryName))
        } else if (updateType === 'mapOut') {
            onMapOut()
        }

        function d_from_country(countryName) {
            let d = data.find(obj => obj.country === countryName);
            return d;
        }

        function onMapOver(d) {
            g.append('rect')
                .attr('class', 'motherfucker')
                .attr("x", function () {
                    return scaleX(d.country);
                })
                .attr("y", function () {
                    return scaleY(0)-5;
                })
                .transition()
                .ease(d3.easeSin)
                .duration(400)
                .attr("height", function () {
                    return scaleY(10);
                })
                .attr("width", 0.62 * scaleX.bandwidth())
                .attr("fill", "rgb(241,241,241)");

            let elem_idx = d.idx0;  // index when ordered by score
            console.log(key_data)
            key_data.forEach((item, key_idx) => {
                g.append('rect')
                    .attr("class", "brushed")
                    .attr("x", function () {
                        return scaleX(d.country);
                    })
                    .attr("y", () => scaleY(item[elem_idx][0]))
                    .attr("height", function () {
                        return scaleY(item[elem_idx][1] - item[elem_idx][0] + 0.01);
                    })
                    .attr("width", 0.60 * scaleX.bandwidth())
                    .attr('fill', z(key_idx))
            })

            if (vizScale === "region") {
                let offset =  35
                let dtest = d3.max(data.map(d => d.score));
                g.append("text")
                     .attr('class', 'label')
                     .attr("color", "red")
                     .attr("x", scaleX(d.country)+ scaleX.bandwidth()/2)
                     .attr("y", scaleY(dtest) + offset) //+ i%2 * 5
                     .transition()     // adds animation
                     .duration(10)
                     .text(() => {
                         return d.country;
                     })
                     //.attr("transform", "translate("+ scaleX(d.country)+"," + scaleY(dtest) +  + ")")
            }

            d3.selectAll(".label")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .style("text-anchor", "middle")
        }

        function onMapOut() {
            d3.transition()
                .delay(400)
                .duration(400)
                .ease(d3.easeSin)
                .select('#barG').selectAll('.motherfucker')
                .attr("height", 0)
                .remove();

            d3.transition()
                .delay(400)
                .duration(100)
                .ease(d3.easeSin)
                .attr("height", 0)
                .select('#barG').selectAll('.brushed').remove()

            d3.selectAll(".label").transition()     // adds animation
                .duration(10).remove()
        }
    });
};


function prepareData(data){
    data = data.filter(obj => obj.year === data_year);
    if (vizScale == 'region'){
        data = data.filter(obj => obj.region === data_region);
    }
    // adding index
    data.map((d, i) => d.idx0 = i);

    // Defining color sequences
    color_seq.domain([0, data.length]);
    color_seq2.domain([-150, data.length]);

    // Return filtered data
    return data;
}


const changeBarYear = () => {
    data_year = document.getElementById('bar_year').value;
    bar_draw();
};
