import { useScopedReplicant } from '~/src/nodecg-hooks'
import { SpeakerDetails } from '~src/graphics/components/SpeakerDetails'
import { UpNext } from '~/src/graphics/components/UpNext'

export function LiveView () {
  const [currentContent] = useScopedReplicant('speakerDetails')
  const [technicalDifficulties] = useScopedReplicant('technicalDifficulties')

  function technicalDifficultiesMessage() {
    if (!technicalDifficulties) { return null }

    return <UpNext title="Sorry, we're having technical difficulties with this stream" />
  }

  function doNotRecord () {
    if (!currentContent || !currentContent.doNotRecord) { return null }

    return <UpNext title="This Talk is Not Being Recorded" />
  }

  return (
    <div id="content">
      { doNotRecord() || technicalDifficultiesMessage() }
      <SpeakerDetails />
    </div>
  )
}