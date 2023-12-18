// import
import React, { Component } from "react";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import User from "views/Dashboard/User/User";
import Domain from "views/Dashboard/Domain/Domain";
import SubDomain from "views/Dashboard/SubDomain/SubDomain";
import Member from "views/Dashboard/Member/Member";
import { StatsIcon, PersonIcon } from "components/Icons/Icons";
import { FaRegUser,FaUsers } from "react-icons/fa";

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
