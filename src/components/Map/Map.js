import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import React, { useRef, useState } from 'react';

const HomeMarker = require("../../assets/icons/home-marker.svg");

const MapComponent = withScriptjs(withGoogleMap(({ showMarker, markers, markerIdToCenter }) => {

    const getMarkerIcon = (marker) => {
        switch (marker.icon) {
            case 'home':
                return HomeMarker
            default:
                return
        }
    }

    const getDefaultCenter = () => {
        const found = markers?.find(m => m.id === markerIdToCenter);
        if (found && found.lat) return { lat: +found.lat, lng: +found.lng }
        else return { lat: 46, lng: 18 }
    }

    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={getDefaultCenter()}
        >
            {showMarker && markers?.map(marker => {
                return <Marker key={marker.id} position={{ lat: +marker.lat, lng: +marker.lng }} icon={getMarkerIcon(marker)} />
            })}
        </GoogleMap>
    );
}));


export default MapComponent