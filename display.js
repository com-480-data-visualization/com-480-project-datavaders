/*
  Display component.
*/

let display_info = document.getElementById('country-info');

display_onMouseover = (code) => {
  let img = document.createElement('img');
  img.src = `flags/${code.toLowerCase()}.png`;
  console.log(svg);
  display_info.appendChild(img);
}

display_onMouseout = () => {
  display_info.removeChild(display_info.firstChild);
}