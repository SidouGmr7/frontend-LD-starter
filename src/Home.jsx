import { useEffect, useState } from 'react'
import { TableData } from './components/TableData'

function MyComponent() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/pokemon.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    return data && <TableData data={data} />
}

export default MyComponent
