import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export default function StudentTable() {
  function createData(name, branch, student, status) {
    return { name, branch, student, status }
  }

  let rows = [
    createData(
      "John Emanuel Alamares",
      "Caloocan",
      "Ariel Dela Cruz",
      "In Session"
    ),
    createData("Karen Castro", "Taguig", "Jane Doe", "In Session"),
    createData(
      "Jaygee Olayta",
      "Cavite",
      "Gus Fring",
      "To Be Scheduled"
    ),
    createData(
      "John Rey Domondon",
      "Makati",
      "John Doe",
      "In Session"
    ),
    createData(
      "Mark Francis Calisay",
      "Makati",
      "Jesse Pinkman",
      "To Be Scheduled"
    ),
    createData(
      "Eren Yeager",
      "Caloocan",
      "Shane Lopez",
      "To Be Scheduled"
    ),
    createData("Karen Castro", "Taguig", "Jane Doe", "To Be Scheduled"),
    createData(
      "Jaygee Olayta",
      "Cavite",
      "Gus Fring",
      "In Session"
    ),
    createData(
      "Skyler White",
      "Taguig",
      "Walter White",
      "To Be Scheduled"
    ),
    createData(
      "Mike Ehrmantraut",
      "Cavite",
      "Jesse Pinkman",
      "In Session"
    ),
  ]

  rows = rows.reverse()

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }))

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="left">Full name</StyledTableCell>
            <StyledTableCell align="left">Branch</StyledTableCell>
            <StyledTableCell align="left">Student</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <StyledTableRow tabIndex={-1} key={row.name}>
                  <StyledTableCell component="th" scope="row"  width="200px">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left" width="200px">{row.branch}</StyledTableCell>
                  <StyledTableCell align="left" width="200px">{row.student}</StyledTableCell>
                  <StyledTableCell align="left" width="200px">{row.status}</StyledTableCell>
                </StyledTableRow>
              )
            })}
          {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
        </TableBody>
      </Table>
      <TablePagination
        sx={{ display: "flex" }}
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}
