import React, { useState } from "react";
import moment from 'moment';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import MapComponent from "components/Map/Map";
import CardHeader from "components/Card/CardHeader";
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";


const styles = (theme) => ({

});

const useStyles = makeStyles(styles);

function UserOverview({ user = {}, googleApiKey, position = {} }) {
    const [skip, setSkip] = useState(0)

    // formats the positionTimestamp to user readable format 
    const formatUpdateTimestamp = () => {
        if (user?.devices?.length) {
            if (moment(user?.devices[0]?.positionTimestamp).local().format('YYYY') === '2000') {
                return "Device has not sent updated yet";
            }
            return moment(user?.devices[0]?.positionTimestamp).local().format('YYYY-MM-DD') + " at " + moment(user?.devices[0]?.positionTimestamp).local().format('HH:mm:ss')
        }
    }

    const getBatteryStatus = () => {
        const lvl = user?.devices && user.devices[0].batteryAlarm
        switch (lvl) {
            case 0:
                return 'OK'
            case 1:
                return 'Less then 20%'
            case 2:
                return 'Very low!'
            default:
                break;
        }
    }

    const classes = useStyles();
    const active = user?.devices && user.devices[0].active
    const online = user?.devices && user.devices[0].online
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader>User status</CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Last update time</TableCell>
                                    <TableCell>{formatUpdateTimestamp()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Online</TableCell>
                                    <TableCell>{online ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Active</TableCell>
                                    <TableCell>{active ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Battery status</TableCell>
                                    <TableCell>{getBatteryStatus()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <MapComponent
                    markerIdToCenter={user?.isHome ? 'home' : 'user'}
                    markers={[
                        { id: 'home', lat: user?.homeAddress?.lat, lng: user?.homeAddress?.lng, icon: 'home' },
                        { id: 'user', lat: user?.isHome ? user?.homeAddress?.lat : position?.lat, lng: user?.isHome ? user?.homeAddress?.lng : position?.lng }
                    ]}
                    showMarker
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleApiKey}&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </GridItem>
        </GridContainer>
    );
}

export default UserOverview;
