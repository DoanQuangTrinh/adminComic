// import
import React, { Component } from "react";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import User from "views/Dashboard/User/User";
import Domain from "views/Dashboard/Domain/Domain";
import SubDomain from "views/Dashboard/SubDomain/SubDomain";
import Member from "views/Dashboard/Member/Member";
import Category from "views/Dashboard/Category/Category";
import CategoryDetails from "views/Dashboard/Category/CategoryDetails";
import { StatsIcon, PersonIcon } from "components/Icons/Icons";
import { TbCategory } from "react-icons/tb";
import { FaRegUser,FaUsers } from "react-icons/fa";
import Comic from "views/Dashboard/Comic/Comic";

import { Roles } from "utils/constant";
import Team from "views/Dashboard/Team/Team";

var dashRoutes = [
  
  // {
  //   path: "/teams",
  //   name: "Teams",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Team,
  //   layout: "/admin",
  //   role: [Roles.ADMIN, Roles.USER],
  // },
  {
    
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/user",
        name: "User",
        icon: <FaRegUser color="inherit" />,
        component: User,
        layout: "/admin",
        role: [Roles.ADMIN],
      },
      {
        path: "/member",
        name: "member",
        icon: <FaUsers color="inherit" />,
        secondaryNavbar: true,
        component: Member,
        layout: "/admin",
        hidden: false,
        role: [Roles.ADMIN, Roles.USER, Roles.GUEST],
      },
      {
        path: "/category/:id/details",
        name: "categorydetails",
        icon: <StatsIcon color="inherit" />,
        component: CategoryDetails,
        layout: "/admin",
        hidden: true,
        role: [Roles.ADMIN],
      },
      {
        path: "/category",
        name: "category",
        icon: <TbCategory color="inherit" />,
        secondaryNavbar: true,
        component: Category,
        layout: "/admin",
        hidden: false,
        role: [Roles.ADMIN, Roles.USER, Roles.GUEST],
      },
      {
        path: "/comic",
        name: "comic",
        icon: <TbCategory color="inherit" />,
        secondaryNavbar: true,
        component: Comic,
        layout: "/admin",
        hidden: false,
        role: [Roles.ADMIN, Roles.USER, Roles.GUEST],
      },
      {
        path: "/signin",
        name: "Sign In",
        component: SignIn,
        layout: "/auth",
        icon: <PersonIcon color="inherit" />,
        hidden: true,
        role: [Roles.ADMIN, Roles.USER, Roles.GUEST],
      },
    ],
  },
];
export default dashRoutes;
