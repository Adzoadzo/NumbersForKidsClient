import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import { useHistory, useLocation } from "react-router-dom";
import { getQuiz, submitQuiz } from "actions/quizzes";
import { connect } from "react-redux";
import { FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from "@material-ui/core";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    questions: {
        margin: '0 auto',
        width: '70%',
        marginTop: ' 50px',
        display: 'block',
    },
    footer: {
        justifyContent: 'flex-end',
        '& button': {
            marginLeft: '20px'
        }
    }
};

const useStyles = makeStyles(styles);

const Quiz = ({ quiz, submitQuiz, getQuiz, correct }) => {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [results, setResults] = useState([]);
    const pathArray = location.pathname.split('/');

    // get current user if not in store
    React.useEffect(() => {
        if (!quiz)
            getQuiz(pathArray[pathArray.length - 1]);
    }, [quiz]);

    const submitHandler = () => {
        submitQuiz(quiz.id, results);
    }
    const backHandler = () => {
        history.push('/quizzes');
    }
    const handleAnswerQuestion = (i, e) => {
        const ns = [...results]
        ns[i] = e.target.value;
        setResults(ns);
    }
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>{quiz?.name}</h4>
                            <p className={classes.cardCategoryWhite}>{quiz?.subject}</p>
                        </CardHeader>
                        <CardBody>
                            {correct === undefined && <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: "#AAAAAA" }}>{quiz?.description}</InputLabel>
                                </GridItem>
                                {quiz?.questions.map((q, i) =>
                                    <div className={classes.questions}>
                                        {i + 1}. {q.text}
                                        <div>
                                            {q?.answers.length > 1 ?
                                                <FormControl component="fieldset">
                                                    <RadioGroup aria-orientation="horizontal" style={{ display: 'block' }} value={Number(results?.[i])} onChange={(e) => handleAnswerQuestion(i, e)}>
                                                        {q.answers.map((a, j) => <FormControlLabel value={j} control={<Radio size="small" />} label={a?.text} />)}
                                                    </RadioGroup>
                                                </FormControl>
                                                :
                                                <FormControl className={classes.FormControlSizeHalf}>
                                                    <Input id="phone" value={results?.[i]} onChange={(e) => handleAnswerQuestion(i, e)} />
                                                </FormControl>
                                            }
                                        </div>
                                    </div>
                                )}
                            </GridContainer>}
                            {correct !== undefined &&
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                    <h5>Correct answers: {correct} out of possible {quiz?.questions.length}</h5>
                                    </GridItem>
                                </GridContainer>
                            }
                        </CardBody>
                        <CardFooter className={classes.footer}>
                            <Button color="primary" onClick={backHandler}>Back</Button>
                            <Button color="primary" onClick={submitHandler}>Submit</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        quiz: state.quizzes.selectedQuiz,
        correct: state.quizzes.correct,
        searchResult: state.users.quizSearchResult,
        rowsPerPage: state.users.rowsPerPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getQuiz: (id) => dispatch(getQuiz(id)),
        submitQuiz: (id, results) => dispatch(submitQuiz(id, results))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

