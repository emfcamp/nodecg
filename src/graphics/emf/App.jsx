import { useReplicant, useScopedReplicant } from '~/src/nodecg-hooks'
import { Safezones } from './Safezones'
import { LiveView } from './views/live/View'
import { InterstitialView } from './views/interstitial/View'

const slideUrl = new URL(
  './images/slide.png?width=1920&height=1080',
  import.meta.url
)
const videoUrl = new URL(
  './images/video-frame.png?width=1920&height=1080',
  import.meta.url
)
const imageUrl = new URL(
  './images/tall-video-frame.png?width=420&height=570',
  import.meta.url
)
const bugUrl = new URL(
  './images/logo.png?width=275&height=98',
  import.meta.url
)

export function App () {
  const [showSafezones] = useReplicant('showSafezones', false)
  const [showBug] = useReplicant('showBug', false)
  const [showSlides] = useReplicant('showSlides', false)
  const [showVideoframe] = useReplicant('showVideoframe', false)
  const [activeView] = useScopedReplicant('activeView', 'live')

  function slides() {
    if (!showSlides) {
      return null
    }

    return (
      <>
        <img id="slide" src={slideUrl} />
        <img id="videoframe" src={imageUrl} />
      </>
    );
  }

  function video() {
    if (!showVideoframe) {
      return null
    }

    return (
      <img id="fullscreen-video" src={videoUrl} />
    );
  }

  function bug() {
    if (!showBug) {
      return null
    }

    return (
      <img id="bug" src={bugUrl} />
    );

  }

  let view = null
  switch (activeView) {
    case 'live':
      view = <LiveView />
      break;
    case 'interstitial':
      view = <InterstitialView />
      break;
    default:
      view = <h1>Oh no! Mode { activeView } is not supported</h1>
  }

  return (
    <>
      { view }
      { slides() }
      { video() }
      { bug() }
      <Safezones visible={showSafezones} />
    </>
  )
}
