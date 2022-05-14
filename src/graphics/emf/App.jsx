import { useReplicant } from '../../nodecg-hooks'

export function App () {
  const [showSafezones] = useReplicant('showSafezones', false)

  return (
        <>
            <h1>Hello</h1>
            <h2>Test { showSafezones ? 'Safezones on' : 'Safezones off' }</h2>
        </>
  )
}
