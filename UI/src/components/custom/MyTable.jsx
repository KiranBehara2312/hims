import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  Divider,
  Pagination,
  Popover,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { camelToTitle, convertMongoDBDate } from "../../helpers";
import { alpha } from "@mui/material/styles";
import MyHeading from "./MyHeading";
import { FaCircle } from "react-icons/fa";

export default function ({
  columns = [],
  data = [],
  totalPages = 1,
  totalRecords = 0,
  currentPage = 1,
  isServerSidePagination = true,
  changedPage = () => {},
  actions = [],
  helperNote = "",
  actionWithRecord = () => {},
  ...props
}) {
  const [localPage, setLocalPage] = React.useState(1);
  const [localData, setLocalData] = React.useState([]);
  const [anchorPosition, setAnchorPosition] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);

  React.useEffect(() => {
    if (isServerSidePagination) {
      console.log(data);
      setLocalData(data);
    } else {
      setLocalData(localPagination(data, 1, 10));
    }
  }, [data]);

  function localPagination(array, pageNumber, limit) {
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;
    return array.slice(startIndex, endIndex);
  }

  const paginationChangeHandler = (event, value) => {
    if (isServerSidePagination) {
      changedPage(value);
    } else {
      setLocalPage(value);
      setLocalData(localPagination(data, value, 10));
    }
  };

  const openActions = (event, row) => {
    if (actions?.length === 0) return;
    event.preventDefault();
    setSelectedRow(row);
    const { clientX, clientY } = event;
    setAnchorPosition({ top: clientY, left: clientX });
  };

  const closeActions = () => {
    setAnchorPosition(null);
    setSelectedRow(null);
  };

  const actionClickHandler = (action, modalWidth) => {
    actionWithRecord(action, modalWidth, selectedRow);
    closeActions();
  };

  const convertDisplayValueBasedOnType = (val) => {
    if (typeof val === "boolean") {
      return val ? "Yes" : "No";
    } else if (Array.isArray(val)) {
      return val.join(", ");
    } else {
      return val;
    }
  };

  const getCountInformation = () => {
    if (data?.length === 0) {
      return "";
    }
    let string = "";
    const startRecord = (currentPage - 1) * 10 + 1;
    const endRecord = Math.min(currentPage * 10, totalRecords);
    string += `${startRecord} - ${endRecord} rows of ${totalRecords}`;
    return string;
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead
            sx={{
              background: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.minWidth,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {camelToTitle(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {localData?.length === 0 && (
              <TableRow hover role="checkbox">
                <TableCell>No Data Found...!</TableCell>
              </TableRow>
            )}
            {localData?.map((row, i) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={i}
                  onContextMenu={(event) => openActions(event, row)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        title={value?.length > 25 ? value : ""}
                        key={column.id}
                        align={column.align}
                        sx={{
                          maxWidth: column.minWidth,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {column.colorCoded && (
                          <FaCircle
                            color={value}
                            size={15}
                            style={{ marginRight: "10px" }}
                          />
                        )}
                        {column.type === "date"
                          ? convertMongoDBDate(value)
                          : convertDisplayValueBasedOnType(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ pl: 1, color: "red", fontSize: "12px" }}
        >
          {helperNote ?? ""}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="body2" sx={{ fontSize: "12px" }}>
            {getCountInformation()}
          </Typography>
          <Pagination
            sx={{ m: 1, float: "right" }}
            variant="outlined"
            size="small"
            color="primary"
            shape="rounded"
            count={totalPages} // totalPages
            page={isServerSidePagination ? currentPage : localPage}
            onChange={paginationChangeHandler}
          />
        </Box>
      </Box>

      <Popover
        open={Boolean(anchorPosition)}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        onClose={closeActions}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          {actions?.map((x, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  minWidth: "120px",
                  width: "200px",
                  maxWidth: "370px",
                  m: 1,
                  cursor: x.disabled ? "no-drop" : "pointer",
                  opacity: x.disabled ? 0.2 : 1,
                  pointerEvents: x.disabled ? "none" : "all",
                }}
                onClick={() => actionClickHandler(x.privilege, x.modalWidth)}
              >
                <span style={{ flexBasis: "17%" }}>{x.icon}</span>
                <MyHeading variant="caption" text={x.name} />
              </Box>
            );
          })}
        </Box>
      </Popover>
    </Paper>
  );
}
