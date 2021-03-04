import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { connect } from "react-redux";
import { AddBoxOutlined, Close, TrendingUpOutlined } from "@material-ui/icons";
import { Card, IconButton, Modal, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { headCellsLectureTable } from "configs/tableConfigs";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import EnhancedTable from "components/EnhancedTable/EnhancedTable";
import { setQuizErrors, setQuizRowsPerPage, clearSelectedQuiz, setQuizNotification, setQuizFormMode } from "actions/quizzes";
import { listUsers } from "actions/users";
import { useHistory, useLocation } from "react-router-dom";
import { listQuizzes } from "actions/quizzes";

const debounce = require('lodash.debounce');
const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + rand();
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
  },
  paper: {
    position: 'absolute',
    minWidth: 600,
    width: '50vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '75vh',
    overflowY: 'scroll',

    "& h2": {
      lineHeight: '1.1em',
    }
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
    marginTop: "20px",
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

function QuizzesTable({
  quizzes,
  searchResult,
  setFormMode,
  formMode,
  setNotification,
  users,
  errors,
  notification,
  setErrors,
  pagination,
  setRowsPerPage,
  rowsPerPage,
  listUsersNoSearch,
  listUsers,
  getDevice,
  clearSelectedQuiz,
  selectedDevice }) {
  const history = useHistory();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState({ field: 'username', val: '' });
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const addNewHandler = () => {
    setFormMode('new');
    listUsersNoSearch();
  }

  const editItemHandler = (e, item) => {
    setFormMode('edit');
    getDevice(item.uuid);
    listUsersNoSearch();

    // don't trigger checkbox
    e.stopPropagation();
  }


  const closeToastHandler = () => {
    setNotification();
  }

  const filterItemsHandler = (e, field, val) => {
    setFilter({ field, val });
  }

  const setPageHandler = (currentPage, nextPage) => {
    if (currentPage < nextPage && (searchResult.length - (nextPage * rowsPerPage)) < 2 * rowsPerPage) {
      setSkip(skip + rowsPerPage * 2);
    }
    setPage(nextPage ? nextPage : 0);
  }

  const setRowsPerPageHandler = (rpp) => {
    setRowsPerPage(rpp);
    setSkip(0);
  }

  const takeQuizActionHandler = (quiz) => {
    history.push(`/quiz/${quiz.id}`)
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
              <h4 className={classes.cardTitleWhite}>Lectures Table</h4>
              <p className={classes.cardCategoryWhite}>
                All lectures are displayed here
            </p>
            </div>
          </CardHeader>
          <CardBody>
            <EnhancedTable
              filterOptions={[
                "name",
                "subject"
              ]}
              disableSelection
              tableHeaderColor="primary"
              headCells={headCellsLectureTable}
              rows={quizzes}
              keyProp="id"
              totalSize={pagination?.total}
              filterActionHandler={filterItemsHandler}
              page={page}
              itemActions={[
                {
                  name: 'Take quiz',
                  handler: takeQuizActionHandler
                }
              ]}
              setPage={setPageHandler}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPageHandler}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    quizzes: state.quizzes.quizData,
    pagination: state.quizzes.pagination,
    loading: state.quizzes.request.loading,
    selectedDevice: state.quizzes.selectedDevice,
    users: state.users.usersData,
    errors: state.quizzes.errors,
    notification: state.quizzes.notification,
    formMode: state.quizzes.mode,
    rowsPerPage: state.quizzes.rowsPerPage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    listQuizzes: (filter, skip, limit, orderby, clean, isSearch) => dispatch(listQuizzes(filter, skip, limit, orderby, clean, isSearch)),
    setErrors: (errors) => dispatch(setQuizErrors(errors)),
    listUsers: (filter, skip, limit, orderby, clean, isSearch) => dispatch(listUsers(filter, skip, limit, orderby, clean, isSearch)),
    clearSelectedDevice: () => dispatch(clearSelectedQuiz()),
    setNotification: (notification) => dispatch(setQuizNotification(notification)),
    setFormMode: (mode) => dispatch(setQuizFormMode(mode)),
    listUsersNoSearch: () => dispatch(listUsers(undefined, undefined, undefined, undefined, undefined, false)),
    setRowsPerPage: (rpp) => dispatch(setQuizRowsPerPage(rpp))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizzesTable);
