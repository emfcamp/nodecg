import { useReplicant } from '../../nodecg-hooks'

export function App () {
  const [speakerDetails, setSpeakerDetails] = useReplicant('speakerDetails', { visible: false, title: null, speaker: null })
  const [cued, setCued] = useReplicant('cuedSpeakerDetails', { visible: false, title: null, speaker: null })

  function cue () {
    setSpeakerDetails(cued)
  }

  return (
      <>
        <h1>Live</h1>
        <table>
          <tr>
            <th>Visible</th>
            <td>{ speakerDetails.visible ? 'Yes' : 'No' }</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{ speakerDetails.title }</td>
          </tr>
          <tr>
            <th>Speaker</th>
            <td>{ speakerDetails.speaker }</td>
          </tr>
        </table>

        <div>
          <label><input type="checkbox" checked={ cued.visible } onChange={ () => setCued({ ...cued, visible: !cued.visible }) } /> Visible</label>
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" value={ cued.title } onChange={ (e) => setCued({ ...cued, title: e.target.value }) } />
        </div>
        <div>
          <label htmlFor="speaker">Speaker</label>
          <input id="speaker" value={ cued.speaker } onChange={ (e) => setCued({ ...cued, speaker: e.target.value }) } />
        </div>
        <div>
          <button onClick={ cue }>Cue</button>
        </div>
      </>
  )
}
