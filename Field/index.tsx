import React from 'react';
import PropTypes from 'prop-types';
import {connect, ErrorMessage, Field as FormikField} from "formik";
import {FormHelperText, InputLabel, Stack, TextField} from "@mui/material"
import {
    CustomAgeComponent,
    CustomInputComponent,
    CustomNumberComponent,
    FormControlSelect
} from "./CustomInputComponent";
import {SliderInputControl} from "./CustomInputComponent/SliderInputControl";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from "@mui/x-date-pickers";

const Field = (props:any) => {
    const {type, formik, name} = props;
    const {inputLabel,...rest} = props;
    const {errors, touched} = formik;
    const error = Boolean(errors[name] && touched[name]);

    let fieldItem = (
        <FormikField
            {...rest}
            error={Boolean(error)}
            as={CustomInputComponent}
        />
    )

    if (type === "age") {
        fieldItem = (
            <FormikField
                {...rest}
                error={Boolean(error)}
                as={CustomAgeComponent}
            />
        )
    }

    if (type === "number") {
        fieldItem = (
            <FormikField
                {...rest}
                error={Boolean(error)}
                as={CustomNumberComponent}
            />
        )
    }

    if (type === "select") {
        fieldItem = (
            <FormikField
                {...rest}
                error={Boolean(error)}
                as={FormControlSelect}
            />
        )
    }

    if (type === "slider") {
        fieldItem = (
            <FormikField
                {...rest}
                error={Boolean(error)}
                as={SliderInputControl}
            />
        )
    }

    if (type === 'date') {
        const value = props.formik.values[props.name];
        const touched = props.formik.touched[props.name];

        fieldItem = (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    {...rest}
                    value={value ? value : ""}
                    onChange={(value)=> {
                        props.formik.setFieldValue(props.name, value);
                    }}
                    slotProps={{
                        textField: {
                            size:"small",
                            fullWidth: true,    
                            variant: 'outlined',
                            error: !!(touched && !value),
                            sx:{
                                "& .MuiInputBase-root" : {
                                    borderRadius:"8px"
                                }
                            }
                        }
                    }}
                />
                {(touched && !value) && <FormHelperText error={true}>This Field is Required</FormHelperText>}
            </LocalizationProvider>
        )
    }

    return (
        <Stack sx={{...rest.sx,marginBottom:"8px"}}>
            {inputLabel && (
                <InputLabel
                    disabled={props.disabled}
                    sx={{ mb: 0.5, fontWeight: 500, color: "#203A56", fontSize: 12 }}
                >
                    {inputLabel}
                </InputLabel>
            )}
            {fieldItem}
            <ErrorMessage
                name={name}
                render={error => <FormHelperText error={Boolean(error)}>{error}</FormHelperText>}
            />
        </Stack>
    );
};

Field.propTypes = {
    type: PropTypes.oneOf([
        "password",
        "text",
        "select",
        "number",
        "date",
        "age",
        "slider",
    ]).isRequired,
    validate: PropTypes.func,
    label: PropTypes.string,
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string,
    sx: PropTypes.object,
    name: PropTypes.string.isRequired,
    notched: PropTypes.bool,
    isFloated: PropTypes.bool,
}
Field.defaultProps = {
    className: "mb-3",
    name: "default_name",
    sx: null,
    mb: 2
}
// @ts-ignore
export default connect(Field);