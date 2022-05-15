import { useScopedReplicant } from '~/src/nodecg-hooks'
import { SpeakerDetails } from './SpeakerDetails'

export function LiveView () {
  const [speakerDetails] = useScopedReplicant('speakerDetails', { visible: false, title: '', speaker: '' })

  return (
    <div id="content">
      <SpeakerDetails visible={speakerDetails.visible} title={speakerDetails.title} speaker={speakerDetails.speaker} />
    </div>
  )
}