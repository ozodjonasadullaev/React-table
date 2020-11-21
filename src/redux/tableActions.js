import {
    ADD_ROW,
    DELETE_ROW,
    GET_ROW,
    EDIT_ROW,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ROW,
    SET_LOADING,
    STOP_LOADING,
} from './types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const addRow = (data, id) => {
    data.delete = <DeleteIcon className='delete' />;
    data.edit = <EditIcon className='edit' />;
    data.id = id;

    return dispatch => {
        dispatch({
            type: ADD_ROW,
            payload: data,
        });
    };
};
export const deleteRow = id => {
    return {
        type: DELETE_ROW,
        payload: parseInt(id),
    };
};
export const updateRow = data => {
    data.delete = <DeleteIcon className='delete' />;
    data.edit = <EditIcon className='edit' />;

    return dispatch => {
        dispatch({
            type: UPDATE_ROW,
            payload: data,
        });
    };
};
// export const updateRow = row => {
//     return {
//         type: UPDATE_ROW,
//         payload: row,
//     };
// };
export const editRow = id => {
    return {
        type: EDIT_ROW,
        payload: id,
    };
};
export const getRow = () => {
    return dispatch => {
        dispatch({
            type: GET_ROW,
        });
    };
};
export const setCurrent = row => {
    return dispatch => {
        dispatch({
            type: SET_CURRENT,
            payload: row,
        });
    };
};
export const clearCurrent = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_CURRENT,
        });
    };
};
export const setLoading = () => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
        });
    };
};
export const stopLoading = () => {
    return dispatch => {
        dispatch({
            type: STOP_LOADING,
        });
    };
};
