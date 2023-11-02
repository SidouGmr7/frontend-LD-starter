import { Home } from './pages/Home'
import { useFetchData } from './hooks/useFetchData'
import { Box, CircularProgress } from '@mui/material'

function App() {
    const { data, isProgress } = useFetchData()

    if (isProgress)
        return (
            <Box justifyContent='center' display='flex' alignItems='center' height='100vh'>
                <CircularProgress />
            </Box>
        )
    return data && <Home data={data} isProgress={isProgress} />
}

export default App
