import moment from "moment/min/moment-with-locales";

const Chartist = require("chartist");
moment.locale("ru");


export const getLabels = (counts, subtractInfo, format) => {
  return new Array(counts)
    .fill()
    .map((_, idx) => moment().subtract(idx, subtractInfo).format(format))
    .reverse();
};

export const getPropFromArrayObject = (arr, prop) => arr.map(el => el[prop]);

export const getCharts = (options) => {
  const {
    delays = 80,
    durations = 500,
    series = [options.series],
    labels = options.labels
  } = options;
  return {
    data: {
      // labels: ["M", "T", "W", "T", "F", "S", "S"],
      labels: labels,
      series: [series]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: Math.max(...series) * 1.5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };
};

export const getSliceRevers = (arr, start, end) => arr.slice(start, end).reverse();

export const chartButtonType = {
  'days': 1
};
