import {
    FilledInput,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Select,
    TextField
} from "@mui/material";
import {ChangeEvent, useState} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const CustomInputComponent = (props:any) => {
    return (
        <TextField
            {...props}
            sx={{
                "& .MuiInputBase-root" : {
                    borderRadius:"8px"
                }
            }}
            size="small"
            InputLabelProps={{shrink: true}}
        />
    );
}

export const CustomAgeComponent = (props:any) => {
    let value = props.value ? parseInt(props.value) : 0;
    return (
        <TextField
            {...props}
            size="small"
            sx={{
                "& .MuiInputBase-root" : {
                    borderRadius:"8px"
                }
            }}
            onKeyDown={(event) => {
                if (event.key === '.') {
                    event.preventDefault();
                }
            }}
            onChange={(e:any)=>{
                value = parseInt(e.target.value);
                if (isNaN(value)) value = props.min;
                if (value > props.max) value = props.max;
                if (value < props.min) value = props.min;
                props.formik.setFieldValue(props.name, value);
            }}
            InputProps={{
                endAdornment: <InputAdornment position="start">
                    <IconButton
                        disabled={value === props.min}
                        onClick={()=>props.formik.setFieldValue(props.name, value-1)}
                        sx={{height:30,width:30}}
                    > -
                    </IconButton>
                    <IconButton
                        disabled={value === props.max}
                        onClick={()=>props.formik.setFieldValue(props.name, value+1)}
                        sx={{height:30,width:30}}
                    > +
                    </IconButton>
                </InputAdornment>,
            }}
        />
    );
}

export const CustomNumberComponent = (props:any) => {
    let value:any = props.value ? parseInt(props.value) : 0;
    const {InputProps,isFloated,...rest} = props;
    return (
        <TextField
            {...rest}
            sx={{
                "& .MuiInputBase-root" : {
                    borderRadius:"8px",
                    paddingRight:0
                },
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                },
                "& input[type=number]": {
                    MozAppearance: "textfield",
                },
            }}
            size="small"
            onKeyDown={(event) => {
                if (event.key === '.' && !isFloated) {
                    event.preventDefault();
                }
            }}
            onChange={(e:any)=> {
                value = isFloated ? parseFloat(e.target.value) : parseInt(e.target.value);
                if (isNaN(value)) value = "";
                if (value < props.min) value = "";
                if (props.max && (value > props.max)) value = props.max;
                props.formik.setFieldValue(props.name, value);
            }}
            InputProps={{
                ...InputProps,
                endAdornment: <InputAdornment position="start">
                    <IconButton
                        disabled={value === props.min}
                        onClick={()=>props.formik.setFieldValue(props.name, value-1)}
                        sx={{height:30,width:30}}
                    >
                        -
                    </IconButton>
                    <IconButton
                        onClick={()=>props.formik.setFieldValue(props.name, value+1)}
                        sx={{height:30,width:30}}
                    >
                        +
                    </IconButton>
                </InputAdornment>,
            }}
        />
    );
}

export const CustomPasswordComponent = (props:any) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordField = () => {
        setShowPassword(!showPassword);
    }
    return (
        <TextField
            {...props}
            type={showPassword ? "text" : "password"}
            InputLabelProps={{shrink: true}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={togglePasswordField}
                            edge="end"
                        >
                            {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </IconButton>
                    </InputAdornment>),
            }}
        />
    );
}

export const FormControlSelect = (props:any) => {
    const {children, selectsx, notched, ...rest} = props;
    return (
        <FormControl sx={{opacity: rest.disabled ? 0.6 : 1, ...props.selectsx}} size={props.size}>
            {props.label && notched && <InputLabel shrink={!!notched}>{props.label}</InputLabel>}
            <Select
                {...rest}
                size="small"
                notched={!!notched}
                style={{borderRadius: '8px'}}
                sx={{
                    '& .MuiSelect-select .notranslate::after': props.placeholder
                        ? {
                            content: `"${props.placeholder}"`,
                            opacity: 0.42,
                        }
                        : {},
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 250,
                        },
                    },
                }}
            >
                {children}
            </Select>
        </FormControl>
    );
}