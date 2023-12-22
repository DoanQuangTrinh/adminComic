// import
import React, { Component } from "react";
import SignIn from "views/Pages/SignIn.js";
import User from "views/Dashboard/User/User";
import Member from "views/Dashboard/Member/Member";
import Category from "views/Dashboard/Category/Category";
import CommentsComic from "views/Dashboard/Comic/CommentsComic";
import CommentsChapter from "views/Dashboard/Comic/CommentsChapter";
import { StatsIcon, PersonIcon } from "components/Icons/Icons";
import { TbCategory ,TbReportAnalytics} from "react-icons/tb";
import { FaRegUser,FaUsers } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import Comic from "views/Dashboard/Comic/Comic";
import ReportChapter from "views/Dashboard/ReportChapter/ReportChapter";
import ScheduleComic from "views/Dashboard/ScheduleComic/ScheduleComic";
import ChapterComic from "views/Dashboard/Comic/ChapterComic";
import CommentsComicChild from "views/Dashboard/Comic/CommentsComicChild";
import CommentsChapterChild from "views/Dashboard/Comic/CommentsChapterChild";
import { Roles } from "utils/constant";


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
        role: [Roles.ADMIN],
      },
      {
        path: "/chapter/:slug/chapter",
        name: "chater",
        icon: <StatsIcon color="inherit" />,
        component: ChapterComic,
        layout: "/admin",
        hidden: true,
        role: [Roles.ADMIN],
      },
      {
        path: "/commentscomic/:comicID/commentscomic",
        name: "Comments Comic",
        icon: <StatsIcon color="inherit" />,
        component: CommentsComic,
        layout: "/admin",
        hidden: true,
        role: [Roles.ADMIN],
      },
      {
        path: "/comment/:parentID/comment",
        name: "Comments Child",
        icon: <StatsIcon color="inherit" />,
        component: CommentsComicChild,
        layout: "/admin",
        hidden: true,
        role: [Roles.ADMIN],
      },
      {
        path: "/commentchapter/:parentID/comment",
        name: "Comments Chapter Child",
        icon: <StatsIcon color="inherit" />,
        component: CommentsChapterChild,
        layout: "/admin",
        hidden: true,
        role: [Roles.ADMIN],
      },
      {
        path: "/commentschapter/:chapterID/commentschapter",
        name: "Comments Comic",
        icon: <StatsIcon color="inherit" />,
        component: CommentsChapter,
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
        role: [Roles.ADMIN],
      },
      {
        path: "/comic",
        name: "Comic",
        icon: <CiBoxList color="inherit" />,
        secondaryNavbar: true,
        component: Comic,
        layout: "/admin",
        hidden: false,
        role: [Roles.ADMIN],
      },
      {
        path: "/schedule",
        name: "Schedule Comic",
        icon: <AiOutlineSchedule color="inherit" />,
        secondaryNavbar: true,
        component: ScheduleComic,
        layout: "/admin",
        hidden: false,
        role: [Roles.ADMIN],
      },
      {
        path: "/report",
        name: "Report Chapter",
        icon: <TbReportAnalytics color="inherit" />,
        secondaryNavbar: true,
        component: ReportChapter,
        layout: "/admin",
        hidden: false,
        role: [Roles.ADMIN],
      },
      {
        path: "/signin",
        name: "Sign In",
        component: SignIn,
        layout: "/auth",
        icon: <PersonIcon color="inherit" />,
        hidden: true,
        role: [Roles.ADMIN],
      },
    ],
  },
];
export default dashRoutes;
