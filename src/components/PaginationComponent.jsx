import React from "react";
import {
  Box,
  Pagination,
  Select,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";

const PaginationComponent = ({
  currentPage,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ py: 2 }}
    >
      {/* Left: showing item range */}
      <Typography variant="body2" color="text.secondary">
        {rowsPerPage * (currentPage - 1) + 1}–
        {Math.min(rowsPerPage * currentPage, totalItems)} of {totalItems} items
      </Typography>

      {/* Center: pagination numbers */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        siblingCount={1}
        boundaryCount={1}
        shape="circular"
        color="warning" // MUI warning color matches yellow/orange
        size="small"
        hideNextButton
        hidePrevButton
      />

      {/* Right: rows per page */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Show
        </Typography>

        <Select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
          variant="standard"
          disableUnderline
          size="small"
          sx={{
            color: "#EDA415",
            "& .MuiSelect-select": {
              padding: 0,
              minHeight: "auto",
            },
            "& .MuiSvgIcon-root": {
              color: "#EDA415",
            },
          }}
        >
          {[10, 20, 50, 100].map((count) => (
            <MenuItem
              key={count}
              value={count}
              sx={{
                color: "#EDA415",
              }}
            >
              {count} rows
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Stack>
  );
};

export default PaginationComponent;
