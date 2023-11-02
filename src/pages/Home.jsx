import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

import { SearchBar } from '../components/SearchBar'
import { useSearchData } from '../hooks/useSearchData'
import { TableData } from '../components/TableData'

export const Home = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const { filteredData, handleNameSearch, handlePowerSearch, powerSearch, setNameSearch } =
        useSearchData({ data, setCurrentPage })

    const headColumn = [...Object.keys(data[0]), 'power']

    return (
        <Box p={{ xs: 2, sm: 5 }} mr='auto' ml='auto' width={{ xs: 'unset', sm: '80%' }}>
            <SearchBar
                filteredData={filteredData}
                handleNameSearch={handleNameSearch}
                handlePowerSearch={handlePowerSearch}
                powerSearch={powerSearch}
                setNameSearch={setNameSearch}
            />
            <TableData
                filteredData={filteredData}
                headColumn={headColumn}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </Box>
    )
}

Home.propTypes = {
    data: PropTypes.array,
}
