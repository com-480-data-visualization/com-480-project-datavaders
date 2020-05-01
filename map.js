// Country names mapping to country codes.
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

let map_year = '2015';

const map_update = () => {
  var svg = null;
  // Create the map.
svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
.scale(70)
.center([0,20])
.translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
.domain([2, 3, 4, 5, 6, 7])
.range(d3.schemeBlues[7]);

// Load external geojson world map as well as preprocessed data from from Preprocessing/finaldf.csv. 
d3.queue()
.defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
.defer(d3.csv, "./Preprocessing/finaldf.csv", function(d) {
  if (d.year === map_year) {
    data.set(map_codes.get(d.country), Number(d.score)); 
  } 
})
.await(ready);

function ready(error, topo) {

// Draw the map
svg.append("g")
  .selectAll("path")
  .data(topo.features)
  .enter()
  .append("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set the color of each country
    .attr("fill", function (d) {
      d.total = data.get(d.id) || 0;
      return colorScale(d.total);
    });
  }
}

map_update();

changeMapYear = () => {
  map_year = document.getElementById('map_year').value;
  map_update();
}


