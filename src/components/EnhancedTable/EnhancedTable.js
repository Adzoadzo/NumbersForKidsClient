import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "components/CustomButtons/Button.js";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import { CircularProgress, FormGroup, FormHelperText, FormLabel, Grid, InputAdornment, Menu, TextField } from '@material-ui/core';
import { Close, RowingOutlined, Search } from '@material-ui/icons';
import { DateTimePicker } from "@material-ui/pickers";
import GridItem from 'components/Grid/GridItem';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells,
        editActionHandler,
        disableSelection,
        itemActions
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {!disableSelection && <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />

                </TableCell>}
                {editActionHandler && <TableCell padding="checkbox"></TableCell>}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {itemActions?.length > 0 && <TableCell
                    key='item_actions'
                    align='center'
                    padding='default'
                >
                    Actions
                    </TableCell>}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        marginBottom: "10px",
    },
    datePicker: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        bottom: '90px',

        "& .MuiInputBase-root": {
            fontSize: '.8rem'
        }
    },
    checkboxOptions: {
        flex: '1 1 150%',
        top: '11px',
        position: 'relative',
        justifyContent: 'flex-end',

        '& legend': {
            position: 'absolute',
            top: '-7.5px',
            right: '195px'
        },

        "& .MuiFormLabel-root": {
            fontSize: '.8rem',
            margin: '0',
        },
        "& .PrivateSwitchBase-root-24": {
            padding: '7px'
        },
        "& .MuiSvgIcon-root": {
            width: '.75em',
        },
        "& .MuiTypography-body1": {
            fontSize: '.8rem',
        }
    },

    filterSearch: {
        flex: '1 1 85%',
        opacity: '.8',
        width: "250px",
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
        "& label + .MuiInput-formControl": {
            marginTop: 0,
        },
        "& .MuiInputBase-root": {
            fontSize: '.95em',
        },
        "& .MuiInputLabel-formControl": {
            transform: "translate(0, 10px) scale(1)",
        },
        "& .MuiSvgIcon-root": {
            width: ".9em"
        },
        "& svg": {
            transform: "translate3d(3.5px, 7px, 0px)",
        },
        "& .MuiFormHelperText-root": {
            position: 'absolute',
            bottom: '-20px'
        }
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 40%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        numSelected,
        showFilterDrawer,
        deleteHandler,
        selectedFilter,
        filterHandler,
        tableTitle = '',
        pageLoading,
        checkboxOptions,
        handleFromDateChange,
        handleToDateChange,
        selectedToDate,
        selectedFromDate,
        showFilterList
    } = props;


    const filterKeyHandler = (e, key) => {
        if (e.key === 'Enter')
            filterHandler(e);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {tableTitle}
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={deleteHandler}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <React.Fragment>
                        {checkboxOptions &&
                            <Grid className={classes.checkboxOptions} container spacing={1} alignItems="flex-end">
                                <FormLabel component="legend">{checkboxOptions.label}</FormLabel>
                                <FormGroup row>
                                    {checkboxOptions.options.map(cb =>
                                        <FormControlLabel disabled={pageLoading} key={cb.name} control={<Checkbox defaultChecked={cb.defaultChecked} onChange={(e, val) => cb.callback(e, cb, val)} name={cb.name} />} label={cb.label} />)}
                                </FormGroup>
                                <FormHelperText></FormHelperText>
                            </Grid>
                        }
                        <Grid className={classes.datePicker} container spacing={1} alignItems="flex-end">
                            {handleFromDateChange && <GridItem>
                                <DateTimePicker
                                    autoOk
                                    clearable='true'
                                    variant="inline"
                                    ampm={false}
                                    disableFuture
                                    value={selectedFromDate}
                                    onChange={handleFromDateChange}
                                    label="get from"
                                    InputProps={selectedFromDate ? {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size="small" onClick={() => handleFromDateChange(null)}>
                                                    <Close />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    } : {}}
                                />
                            </GridItem>}
                            {handleToDateChange && <GridItem>
                                <DateTimePicker
                                    autoOk
                                    clearable
                                    ampm={false}
                                    disableFuture
                                    value={selectedToDate}
                                    onChange={handleToDateChange}
                                    label="get to"
                                    InputProps={selectedToDate ? {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size="small" onClick={() => handleToDateChange(null)} >
                                                    <Close />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    } : {}}
                                />
                            </GridItem>}

                        </Grid>
                        <Grid className={classes.filterSearch} container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <Search />
                            </Grid>
                            <Grid item>
                                <TextField disabled={pageLoading} id="filter-input" onKeyDown={filterKeyHandler} onChange={filterHandler} placeholder="Search.." helperText={selectedFilter ? `Filter: ${selectedFilter}` : ""} />
                            </Grid>
                        </Grid>
                        {showFilterList && <Tooltip title="Filter list" onClick={(e) => showFilterDrawer(e.currentTarget)}>
                            <IconButton aria-label="filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>}
                    </React.Fragment>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    selected: {
        boxShadow: "0 12px 20px - 10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0, .12), 0 7px 8px - 5px rgba(0, 172, 193,.2)",
        background: "#00acc1",
    },
    paper: {
        position: 'relative',
        width: '100%',
        overflow: 'visible',
        marginBottom: theme.spacing(2),

        "& td": {
            fontSize: '.825rem'
        },

        "& th": {
            fontSize: '.825rem'
        }
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    noWrap: {
        whiteSpace: 'nowrap'
    },
    editActionIcon: {
        fontSize: '.8em',
    },
    editActionButton: {
        padding: '7.5px',
    },
    noItemsText: {
        whiteSpace: 'nowrap',
        display: 'block',
        position: 'absolute',
        left: '50%',
        top: '40%',
    },
    loader: {
        width: '50px',
        height: '50px',
        display: 'block',
        position: 'absolute',
        left: '50%',
        top: '40%',
    }
}));

