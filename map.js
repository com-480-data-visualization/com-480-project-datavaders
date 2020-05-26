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
  ['South Korea', 'KOR'],
  ['South Sudan', 'SDS'],
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

flag_codes = {
  AFG: "AF",
  ALA: "AX",
  ALB: "AL",
  DZA: "DZ",
  ASM: "AS",
  AND: "AD",
  AGO: "AO",
  AIA: "AI",
  ATA: "AQ",
  ATG: "AG",
  ARG: "AR",
  ARM: "AM",
  ABW: "AW",
  AUS: "AU",
  AUT: "AT",
  AZE: "AZ",
  BHS: "BS",
  BHR: "BH",
  BGD: "BD",
  BRB: "BB",
  BLR: "BY",
  BEL: "BE",
  BLZ: "BZ",
  BEN: "BJ",
  BMU: "BM",
  BTN: "BT",
  BOL: "BO",
  BIH: "BA",
  BWA: "BW",
  BVT: "BV",
  BRA: "BR",
  VGB: "VG",
  IOT: "IO",
  BRN: "BN",
  BGR: "BG",
  BFA: "BF",
  BDI: "BI",
  KHM: "KH",
  CMR: "CM",
  CAN: "CA",
  CPV: "CV",
  CYM: "KY",
  CAF: "CF",
  TCD: "TD",
  CHL: "CL",
  CHN: "CN",
  HKG: "HK",
  MAC: "MO",
  CXR: "CX",
  CCK: "CC",
  COL: "CO",
  COM: "KM",
  COG: "CG",
  COD: "CD",
  COK: "CK",
  CRI: "CR",
  CIV: "CI",
  HRV: "HR",
  CUB: "CU",
  CYP: "CY",
  CZE: "CZ",
  DNK: "DK",
  DJI: "DJ",
  DMA: "DM",
  DOM: "DO",
  ECU: "EC",
  EGY: "EG",
  SLV: "SV",
  GNQ: "GQ",
  ERI: "ER",
  EST: "EE",
  ETH: "ET",
  FLK: "FK",
  FRO: "FO",
  FJI: "FJ",
  FIN: "FI",
  FRA: "FR",
  GUF: "GF",
  PYF: "PF",
  ATF: "TF",
  GAB: "GA",
  GMB: "GM",
  GEO: "GE",
  DEU: "DE",
  GHA: "GH",
  GIB: "GI",
  GRC: "GR",
  GRL: "GL",
  GRD: "GD",
  GLP: "GP",
  GUM: "GU",
  GTM: "GT",
  GGY: "GG",
  GIN: "GN",
  GNB: "GW",
  GUY: "GY",
  HTI: "HT",
  HMD: "HM",
  VAT: "VA",
  HND: "HN",
  HUN: "HU",
  ISL: "IS",
  IND: "IN",
  IDN: "ID",
  IRN: "IR",
  IRQ: "IQ",
  IRL: "IE",
  IMN: "IM",
  ISR: "IL",
  ITA: "IT",
  JAM: "JM",
  JPN: "JP",
  JEY: "JE",
  JOR: "JO",
  KAZ: "KZ",
  KEN: "KE",
  KIR: "KI",
  PRK: "KP",
  KOR: "KR",
  KWT: "KW",
  KGZ: "KG",
  LAO: "LA",
  LVA: "LV",
  LBN: "LB",
  LSO: "LS",
  LBR: "LR",
  LBY: "LY",
  LIE: "LI",
  LTU: "LT",
  LUX: "LU",
  MKD: "MK",
  MDG: "MG",
  MWI: "MW",
  MYS: "MY",
  MDV: "MV",
  MLI: "ML",
  MLT: "MT",
  MHL: "MH",
  MTQ: "MQ",
  MRT: "MR",
  MUS: "MU",
  MYT: "YT",
  MEX: "MX",
  FSM: "FM",
  MDA: "MD",
  MCO: "MC",
  MNG: "MN",
  MNE: "ME",
  MSR: "MS",
  MAR: "MA",
  MOZ: "MZ",
  MMR: "MM",
  NAM: "NA",
  NRU: "NR",
  NPL: "NP",
  NLD: "NL",
  ANT: "AN",
  NCL: "NC",
  NZL: "NZ",
  NIC: "NI",
  NER: "NE",
  NGA: "NG",
  NIU: "NU",
  NFK: "NF",
  MNP: "MP",
  NOR: "NO",
  OMN: "OM",
  PAK: "PK",
  PLW: "PW",
  PSE: "PS",
  PAN: "PA",
  PNG: "PG",
  PRY: "PY",
  PER: "PE",
  PHL: "PH",
  PCN: "PN",
  POL: "PL",
  PRT: "PT",
  PRI: "PR",
  QAT: "QA",
  REU: "RE",
  ROU: "RO",
  RUS: "RU",
  RWA: "RW",
  BLM: "BL",
  SHN: "SH",
  KNA: "KN",
  LCA: "LC",
  MAF: "MF",
  SPM: "PM",
  SDS: "SS",
  VCT: "VC",
  WSM: "WS",
  SMR: "SM",
  STP: "ST",
  SAU: "SA",
  SEN: "SN",
  SRB: "RS",
  SYC: "SC",
  SLE: "SL",
  SGP: "SG",
  SVK: "SK",
  SVN: "SI",
  SLB: "SB",
  SOM: "SO",
  ZAF: "ZA",
  SGS: "GS",
  SSD: "SS",
  ESP: "ES",
  LKA: "LK",
  SDN: "SD",
  SUR: "SR",
  SJM: "SJ",
  SWZ: "SZ",
  SWE: "SE",
  CHE: "CH",
  SYR: "SY",
  TWN: "TW",
  TJK: "TJ",
  TZA: "TZ",
  THA: "TH",
  TLS: "TL",
  TGO: "TG",
  TKL: "TK",
  TON: "TO",
  TTO: "TT",
  TUN: "TN",
  TUR: "TR",
  TKM: "TM",
  TCA: "TC",
  TUV: "TV",
  UGA: "UG",
  UKR: "UA",
  ARE: "AE",
  GBR: "GB",
  USA: "US",
  UMI: "UM",
  URY: "UY",
  UZB: "UZ",
  VUT: "VU",
  VEN: "VE",
  VNM: "VN",
  VIR: "VI",
  WLF: "WF",
  ESH: "EH",
  YEM: "YE",
  ZMB: "ZM",
  ZWE: "ZW",
  XKX: "XK"
};

