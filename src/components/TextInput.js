import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    addRow,
    setLoading,
    stopLoading,
    updateRow,
} from '../redux/tableActions';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, Radio, Select, MenuItem } from '@material-ui/core';
import * as Yup from 'yup';
import country_list from './country';
import './App.css';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = Yup.object().shape({
    first_name: Yup.string().required('First name required'),
    last_name: Yup.string().required('Last name required'),
    phone: Yup.string()
        .required('Enter your phone')
        .matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().required('Email required').email(),
});

let initialValues = {
    first_name: '',
    last_name: '',
    gender: 'Male',
    country: 'Uzbekistan',
    phone: '',
    email: '',
};
const clearInputs = () => {
    return (initialValues = {
        first_name: '',
        last_name: '',
        gender: 'Male',
        country: 'Uzbekistan',
        phone: '',
        email: '',
    });
};

const TextInput = ({
    current,
    tableRows,
    setLoading,
    stopLoading,
    addRow,
    updateRow,
}) => {
    useEffect(() => {
        if (current !== null) {
            initialValues = current;
        }
    }, [current]);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
                resetForm();
                clearInputs();
                setLoading();
                setTimeout(() => {
                    stopLoading();
                }, 2000);
                console.log(values);
                current !== null
                    ? updateRow(values)
                    : addRow(
                          values,
                          tableRows.length === 0
                              ? 1
                              : parseInt(tableRows[tableRows.length - 1].id) + 1
                      );
            }}
        >
            {({ handleSubmit, errors, touched }) => {
                return (
                    <Form className={'form-wrapper'} onSubmit={handleSubmit}>
                        <div className={'text names'}>
                            <Field
                                placeholder='First name'
                                name='first_name'
                                type='input'
                                as={TextField}
                                id='standard-full-width'
                                fullWidth={true}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin='normal'
                            />
                            {errors.first_name && touched.first_name && (
                                <small className={'error'}>
                                    {errors.first_name}
                                </small>
                            )}
                        </div>
                        <div className={'text names'}>
                            <Field
                                name='last_name'
                                type='input'
                                as={TextField}
                                placeholder='Last Name'
                                id='standard-full-width'
                                fullWidth={true}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin='normal'
                            />
                            {errors.last_name && touched.last_name && (
                                <small className={'error'}>
                                    {errors.last_name}
                                </small>
                            )}
                        </div>
                        <div className={'text gender'}>
                            <label className={'main'} htmlFor='gender'>
                                Gender:{' '}
                            </label>
                            <div>
                                <label htmlFor='male'>Male</label>
                                <Field
                                    name='gender'
                                    type='radio'
                                    value='Male'
                                    as={Radio}
                                />
                                <label htmlFor='female'>Female</label>
                                <Field
                                    name='gender'
                                    type='radio'
                                    value='female'
                                    as={Radio}
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                        <div className={'text country'}>
                            <label className={'main'} htmlFor='country'>
                                Country:{' '}
                            </label>
                            <Field
                                name='country'
                                type='select'
                                as={Select}
                                fullWidth={true}
                            >
                                {country_list.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Field>
                        </div>
                        <div className={'text phone'}>
                            <Field
                                placeholder='Phone'
                                name='phone'
                                type='input'
                                as={TextField}
                                id='standard-full-width'
                                fullWidth={true}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin='normal'
                            />
                            {errors.phone && touched.phone && (
                                <small className={'error'}>
                                    {errors.phone}
                                </small>
                            )}
                        </div>
                        <div className={'text email'}>
                            <Field
                                placeholder='Email'
                                name='email'
                                type='input'
                                as={TextField}
                                id='standard-full-width'
                                fullWidth={true}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin='normal'
                            />
                            {errors.email && touched.email && (
                                <small className={'error'}>
                                    {errors.email}
                                </small>
                            )}
                        </div>
                        <div className='text'>
                            {current !== null ? (
                                <Button
                                    className={'submit-btn'}
                                    type={'submit'}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    className={'submit-btn'}
                                    type={'submit'}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};
const mapStateToProps = state => ({
    tableRows: state.tableRows,
    current: state.current,
});
export default connect(mapStateToProps, {
    addRow,
    setLoading,
    stopLoading,
    updateRow,
})(TextInput);
