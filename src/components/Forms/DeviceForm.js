import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, FormControl, FormHelperText, FormLabel, Input, InputLabel } from '@material-ui/core';
import BootstrapInput from 'components/BootstrapInput/BootstrapInput';
import Autocomplete from 'components/Autocomplete/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        position: 'relative',
        '& > *': {
            margin: theme.spacing(1),
            // width: '25ch',
        },

        "& legend.MuiFormLabel-root": {
            marginBottom: '10px'
        }
    },
    FormControl: {
        marginTop: "30px"
    },
    FormControlSizeHalf: {
        width: "47.5%",
    },
    nameInputWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    actionsBar: {
        marginTop: '25px',
        position: 'abosulte',
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
}));

const DeviceForm = ({ errors = {}, mode = 'new', users = [{ firstName: '', lastName: '' }], device, onSubmit }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        deviceId: "",
        type: "",
        phone: "",
        subType: "",
        name: "",
        notificationMessage: "",
        ownerUids: [],
    });

    React.useEffect(() => {
        if (device) {
            setFormData({ ...device })
        }
    }, [device]);

    const handleChange = (e) => {
        let val = e.target.value;
        const field = e.target.id;

        if (field === 'ownerUids') {
            val = val ? [val.uid] : [];
        }

        setFormData({
            ...formData,
            [field]: val
        });
    }

    const formatDisplayData = (data, type = 'user') => {
        if (!data) return '';
        if (type === 'user') {
            if (!data.firstName) return '';
            return data.firstName + " " + data.lastName
        }
    }

    const getDeviceOwner = () => {
        const ownerUid = formData?.ownerUids[0];
        if (!ownerUid) return {};

        const found = users?.find(u => u.uid === ownerUid);
        return found ? found : {};
    }

    // users without devices
    const filteredUsers = users?.filter(user => !user.devices || user.devices.length === 0)
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl error={errors["deviceId"]} required fullWidth>
                <InputLabel htmlFor="deviceId">Device ID</InputLabel>
                <Input id="deviceId" value={formData.deviceId} onChange={handleChange} />
                {errors["deviceId"] && <FormHelperText>Device ID cannot be empty</FormHelperText>}
            </FormControl>
            <div className={classes.nameInputWrapper}>
                <FormControl error={errors["type"]} required className={classes.FormControlSizeHalf} >
                    <InputLabel htmlFor="type">Device type (e.g. FALL_ALARM)</InputLabel>
                    <Input id="type" value={formData.type} onChange={handleChange} />
                    {errors["type"] && <FormHelperText>Type cannot be empty</FormHelperText>}
                </FormControl>
                <FormControl error={errors["subType"]} required className={classes.FormControlSizeHalf}>
                    <InputLabel htmlFor="subType">Device Subtype (e.g. WATCH)</InputLabel>
                    <Input id="subType" value={formData.subType} onChange={handleChange} />
                    {errors["subType"] && <FormHelperText>Subtype cannot be empty</FormHelperText>}
                </FormControl>
            </div>
            <div className={classes.nameInputWrapper}>
                <FormControl error={errors["name"]} required className={classes.FormControlSizeHalf} >
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" value={formData.name} onChange={handleChange} />
                    {errors["name"] && <FormHelperText>Name cannot be empty</FormHelperText>}
                </FormControl>
                <FormControl className={classes.FormControlSizeHalf}>
                    <InputLabel htmlFor="phone">Phone number</InputLabel>
                    <Input id="phone" value={formData.phone} onChange={handleChange} />
                </FormControl>
            </div>
            <FormControl fullWidth>
                <InputLabel htmlFor="notificationMessage">SOS alert message</InputLabel>
                <Input id="notificationMessage" value={formData.notificationMessage} onChange={handleChange} />
            </FormControl>
            <FormControl className={`${classes.margin} ${classes.FormControlSizeHalf}`} >
                <FormLabel component="legend">Owner</FormLabel>
                <Autocomplete displayFunc={formatDisplayData} key='ownerUids' val={getDeviceOwner()} data={filteredUsers} onChange={(e, value) => handleChange({ target: { value, id: 'ownerUids' } })} />
            </FormControl>
            <div className={classes.actionsBar}>
                <Button variant="contained" color="primary" onClick={() => onSubmit(formData)}>
                    {mode === 'new' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    );
}
export default DeviceForm;