import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/icons/logo.png";
import { connect } from "react-redux";
import { getCurrentUser } from "actions/auth";
import { getUidFromJWT } from "helpers/authHelpers";
import { logout } from "actions/auth";

let ps;


const switchRoutes = (token, user) => (
  <React.Fragment>
    {!token && <Redirect to="/login" />}
    <Switch>
      {token && user && <Redirect exact from="/login" to={user?.role?.name === 'Student' ?  "/lectures" : "/users" } />}
      {routes.filter(r => !r?.roles || r?.roles?.length === 0 || r?.roles.includes(user?.role?.name)).map((prop, key) => {
        if (prop.layout === "") {
          return (
            <Route          
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      {token && user && <Redirect from="/" to={user?.role?.name === 'Student' ?  "/lectures" : "/users" }/>}
    </Switch>
  </React.Fragment>

);

const useStyles = makeStyles(styles);

function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [color, setColor] = React.useState("blue");
  const [image, setImage] = React.useState(bgImage);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getRoute = () => {
    return window.location.pathname !== "/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  // get current user if not in store
  React.useEffect(() => {
    if (!rest.user && rest.token) {
      rest.getCurrentUser(getUidFromJWT(rest.token))
    }
  }, [rest.token, rest.user]);

  return (
    <div className={classes.wrapper}>
      {rest.user && <Sidebar
        routes={routes}
        logoText={"Numbers for Kids"}
        logo={logo}
        image={image}
        color={color}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        {...rest}
      />}
      <div className={rest.user ? classes.mainPanel : ''} ref={mainPanel}>
        {rest.user && <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />}
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {!rest.token ?
          (<div className={classes.login}>{switchRoutes(rest.token, rest.user)}</div>)
          : getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes(rest.token, rest.user)}</div>
            </div>
          ) : (
              <div className={classes.map}>{switchRoutes(rest.token, rest.user)}</div>
            )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    error: state.auth?.request?.error,
    user: state.auth?.authData.currentUser,
    token: state.auth?.authData?.token
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (uid) => dispatch(getCurrentUser(uid)),
    logout: () => dispatch(logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
