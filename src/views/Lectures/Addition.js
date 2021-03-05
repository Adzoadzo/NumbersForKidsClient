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

import image1 from "assets/img/addition-1.png";
import image2 from "assets/img/512.png";
import image3 from "assets/img/addition-3.png";
import image4 from "assets/img/addition-4.svg";
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
                            <h3 className={classes.cardTitleWhite}>Addition</h3>
                            <p className={classes.cardCategoryWhite}>Learn about addition</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer />

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Typography variant="h6" component="h4" style={{ marginTop: '30px', marginBottom: '20px' }}>
                                        Addition as combining
                                    </Typography>
                                    <Typography component="p">
                                        For now, we’ll focus on the base-10 system. Here’s how we think about the number 273 in that system:
                                    </Typography>
                                    <img src={image1} alt="273" style={{ width: '300px', marginTop: '30px' }} />
                                    <Typography component="p" style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        And here is the number 512:
                                    </Typography>
                                    <img src={image2} alt="512" style={{ width: '300px' }} />
                                    <Accordion defaultExpanded style={{ background: '#b2e8b6' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Example: 273+512</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.accordion}>
                                            <Typography>
                                                We can add these in the natural way: just combine the piles of dots. Since they’re already in place-value columns,
                                                we can combine dots from the two numbers that are in the same place-value box.
                                             </Typography>
                                            <img src={image3} style={{ marginTop: '20px', marginBottom: '20px', width: '300px' }} />
                                            <Typography>
                                                We can count up the answer: there are 7 dots in the hundreds box, 8 dots in the tens box, and 5 dots in the ones box.
                                            </Typography>
                                            <img src={image4} style={{ marginTop: '20px', marginBottom: '20px' }} />
                                            <Typography>
                                                And saying out the long way we have:
                                            </Typography>
                                            <List dense>
                                                <ListItem>Two hundreds plus five hundreds gives 7 hundreds.</ListItem>
                                                <ListItem >Seven tens plus one ten gives 8 tens.</ListItem>
                                                <ListItem >Three ones plus two ones gives 5 ones.</ListItem>
                                            </List>
                                            <Typography style={{ marginTop: '20px' }}>
                                                This gives the answer: <b>785.</b>
                                            </Typography>
                                            <iframe width="630" height="360" src="https://www.youtube.com/embed/h4FT4Lw8i7M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
