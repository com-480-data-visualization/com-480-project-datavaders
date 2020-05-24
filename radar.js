/*
  Radar graph component.
*/

// Variables tracking currently selected year and country and data to be displayed.
let radar_selectedCountry = null;
let radar_selectedYear = '2019';

// Bind the svg to the html element.
const radarsvg = d3.select('#radar-plot').append('svg')
  .attr('width', 600)
  .attr('height', 600);

// Initialized data values for each feature.
let radarAverageData = {
    'gdp_per_capita': 0,
    'healthy_life_expectancy': 0,
    'freedom_to_life_choice': 0,
    'generosity': 0,
    'corruption_perceptions': 0
};

// Helper function to convert a given angle and value to 
// (x, y) coordinate pairs on the graph.
const radar_angleToCoordinate = (angle, value) => {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {'x': 300 + x, 'y': 300 - y};
}

// List of feature names.
radar_FeatureNames = [
    'Economic production',
    'Healthy life expectancy',
    'Freedom',
    'Generosity',
    'Absence of corruption',
];

// Set the scale circles.
let radialScale = d3.scaleLinear()
  .domain([-5, 5])
  .range([0, 200]);

let radarTicks = [-5, -2.5, 0, 2.5, 5];

radarTicks.forEach(t => 
  radarsvg.append('circle')
  .attr('cx', 300)
  .attr('cy', 300)
  .attr('fill', 'none')
  .attr('stroke', 'gray')
  .attr('r', radialScale(t))
);
 
// Add labels to the scale.
radarTicks.forEach(t => 
  radarsvg.append('text')
  .attr('x', 305)
  .attr('y', 300 - radialScale(t))
  .text(t.toString())
  );

for (let i = 0; i < 5; i++) {
  let radar_featureName = radar_FeatureNames[i];
  let radar_angle = (Math.PI / 2) + (2 * Math.PI * i / 5) // starts at PI/2 and draws a line for each feature
  let radar_lineCoordinate = radar_angleToCoordinate(radar_angle, 5);
  let radar_labelCoordinate = radar_angleToCoordinate(radar_angle, 6);
  
  // Draw axis line for each feature.
  radarsvg.append('line')
  .attr('x1', 300)
  .attr('y1', 300)
  .attr('x2', radar_lineCoordinate.x)
  .attr('y2', radar_lineCoordinate.y)
  .attr('stroke', 'black');

  // Write the label for each feature.
  switch(i) {
    case 0:
      radarsvg.append('text')
        .attr('x', (radar_labelCoordinate.x-50))
        .attr('y', radar_labelCoordinate.y)
        .text(radar_featureName);
        break;
    case 1:
      radarsvg.append('text')
        .attr('x', (radar_labelCoordinate.x-80))
        .attr('y', radar_labelCoordinate.y)
        .text(radar_featureName);
        break;
    case 2:
      radarsvg.append('text')
        .attr('x', (radar_labelCoordinate.x-40))
        .attr('y', radar_labelCoordinate.y + 20)
        .text(radar_featureName);
        break;
    case 3:
      radarsvg.append('text')
        .attr('x', (radar_labelCoordinate.x-40))
        .attr('y', (radar_labelCoordinate.y+10))
        .text(radar_featureName);
        break;
    case 4:
      radarsvg.append('text')
        .attr('x', (radar_labelCoordinate.x-70))
        .attr('y', radar_labelCoordinate.y)
        .text(radar_featureName);
        break;
  }
}

var sequentialScale = d3.scaleSequential()
    .domain([0, 3])
    .interpolator(d3.interpolateCool);

