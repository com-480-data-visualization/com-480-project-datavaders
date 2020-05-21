/*
  Chloropleth map component.
*/

// Map storing country name/country code pairs.
let map_codes = new Map([
  ['Antigua and Barbuda', 'ATG'],
  ['Algeria', 'DZA'],
  ['Azerbaijan', 'AZE'],
  ['Albania', 'ALB'],
  ['Armenia','ARM'],
  ['Angola','AGO'],
  ['American Samoa','ASM'],
  ['Argentina','ARG'],
  ['Australia','AUS'],
  ['Bahrain','BHR'],
  ['Barbados','BRB'],
  ['Bermuda','BMU'],
  ['Bahamas','BHS'],
  ['Bangladesh','BGD'],
  ['Belize','BLZ'],
  ['Bosnia and Herzegovina','BIH'],
  ['Bolivia','BOL'],
  ['Myanmar','MMR'],
  ['Benin','BEN'],
  ['Solomon Islands','SLB'],
  ['Brazil','BRA'],
  ['Bulgaria','BGR'],
  ['Brunei Darussalam','BRN'],
  ['Canada','CAN'],
  ['Cambodia','KHM'],
  ['Sri Lanka','LKA'],
  ['Congo (Brazzaville)','COG'],
  ['Congo (Kinshasa)','COD'],
  ['Burundi','BDI'],
  ['China','CHN'],
  ['Afghanistan','AFG'],
  ['Bhutan','BTN'],
  ['Chile','CHL'],
  ['Cayman Islands','CYM'],
  ['Cameroon','CMR'],
  ['Chad', 'TCD'],
  ['Comoros', 'COM'],
  ['Colombia', 'COL'],
  ['Costa Rica', 'CRI'],
  ['Central African Republic', 'CAF'],
  ['Cuba',' CUB'],
  ['Cape Verde', 'CPV'],
  ['Cook Islands', 'COK'],
  ['Cyprus', 'CYP'],
  ['Denmark', 'DNK'],
  ['Djibouti', 'DJI'],
  ['Dominica', 'DMA'],
  ['Dominican Republic', 'DOM'],
  ['Ecuador', 'ECU'],
  ['Egypt', 'EGY'],
  ['Ireland', 'IRL'],
  ['Equatorial Guinea', 'GNQ'],
  ['Estonia', 'EST'],
  ['Eritrea', 'ERI'],
  ['El Salvador', 'SLV'],
  ['Ethiopia', 'ETH'],
  ['Austria', 'AUT'],
  ['Czech Republic', 'CZE'],
  ['French Guiana', 'GUF'],
  ['Finland', 'FIN'],
  ['Fiji', 'FJI'],
  ['France', 'FRA'],
  ['Gambia', 'GMB'],
  ['Gabon', 'GAB'],
  ['Georgia', 'GEO'],
  ['Ghana', 'GHA'],
  ['Grenada', 'GRD'],
  ['Greenland', 'GRL'],
  ['Germany', 'DEU'],
  ['Guam', 'GUM'],
  ['Greece', 'GRC'],
  ['Guatemala', 'GTM'],
  ['Guinea', 'GIN'],
  ['Guyana', 'GUY'],
  ['Haiti', 'HTI'],
  ['Honduras', 'HND'],
  ['Croatia', 'HRV'],
  ['Hungary', 'HUN'],
  ['Iceland', 'ISL'],
  ['India', 'IND'],
  ['Iran', 'IRN'],
  ['Israel', 'ISR'],
  ['Italy', 'ITA'],
  ["Ivory Coast", 'CIV'],
  ['Iraq', 'IRQ'],
  ['Japan', 'JPN'],
  ['Jamaica', 'JAM'],
  ['Jordan', 'JOR'],
  ['Kenya', 'KEN'],
  ['Kyrgyzstan', 'KGZ'],
  ['North Korea', 'PRK'],
  ['Kiribati', 'KIR'],
  ['South Korea', ,'KOR'],
  ['Kuwait', 'KWT'],
  ['Kazakhstan', 'KAZ'],
  ['Laos', 'LAO'],
  ['Lebanon', 'LBN'], 
  ['Latvia', 'LVA'], 
  ['Belarus', 'BLR'], 
  ['Lithuania', 'LTU'], 
  ['Liberia', 'LBR'], 
  ['Slovakia', 'SVK'], 
  ['Liechtenstein', 'LIE'], 
  ['Libya', 'LBY'], 
  ['Madagascar', 'MDG'], 
  ['Martinique', 'MTQ'], 
  ['Mongolia', 'MNG'], 
  ['Montserrat', 'MSR'], 
  ['Macedonia', 'MKD'], 
  ['Mali', 'MLI'], 
  ['Morocco', 'MAR'], 
  ['Mauritius', 'MUS'], 
  ['Mauritania', 'MRT'], 
  ['Malta', 'MLT'], 
  ['Oman', 'OMN'], 
  ['Maldives', 'MDV'], 
  ['Mexico', 'MEX'], 
  ['Malaysia', 'MYS'], 
  ['Mozambique', 'MOZ'], 
  ['Malawi', 'MWI'], 
  ['New Caledonia', 'NCL'],
  ['Niue', 'NIU'], 
  ['Niger', 'NER'], 
  ['Aruba', 'ABW'], 
  ['Anguilla', 'AIA'], 
  ['Belgium', 'BEL'], 
  ['Hong Kong', 'HKG'], 
  ['Faroe Islands', 'FRO'], 
  ['Andorra', 'AND'], 
  ['Gibraltar', 'GIB'],
  ['Isle of Man', 'IMN'], 
  ['Luxembourg', 'LUX'], 
  ['Macau', 'MAC'], 
  ['Monaco', 'MCO'], 
  ['Palestinian Territories','PSE'],
  ['Montenegro' ,'MNE'], 
  ['Vanuatu','VUT'],
  ['Nigeria','NGA'],
  ['Netherlands','NLD'],
  ['Norway','NOR'],
  ['Nepal','NPL'],
  ['Nauru','NRU'],
  ['Suriname','SUR'],
  ['Nicaragua','NIC'],
  ['New Zealand','NZL'],
  ['Paraguay','PRY'],
  ['Peru','PER'],
  ['Pakistan','PAK'],
  ['Poland','POL'],
  ['Panama','PAN'],
  ['Portugal','PRT'],
  ['Papua New Guinea','PNG'],
  ['Guinea-Bissau','GNB'],
  ['Qatar','QAT'],
  ['Reunion','REU'],
  ['Romania','ROU'],
  ['Moldova','MDA'],
  ['Philippines','PHL'],
  ['Puerto Rico','PRI'],
  ['Russia','RUS'],
  ['Rwanda','RWA'],
  ['Saudi Arabia','SAU'],
  ['Saint Kitts and Nevis','KNA'],
  ['Seychelles','SYC'],
  ['South Africa','ZAF'],
  ['Lesotho','LSO'],
  ['Botswana','BWA'],
  ['Senegal','SEN'],
  ['Slovenia','SVN'],
  ['Sierra Leone','SLE'],
  ['Singapore','SGP'],
  ['Somalia','SOM'],
  ['Spain','ESP'],
  ['Saint Lucia','LCA'],
  ['Sudan','SDN'],
  ['Sweden','SWE'],
  ['Syria','SYR'],
  ['Switzerland','CHE'],
  ['Trinidad and Tobago','TTO'],
  ['Thailand','THA'],
  ['Tajikistan','TJK'],
  ['Tokelau','TKL'],
  ['Tonga','TON'],
  ['Togo','TGO'],
  ['Sao Tome and Principe','STP'],
  ['Tunisia','TUN'],
  ['Turkey','TUR'],
  ['Tuvalu','TUV'],
  ['Turkmenistan','TKM'],
  ['Tanzania','TZA'],
  ['Uganda','UGA'],
  ['United Kingdom','GBR'],
  ['Ukraine','UKR'],
  ['United States','USA'],
  ['Burkina Faso','BFA'],
  ['Uruguay','URY'],
  ['Uzbekistan','UZB'],
  ['Saint Vincent and the Grenadines','VCT'],
  ['Venezuela','VEN'],
  ['British Virgin Islands','VGB'],
  ['Vietnam', 'VNM'],
  ['United States Virgin Islands', 'VIR'] ,
  ['Namibia', 'NAM'],
  ['Samoa', 'WSM'] ,
  ['Swaziland', 'SWZ'],
  ['Yemen', 'YEM'],
  ['Zambia', 'ZMB'], 
  ['Zimbabwe', 'ZWE'], 
  ['Indonesia', 'IDN'], 
  ['United Arab Emirates', 'ARE'],
  ['San Marino', 'SMR'],
  ['Serbia', 'SRB'],
  ['Taiwan', 'TWN']
]);

