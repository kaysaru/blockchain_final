import { Tab } from "@mui/material";
import Link from "react-router-dom"

interface LinkTabProps {
    label?: string;
    href?: string;
  }
  
  export default function LinkTab(props: LinkTabProps) {
    return (
      <Tab
        component="Link"
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }