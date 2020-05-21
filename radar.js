let radarChosenYear = 2016;
let radarData = [];
/* const radarsvg = d3.select('body').append('svg')
    .attr('width', 600)
    .attr('height', 600); */

    const radarsvg = d3.select('#radar-plot').append('svg')
    .attr('width', 600)
    .attr('height', 600);

let radialScale = d3.scaleLinear()
    .domain([0,1.5])
    .range([0,150]);

let radarTicks = [0.3, 0.6, 0.9, 1.2, 1.5];

let radarChosenName = 0;



function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {'x': 300 + x, 'y': 300 - y};
}

const radarUpdate = () => { // Function that draw the radar chart
    d3.csv('./Preprocessing/finaldf.csv', function(originalData) {
        radarTicks.forEach(t => 
            radarsvg.append('circle')
            .attr('cx', 300)
            .attr('cy', 300)
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('r', radialScale(t))
        );
        
        radarTicks.forEach(t => 
            radarsvg.append('text')
            .attr('x', 305)
            .attr('y', 300 - radialScale(t))
            .text(t.toString())
            );
    
        radarChosenYear = document.querySelector('#map_year').value;
        console.log(radarChosenYear);
    
        //console.log(originalData);
        let features = originalData.columns;
        features = features.slice(5, 10);
        let featureNames = ['Economic production',
                        'Healthy life expectancy',
                        'Freedom',
                        'Generosity',
                        'Absence of corruption'];
        // features = features.slice(5, features.length-1)
        //console.log(features);
        radarData = originalData.filter(d => {
            if(d.year === radarChosenYear.toString())
                return d;
        });

        let radarDataWithNames = radarData;
    
        radarData = radarData.map( function (d) { // This returns an array of objects with only the required metrics
            return {
                "gdp_per_capita": +d.gdp_per_capita, 
                "healthy_life_expectancy": +d.healthy_life_expectancy, 
                "freedom_to_life_choice": +d.freedom_to_life_choice,
                "generosity": +d.generosity, 
                "corruption_perceptions": +d.corruption_perceptions
            };
        });

        function indexToMetricName (countryIndex, metricIndex) {
            if(metricIndex == 0) return radarData[countryIndex]['gdp_per_capita'];
            else if(metricIndex == 1) return radarData[countryIndex]['healthy_life_expectancy'];
            else if(metricIndex == 2) return radarData[countryIndex]['freedom_to_life_choice'];
            else if(metricIndex == 3) return radarData[countryIndex]['generosity'];
            else if(metricIndex == 4) return radarData[countryIndex]['corruption_perceptions'];
            //else if(metricIndex == 5) return radarData[countryIndex][gdp_per_capita];
        }
        // data.splice(0, 2);
        for(let i = 0; i < featureNames.length; i++) {
            let ft_name = featureNames[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / featureNames.length) // starts at PI/2 and draws a line for each feature
            let line_coordinate = angleToCoordinate(angle, 1.5);
            let label_coordinate = angleToCoordinate(angle, 1.7);
            
            // draw axis line for each feature
    
            radarsvg.append('line')
                .attr('x1', 300)
                .attr('y1', 300)
                .attr('x2', line_coordinate.x)
                .attr('y2', line_coordinate.y)
                .attr('stroke', 'black');
    
            // write the names of the features
            if(i==0) {
                radarsvg.append('text')
                    .attr('x', (label_coordinate.x-50))
                    .attr('y', label_coordinate.y)
                    .text(ft_name);
            }
            else if(i==1) {
                radarsvg.append('text')
                    .attr('x', (label_coordinate.x-100))
                    .attr('y', label_coordinate.y)
                    .text(ft_name);
            }
            else if(i==2) {
                radarsvg.append('text')
                    .attr('x', (label_coordinate.x-40))
                    .attr('y', label_coordinate.y)
                    .text(ft_name);
            }
            else if(i==3) {
                radarsvg.append('text')
                    .attr('x', (label_coordinate.x-40))
                    .attr('y', (label_coordinate.y+10))
                    .text(ft_name);
            }
            else if(i==4) {
                radarsvg.append('text')
                    .attr('x', (label_coordinate.x-50))
                    .attr('y', label_coordinate.y)
                    .text(ft_name);
            }
            
        }
            // plot the data 
    
        let line = d3.line()
            .x(d => d.x)
            .y(d => d.y);
        let colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#CA4C93'];
    
        function getPathCoordinates(data_point) {
            let coordinates = [];
            for(let i = 0; i < features.length; i++) {
                let ft_name = features[i];
                let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
                coordinates.push(angleToCoordinate(angle, data_point[ft_name]))
            }
            let angle = (Math.PI / 2);
            let ft_name = features[0];
            coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    
            return coordinates;
        }
    
         for(let i = radarChosenName; i < radarChosenName+1; i++) {
            let color = colors[i];
            let d = radarData[i];
            let coordinates = getPathCoordinates(d);        
            // draw the path element
            radarsvg.append('path')
                .datum(coordinates)
                .attr('d', line)
                .attr('stroke-width', 3)
                .attr('stroke', color)
                .attr('fill', color)
                .attr('stroke-opacity', 1)
                .attr('opacity', 0.5)
                .on('mouseover', function (d) {
                    //this.parentNode.parentNode.appendChild(this.parentNode);//the path group is on the top with in its parent group
                    //this.parentNode.parentNode.parentNode.appendChild(this.parentNode.parentNode);//the parent group is on the top with in its parent group
                    d3.select(this).style('stroke', 'color');
                    d3.select(this).style('opacity', 0.8);
                    
                })
                .on('mouseout', function (d) {
                    d3.select(this).style('stroke', '');
                    d3.select(this).style('opacity', 0.5);
                });
            for(let j = 0; j < features.length; j++) // Add a circle at each point
                    radarsvg.append('circle')
                    .attr('cx', coordinates[j].x)
                    .attr('cy', coordinates[j].y)
                    .attr('r', 2)
                    .attr('fill', color)
                    .attr('stroke', 'black')
                    .on('mouseover', function (d) {
                        console.log(radarDataWithNames[i].country, indexToMetricName(i, j));
                    });
         
         }
         
         
    
    
    });  
}

radarUpdate();
const changeRadarYear = () => {
    console.log("Hello world");
    radarChosenYear = document.querySelector('#map_year');
    //radarChosenCountryIndex = 
    radarUpdate();
}

const changeRadarCountry = () => {
    radarChosenName++;
    d3.selectAll('path').remove();
    d3.selectAll('circle').remove();
    d3.selectAll('text').remove();
    radarUpdate();
    

    
}