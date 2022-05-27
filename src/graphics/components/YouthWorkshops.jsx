import { useEffect, useState } from 'react'
import { useReplicant, useReplicatedTime, stageName } from '~/src/nodecg-hooks'

export function YouthWorkshops (props) {
  const time = useReplicatedTime()
  const [schedule] = useReplicant('workshops/schedule')
  const [upNext, setUpNext] = useState([])

  useEffect(() => {
    if (schedule === null) { return }

    let futureContent = schedule.filter(item => {
      let start_time = new Date(item.start_date)

      return start_time >= time && start_time.getDay() == time.getDay()
    }).filter(item => item.venue == 'Youth Workshop')

    setUpNext(futureContent.slice(0,5))
  }, [time, schedule])

  function detail(content) {
    return (
      <div id={ content.id } key={ content.id } className={ `track` }>
        <div className="time-and-place">
          <p className="time">{ content.start_time }</p>
        </div>
        <div className="content">
          <p className="title">{ content.title }</p>
          <p className="speaker">{ content.speaker }</p>
        </div>
      </div>
    )

  }

  return (
    <div id="top">
      <h1>{ props.title || "Youth Workshops" }</h1>
      <div className="up-next youth-workshops">
        { upNext.map(content => detail(content)) }
      </div>
    </div>
  )
}
