import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { MdNavigateNext } from "react-icons/md";

export default function CustomBreadcrumbs({ paths }) {
  return (
    <Breadcrumbs
      separator={<MdNavigateNext size={20} />}
      aria-label="breadcrumb"
    >
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return isLast ? (
          <Typography key={index} color="text.primary" fontWeight={500}>
            {path.label}
          </Typography>
        ) : (
          <MuiLink
            key={index}
            component={RouterLink}
            to={path.href}
            underline="hover"
            color="inherit"
          >
            {path.label}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
}
