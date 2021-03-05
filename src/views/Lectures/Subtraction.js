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

import image1 from "assets/img/sub-1.png";
import image2 from "assets/img/sub-2.png";
import image3 from "assets/img/sub-3.svg";
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
                            <h3 className={classes.cardTitleWhite}>Subtraction</h3>
                            <p className={classes.cardCategoryWhite}>Learn about subtraction</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer />

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Typography variant="h6" component="h4" style={{ marginTop: '30px', marginBottom: '20px' }}>
                                        Subtraction as Take-Away
                                    </Typography>
                                    <Typography component="p" style={{ marginBottom: '30px' }}>
                                        To model addition, we started with two collections of dots (two numbers),
                                        and we combined them to form one bigger collection. That’s pretty much the definition of addition:
                                        combining two collections of objects. In subtraction, we start with one collection of dots (one number),
                                        and we take some dots away.
                                    </Typography>
                                    <Accordion defaultExpanded style={{ background: '#b2e8b6' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Example: 376 – 125</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.accordion}>
                                            <Typography>
                                                Suppose we want to find 376-125 in the dots and boxes model. We start with the representation of 376:
                                             </Typography>
                                            <img src={image1} style={{ marginTop: '20px', marginBottom: '20px', width: '300px' }} />
                                            <Typography>
                                                Since we want to “take away” 125, that means:
                                            </Typography>
                                            <List dense>
                                                <ListItem>We take away one dot from the hundreds box, leaving two dots.</ListItem>
                                                <ListItem >We take away two dots from the tens box, leaving five dots.</ListItem>
                                                <ListItem >And we take away five dots from the ones box, leaving one dot.</ListItem>
                                            </List>
                                            <img src={image2} style={{ marginTop: '20px', marginBottom: '20px', width: '300px' }} />
                                            <Typography>
                                                So the answer is:
                                            </Typography>
                                            <img src={image3} style={{ marginTop: '20px', marginBottom: '20px' }} />
                                            <Typography>
                                                And saying it out the long way we have:
                                            </Typography>
                                            <List dense>
                                                <ListItem>Three hundreds take away one hundred leaves 2 hundreds.</ListItem>
                                                <ListItem >Seven tens take away two tens gives 5 tens.</ListItem>
                                                <ListItem >Six ones take away five ones gives 1 one.</ListItem>
                                            </List>
                                            <iframe width="630" height="360" src="https://www.youtube.com/embed/iy7IimV7eao" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
