import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

const AutocompleteMultiple = ({ data = [], selectedFunc, multiple, onChange, displayFunc, val }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Autocomplete
                value={val}
                multiple={!!multiple}
                getOptionLabel={o => displayFunc(o)}
                getOptionSelected={selectedFunc}
                options={data}
                filterSelectedOptions
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
                    />
                )}
            />
        </div>
    );
}

export default AutocompleteMultiple;
