import { useScopedReplicant } from '~/src/nodecg-hooks'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'

export function LiveView () {
  const [activeView, setActiveView] = useScopedReplicant('activeView')
 
  const [cuedSpeakerDetails, setCuedSpeakerDetails] = useScopedReplicant('cuedSpeakerDetails', { visible: false, title: '', speaker: '', doNotRecord: false })
  const [speakerDetails, setSpeakerDetails] = useScopedReplicant('speakerDetails', { visible: false, title: '', speaker: '', doNotRecord: false })
  const [cuedTechnicalDifficulties, setCuedTechnicalDifficulties] = useScopedReplicant('cuedTechnicalDifficulties', false)
  const [technicalDifficulties, setTechnicalDifficulties] = useScopedReplicant('technicalDifficulties', false)

  const ready = [activeView, cuedSpeakerDetails, speakerDetails].every(i => i !== null)

  function cue () {
    setSpeakerDetails(cuedSpeakerDetails)
    setTechnicalDifficulties(cuedTechnicalDifficulties)
    setActiveView('live')
  }

  if (!ready) { return null }

  return (
    <>
      <h2>Current Content</h2>
      <FormGroup>
        <TextField id="title" label="Content Title" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} value={ cuedSpeakerDetails.title } onChange={ (e) => setCuedSpeakerDetails({ ...cuedSpeakerDetails, title: e.target.value }) } />
      </FormGroup>
      <FormGroup>
        <TextField id="speaker" label="Speaker" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} value={ cuedSpeakerDetails.speaker } onChange={ (e) => setCuedSpeakerDetails({ ...cuedSpeakerDetails, speaker: e.target.value }) } />
      </FormGroup>
      <FormGroup>
        <FormControlLabel label="Do not record" control={
          <Checkbox id="do-not-record" size="large" checked={ cuedSpeakerDetails.doNotRecord } onChange={ () => setCuedSpeakerDetails({ ...cuedSpeakerDetails, doNotRecord: !cuedSpeakerDetails.doNotRecord })} />
        } />
      </FormGroup>

      <h2>Overlays</h2>
      <FormGroup>
        <FormControlLabel label="Show speaker overlay" control={
          <Checkbox id="visible" size="large" checked={ cuedSpeakerDetails.visible } onChange={ () => setCuedSpeakerDetails({ ...cuedSpeakerDetails, visible: !cuedSpeakerDetails.visible })} />
        } />
      </FormGroup>

      <h2>Technical Difficulties</h2>
      <p>Setting this on will show an apology message and what's on other stages for people watching the live stream. It will not appear on the main stage screens.</p>
      <FormGroup>
        <FormControlLabel label="Technical difficulties" control={
          <Checkbox id="visible" size="large" checked={ cuedTechnicalDifficulties } onChange={ () => setCuedTechnicalDifficulties(!cuedTechnicalDifficulties) } />
        } />
      </FormGroup>

      <Button onClick={ cue } variant="contained">Cue</Button>
  </>
  )
}