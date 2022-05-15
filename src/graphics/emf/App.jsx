import { useReplicant, useScopedReplicant } from '~/src/nodecg-hooks'
import { Safezones } from './Safezones'
import { Bug } from './Bug'
import { LiveView } from './views/live/View'
import { InterstitialView } from './views/interstitial/View'

export function App () {
  const [showSafezones] = useReplicant('showSafezones', false)
  const [showBug] = useReplicant('showBug', false)
  const [activeView] = useScopedReplicant('activeView', 'live')

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
      <Bug visible={showBug} />
      <Safezones visible={showSafezones} />
    </>
  )
}
