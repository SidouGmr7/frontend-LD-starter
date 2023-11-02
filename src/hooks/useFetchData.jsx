import { useState, useEffect } from 'react'

export const useFetchData = () => {
    const [data, setData] = useState(null)
    const [isProgress, setIsProgress] = useState(false)

    useEffect(() => {
        setIsProgress(true)
        fetch('/pokemon.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData)
                setIsProgress(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                setIsProgress(false)
            })
    }, [])

    return { data, isProgress }
}
