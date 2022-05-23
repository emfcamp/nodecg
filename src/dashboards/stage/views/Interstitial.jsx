import { useScopedReplicant } from '~/src/nodecg-hooks'
import Button from '@mui/material/Button'

export function InterstitialView () {
  const [activeView, setActiveView] = useScopedReplicant('activeView')

  function cue () {
    setActiveView('interstitial')
  }

  return (
    <>
      <p>Interstitials are not safe to display with video feeds.</p>
      <p>Switch to live view before mixing video.</p>
      <Button onClick={ cue } variant="contained">Cue</Button>
    </>
  )
}