// Helper function to lighten color tones upon mouseover.
// TODO: Adjust this if color schemes are adjusted.
const lighten = (color) => {
  switch (color) {
    case '#eff3ff':
      return '#fcfdff'
    case '#c6dbef':
      return 'eff5fb'
    case '#9ecae1':
      return '#c4dfed'
    case '#6baed6':
      return '#93c5e1'
    case '#4292c6':
      return '#6aa9d2'
    case '#2171b5':
      return '#308ad9'
    case '#084594':
      return '#0a5cc7'
  }
}

// Initialize the default year.
let map_year = '2019';

// Bind the svg to the html element.
let map_svg = d3.select("#map"),
map_width = +map_svg.attr("width"),
map_height = +map_svg.attr("height");
 
// Set the map dimensions.
let map_projection = d3.geoNaturalEarth()
  .scale(map_width / 2 / Math.PI)
  .translate([map_width / 2, map_height / 2])
let map_path = d3.geoPath()
  .projection(map_projection);
 
// Set the color scale.
let map_data = d3.map();
let colorScheme = d3.schemeBlues[7];
colorScheme.unshift("#eee")
let colorScale = d3.scaleThreshold()
  .domain([1, 2, 3, 4, 5, 6, 7])
  .range(colorScheme);
 
// Set the legend.
let map_g = map_svg.append("g")
  .attr("class", "legendThreshold")
  .attr("transform", "translate(20,50)");
