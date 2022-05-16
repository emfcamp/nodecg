import { useState } from 'react'
import { useBooleanReplicant, useReplicatedTime } from '../../nodecg-hooks'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'

export function App () {
  const time = useReplicatedTime()
  const [showSafezones, toggleSafezones] = useBooleanReplicant('showSafezones', false)
  const [showBug, toggleBug] = useBooleanReplicant('showBug', false)
  const [showSlides, toggleShowslides] = useBooleanReplicant('showSlides', false)
  const [showVideoframe, toggleShowvideoframe] = useBooleanReplicant('showVideoframe', false)
  const [newTime, setNewTime] = useState(new Date().toISOString())

  function broadcastNewTime () {
    let now = new Date().getTime()
    let target = new Date(newTime).getTime()
    let offset = target - now

    console.log("Setting offset to ", offset)
    window.nodecg.sendMessage('updateTimeOffset', offset)
  }

  function resetTimeToNow () {
    let currentTime = new Date()
    window.nodecg.sendMessage('updateTimeOffset', 0)
    setNewTime(currentTime.toISOString())
  }

  return (
      <>
        <CssBaseline enableColorScheme />
          <p>These settings are intended for debugging, and will apply immediately.</p>
          <p><strong>DO NOT USE THESE SETTINGS WHILE STAGES ARE LIVE</strong></p>
          <p><strong>Current time:</strong> { time.toISOString() }</p>
          <FormGroup>
            <FormControlLabel label="Show safezones" control={
              <Checkbox size="large" checked={ showSafezones } onChange={ toggleSafezones } />
            } />
          </FormGroup>
          <FormGroup>
            <FormControlLabel label="Show video frame" control={
              <Checkbox size="large" checked={ showVideoframe } onChange={ toggleShowvideoframe } />
            } />
          </FormGroup>
          <FormGroup>
            <FormControlLabel label="Show slides" control={
              <Checkbox size="large" checked={ showSlides } onChange={ toggleShowslides } />
            } />
          </FormGroup>
          <FormGroup>
            <FormControlLabel label="Show bug" control={
              <Checkbox size="large" checked={ showBug } onChange={ toggleBug } />
            } />
          </FormGroup>
          <FormGroup>
            <TextField label="Set time" size="large" value={ newTime } onChange={ (e) => setNewTime(e.target.value) } />
            <Button onClick={ broadcastNewTime } variant="contained">Set</Button>
            <Button onClick={ resetTimeToNow } variant="contained">Reset</Button>
          </FormGroup>
      </>
  )
}
