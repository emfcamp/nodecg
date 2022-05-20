import { useScopedReplicant } from '~/src/nodecg-hooks'
import { SpeakerDetails } from './SpeakerDetails'

export function LiveView () {
  return (
    <div id="content">
      <SpeakerDetails />
    </div>
  )
}