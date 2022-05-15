import { useScopedReplicant } from '~/src/nodecg-hooks'
import Button from '@mui/material/Button'

export function InterstitialView () {
  const [activeView, setActiveView] = useScopedReplicant('activeView')

  function cue () {
    setActiveView('interstitial')
  }

  return (
    <>
      <Button onClick={ cue } variant="contained">Cue</Button>
  </>
  )
}