map_g.append("text")
  .attr("class", "caption")
  .attr("x", 0)
  .attr("y", -6)
  .text("Happiness Score");
let map_labels = ['N/A', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '>7'];
let map_legend = d3.legendColor()
  .labels(function (d) { return map_labels[d.i]; })
  .shapePadding(4)
  .scale(colorScale);
map_svg.select(".legendThreshold")
  .call(map_legend);

// Set the tooltip.
let map_tooltip = d3.select(".map_tooltip");

// Update the map based on the currently selected data.
const map_update = () => {

  // Load geojson and csv data.
  d3.queue()
    .defer(d3.json, "https://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, `./Preprocessing/finaldf.csv`, function(d) { 
      if (d.year === map_year) {
        map_data.set(map_codes.get(d.country), Number(d.score)); 
      }
    })
    .await(ready);

  function ready(error, topo) {
    if (error) throw error;

    // Draw the map.
    map_svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(topo.features)
      .enter().append("path")
      .attr("fill", function(d) {
        
        // Pull data for the given country.
        d.total = map_data.get(d.id) || 0;
    
        // Set the color based on the country data.
        return colorScale(d.total);
      })
      .on("mouseover",function(d) {

        // Lighten color and change cursor to pointer upon mouseover of a country with data.
        if (map_data.get(d.id)) {
          d3.select(this).attr("fill", lighten(colorScale(map_data.get(d.id))))
            .style("cursor", "pointer");
        }
      })
      .on("mouseout",function(d) {
        
        // Reset color to original tone.
        d3.select(this).attr("fill", colorScale(map_data.get(d.id) || 0))
      })
      .on("click", function(d) {

        // TODO: Linking code to other visuals to go here - alert message is a placeholder.
        alert(`Clicked on ${d.id}!`);
      })
      .attr("d", map_path);
  }
}

// First update map upon initial page load.
map_update();

// Subsequently update map whenever year is changed.
const changeMapYear = () => {
  map_year = document.getElementById('map_year').value;
  map_update();
}


