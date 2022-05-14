import { useReplicant } from '../../nodecg-hooks'
import { Safezones } from './Safezones'
import { Bug } from './Bug'
import { SpeakerDetails } from './SpeakerDetails'

export function App () {
  const [showSafezones] = useReplicant('showSafezones', false)
  const [showBug] = useReplicant('showBug', false)
  const [speakerDetails] = useReplicant('speakerDetails', { visible: false, title: '', speaker: '' })

  return (
    <>
      <div id="content">
        <SpeakerDetails visible={speakerDetails.visible} title={speakerDetails.title} speaker={speakerDetails.speaker} />
      </div>
      <Bug visible={showBug} />
      <Safezones visible={showSafezones} />
    </>
  )
}
