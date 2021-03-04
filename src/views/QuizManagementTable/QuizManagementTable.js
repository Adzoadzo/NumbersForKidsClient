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
import { headCellsQuizTable } from "configs/tableConfigs";
import { AddBoxOutlined, Close } from "@material-ui/icons";
import { IconButton, Modal, Paper, Snackbar, Tab, Tabs } from "@material-ui/core";
import QuizForm from "components/Forms/QuizForm";
import TabPanel from "components/TabPanel/TabPanel";
import { getQuiz, updateQuiz, setQuizErrors, createQuiz, deleteQuiz, clearSelectedQuiz } from "actions/quizzes";
import { quizValidation } from "helpers/validationHelpers";
import { setPasswordValidation } from "helpers/validationHelpers";
import Alert from "@material-ui/lab/Alert";
import { setQuizFormMode, setQuizRowsPerPage, setQuizNotification } from "actions/quizzes";
import { listQuizzes } from "actions/quizzes";

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

function QuizzesTable({
  quizzes = [],
  listQuizzes,
  selectedQuiz,
  getQuiz,
  createQuiz,
  updateQuiz,
  setRowsPerPage,
  rowsPerPage,
  deleteQuiz,
  devices,
  errors,
  setErrors,
  listQuizzesNoSearch,
  notification,
  pagination,
  setNotification,
  relatives,
  loading,
  searchResult,
  formMode,
  setFormMode,
  clearSelectedQuiz }) {
  const [skip, setSkip] = useState(0)
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(0);
  const [selectedTab, setSelectedTab] = React.useState(0);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const listQuizzesDebounced = React.useCallback(debounce(listQuizzes, 500), []);

  React.useEffect(() => {
    listQuizzesDebounced(filter, skip, rowsPerPage * 2, undefined, true)
    setSkip(0);
    setPage(0);
  }, [filter, rowsPerPage]);

  React.useEffect(() => {
    listQuizzesDebounced(filter, skip, rowsPerPage * 2, undefined, false);
  }, [skip]);

  const addNewHandler = () => {
    setFormMode('new');
  }

  const editItemHandler = (e, item) => {
    setFormMode('edit');
    getQuiz(item.id);
    listQuizzesNoSearch();

    // don't trigger checkbox
    e.stopPropagation();
  }

  const deleteItemsHandler = (e, items) => {
    items.forEach(id => deleteQuiz(id))
  }

  const handleFormSubmit = (quiz) => {
    quiz = { ...quiz }
    const valRes = quizValidation(quiz, formMode)
    if (valRes.isValid) {
      formMode === 'new' ? createQuiz(quiz) : updateQuiz(quiz)
    } else {
      setErrors(valRes);
    }
  }

  const closeToastHandler = () => {
    setNotification();
  }

  const handleCloseModal = () => {
    setFormMode(undefined);
    setErrors();
    setSelectedTab(0);
    clearSelectedQuiz();
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

  const handleChangeTab = (e, val, item) => {
    setSelectedTab(val);
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
              <h4 className={classes.cardTitleWhite}>Quizzes Table</h4>
              <p className={classes.cardCategoryWhite}>Here you can manage all quizzes within the application</p>
            </div>
            <IconButton className={classes.addButtonWhite} onClick={addNewHandler} >
              <AddBoxOutlined />
              <p className={classes.addButtonWhiteText}>
                Add new quiz
            </p>
            </IconButton>
          </CardHeader>
          <CardBody>
            <EnhancedTable
              filterOptions={[
                "name",
                "subject",
                "id"
              ]}
              tableHeaderColor="primary"
              headCells={headCellsQuizTable}
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
      {console.log(formMode)}
      <Modal
        disableBackdropClick
        open={!!formMode}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.modalHeader}>
            <h2>{formMode === 'new' ? 'Create quiz' : 'Edit quiz'}</h2>
            <IconButton onClick={handleCloseModal} >
              <Close />
            </IconButton>
          </div>
          {formMode === 'edit' && selectedQuiz && <Paper className={classes.tabs}>
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
            <QuizForm
              tab={selectedTab}
              setErrors={setErrors}
              errors={errors?.errors}
              quizzes={quizzes}
              googleApiKey={GOOGLE_API}
              quiz={selectedQuiz}
              mode={formMode}
              setFormMode={setFormMode}
              onSubmit={handleFormSubmit} />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={selectedTab} index={1}>
          </TabPanel>
        </div>
      </Modal>
    </GridContainer>
  );
}
const mapStateToProps = (state) => {
  console.log(state.quizzes.quizData);
  return {
    quizzes: state.quizzes.quizData,
    searchResult: state.quizzes.quizSearchResult,
    selectedQuiz: state.quizzes.selectedQuiz,
    selectedQuizPosition: state.quizzes.selectedQuizPosition,
    errors: state.quizzes.errors,
    notification: state.quizzes.notification,
    formMode: state.quizzes.mode,
    relatives: state.quizzes.relatives,
    pagination: state.quizzes.pagination,
    loading: state.quizzes.request.loading,
    rowsPerPage: state.quizzes.rowsPerPage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setNotification: (notification) => dispatch(setQuizNotification(notification)),
    setErrors: (errors) => dispatch(setQuizErrors(errors)),
    listQuizzes: (filter, skip, limit, orderby, clean, isSearch) => dispatch(listQuizzes(filter, skip, limit, orderby, clean, isSearch)),
    listQuizzesNoSearch: () => dispatch(listQuizzes(undefined, undefined, undefined, undefined, undefined, false)),
    getQuiz: (uid) => dispatch(getQuiz(uid)),
    createQuiz: (quiz) => dispatch(createQuiz(quiz)),
    updateQuiz: (quiz) => dispatch(updateQuiz(quiz)),
    deleteQuiz: (id) => dispatch(deleteQuiz(id)),
    clearSelectedQuiz: () => dispatch(clearSelectedQuiz()),
    setFormMode: (mode) => dispatch(setQuizFormMode(mode)),
    setRowsPerPage: (rpp) => dispatch(setQuizRowsPerPage(rpp))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizzesTable);