// Update the radar graph based on the currently selected data.
const radarUpdate = () => {

    

  d3.csv('./Preprocessing/finaldfNormalized.csv', function(originalData) {
       
    // Slice only the columns that correspond to features.
    let features = originalData.columns.slice(5, 10);

    // Filter data based on currently selected year.
    let radar_data = originalData.filter(d => {
      if(d.year === radar_selectedYear) {
        return d;
      }
    });

    let radar_CountryNames = radar_data.map(d => d.country).sort();
    //console.log(radar_CountryNames);

/*     var select = document.getElementById("mselect"); 
    for(var i = 0; i < radar_CountryNames.length; i++) {
      // console.log("<option value='" + radar_CountryNames[i] + "'>" + radar_CountryNames[i] + "</option>")
      var opt = radar_CountryNames[i];
      var el = document.createElement("option");
      //el.text = opt;
      el.value = opt;
      select.add(el);
  } */

    // Plot the data.
    let line = d3.line()
      .x(d => d.x)
      .y(d => d.y);
    let colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#CA4C93'];
  
    // If a country has been clicked, find its specific data; otherwise, use the average data.
    let radar_dataToPlot = radar_selectedCountry !== null 
    ? radar_data.find( obj => obj.country === radar_selectedCountry.toString()) 
    : radarAverageData;
    //console.log(radar_dataToPlot);
      
    // Find the coordinates of the pentagon given the data.
    const getPathCoordinates = (dataPoint) => {
      console.log('In getPathCoord')
      let coordinates = [];
      for(let i = 0; i < features.length; i++) {
        let featureName = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        
        coordinates.push(radar_angleToCoordinate(angle, dataPoint[featureName]))
      }
      let angle = (Math.PI / 2);
      let featureName = features[0];
      coordinates.push(radar_angleToCoordinate(angle, dataPoint[featureName]));
      return coordinates;
    }

    //let coordinates = getPathCoordinates(radar_dataToPlot);   
    var radar_dropDownSelected = [];
    for (var option of document.getElementById('mselect').options) {
      if (option.selected) {
        radar_dropDownSelected.push(option.value);
      }
      else {
        radar_dropDownSelected = radar_dropDownSelected.filter(d => d.country !== option.value);
      }
    }
    
    console.log(radar_dropDownSelected);
    
    // Get the data of the drop-down selected countries
    let radar_dropDownData = [];
    for(let i=0; i < radar_dropDownSelected.length; i++) {
        //console.log(radar_data);
        radar_data.forEach(d => {
          if(d.country === radar_dropDownSelected[i]) {
            radar_dropDownData.push(d);
            console.log(d);
          }
        })
    }
    console.log(radar_dropDownData);

    radar_dropDownData.forEach(d => {
      d.gdp_per_capita = +d.gdp_per_capita;
      d.healthy_life_expectancy = +d.healthy_life_expectancy;
      d.freedom_to_life_choice = +d.freedom_to_life_choice;
      d.generosity = +d.generosity;
      d.corruption_perceptions = +d.corruption_perceptions;
    })

    radar_dataToPlot.gdp_per_capita = +radar_dataToPlot.gdp_per_capita;
    radar_dataToPlot.healthy_life_expectancy = +radar_dataToPlot.healthy_life_expectancy;
    radar_dataToPlot.freedom_to_life_choice = +radar_dataToPlot.freedom_to_life_choice;
    radar_dataToPlot.generosity = +radar_dataToPlot.generosity;
    radar_dataToPlot.generosity = +radar_dataToPlot.generosity;
    radar_dataToPlot.corruption_perceptions = +radar_dataToPlot.corruption_perceptions;
    
    // Draw the pentagon based on the given data.
    let coordinates = [];
    coordinates.push(getPathCoordinates(radar_dataToPlot));
    console.log(coordinates);
    for(let i=0; i < radar_dropDownData.length; i++) {
      coordinates.push(getPathCoordinates(radar_dropDownData[i]))
    }

    console.log(coordinates);
    for(let i=0; i < coordinates.length; i++) {
      //coordinates.push(getPathCoordinates(radar_dropDownData[i]));
      //console.log(radar_dropDownData);
      //coordinates.push(getPathCoordinates(radar_dropDownData[i]));
      //console.log(coordinates);
      //console.log('Map', radar_dataToPlot.forEach);
      //console.log(radar_dataToPlot)
      //if(radar_dataToPlot !== undefined)
        //coordinates.push(getPathCoordinates(radar_dataToPlot));
      //coordinates.push(getPathCoordinates(radar_dataToPlot));
      radarsvg.append('path')
        .datum(coordinates[i])
        .attr('d', line)
        .attr('stroke-width', 3)
        .attr('stroke', sequentialScale(i))
        .attr('fill', sequentialScale(i))
        .attr('stroke-opacity', 1)
        .attr('opacity', 0.2)
        .on('mouseover', function (d) {
          d3.select(this).style('stroke', 'color');
          d3.select(this).style('opacity', 0.8);  
        })
        .on('mouseout', function (d) {
          d3.select(this).style('stroke', '');
          d3.select(this).style('opacity', 0.2);
        });

      // Add a circle at each point of the pentagon.
      for(let j = 0; j < features.length; j++) {
        radarsvg.append('circle')
          .attr('cx', coordinates[i][j].x)
          .attr('cy', coordinates[i][j].y)
          .attr('r', 2)
          .attr('fill', 'blue')
          .attr('stroke', 'black')
          .attr('class', 'radar_points')
      }
  }


    
    
  });  
}

// First update radar graph upon initial page load.
radarUpdate();

// Subsequently update map whenever year is changed.
const changeRadarYear = () => {
    d3.select('#radar-plot').selectAll('path').remove();
    d3.selectAll('.radar_points').remove();
    radar_selectedYear = document.getElementById('map_year').value;
    console.log(radar_selectedYear);
    radarUpdate();
}

// Subsequently update map whenever country is changed.
const changeRadarCountry = (country) => {
    d3.select('#radar-plot').selectAll('path').remove();
    d3.selectAll('.radar_points').remove();
    radar_selectedCountry = typeof country === 'string' ? country : 'Serbia';
    radarUpdate();  
}

// const addCountryToRada