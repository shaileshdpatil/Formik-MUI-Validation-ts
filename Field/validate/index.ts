export const required = (value:any) => value ? "" : "This Field is Required";
export const shouldBeGrater = (advancedAge:number,retirementAge:number) => retirementAge < advancedAge  ? "" : "Advanced Age should greater than Retirement Age";
export const requiredNumber = (value:any) => value.length !== 0 ? "" : "This Field is Required";