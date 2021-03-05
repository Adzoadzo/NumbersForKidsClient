import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { useHistory } from "react-router-dom";

import image1 from "assets/img/div-1.png";
import image2 from "assets/img/div-2.png";
import image3 from "assets/img/div-3.png";
import image4 from "assets/img/div-4.png";
import image5 from "assets/img/div-5.svg";
import { List, ListItem, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

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
    accordion: {
        "&.MuiExpansionPanelDetails-root": {
            flexDirection: 'column',
            flexWrap: 'wrap',
        }
    },
    footer: {
        justifyContent: 'flex-end',
        '& button': {
            marginLeft: '20px'
        }
    }
};

const useStyles = makeStyles(styles);

export default function AdditionLecture() {
    const history = useHistory();
    const classes = useStyles();

    const backHandler = () => {
        history.push('/lectures');
    }
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color="primary">
                            <h3 className={classes.cardTitleWhite}>Division</h3>
                            <p className={classes.cardCategoryWhite}>Learn about divison</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer />

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Typography variant="h6" component="h4" style={{ marginTop: '30px', marginBottom: '20px' }}>
                                        Quotative Model of Division
                                    </Typography>
                                    <Typography component="p">
                                        Suppose you are asked to compute 3906 ÷ 3. One way to interpret this question (there are others) is:
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        “How many groups of 3 fit into 3906?”
                                    </Typography>
                                    <Accordion defaultExpanded style={{ background: '#b2e8b6' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Definition</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.accordion}>
                                            <Typography variant="body2" component="p">
                                                In the quotative model of division, you are given a dividend (here it is 3906),
                                                and you are asked to split it into equal-sized groups, where the size of the group is given by the divisor (here it is 3).
                                    </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Typography component="p" style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        In our dots and boxes model, the dividend 3906 looks like this:
                                    </Typography>
                                    <img src={image1} alt="512" style={{ width: '300px' }} />
                                    <Typography component="p" style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        and three dots looks like this:
                                    </Typography>

                                    <img src={image2} alt="dots" />
                                    <Typography component="p" style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        So we are really asking:
                                        “How many groups of <img src={image2} alt="dots" /> fit into the picture of 3906?”
                                    </Typography>
                                    <Accordion defaultExpanded style={{ background: '#b2e8b6' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Example: 3906 ÷ 3</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.accordion}>
                                            <Typography>
                                                There is one group of 3 at the thousands level, and three at the hundreds level, none at the tens level, and two at the ones level.
                                             </Typography>
                                            <img src={image4} style={{ marginTop: '20px', marginBottom: '20px', width: '250px' }} />
                                            <Typography>
                                                Notice what we have in the picture:
                                            </Typography>
                                            <List dense>
                                                <ListItem>One group of 3 in the thousands box.</ListItem>
                                                <ListItem >Three groups of 3 in the hundreds box.</ListItem>
                                                <ListItem >Zero groups of 3 in the tens box.</ListItem>
                                                <ListItem >Two groups of 3 in the ones box.</ListItem>
                                            </List>
                                            <Typography style={{ marginTop: '20px' }}>
                                                This shows that 3 goes into 3906 one thousand, three hundreds and two ones times. That is,
                                            </Typography>
                                            <img src={image5} style={{ marginTop: '20px', marginBottom: '20px' }} />
                                        </AccordionDetails>
                                    </Accordion>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter className={classes.footer}>
                            <Button color="primary" onClick={backHandler}>Back</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
