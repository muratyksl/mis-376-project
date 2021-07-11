import "./style.css";
import countries from "./data";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import { drawNumberofDepartures } from "./numberOfDepartures";
import { drawFreight } from "./freight";
import { drawPassenger } from "./passenger";
import { drawLogistics } from "./logisticsPerformance";

//registered carrier departures worldwide

let departureChart = drawNumberofDepartures(countries);
let freightChart = drawFreight(countries);
let passengerChart = drawPassenger(countries);
let logisticsChart = drawLogistics(countries);

const startInput = document.getElementById("start-number");
const endInput = document.getElementById("end-number");
const numberButton = document.getElementById("number-button");

numberButton.addEventListener("click", (e) => {
  e.preventDefault();
  let start = Number(startInput.value);
  let end = Number(endInput.value);
  console.log("start end ", { start, end });
  departureChart.destroy();
  departureChart = drawNumberofDepartures(countries, start, end);
  freightChart.destroy();
  freightChart = drawFreight(countries, start, end);
  passengerChart.destroy();
  passengerChart = drawFreight(countries, start, end);
  logisticsChart.destroy();
  logisticsChart = drawFreight(countries, start, end);
});
