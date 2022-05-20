import { useReplicant, useReplicatedTime, stageName } from '~/src/nodecg-hooks'

export function UpNext () {
  const time = useReplicatedTime()
  const [stageA] = useReplicant('stage-a/schedule')
  const [stageB] = useReplicant('stage-b/schedule')
  const [stageC] = useReplicant('stage-c/schedule')

  function upNext(stage) {
    if (stage === null) { return null }

    return stage.find(content => {
      let start_time = new Date(content.start_date)

      return start_time >= time && start_time.getDay() == time.getDay()
    });
  }

  function stageDetail(stage, id) {
    const next = upNext(stage)
    if (next === null || next === undefined) { return null }
    console.log(stageName(), id)
    const currentTrack = stageName() === id ? 'current-track' : '';

    return (
      <div id={ id } className={ `track ${currentTrack}` }>
        <div className="time-and-place">
          <p className="venue">{ next.venue }</p>
          <p className="time">{ next.start_time }</p>
        </div>
        <div className="content">
          <p className="title">{ next.title }</p>
          <p className="speaker">{ next.speaker }</p>
        </div>
      </div>
    )
  }

  return (
    <div id="top">
      <h1>Up Next</h1>
      <div className="up-next">
        { stageDetail(stageA, 'stage-a') }
        { stageDetail(stageB, 'stage-b') }
        { stageDetail(stageC, 'stage-c') }
      </div>
    </div>
  )
}