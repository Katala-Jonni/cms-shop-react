import moment from "moment/min/moment-with-locales";

import {
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import Button from "../../components/CustomButtons/Button";
import React from "react";

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

export const ordersMap = {
  new: [
    {
      date: "12.12.2020/10:30",
      order: "TBXSLR",
      status: "new",
      customer: "Солнцев Максим Робертович",
      id: "1"
    },
    {
      date: "12.12.2020/13:00",
      order: "XUOWL3",
      status: "close",
      customer: "Солнцева Дарья Робертовна",
      id: "2"
    },
    {
      date: "12.12.2020/17:50",
      order: "NF735N",
      status: "cancelled",
      customer: "Солнцева Наталья Михайловна",
      id: "3"
    },
    {
      date: "12.12.2020/23:08",
      order: "ATM889",
      status: "new",
      customer: "Кривуша Екатерина Александровна",
      id: "4"
    },
    {
      date: "12.12.2020/23:08",
      order: "ATM889",
      status: "new",
      customer: "Кривуша Екатерина Александровна",
      id: "5"
    },
    {
      date: "12.12.2020/23:08",
      order: "ATM889",
      status: "cancelled",
      customer: "Кривуша Екатерина Александровна",
      id: "6"
    },
    {
      date: "12.12.2020/23:08",
      order: "ATM889",
      status: "close",
      customer: "Кривуша Екатерина Александровна",
      id: "7"
    },
    {
      date: "12.12.2020/23:08",
      order: "ATM889",
      status: "close",
      customer: "Кривуша Екатерина Александровна",
      id: "8"
    }
  ],
  close: [
    {
      date: "12.12.2020/10:30",
      order: "TBXSLR",
      status: "new",
      customer: "Солнцев Максим Робертович",
      id: "9"
    },
    {
      date: "12.12.2020/13:00",
      order: "XUOWL3",
      status: "new",
      customer: "Солнцева Дарья Робертовна",
      id: "10"
    },
    {
      date: "12.12.2020/17:50",
      order: "NF735N",
      status: "new",
      customer: "Солнцева Наталья Михайловна",
      id: "11"
    }
  ],
  cancelled: [
    {
      date: "12.12.2020/10:30",
      order: "TBXSLR",
      customer: "Солнцев Максим Робертович",
      id: "12"
    },
    {
      date: "12.12.2020/13:00",
      order: "XUOWL3",
      customer: "Солнцева Дарья Робертовна",
      id: "13"
    },
    {
      date: "12.12.2020/17:50",
      order: "NF735N",
      customer: "Солнцева Наталья Михайловна",
      id: "14"
    },
    {
      date: "12.12.2020/23:08",
      order: "ATM889",
      customer: "Кривуша Екатерина Александровна",
      id: "15"
    },
    {
      date: "12.12.2020/23:08",
      order: "ATM889",
      customer: "Кривуша Екатерина Александровна",
      id: "16"
    }
  ]
};


const orderMap = [
  {
    date: "12.12.2020/10:30",
    order: "TBXSLR",
    status: "Новый",
    customer: "Солнцев Максим Робертович",
    id: "1"
  },
  {
    date: "12.12.2020/13:00",
    order: "XUOWL3",
    status: "Закрыт",
    customer: "Солнцева Дарья Робертовна",
    id: "2"
  },
  {
    date: "12.12.2020/17:50",
    order: "NF735N",
    status: "Отменен",
    customer: "Солнцева Наталья Михайловна",
    id: "3"
  },
  {
    date: "12.12.2020/23:08",
    order: "ATM889",
    status: "Новый",
    customer: "Кривуша Екатерина Александровна",
    id: "4"
  },
  {
    date: "12.12.2020/23:08",
    order: "ATM889",
    status: "Новый",
    customer: "Кривуша Екатерина Александровна",
    id: "5"
  },
  {
    date: "12.12.2020/23:08",
    order: "ATM889",
    status: "Отменен",
    customer: "Кривуша Екатерина Александровна",
    id: "6"
  },
  {
    date: "12.12.2020/23:08",
    order: "ATM889",
    status: "Закрыт",
    customer: "Кривуша Екатерина Александровна",
    id: "7"
  },
  {
    date: "12.12.2020/23:08",
    order: "ATM889",
    status: "Закрыт",
    customer: "Кривуша Екатерина Александровна",
    id: "8"
  }
];

orderMap.forEach(el => {
  el.key = el.id;
  el.sum = Math.ceil(Math.random() * 1000);
});
const filterNoNewOrders = orderMap.filter(el => el.status.toLowerCase() !== "новый");
export const filterNewOrder = orderMap.filter(el => el.status.toLowerCase() === "новый");

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
      sorter: (a, b) => {
        const start = moment(a.date, "LLLL").format();
        const end = moment(b.date, "LLLL").format();
        return +new Date(start) - +new Date(end);

      },
      sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
      ellipsis: true
    },
    {
      title: "Сумма ₽",
      dataIndex: "sum",
      key: "sum",
      sorter: (a, b) => a.sum - b.sum,
      sortOrder: sortedInfo.columnKey === "sum" && sortedInfo.order,
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