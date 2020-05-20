
/* let data = [];
let features = ['A', 'B', 'C', 'D', 'E', 'F'];
// Generate the data
for(let i=0; i < 3; i++) {
    var point = {};
    features.forEach(f => {
        point[f] = 1 + Math.random() * 8;
    });
    data.push(point);
}
let radar_svg = d3.select('body').append('svg')
    .attr('width', 600)
    .attr('height', 600);
let radialScale = d3.scaleLinear()
    .domain([0,10])
    .range([0,250]);
let ticks = [2,4,6,8,10];

ticks.forEach(t => 
    radar_svg.append('circle')
    .attr('cx', 300)
    .attr('cy', 300)
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('r', radialScale(t))
);

ticks.forEach(t => 
    radar_svg.append('text')
    .attr('x', 305)
    .attr('y', 300-radialScale(t))
    .text(t.toString())
);

function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {'x': 300+x, 'y': 300 - y};
}

for(let i=0; i < features.length; i++) {
    let ft_name = features[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    let line_coordinate = angleToCoordinate(angle, 10);
    let label_coordinate = angleToCoordinate(angle, 10.5)
    //draw axis line
    radar_svg.append('line')
        .attr('x1', 300)
        .attr('y1', 300)
        .attr('x2', line_coordinate.x)
        .attr('y2', line_coordinate.y)
        .attr('stroke', 'black');
    // draw axis label
    radar_svg.append('text')
        .attr('x', label_coordinate.x)
        .attr('y', label_coordinate.y)
        .text(ft_name);
}

let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);
let colors = ['darkorange', 'gray', 'navy'];

function getPathCoordinates(data_point){
    let coordinates = [];
    for(let i=0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}

for(let i = 0; i < data.length; i++) {
    let d = data[i];
    let color = colors[i];
    let coordinates = getPathCoordinates(d);
    console.log(coordinates)
    // draw the path element

    radar_svg.append('path')
        .datum(coordinates)
        .attr('d', line)
        .attr('stroke-width', 3)
        .attr('stroke', color )
        .attr('fill', color)
        .attr('stroke-opacity', 1)
        .attr('opacity', 0.5);
}
*/ 


let radarData = [];
let radarSvg = d3.select('body').append('svg')
    .attr('width', 600)
    .attr('height', 600);

let radialScale = d3.scaleLinear()
    .domain([0,1.5])
    .range([0,250]);

let ticks = [0.3, 0.6, 0.9, 1.2, 1.5];

ticks.forEach(t => 
    radarSvg.append('circle')
    .attr('cx', 300)
    .attr('cy', 300)
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('r', radialScale(t))
);

ticks.forEach(t => 
    radarSvg.append('text')
    .attr('x', 305)
    .attr('y', 300 - radialScale(t))
    .text(t.toString())
    );

function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {'x': 300 + x, 'y': 300 - y};
}

d3.csv('./Preprocessing/2015.csv', function(originalData) {
    let dataCopy = originalData;
    console.log(originalData);
    let features = originalData.columns; // gets rid of country(index 1) and region(index 2)
    features = features.slice(5, features.length-1)
    console.log(features);
    radarData = originalData;
    radarData = radarData.map( function (d) {
        return {
            //"Happiness Score": d["Happiness Score"], 
            //"Standard Error": +d["Standard Error"], 
            "Economy (GDP per Capita)": +d["Economy (GDP per Capita)"], 
            "Family": +d["Family"], 
            "Health (Life Expectancy)": +d["Health (Life Expectancy)"], 
            "Freedom": +d["Freedom"], 
            "Trust (Government Corruption)": +d["Trust (Government Corruption)"], 
            "Generosity": +d["Generosity"], 
            //"Dystopia Residual": +d["Dystopia Residual"]
        };
    });
    // data.splice(0, 2);
    console.log('radarData ', radarData);
    for(let i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length) // starts at PI/2 and draws a line for each feature
        let line_coordinate = angleToCoordinate(angle, 1.5);
        let label_coordinate = angleToCoordinate(angle, 1.6);
        
        // draw axis line for each feature

        radarSvg.append('line')
            .attr('x1', 300)
            .attr('y1', 300)
            .attr('x2', line_coordinate.x)
            .attr('y2', line_coordinate.y)
            .attr('stroke', 'black');

        // write the names of the features

        radarSvg.append('text')
            .attr('x', label_coordinate.x)
            .attr('y', label_coordinate.y)
            .text(ft_name);
    }
        // plot the data 

    let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    let colors = ['#F76C03', '#D90368', '#820263', '#291720', '#04A777'];

    function getPathCoordinates(data_point) {
        let coordinates = [];
        for(let i = 0; i < features.length; i++) {
            let ft_name = features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            coordinates.push(angleToCoordinate(angle, data_point[ft_name]))
        }

        return coordinates;
    }

     for(let i = 0; i < 2; i++) {
        let color = colors[i];
        let d = radarData[i];
        let coordinates = getPathCoordinates(d);        
        // draw the path element
        //console.log(coordinates);
        radarSvg.append('path')
            .datum(coordinates)
            .attr('d', line)
            .attr('stroke-width', 3)
            .attr('stroke', color)
            .attr('fill', color)
            .attr('stroke-opacity', 1)
            .attr('opacity', 0.5); 
     }
     


});