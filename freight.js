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

export const drawFreight = (countries, start = 0, end = 122) => {
  const departures = countries.filter(
    (country) => country["Series Code"] === "IS.AIR.GOOD.MT.K1"
  );

  const cleanDepartures = [];
  departures.forEach((country, index) => {
    let numberOfData = 0;
    for (const property in country) {
      if (typeof country[property] === "number") {
        numberOfData++;
      }
    }
    if (numberOfData === 15) {
      const data = {
        label: country["Country Name"],
        data: [
          country["2005 [YR2005]"],
          country["2006 [YR2006]"],
          country["2007 [YR2007]"],
          country["2008 [YR2008]"],
          country["2009 [YR2009]"],
          country["2010 [YR2010]"],
          country["2011 [YR2011]"],
          country["2012 [YR2012]"],
          country["2013 [YR2013]"],
          country["2014 [YR2014]"],
          country["2015 [YR2015]"],
          country["2016 [YR2016]"],
          country["2017 [YR2017]"],
          country["2018 [YR2018]"],
          country["2019 [YR2019]"],
        ],
        borderColor: getRandomColor(),
        fill: false,
      };
      cleanDepartures.push(data);
    }
  });
  console.log(cleanDepartures);

  let onlyCountries = cleanDepartures
    .slice(0, 110)
    .sort((c1, c2) =>
      c1.data[14] < c2.data[14] ? 1 : c1.data[14] > c2.data[14] ? -1 : 0
    )
    .slice(start, end);

  let biggestGrowth = {
    contry: "",
    percent: 0,
  };

  onlyCountries.forEach((el) => {
    let percent = (100 * el.data[14]) / el.data[0];
    if (percent > biggestGrowth.percent) {
      biggestGrowth = {
        contry: el.label,
        percent,
      };
    }
  });
  console.log("biggest growth", biggestGrowth);

  return new Chart(document.getElementById("line-chart-freight"), {
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
