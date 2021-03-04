import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Input, InputLabel, MenuItem, NativeSelect, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        position: 'relative',
        marginTop: '15px',
        '& > *': {
            margin: theme.spacing(1),
            // width: '25ch',
        },
        "& legend.MuiFormLabel-root": {
            marginBottom: '10px'
        },
    },
    FormControl: {
        marginTop: "30px"
    },
    permissions: {
        marginTop: '25px',
    },
    FormControlSizeHalf: {
        width: "47.5%",
    },
    nameInputWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    nameInputWrapperCol: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    actionsBar: {
        position: 'abosulte',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '50px',
        marginBottom: '15px',

        "& button": {
            marginLeft: '20px'
        }

    },
    fileUploadZone: {
        height: '115px',
        minHeight: '115px',
        width: '22.5vw',
        marginTop: '15px',

        "& .MuiDropzoneArea-textContainer": {
            fontSize: '1.1em',

            "& .MuiDropzoneArea-icon": {
                width: '30px',
                height: '30px'
            }
        }
    },
    fileUploadZoneParagraph: {
        fontSize: '1.1em',
        marginTop: '10px',
        marginBottom: '10px'
    }
}));

const UserForm = ({
    errors = {},
    mode = 'new',
    tab,
    googleApiKey,
    user,
    users,
    setFormMode,
    onSubmit,
    setErrors
}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        roleId: 2,
        password: '',
        confirmPassword: '',
    });

    // get current user if not in store
    React.useEffect(() => {
        setFormData({ ...user })
    }, [user, tab]);

    const handleChange = (e) => {
        let val = e.target.value;
        const field = e.target.id;

        setFormData({
            ...formData,
            [field]: val
        });
    }

    const handleCheckboxChange = (val, name) => {
        if (name === 'isTeacher') {
            setFormData({
                ...formData,
                roleId: val ? 1 : 2,
            });
            return;
        }

        // inverted logic
        if (!val) {
            setFormData({
                ...formData,
                ignoredNotifications: [...formData.ignoredNotifications, name]
            });
        } else {
            const i = formData.ignoredNotifications.indexOf(name);
            if (i > -1) {
                setFormData({
                    ...formData,
                    ignoredNotifications: [
                        ...formData.ignoredNotifications.slice(0, i),
                        ...formData.ignoredNotifications.slice(i + 1, formData.ignoredNotifications.length)
                    ]
                });
            }
        }
    }

    const setHomeAddressHandler = (address, details) => {
        setFormData({
            ...formData,
            homeAddress: {
                description: address.description,
                id: address.place_id,
                lat: details?.geometry?.location.lat(),
                lng: details?.geometry?.location.lng()
            }
        });
    }

    const formatDisplayData = (data, type = 'user') => {
        if (!data) return '';
        if (type === 'user') {
            if (!data.firstName) return '';
            return data?.firstName + " " + data?.lastName
        }
    }

    const userComparator = (o, v) => {
        return o.uid === v.uid
    }

    if (mode === 'edit-password') {
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div className={classes.nameInputWrapperCol}>
                    <FormControl error={errors["password"]} required className={classes.FormControlSizeHalf} >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input type="password" id="password" value={formData.password} onChange={handleChange} />
                        {errors["password"] && <FormHelperText>{errors["password"]}</FormHelperText>}
                    </FormControl>
                    <br />
                    <FormControl error={errors["confirmPassword"]} required className={classes.FormControlSizeHalf}>
                        <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                        <Input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        {errors["confirmPassword"] && <FormHelperText>{errors["confirmPassword"]}</FormHelperText>}
                    </FormControl>
                </div>


                <div className={classes.actionsBar}>
                    <Button variant="contained" color="primary" onClick={() => setFormMode("edit")}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onSubmit(formData)}>
                        Set password
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl error={errors["email"]} required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" value={formData.email} onChange={handleChange} />
                {errors["email"] && <FormHelperText>{errors["email"]}</FormHelperText>}
            </FormControl>
            {mode === 'new' && <div className={classes.nameInputWrapper}>
                <FormControl error={errors["password"]} required className={classes.FormControlSizeHalf} >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id="password" value={formData.password} onChange={handleChange} />
                    {errors["password"] && <FormHelperText>{errors["password"]}</FormHelperText>}
                </FormControl>
                <FormControl error={errors["confirmPassword"]} required className={classes.FormControlSizeHalf}>
                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                    <Input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors["confirmPassword"] && <FormHelperText>{errors["confirmPassword"]}</FormHelperText>}
                </FormControl>
            </div>}
            <div className={classes.nameInputWrapper}>
                <FormControl error={errors["firstName"]} required className={classes.FormControlSizeHalf} >
                    <InputLabel htmlFor="firstName">First name</InputLabel>
                    <Input id="firstName" value={formData.firstName} onChange={handleChange} />
                    {errors["firstName"] && <FormHelperText>{errors["firstName"]}</FormHelperText>}
                </FormControl>
                <FormControl error={errors["lastName"]} required className={classes.FormControlSizeHalf}>
                    <InputLabel htmlFor="lastName">Last name</InputLabel>
                    <Input id="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors["lastName"] && <FormHelperText>{errors["lastName"]}</FormHelperText>}
                </FormControl>
            </div>
            <FormControl className={`${classes.margin} ${classes.permissions}`} fullWidth>
                <FormLabel component="legend">Permissions</FormLabel>
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={formData?.roleId === 1} onChange={(e, val) => handleCheckboxChange(val, 'isTeacher')} name="isTeacher" />}
                        label="Teacher"
                    />
                </FormGroup>
                <FormHelperText></FormHelperText>
            </FormControl>
            <div className={classes.actionsBar}>
                {mode === 'edit' && <Button variant="contained" color="primary" onClick={() => setFormMode("edit-password")}>
                    Change password
                </Button>}
                <Button variant="contained" color="primary" onClick={() => onSubmit(formData)}>
                    {mode === 'new' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form >
    );
}
export default UserForm;