// Map storing country code/country names pairs.
let map_names = new Map();
for (let [name, code] of map_codes.entries()) {
  map_names.set(code, name);
}

// Helper function to lighten color tones upon mouseover.
const map_lighten = (color, factor) => {
  return `rgba${color.slice(3, -1)}, ${factor})`;
}

// Initialize the default year.
let map_selectedYear = '2019';

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
let map_colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([7.8,2]).clamp(true);

// Set the tooltip.
let map_tooltip = d3.select(".map_tooltip");

// Update the map based on the currently selected data.
const map_update = () => {

  // Load geojson and csv data.
  d3.queue()
    .defer(d3.json, "world.geojson")
    .defer(d3.csv, `./Preprocessing/finaldf.csv`, function(d) {
      if (d.year === map_selectedYear) {
        map_data.set(map_codes.get(d.country), Number(d.score));
      }
    })
    .await(ready);

  function ready(error, topo) {
    if (error) throw error;

    // Draw the map.
    map_svg.append("g")
      .attr("class", "countries")
      .attr('transform', `translate(-88,0)`)
      .selectAll("path")
      .data(topo.features)
      .enter().append("path")
      .attr("fill", function(d) {

        // Set the color based on the country data.
        return map_colorScale(map_data.get(d.id) || 0);
      })
      .on("mouseover",function(d) {

        // Lighten color and change cursor to pointer upon mouseover of a country with data.
        if (map_data.get(d.id)) {
          d3.select(this).attr("fill", map_lighten(map_colorScale(map_data.get(d.id)), 0.8))
            .style("cursor", "pointer");

          // Update radar graph with country.
          radar_onMapMouseover(map_names.get(d.id));
          document.querySelector('#map-tooltip').innerHTML = map_names.get(d.id) + '<br>' + 'Happiness score: ' + map_data.get(d.id);

          display_onMouseover(flag_codes[d.id]);
  


          bar_update("mapHover", map_names.get(d.id));
        }
      })
      .on("mouseout",function(d) {
        // Reset color to original tone.
        d3.select(this).attr("fill", map_colorScale(map_data.get(d.id) || 0))
        document.querySelector('#map-tooltip').innerHTML = '';

        // Update radar graph by removing country.
        radar_onMapMouseout(map_names.get(d.id));

        display_onMouseout();

        bar_update("mapOut", map_names.get(d.id));

      })
      .on("click", function(d) {
        if (map_data.get(d.id)) {

            bar_update('mapClick',map_names.get(d.id))
          // Update radar graph with country.
          radar_onMapClick(map_names.get(d.id));
        }
      })
      .attr("d", map_path);
  }
}

// First update map upon initial page load.
map_update();

// Subsequently update map whenever year is changed.
const map_changeYear = () => {
  map_selectedYear = document.getElementById('year').value;
  map_update();
  scatter_changeYear();
  bar_changeYear(map_selectedYear);
  radar_changeYear(map_selectedYear);
}

// Hide the scatter and show the map.
const map_show = () => {
  document.getElementById('scatter').classList.add('hide');
  document.getElementById('map').classList.remove('hide');
  document.getElementById('map-tooltip').classList.remove('hide');
}
