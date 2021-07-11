import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const drawLogistics = (countries, start = 0, end = 122) => {
  const departures = countries.filter(
    (country) => country["Series Code"] === "LP.LPI.INFR.XQ"
  );

  const cleanDepartures = [];
  departures.forEach((country, index) => {
    let numberOfData = 0;
    const data = {
      label: country["Country Name"],
      data: [],
      borderColor: getRandomColor(),
      fill: false,
    };
    for (const property in country) {
      if (typeof country[property] === "number") {
        data.data.push(country[property]);
      }
      if (country[property] === "..") {
        data.data.push(null);
      }
    }

    cleanDepartures.push(data);
  });
  console.log(cleanDepartures);

  let onlyCountries = cleanDepartures.slice(start, end);

  let biggestGrowth = {
    contry: "",
    percent: 0,
  };

  onlyCountries.forEach((el) => {
    if (el.data[el.data.length - 2] && el.data[2]) {
      let percent = (100 * el.data[el.data.length - 2]) / el.data[2];
      if (percent > biggestGrowth.percent) {
        biggestGrowth = {
          contry: el.label,
          percent,
        };
      }
    }
  });
  console.log("biggest growth", biggestGrowth);

  return new Chart(document.getElementById("line-chart-logistics"), {
    type: "line",
    data: {
      labels: [
        2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
        2017, 2018, 2019,
      ],
      datasets: [...onlyCountries],
    },
    options: {
      title: {
        display: true,
        text: "Air transport, registered carrier departures worldwide",
      },
    },
  });
};
