import PropTypes from 'prop-types'
import { TextField, Typography, Grid, Paper, Autocomplete } from '@mui/material'
import _ from 'lodash'

import { calculatePower } from '../utils'

export const SearchBar = (props) => {
    const { filteredData, handleNameSearch, handlePowerSearch, powerSearch, setNameSearch } = props

    const minPower = !_.isEmpty(filteredData)
        ? Math.min(...filteredData.map((pokemon) => calculatePower(pokemon)))
        : 0

    const maxPower = !_.isEmpty(filteredData)
        ? Math.max(...filteredData.map((pokemon) => calculatePower(pokemon)))
        : 0

    return (
        <Paper
            square
            elevation={3}
            style={{
                padding: 10,
                borderRadius: 20,
                marginBottom: '1rem',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={filteredData.map((item) => item.name)}
                        onChange={(event, newValue) => {
                            setNameSearch(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Search...'
                                fullWidth
                                onChange={handleNameSearch}
                                size='small'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='Power threshold'
                        value={powerSearch}
                        onChange={handlePowerSearch}
                        fullWidth
                        size='small'
                    />
                </Grid>
            </Grid>
            <Grid mt={2} spacing={2}>
                <Typography variant='body2' color='textSecondary'>
                    Min Power: {minPower}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                    Max Power: {maxPower}
                </Typography>
            </Grid>
        </Paper>
    )
}

SearchBar.propTypes = {
    filteredData: PropTypes.array.isRequired,
    handleNameSearch: PropTypes.func.isRequired,
    handlePowerSearch: PropTypes.func.isRequired,
    setNameSearch: PropTypes.any.isRequired,
    powerSearch: PropTypes.string.isRequired,
}
