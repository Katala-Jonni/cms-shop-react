// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
// import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
// import RateReviewIcon from "@material-ui/icons/RateReview";
// import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard";
import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";
// import Typography from "views/Typography/Typography.jsx";
import Order from "./views/Order/Order";
// import CurrentProduct from "./views/Product/CurrentProduct";
import Catalog from "./views/Product/Catalog";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "dashboard",
    name: "Рабочий стол",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/"
  },
  {
    path: "order",
    name: "Заказы",
    rtlName: "لوحة القيادة",
    icon: AddShoppingCartIcon,
    component: Order,
    layout: "/"
  },
  {
    path: "catalog",
    name: "Каталог",
    rtlName: "ملف تعريفي للمستخدم",
    icon: CategoryIcon,
    component: Catalog,
    layout: "/"
  },
  // {
  //   path: "reviews",
  //   name: "Отзывы",
  //   rtlName: "قائمة الجدول",
  //   icon: RateReviewIcon,
  //   component: TableList,
  //   layout: "/"
  // },
  // {
  //   path: "customers",
  //   name: "Клиенты",
  //   rtlName: "طباعة",
  //   icon: PeopleOutlineIcon,
  //   component: Typography,
  //   layout: "/"
  // },
  // {
  //   path: "employee",
  //   name: "Сотрудники",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Typography,
  //   layout: "/"
  // },
  // {
  //   path: "provider",
  //   name: "Поставщики",
  //   rtlName: "الرموز",
  //   icon: ContactPhoneIcon,
  //   component: Typography,
  //   layout: "/"
  // },
  // {
  //   path: "maps",
  //   name: "Черновик",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: CurrentProduct,
  //   layout: "/"
  // },
  {
    path: "profile",
    name: "Карта",
    rtlName: "خرائط",
    icon: LocationOn,
    component: UserProfile,
    layout: "/"
  }

  // {
  //   path: "notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/"
  // },
  // {
  //   path: "upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/"
  // }
];

export default dashboardRoutes;
