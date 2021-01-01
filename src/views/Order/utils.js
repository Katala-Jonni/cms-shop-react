import moment from "moment/min/moment-with-locales";

moment.locale("ru");

import {
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import Button from "../../components/CustomButtons/Button";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import IconButton from "@material-ui/core/IconButton";

export const formatDate = "lll";
export const formatDateWeekAndMonth = "DD.MM.YYYY";
export const formatDay = "DD.MM";

export const sortDate = (a, b) => {
  const start = moment(a.date, formatDate).format();
  const end = moment(b.date, formatDate).format();
  return moment(start).isSameOrBefore(end) ? 1 : -1;
};

export const statusStyle = {
  ["новый"]: "warning",
  ["закрыт"]: "success",
  ["отменен"]: "danger"
};

export const orderTable = {};

export const columns = [
  { title: "Дата", field: "date" },
  { title: "Заказ", field: "order" },
  {
    title: "Статус",
    field: "status",
    cellStyle: (value) => {
      const style = {};
      const valueTrim = value.trim().toLowerCase();
      if (valueTrim === "новый") {
        style["color"] = "#fff";
        style["background"] = warningColor[1];
      } else if (valueTrim === "закрыт") {
        style["color"] = "#fff";
        style["background"] = successColor[1];
      } else if (valueTrim === "отменен") {
        style["color"] = "#fff";
        style["background"] = dangerColor[1];
      }
      return style;
    }
  },
  { title: "Покупатель", field: "customer" }
];

const status = ["Новый", "Закрыт", "Отменен"];
const customer = ["Иванов Иван Иванович", "Петров Петр Петрович", "Сидоров Сидр Сидорович"];

let count = 0;
export const orderMap = new Array(100)
  .fill("")
  .map((_, idx) => {
    return {
      date: `${moment().subtract(count++, "days").format(formatDate)}`,
      order: `TBXSL${idx}`,
      status: status[idx % status.length],
      customer: customer[idx % customer.length],
      total: Math.ceil(Math.random() * 1000),
      id: idx,
      key: idx
    };
  });


const orderMap2 = new Array(10)
  .fill("")
  .map((_, idx) => {
    return {
      date: `${moment().format(formatDate)}`,
      order: `TBXSL${idx + 100}`,
      status: status[idx % status.length],
      customer: customer[idx % customer.length],
      total: Math.ceil(Math.random() * 1000),
      id: idx + 100,
      key: idx + 100
    };
  });

orderMap.push(...orderMap2);

const filterNoNewOrders = orderMap.filter(el => el.status.toLowerCase() !== "новый");
export const filterNewOrder = orderMap
  .sort(sortDate)
  .filter(el => el.status.toLowerCase() === "новый");

export const getOrders = (orderMap) => {
  const filterNoNewOrders = orderMap.filter(el => el.status.toLowerCase() !== "новый");
  const filterNewOrder = orderMap
    .sort(sortDate)
    .filter(el => el.status.toLowerCase() === "новый");
  return [...filterNewOrder, ...filterNoNewOrders];
};


export const order = [...filterNewOrder, ...filterNoNewOrders];

export const products = [
  {
    name: "Товар № 2",
    count: 3,
    price: 250,
    id: "2"
  },
  {
    name: "Товар № 1 Товар № 1 Товар № 1 Товар № 1 Товар № 1 Товар № 1",
    count: 1,
    price: 100,
    id: "1"
  },
  {
    name: "Товар № 3",
    count: 5,
    price: 300,
    id: "3"
  },
  {
    name: "Товар № 4",
    count: 7,
    price: 50,
    id: "4"
  },
  {
    name: "Товар № 5",
    count: 8,
    price: 90,
    id: "5"
  }
];
products.forEach(el => {
  el.key = el.id;
});

const cat = ["Завтрак", "Обед", "Ужин"];

export const category = new Array(15)
  .fill("")
  .map((_, idx) => {
    return {
      name: `Категория № ${idx + 1}`,
      count: Math.ceil(Math.random() * 100),
      status: idx % cat.length >= 1,
      id: idx,
      key: idx
    };
  });


const imagesProduct = [
  "https://st.motortrend.com/uploads/sites/5/2018/02/2018-Lamborghini-Huracan-Performante-front-view.jpg",
  "https://insdrcdn.com/media/attachments/9/a6/a1e3c4a69.jpg",
  "https://w-dog.ru/wallpapers/0/7/503148190787263/lamborghini-hurac-n-superkar-krasnye-vorsteiner.jpg"
];

export const goods = new Array(15)
  .fill("")
  .map((_, idx) => {
    return {
      category: {
        id: category[idx % category.length].id,
        title: category[idx % category.length].name
      },
      name: `Товар № ${idx + 1}`,
      count: Math.ceil(Math.random() * 100),
      price: Math.ceil(Math.random() * 1000),
      status: idx % cat.length >= 1,
      image: imagesProduct[idx % imagesProduct.length],
      id: idx,
      key: idx
    };
  });

goods.push(
  {
    category: {
      id: 1,
      title: "Категория № 1"
    },
    name: `Товар № ${16}`,
    count: Math.ceil(Math.random() * 100),
    price: Math.ceil(Math.random() * 1000),
    status: 16 % cat.length >= 1,
    image: imagesProduct[16 % imagesProduct.length],
    id: 16,
    key: 16
  }
);

let i = 0;
export const revenue = new Array(100)
  .fill("")
  .map((_, idx) => {
    return {
      date: `${moment().subtract(i++, "days").format("L")}`,
      ordersCount: Math.ceil(Math.random() * 100),
      total: Math.ceil(Math.random() * 100000),
      id: idx,
      key: idx
    };
  });

export const getOrderColumns = (filteredInfo, sortedInfo) => {
  return [
    {
      title: "Заказ №",
      dataIndex: "order",
      key: "order",
      filteredValue: filteredInfo.order || null,
      onFilter: (value, record) => record.order.includes(value),
      sortOrder: sortedInfo.columnKey === "order" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status < b.status ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
      ellipsis: true,
      // eslint-disable-next-line react/display-name,react/prop-types
      render: (tags, props) => <Button color={statusStyle[props.status.toLowerCase()]}>{tags}</Button>
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      filteredValue: filteredInfo.date || null,
      onFilter: (value, record) => record.date.includes(value),
      sorter: (sortDate),
      sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Сумма ₽",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
      sortOrder: sortedInfo.columnKey === "total" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Покупатель",
      dataIndex: "customer",
      key: "customer",
      sorter: (a, b) => a.customer < b.customer ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "customer" && sortedInfo.order,
      ellipsis: true
    }
  ];
};
export const geProductColumns = (filteredInfo, sortedInfo) => {
  return [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name < b.name ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Цена ₽",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Количество шт.",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count < b.count ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "count" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Сумма ₽",
      dataIndex: "sum",
      key: "sum",
      sortOrder: sortedInfo.columnKey === "sum" && sortedInfo.order,
      ellipsis: true,
      // eslint-disable-next-line react/display-name,react/prop-types
      render: (tags, props) => <span>{props.count * props.price}</span>
    }
  ];
};
export const geCategoryColumns = (filteredInfo, sortedInfo) => {
  return [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name < b.name ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
      width: 30
    },
    {
      title: "Вхождений",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count < b.count ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "count" && sortedInfo.order,
      ellipsis: true,
      width: 15
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status < b.status ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
      ellipsis: true,
      width: 15,
      // eslint-disable-next-line react/display-name,react/prop-types
      render: (tags, props) => props.status ?
        <IconButton color="primary" component="span"><CheckIcon/></IconButton>
        : <IconButton color="secondary" component="span"><CloseIcon/></IconButton>
    }
  ];
};
export const geGoodsColumns = (filteredInfo, sortedInfo) => {
  return [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name < b.name ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
      width: 55
    },
    // {
    //   title: "Количество",
    //   dataIndex: "count",
    //   key: "count",
    //   sorter: (a, b) => a.count < b.count ? -1 : 1,
    //   sortOrder: sortedInfo.columnKey === "count" && sortedInfo.order,
    //   ellipsis: true,
    //   width: 15
    // },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price < b.price ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
      ellipsis: true,
      width: 20
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status < b.status ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
      ellipsis: true,
      width: 25,
      // eslint-disable-next-line react/display-name,react/prop-types
      render: (tags, props) => props.status ?
        <IconButton color="primary" component="span"><CheckIcon/></IconButton>
        : <IconButton color="secondary" component="span"><CloseIcon/></IconButton>
    }
  ];
};
export const geRevenueColumns = (filteredInfo, sortedInfo) => {
  return [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      filteredValue: filteredInfo.date || null,
      onFilter: (value, record) => record.date.includes(value),
      sorter: (sortDate),
      sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Заказов шт.",
      dataIndex: "ordersCount",
      key: "ordersCount",
      sorter: (a, b) => a.ordersCount < b.ordersCount ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "ordersCount" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Выручка ₽",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total < b.total ? -1 : 1,
      sortOrder: sortedInfo.columnKey === "total" && sortedInfo.order,
      ellipsis: true
    }
  ];
};

export const getSearchOrder = v => {
  const columns = ["order", "status", "date", "total", "customer"];
  return orderMap.filter(data => {
    let value = "";
    columns.forEach(column => value += data[column]);
    return value.trim().toLowerCase().includes(v.trim().toLowerCase());
  });
};
