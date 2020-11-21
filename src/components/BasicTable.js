import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import {
    getRow,
    deleteRow,
    setCurrent,
    clearCurrent,
} from '../redux/tableActions';

import { COLUMNS } from './columns';
import './basicTable.css';
import Spinner from './Spinner';

function BasicTable(props) {
    useEffect(() => {
        props.getRow();

        // eslint-disable-next-line
    }, []);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => props.tableRows, [props.tableRows]);
    const tableInstance = useTable({
        columns,
        data,
    });
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    const clickHandler = e => {
        if (
            e.target.tagName === 'path' &&
            e.target.parentElement.classList.contains('delete')
        ) {
            props.deleteRow(
                e.target.parentElement.parentElement.parentElement.firstChild
                    .innerText
            );
            props.clearCurrent();
        }
        if (
            e.target.tagName === 'path' &&
            e.target.parentElement.classList.contains('edit')
        ) {
            let currentRow = [];
            let rowId = parseInt(
                e.target.parentElement.parentElement.parentElement.firstChild
                    .innerText
            );

            currentRow = rows.filter(row => {
                return row.values.id === rowId;
            });

            props.setCurrent(currentRow[0].values);
        }
    };

    return props.loading === true ? (
        <Spinner />
    ) : (
        <div>
            <table {...getTableProps}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            onClick={clickHandler}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
const mapStateToProps = state => ({
    tableRows: state.tableRows,
    loading: state.loading,
});

export default connect(mapStateToProps, {
    getRow,
    deleteRow,
    setCurrent,
    clearCurrent,
})(BasicTable);