export default function EnhancedTable(props) {
    const {
        rows,
        headCells,
        keyProp = 'id',
        secKeyProp,
        deleteActionHandler,
        checkboxOptions,
        tableTitle,
        defaultDense,
        toDateChangeCallback,
        fromDateChangeCallback,
        pageLoading,
        editActionHandler,
        sortChangeHandler,
        totalSize,
        disableSelection,
        filterOptions = [],
        filterActionHandler,
        rowsPerPageOptions = [5, 10, 25, 50],
        rowsPerPage,
        setRowsPerPage,
        page,
        itemActions,
        setPage
    } = props
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedFilter, setSelectedFilter] = React.useState(filterOptions[0]);
    const [filterValue, setFilterValue] = React.useState(null);
    const [selectedToDate, setToDate] = React.useState(null)
    const [selectedFromDate, setFromDate] = React.useState(null)

    React.useEffect(() => {
        if (defaultDense) setDense(true);
    }, [defaultDense]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const deselectAll = () => {
        setSelected([]);
    }

    const handleClick = (event, name) => {
        if (disableSelection) return;
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        if (pageLoading) return
        setPage(page, newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleFilterItemClick = (e) => {
        setSelectedFilter(e.target.textContent);
        setAnchorEl(null);
    }

    const getCellValue = (row, cell) => {
        if (!cell.valueFunc) return row[cell.id]
        else return cell.valueFunc(row);
    }

    const deleteHandler = (e) => {
        if (deleteActionHandler) {
            deselectAll();
            deleteActionHandler(e, selected);
        }
    }

    const editHandler = (e, item) => {
        if (editActionHandler) {
            deselectAll();
            editActionHandler(e, item);
        }
    }

    const handleToDateChange = (val) => {
        setToDate(val);
        toDateChangeCallback(val);
    }

    const handleFromDateChange = (val) => {
        setFromDate(val);
        fromDateChangeCallback(val);
    }

    const getCellTooltipText = (row, cell) => {
        if (!cell?.tooltipFunc) return '';
        else return cell.tooltipFunc(row);
    }

    const filterHandler = (e) => {
        setFilterValue(e.target.value);

        if (filterActionHandler)
            filterActionHandler(e, selectedFilter, e.target.value);
    }

    const getRowKey = (row) => {
        return secKeyProp ? `${row[keyProp]}-${row[secKeyProp]}` : row[keyProp];
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = rows && rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    pageLoading={pageLoading}
                    handleFromDateChange={fromDateChangeCallback && handleFromDateChange}
                    handleToDateChange={toDateChangeCallback && handleToDateChange}
                    selectedToDate={selectedToDate}
                    selectedFromDate={selectedFromDate}
                    showFilterList={filterOptions?.length > 1}
                    checkboxOptions={checkboxOptions}
                    tableTitle={tableTitle}
                    numSelected={selected.length}
                    deleteHandler={deleteHandler}
                    filterOptions={filterOptions}
                    showFilterDrawer={setAnchorEl}
                    selectedFilter={selectedFilter}
                    filterHandler={filterHandler}
                />
                {pageLoading && <CircularProgress className={classes.loader} />}
                {!pageLoading && rows.length < 1 &&
                    <Typography className={classes.noItemsText} component='div' variant='subtitle2' >
                        No rows found
                    </Typography>}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            itemActions={itemActions}
                            disableSelection={disableSelection}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                            editActionHandler={editActionHandler}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row[keyProp]);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row[keyProp])}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={getRowKey(row)}
                                            selected={isItemSelected}
                                        >
                                            {!disableSelection &&
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>}
                                            {editActionHandler && <TableCell padding="checkbox">
                                                <Tooltip title="Edit">
                                                    <IconButton className={classes.editActionButton} color="primary" aria-label="edit" onClick={(e) => editHandler(e, row)} >
                                                        <EditIcon className={classes.editActionIcon} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>}
                                            {headCells && headCells.map(cell => cell.primary &&
                                                <Tooltip key={cell.id} open={cell.tooltipFunc ? undefined : false} title={getCellTooltipText(row, cell)}>
                                                    <TableCell className={cell.noWrap ? classes.noWrap : ''} id={labelId} scope="row" padding={cell.disablePadding ? 'none' : 'default'}>
                                                        {getCellValue(row, cell)}
                                                    </TableCell>
                                                </Tooltip>
                                            )}
                                            {headCells && headCells.filter(cell => !cell.primary).map(cell =>
                                                <Tooltip key={cell.id} open={cell.tooltipFunc ? undefined : false} title={getCellTooltipText(row, cell)}>
                                                    <TableCell align="left">
                                                        {getCellValue(row, cell)}
                                                    </TableCell>
                                                </Tooltip>
                                            )}
                                            {itemActions?.length > 0 &&
                                                <TableCell align="center">
                                                    {itemActions.map(action => <Button onClick={() => action?.handler(row)} size="sm" color="primary" >{action.name}</Button>)}
                                                </TableCell>

                                            }


                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    nextIconButtonProps={{ disabled: pageLoading || (page + 1) * rowsPerPage >= (totalSize || rows.length) }}
                    backIconButtonProps={{ disabled: pageLoading || (page + 1) * rowsPerPage - rowsPerPage <= 0 }}
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={totalSize || rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {filterOptions.map(option =>
                    <MenuItem key={option} onClick={handleFilterItemClick}>{option}</MenuItem>
                )}
            </Menu>
        </div>
    );
}