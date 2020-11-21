import {
    ADD_ROW,
    DELETE_ROW,
    GET_ROW,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ROW,
    SET_LOADING,
    STOP_LOADING,
} from './types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const initialState = {
    tableRows: [
        {
            id: 1,
            first_name: 'Stephanus',
            last_name: 'Pehrsson',
            email: 'spehrsson0@twitter.com',
            gender: 'Male',
            phone: '2149885989',
            country: 'South Africa',
            edit: <EditIcon className='edit' />,
            delete: <DeleteIcon className='delete' />,
        },
        {
            id: 2,
            first_name: 'Druci',
            last_name: 'Cudihy',
            email: 'dcudihy1@usatoday.com',
            gender: 'Female',
            phone: '5434414980',
            country: 'Indonesia',
            edit: <EditIcon className='edit' />,
            delete: <DeleteIcon className='delete' />,
        },
        {
            id: 3,
            first_name: 'Glyn',
            last_name: 'Lemmen',
            email: 'glemmen2@ihg.com',
            gender: 'Female',
            phone: '8676394646',
            country: 'Palestinian Territory',
            edit: <EditIcon className='edit' />,
            delete: <DeleteIcon className='delete' />,
        },
    ],
    current: null,
    loading: false,
};
const TableReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROW:
            return {
                ...state,
            };
        case ADD_ROW:
            return {
                ...state,
                tableRows: [...state.tableRows, action.payload],
            };
        case UPDATE_ROW:
            return {
                ...state,
                tableRows: state.tableRows.map(row =>
                    row.id === action.payload.id ? action.payload : row
                ),
                current: null,
            };
        case SET_CURRENT:
            return {
                ...state,
                current: {
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    country: action.payload.country,
                    gender: action.payload.gender,
                    phone: action.payload.phone,
                    email: action.payload.email,
                    id: action.payload.id,
                },
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            };
        case DELETE_ROW:
            return {
                ...state,
                tableRows: state.tableRows.filter(
                    row => row.id !== action.payload
                ),
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
export default TableReducer;
