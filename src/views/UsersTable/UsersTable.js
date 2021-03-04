import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import EnhancedTable from "components/EnhancedTable/EnhancedTable";
import { connect } from "react-redux";
import { headCellsUserTable } from "configs/tableConfigs";
import { listUsers } from "actions/users";
import { AddBoxOutlined, Close } from "@material-ui/icons";
import { IconButton, Modal, Paper, Snackbar, Tab, Tabs } from "@material-ui/core";
import UserForm from "components/Forms/UserForm";
import TabPanel from "components/TabPanel/TabPanel";
import UserOverview from "views/UserOverview/UserOverview";
import { getUser, updateUser, createUser, deleteUser, setNewUserPassword, getUserPosition, clearSelectedUser } from "actions/users";
import { setUserErrors } from "actions/users";
import { userValidation } from "helpers/validationHelpers";
import { setPasswordValidation } from "helpers/validationHelpers";
import Alert from "@material-ui/lab/Alert";
import { setUserNotification } from "actions/users";
import { setUserFormMode } from "actions/users";
import { setUserRowsPerPage } from "actions/users";

// env imports
require('dotenv').config();
const debounce = require('lodash.debounce');
const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50;
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      borderRadius: "0",
      height: "48px",
      padding: "10px"
    },
    "& :hover": {
      // background: "#fff",
    }
  },
  tabPanel: {
    "& .MuiBox-root": {
      padding: '0px'
    },
    "& .MuiContainer-root": {
      padding: '0 !important',
    }
  },
  paper: {
    position: 'absolute',
    minWidth: 600,
    width: '50vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '80vh',
    overflowY: 'scroll',

    "& h2": {
      lineHeight: '1.1em',
    }
  },
  tabs: {
    flexGrow: '1',
    boxShadow: 'none'
  },
  cardHeaderFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  addButtonWhite: {
    color: "#FFF",
    borderRadius: "10px",
  },
  addButtonWhiteText: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginLeft: "10px",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  }
});

const useStyles = makeStyles(styles);

