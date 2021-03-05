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

import image1 from "assets/img/mul-1.png";
import image2 from "assets/img/mul-2.png";
import image3 from "assets/img/multi-5.svg";
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
                            <h3 className={classes.cardTitleWhite}>Multiplication</h3>
                            <p className={classes.cardCategoryWhite}>Learn about multiplication</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer />

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Typography variant="h6" component="h4" style={{ marginTop: '30px', marginBottom: '20px' }}>
                                        Multiplication as Repeated Addition
                                    </Typography>
                                    <img src={image1} alt="273" style={{ margin: '30px auto', display: 'block' }} />
                                    <img src={image2} alt="273" style={{ margin: '30px auto', display: 'block' }} />
                                    <Typography component="p">
                                        Jenny might have been thinking about multiplication as repeated addition.  If we have some number N and we multiply that number by 4, what we mean is:
                                    </Typography>
                                    <img src={image3} alt="512" style={{ margin: '10px auto', display: 'block' }} />
                                    <Typography component="p" style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        If we take the number 243192 and add it to itself four times using the “combining method,” we get
                                    </Typography>
                                    <List dense>
                                        <ListItem>2 + 2 + 2 + 2 = 8 ones,</ListItem>
                                        <ListItem >9 + 9 + 9 + 9 = 36 tens,</ListItem>
                                        <ListItem >1 + 1 + 1 + 1 = 4 hundreds,</ListItem>
                                        <ListItem >and so on.</ListItem>
                                    </List>
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
                                                Notice that we have used both × and · to represent multiplication. It’s a bit awkward to use × when you’re also using variables. Is it the letter x? Or the multiplication symbol ×?  It can be hard to tell!  In this case, the symbol · is more clear.
                                             </Typography>
                                            <Typography>
                                                We can even simplify the notation further, writing 4N instead of 4 · N. But of course we only do that when we are multiplying variables by some quantity. (We wouldn’t want 34 to mean 3 · 4, would we?)
                                             </Typography>
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
