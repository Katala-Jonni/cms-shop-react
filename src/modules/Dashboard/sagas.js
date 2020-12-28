import { fork, takeLatest, put, call } from "redux-saga/effects";
import { endChart, endDashboard, startChart, startChartOrder, startDashboard } from "./actions";
import {
  revenue,
  order,
  filterNewOrder,
  formatDate,
  sortDate,
  formatDateWeekAndMonth,
  formatDay
} from "../../views/Order/utils";
import moment from "moment/min/moment-with-locales";
import { getCharts } from "../../utils/utils";

moment.locale("ru");

const delay = time => new Promise(resolve => setTimeout(resolve, time));
const sameData = ["year", "month", "day"];
const getFormatDate = date => {
  return moment(date, formatDate).format();
};
const getSameDate = (date) => {
  return sameData
    .every(f => moment(getFormatDate(date)).isSame(moment().format(), f));
};
const getCountsOrder = (order) => {
  return order.filter(el => getSameDate(el.date));
};
const reduceSum = arr => arr.reduce((start, el) => {
  start = start + +el;
  return start;
}, 0);

const count = 10;
const typeViewOrder = "length";

const getData = ({ labels, series, title = "", count = 10 }) => {
  labels.reverse();
  series.reverse();

  const prev = series[series.length - 2];
  const current = series[series.length - 1];
  const average = Math.round(reduceSum(series) / series.length);

  const percent = () => {
    const sum = (current / prev - 1) * 100;
    return +sum.toFixed(2);
  };

  const compare = {
    title: title,
    percent: Number.isNaN(percent()) ? 0 : percent(),
    total: Number.isNaN(current - prev) ? 0 : current - prev,
    average
  };

  const chart = getCharts({
    series: series.length > count ? series.slice(series.length - count) : series,
    labels: labels.length > count ? labels.slice(labels.length - count) : labels
  });

  return {
    compare,
    chart
  };
};

const getMonthChart = (data, format = formatDateWeekAndMonth, count = 12, typeView = "sum") => {
  const mapMonth = {};
  data
    .sort(sortDate)
    .forEach((el) => {
      const month = moment(el.date, format).format("MMMM-YYYY");
      if (!Array.isArray(mapMonth[month])) {
        mapMonth[month] = [];
      }
      mapMonth[month].push(el.total);
    });

  const series = [];
  const labels = Object
    .keys(mapMonth)
    .map(el => {
      const word = moment(el, "MMMM-YYYY").format("MMMM");
      if (typeView === "length") {
        series.push(mapMonth[el].length);
      } else {
        const total = reduceSum(mapMonth[el]);
        series.push(total);
      }
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    });

  return getData({ labels, series, title: "по сравнению с прошлым месяцем", count });
};
const getWeekChart = (data, format = formatDateWeekAndMonth, count = 10, typeView = "sum") => {
  const orderWeekMap = {};
  const labels = [];
  data
    .sort(sortDate)
    .forEach((el) => {
      const startWeek = moment(el.date, format).startOf("week").format("DD.MM");
      if (!Array.isArray(orderWeekMap[startWeek])) {
        orderWeekMap[startWeek] = [];
      }
      orderWeekMap[startWeek].push(el.total);
    });

  const series = Object
    .keys(orderWeekMap)
    .map(el => {
      if (!labels.includes(el)) {
        labels.push(el);
      }
      if (typeView === "length") {
        return orderWeekMap[el].length;
      } else {
        return reduceSum(orderWeekMap[el]);
      }

    });

  return getData({ labels, series, title: "по сравнению с прошлой неделей", count });
};
const getDayChart = (data, format = formatDay, count = 10, typeView = "sum") => {
  const orderMap = {};
  const labels = [];
  data
    .sort(sortDate)
    .forEach((el) => {
      const day = moment(el.date, format).format("DD.MM");
      if (!labels.includes(day)) {
        labels.push(day);
      }
      if (!Array.isArray(orderMap[day])) {
        orderMap[day] = [];
      }
      orderMap[day].push(el.total);
    });
  const series = Object
    .keys(orderMap)
    .map(el => {
      if (typeView === "length") {
        return orderMap[el].length;
      } else {
        return reduceSum(orderMap[el]);
      }
    });

  return getData({ labels, series, title: "по сравнению с прошлой неделей", count });
};

function* startDashboardLoad() {
  yield call(delay, 100);
  // initial [order, revenue, goods, category]

  const countsOrder = getCountsOrder(order);
  const currentDate = revenue.find(t => getCountsOrder([t]));
  const { chart: chartRevenue, compare: revenueCompare } = getDayChart(revenue, formatDay, count);
  const { chart: chartOrder, compare: orderCompare } = getDayChart(order, formatDate, count, typeViewOrder);

  const payload = {
    isLoadDashboard: true,
    dashboard: {
      countsOrder: countsOrder.length,
      revenue: currentDate.total,
      newCustomers: 58,
      newReviews: 85,
      countChangeMailing: 49,
      mailing: [],
      orders: [],
      newOrders: filterNewOrder
    },
    chartRevenue,
    chartOrder,
    revenueCompare,
    orderCompare
  };
  return yield put(endDashboard(payload));
}

const getTypeChart = ({ type, data, format, formatDay, count, typeViewOrder }) => {
  let info = {};
  if (type === "week") {
    info = getWeekChart(data, format, count, typeViewOrder);
  } else if (type === "days") {
    info = getDayChart(data, formatDay, count, typeViewOrder);
  } else if (type === "month") {
    info = getMonthChart(data, format, count, typeViewOrder);
  }

  return info;
};

function* startChartChangeRevue(action) {
  const info = getTypeChart({
    type: action.payload,
    data: revenue,
    format: formatDateWeekAndMonth,
    formatDay: formatDay,
    count: count,
    typeViewOrder: "sum"
  });

  const payload = {
    chartRevenue: info.chart,
    revenueCompare: info.compare
  };
  return yield put(endChart(payload));
}

function* startChartChangeOrder(action) {
  const info = getTypeChart({
    type: action.payload,
    data: order,
    format: formatDate,
    formatDay: formatDate,
    count: count,
    typeViewOrder: typeViewOrder
  });

  const payload = {
    chartOrder: info.chart,
    orderCompare: info.compare
  };
  return yield put(endChart(payload));
}

function* dashboardWatcher() {
  yield takeLatest(startDashboard, startDashboardLoad);
  yield takeLatest(startChart, startChartChangeRevue);
  yield takeLatest(startChartOrder, startChartChangeOrder);
}

export default function* () {
  yield fork(dashboardWatcher);
  // console.log("Dashboard saga run");
};
