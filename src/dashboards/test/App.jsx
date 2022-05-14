import { useReplicant } from '../../nodecg-hooks'

export function App () {
  const [showSafezones, setShowSafezones] = useReplicant('showSafezones', false)
  const toggleSafezones = () => {
    setShowSafezones(!showSafezones)
  }

  const [showBug, setShowBug] = useReplicant('showBug', false)
  const toggleBug = () => {
    setShowBug(!showBug)
  }

  return (
      <>
          <p>These settings are intended for debugging, and will apply immediately.</p>
          <p><strong>DO NOT USE THESE SETTINGS ON LIVE STAGES</strong></p>
          <div>
            <label><input type="checkbox" checked={showSafezones} onChange={toggleSafezones} /> Show safezones</label>
          </div>
          <div>
            <label><input type="checkbox" checked={showBug} onChange={toggleBug} /> Show bug</label>
          </div>
      </>
  )
}
