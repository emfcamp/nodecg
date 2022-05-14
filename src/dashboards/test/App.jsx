import { useBooleanReplicant } from '../../nodecg-hooks'

export function App () {
  const [showSafezones, toggleSafezones] = useBooleanReplicant('showSafezones', false)
  const [showBug, toggleBug] = useBooleanReplicant('showBug', false)

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