function UsersTable({
  users = [],
  listUsers,
  selectedUser,
  getUser,
  createUser,
  updateUser,
  setRowsPerPage,
  rowsPerPage,
  deleteUser,
  devices,
  errors,
  setErrors,
  listUsersNoSearch,
  notification,
  pagination,
  getUserPosition,
  setNotification,
  loading,
  selectedUserPosition,
  searchResult,
  setNewUserPassword,
  formMode,
  setFormMode,
  clearSelectedUser }) {
  const [skip, setSkip] = useState(0)
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(0);
  const [selectedTab, setSelectedTab] = React.useState(0);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const listUsersDebounced = React.useCallback(debounce(listUsers, 500), []);

  React.useEffect(() => {
    listUsersDebounced(filter, skip, rowsPerPage * 2, undefined, true)
    setSkip(0);
    setPage(0);
  }, [filter, rowsPerPage]);

  React.useEffect(() => {
    listUsersDebounced(filter, skip, rowsPerPage * 2, undefined, false);
  }, [skip]);

  const addNewHandler = () => {
    setFormMode('new');
  }

  const editItemHandler = (e, item) => {
    setFormMode('edit');
    getUser(item.id);
    listUsersNoSearch();

    // don't trigger checkbox
    e.stopPropagation();
  }

  const deleteItemsHandler = (e, items) => {
    items.forEach(id => deleteUser(id))
  }

  const handleFormSubmit = (user) => {
    user = { ...user }
    const valRes = formMode === 'edit-password' ? setPasswordValidation(user) : userValidation(user, formMode)
    console.log(user, valRes);
    if (valRes.isValid) {
      formMode === 'new' ? createUser(user)
        : formMode === 'edit' ? updateUser(user)
          : setNewUserPassword({ id: user.id, password: user.password, confirmPassword: user.confirmPassword })
    } else {
      setErrors(valRes);
    }
  }

  const handleChangeTab = (e, val, item) => {
    setSelectedTab(val);
    if (selectedUser?.devices[0]) {
      getUserPosition(selectedUser.id);
    }
  }

  const closeToastHandler = () => {
    setNotification();
  }

  const handleCloseModal = () => {
    setFormMode(undefined);
    setErrors();
    setSelectedTab(0);
    clearSelectedUser();
  }

  const setPageHandler = (currentPage, nextPage) => {
    if (currentPage < nextPage && (searchResult.length - (nextPage * rowsPerPage)) < 2 * rowsPerPage) {
      console.log('skip changed');
      setSkip(skip + rowsPerPage * 2);
    }
    setPage(nextPage ? nextPage : 0);


  }

  const setRowsPerPageHandler = (rpp) => {
    setRowsPerPage(rpp);
    setSkip(0);
  }

  const filterItemsHandler = (e, field, val) => {
    setFilter({ field, val });
  }

  const classes = useStyles();
  return (
    <GridContainer>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={!!notification} autoHideDuration={3000} onClose={closeToastHandler}>
        {notification && <Alert severity={notification.status}>{notification?.message}</Alert>}
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeaderFlex}>
            <div>
              <h4 className={classes.cardTitleWhite}>Users Table</h4>
              <p className={classes.cardCategoryWhite}> All users are displayed here</p>
            </div>
            <IconButton className={classes.addButtonWhite} onClick={addNewHandler} >
              <AddBoxOutlined />
              <p className={classes.addButtonWhiteText}>
                Add new user
            </p>
            </IconButton>
          </CardHeader>
          <CardBody>
            <EnhancedTable
              filterOptions={[
                "email",
                "id",
                "firstName",
                "lastName"
              ]}
              tableHeaderColor="primary"
              headCells={headCellsUserTable}
              pageLoading={loading && searchResult.length === page * rowsPerPage}
              rows={searchResult}
              keyProp="id"
              editActionHandler={editItemHandler}
              totalSize={pagination?.total}
              deleteActionHandler={deleteItemsHandler}
              filterActionHandler={filterItemsHandler}
              page={page}
              setPage={setPageHandler}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPageHandler}
            />
          </CardBody>
        </Card>
      </GridItem>
      <Modal
        disableBackdropClick
        open={!!formMode}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.modalHeader}>
            <h2>{formMode === 'new' ? 'Create user' : 'Edit user'}</h2>
            <IconButton onClick={handleCloseModal} >
              <Close />
            </IconButton>
          </div>
          {formMode === 'edit' && selectedUser?.devices?.length > 0 && <Paper className={classes.tabs}>
            <Tabs
              value={selectedTab}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Edit" />
              <Tab label="Overview" />
            </Tabs>
          </Paper>}
          <TabPanel className={classes.tabPanel} value={selectedTab} index={0} component={<div></div>}>
            <UserForm
              tab={selectedTab}
              setErrors={setErrors}
              errors={errors?.errors}
              devices={devices}
              users={users}
              googleApiKey={GOOGLE_API}
              user={selectedUser}
              mode={formMode}
              setFormMode={setFormMode}
              onSubmit={handleFormSubmit} />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={selectedTab} index={1}>
            <UserOverview position={selectedUserPosition} googleApiKey={GOOGLE_API} user={selectedUser} showMarker />
          </TabPanel>
        </div>
      </Modal>
    </GridContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    users: state.users.usersData,
    searchResult: state.users.userSearchResult,
    selectedUser: state.users.selectedUser,
    selectedUserPosition: state.users.selectedUserPosition,
    devices: state.devices.devicesData,
    errors: state.users.errors,
    notification: state.users.notification,
    formMode: state.users.mode,
    pagination: state.users.pagination,
    loading: state.users.request.loading,
    rowsPerPage: state.users.rowsPerPage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setNewUserPassword: (user) => dispatch(setNewUserPassword(user)),
    setNotification: (notification) => dispatch(setUserNotification(notification)),
    setErrors: (errors) => dispatch(setUserErrors(errors)),
    listUsers: (filter, skip, limit, orderby, clean, isSearch) => dispatch(listUsers(filter, skip, limit, orderby, clean, isSearch)),
    listUsersNoSearch: () => dispatch(listUsers(undefined, undefined, undefined, undefined, undefined, false)),
    getUser: (id) => dispatch(getUser(id)),
    createUser: (user) => dispatch(createUser(user)),
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    clearSelectedUser: () => dispatch(clearSelectedUser()),
    getUserPosition: (id) => dispatch(getUserPosition(id)),
    setFormMode: (mode) => dispatch(setUserFormMode(mode)),
    setRowsPerPage: (rpp) => dispatch(setUserRowsPerPage(rpp))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
