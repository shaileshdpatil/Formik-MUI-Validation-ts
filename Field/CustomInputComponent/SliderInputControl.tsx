import {Grid,Slider, TextField} from "@mui/material";

export const SliderInputControl = (props: any) => {
    let value: any = props.value ? parseInt(props.value) : 0;
    const {InputProps, isFloated, ...rest} = props;
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item md={9}>
               <div style={{paddingLeft: "10px",paddingRight: "11px"}}>
                   <Slider
                       size="small"
                       sx={{
                           ".MuiSlider-rail":{ height:4 },
                           ".MuiSlider-markLabelActive":{
                               right:"unset !important",
                               left:"5px"
                           },
                           ".MuiSlider-markLabel":{
                               right:"-40px"
                           }
                       }}
                       marks={[
                           {
                               value: 0,
                               label: '0',
                           },
                           {
                               value: 100,
                               label: '100',
                           },
                       ]}
                       value={value}
                       onChange={(e:any)=>{
                           value = e.target ? parseInt(e.target.value) : 0;
                           props.formik.setFieldValue(props.name, value);
                       }}
                   />
               </div>
            </Grid>
            <Grid item md={3}>
                <TextField
                    {...rest}
                    sx={{
                        "& .MuiInputBase-root": {
                            borderRadius: "8px"
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
                    onChange={(e: any) => {
                        value = isFloated ? parseFloat(e.target.value) : parseInt(e.target.value);
                        if (isNaN(value)) value = 0;
                        if (value < props.min) value = 0;
                        if (value > props.max) value = props.max;
                        props.formik.setFieldValue(props.name, value);
                    }}
                />
            </Grid>
        </Grid>
    );
}