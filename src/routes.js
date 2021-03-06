
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
// import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
// import Maps from "views/Maps.jsx";
// import Notifications from "views/Notifications.jsx";
// import Upgrade from "views/Upgrade.jsx";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
   }
   ,
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  }
  // ,
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  ,{
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  }
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "pe-7s-map-marker",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade,
  //   layout: "/admin"
  // }
];
export const userRoute = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "pe-7s-graph",
    component: UserProfile,
    layout: "/user"
   }
   ,{
    path: "/questions",
    name: "Questions",
    icon: "pe-7s-graph",
    component: Icons,
    layout: "/user"
   }
   ,{
    path: "/tags",
    name: "Tags",
    icon: "pe-7s-graph",
    component: Icons,
    layout: "/user"
   }
   ,{
    path: "/users",
    name: "Users",
    icon: "pe-7s-graph",
    component: Icons,
    layout: "/user"
   }
   ,{
    path: "/unanswered",
    name: "Unanswered",
    icon: "pe-7s-graph",
    component: Icons,
    layout: "/user"
   }
   // <li>Home</li>
              // <li>Questions</li>
              // <li>Tags</li>
              // <li>Users</li>
              // <li>Unanswered</li>
  ]
export default {dashboardRoutes,userRoute} ;
