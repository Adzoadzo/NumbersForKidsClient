import React from "react";
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
import { useHistory } from "react-router-dom";

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
    footer: {
        justifyContent: 'flex-end',
        '& button': {
            marginLeft: '20px'
        }
    }
};

const useStyles = makeStyles(styles);

const Quiz = ({ quiz, quizSubmitHandler }) => {
    const history = useHistory();
    const classes = useStyles();

    const backHandler = () => {
        history.push('/quizzes');
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
                            <GridContainer />

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: "#AAAAAA" }}>{quiz?.description}</InputLabel>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter className={classes.footer}>
                            <Button color="primary" onClick={backHandler}>Back</Button>
                            <Button color="primary">Submit</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Quiz;
