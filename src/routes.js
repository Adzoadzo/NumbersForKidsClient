/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import Login from "views/Login/Login.js";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import UsersList from "views/UsersTable/UsersTable.js";
import QuizList from "views/QuizTable/QuizTable.js";
import QuizManagementList from "views/QuizManagementTable/QuizManagementTable.js";
import LectureList from "views/LecturesTable/LecturesTable.js";
import AdditionLecture from "views/Lectures/Addition.js";
import SubtractionLecture from "views/Lectures/Subtraction.js";
import MultiplicationLecture from "views/Lectures/Multiplication.js";
import DivisionLecture from "views/Lectures/Division.js";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Log in",
    component: Login,
    layout: "",
    exact: true
  },
  
  // admin routes
  {
    path: "/users",
    name: "Users",
    icon: Person,
    component: UsersList,
    layout: "",
    exact: true,
    roles: ['Teacher'],
    showInSidebar: true
  },
  {
    path: "/quiz-management",
    name: "Quiz management",
    icon: QuestionAnswerIcon,
    component: QuizManagementList,
    roles: ['Teacher'],
    layout: "",
    exact: true,
    showInSidebar: true
  },
  {
    path: "/quiz-statistics", 
    name: "Quiz statistics",
    icon: MenuBookIcon,
    roles: ['Teacher'],
    component: QuizList,
    layout: "",
    exact: true,
    showInSidebar: true
  },
  // admin routes end
 

  // student routes start
  {
    path: "/lectures",
    name: "Lectures",
    icon: MenuBookIcon,
    roles: ['Student'],
    component: LectureList,
    layout: "",
    exact: true,
    showInSidebar: true
  },
  {
    path: "/lecture/1",
    name: "Addition",
    roles: ['Student'],
    component: AdditionLecture,
    layout: "",
    exact: true,
  },
  {
    path: "/lecture/2",
    name: "Subtraction",
    roles: ['Student'],
    component: SubtractionLecture,
    layout: "",
    exact: true,
  },
  {
    path: "/lecture/3",
    name: "Multiplication",
    roles: ['Student'],
    component: MultiplicationLecture,
    layout: "",
    exact: true,
  },
  {
    path: "/lecture/4",
    name: "Division",
    roles: ['Student'],
    component: DivisionLecture,
    layout: "",
    exact: true,
  },
  
  {
    path: "/quizzes",
    name: "Quizzes",
    icon: QuestionAnswerIcon,
    roles: ['Student'],
    component: QuizList,
    layout: "",
    exact: true,
    showInSidebar: true
  },
  // student routes end
];

export default dashboardRoutes;
