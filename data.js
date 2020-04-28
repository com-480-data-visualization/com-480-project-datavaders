// Load preprocessed data from Preprocessing/finaldf.csv, then print it to the console.

d3.csv("./Preprocessing/finaldf.csv", (data) => {
  console.log(data);
});