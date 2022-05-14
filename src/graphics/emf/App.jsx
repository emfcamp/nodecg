import { useReplicant } from '../../nodecg-hooks'
import { Safezones } from './Safezones'
import { Bug } from './Bug'

export function App () {
  const [showSafezones] = useReplicant('showSafezones', false)
  const [showBug] = useReplicant('showBug', false)

  return (
    <>
      <div id="content">
      </div>
      <Bug visible={showBug} />
      <Safezones visible={showSafezones} />
    </>
  )
}
