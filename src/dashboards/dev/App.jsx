import { useBooleanReplicant } from '../../nodecg-hooks'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'

export function App () {
  const [showSafezones, toggleSafezones] = useBooleanReplicant('showSafezones', false)
  const [showBug, toggleBug] = useBooleanReplicant('showBug', false)

  return (
      <>
        <CssBaseline enableColorScheme />
          <p>These settings are intended for debugging, and will apply immediately.</p>
          <p><strong>DO NOT USE THESE SETTINGS ON LIVE STAGES</strong></p>
          <FormGroup>
            <FormControlLabel label="Show safezones" control={
              <Checkbox size="large" checked={ showSafezones } onChange={ toggleSafezones } />
            } />
          </FormGroup>
          <FormGroup>
            <FormControlLabel label="Show bug" control={
              <Checkbox size="large" checked={ showBug } onChange={ toggleBug } />
            } />
          </FormGroup>
      </>
  )
}
