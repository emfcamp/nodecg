import { useReplicant } from '../../nodecg-hooks'

export function App () {
  const [showSafezones, setShowSafezones] = useReplicant('showSafezones', false)
  const toggleSafezones = () => {
    setShowSafezones(!showSafezones)
  }

  return (
      <>
          <h1>Hello</h1>
          <label><input type="checkbox" checked={showSafezones} onChange={toggleSafezones} /> Show safezones</label>
      </>
  )
}
