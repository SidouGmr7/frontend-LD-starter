import PropTypes from 'prop-types'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    styled,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'

import { usePagination } from '../hooks/usePagination'
import { calculatePower } from '../utils'

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f4f6f8',
        color: '#697986',
        padding: '8px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#515861',
    },
}))

export const TableData = ({ filteredData, headColumn, currentPage, setCurrentPage }) => {
    const { currentItems, onPageChange, handleChangeRowsPerPage, rowsPerPage } = usePagination({
        filteredData,
        setCurrentPage,
        currentPage,
    })

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 5,
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {headColumn.map((head, index) => (
                            <StyledTableCell align='center' key={index}>
                                {head}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map((pokemon) => (
                        <TableRow key={pokemon.id}>
                            {Object.values(pokemon).map((value, index) => (
                                <StyledTableCell align='center' key={index}>
                                    {value}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align='center'>
                                {calculatePower(pokemon)}
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component='div'
                count={filteredData.length}
                page={currentPage}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}

TableData.propTypes = {
    filteredData: PropTypes.array,
    headColumn: PropTypes.array,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
}
