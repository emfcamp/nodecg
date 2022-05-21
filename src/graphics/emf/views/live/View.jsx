import { useScopedReplicant } from '~/src/nodecg-hooks'
import { SpeakerDetails } from './SpeakerDetails'
import { UpNext } from '~/src/graphics/UpNext'

export function LiveView () {
  [currentContent] = useScopedReplicant('speakerDetails')

  function doNotRecord () {
    if (!currentContent || !currentContent.doNotRecord) { return null }

    return <UpNext title="This Talk is Not Being Recorded" />
  }

  return (
    <div id="content">
      { doNotRecord() }
      <SpeakerDetails />
    </div>
  )
}