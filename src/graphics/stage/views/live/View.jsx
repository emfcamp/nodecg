import { useScopedReplicant } from '~/src/nodecg-hooks'
import { SpeakerDetails } from '~src/graphics/components/SpeakerDetails'

export function LiveView () {
  const [currentContent] = useScopedReplicant('speakerDetails')

  return (
    <div id="content">
      <SpeakerDetails />
    </div>
  )
}
