import { parseBoolean } from "helpers/tableHelpers";
import { getDeepValue, mergeFields, formatTimestamp, checkDeepValue } from "helpers/tableHelpers";

export const headCellsUserTable = [
    { id: 'id', primary: true, numeric: false, disablePadding: false, label: 'ID' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email'},
    { id: 'role', numeric: false, disablePadding: false, label: 'Role', valueFunc: getDeepValue(['role', 'name'])},
    { id: 'name', numeric: false, disablePadding: false, label: 'Name', valueFunc: mergeFields('firstName', 'lastName') },
];

export const headCellsLectureTable = [
    { id: 'name', primary: false, numeric: false, disablePadding: false, label: 'Name' },
    { id: 'subject', primary: false, numeric: false, disablePadding: false, label: 'Subject'},
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated at' },
];

export const headCellsQuizTable = [
    { id: 'name', primary: true, numeric: false, disablePadding: false, label: 'Name' },
    { id: 'subject', primary: false, numeric: false, disablePadding: false, label: 'Subject' },
];
