import { useState } from 'react'

export const usePagination = ({ filteredData, setCurrentPage, currentPage }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const itemsPerPage = 10

    const indexOfLastItem = (currentPage + 1) * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    const onPageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setCurrentPage(0)
    }

    return { currentItems, onPageChange, handleChangeRowsPerPage, rowsPerPage }
}
