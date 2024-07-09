import { styled } from "@mui/material";

 const VisualHiddenInput =styled("input") ({
    border:0,
    clip:"react(0 0 0 0)",
    height:1,
    margin:-1,
    width:1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    whiteSpace:"nowrap",
})

export default VisualHiddenInput;