import { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Box,
    Paper,
    styled,
    useMediaQuery,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import { useTheme } from '@mui/material/styles'

import { SearchBar } from './SearchBar'
import { useSearchData } from '../hooks/useSearchData'
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

export const TableData = (props) => {
    const { data } = props
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [currentPage, setCurrentPage] = useState(0)
    const { filteredData, handleNameSearch, handlePowerSearch, powerSearch, setNameSearch } =
        useSearchData({ data, setCurrentPage })

    const { currentItems, onPageChange, handleChangeRowsPerPage, rowsPerPage } = usePagination({
        filteredData,
        setCurrentPage,
        currentPage,
    })

    const headColumn = [...Object.keys(data[0]), 'power']

    return (
        <Box p={isMobile ? 2 : 5} mr='auto' ml='auto' width={isMobile ? 'unset' : '70%'}>
            <SearchBar
                filteredData={filteredData}
                handleNameSearch={handleNameSearch}
                handlePowerSearch={handlePowerSearch}
                calculatePower={calculatePower}
                powerSearch={powerSearch}
                setNameSearch={setNameSearch}
            />
            <TableContainer
                component={Paper}
                style={{
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: 20,
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
        </Box>
    )
}

TableData.propTypes = {
    data: PropTypes.array,
}
