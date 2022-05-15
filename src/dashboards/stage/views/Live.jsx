import { useScopedReplicant } from '~/src/nodecg-hooks'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'

export function LiveView () {
  const [activeView, setActiveView] = useScopedReplicant('activeView')
  const [speakerDetails, setSpeakerDetails] = useScopedReplicant('speakerDetails', { visible: false, title: '', speaker: '' })
  const [cued, setCued] = useScopedReplicant('cuedSpeakerDetails', { visible: false, title: '', speaker: '' })

  function cue () {
    setSpeakerDetails(cued)
    setActiveView('live')
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel label="Visible" control={
          <Checkbox id="visible" size="large" checked={ cued.visible } onChange={ () => setCued({ ...cued, visible: !cued.visible })} />
        } />
      </FormGroup>
      <FormGroup>
        <TextField id="title" label="Content Title" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} value={ cued.title } onChange={ (e) => setCued({ ...cued, title: e.target.value }) } />
      </FormGroup>
      <FormGroup>
        <TextField id="speaker" label="Speaker" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} value={ cued.speaker } onChange={ (e) => setCued({ ...cued, speaker: e.target.value }) } />
      </FormGroup>

      <Button onClick={ cue } variant="contained">Cue</Button>
  </>
  )
}