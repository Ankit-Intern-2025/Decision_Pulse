import { alpha, styled, Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "#095458",
      '&:hover': {
        backgroundColor: alpha("#095458", theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#095458",
    },
  }));

  export {
    CustomSwitch
  }