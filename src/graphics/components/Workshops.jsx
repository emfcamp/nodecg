import { useEffect, useState } from 'react'
import { useReplicant, useReplicatedTime, stageName } from '~/src/nodecg-hooks'

export function Workshops (props) {
  const time = useReplicatedTime()
  const [schedule] = useReplicant('workshops/schedule')
  const [venues, setVenues] = useState([])
  const [upNext, setUpNext] = useState({})

  useEffect(() => {
    if (schedule === null) { return }

    let futureContent = schedule.filter(item => {
      let start_time = new Date(item.start_date)

      return start_time >= time && start_time.getDay() == time.getDay()
    })

    let newVenues = []
    let nextWorkshops = {}
    futureContent.forEach(item => {
      if (!newVenues.includes(item.venue) && item.venue != 'Youth Workshop') {
        newVenues.push(item.venue)
        nextWorkshops[item.venue] = item
      }
    })

    setVenues(newVenues)
    setUpNext(nextWorkshops)
  }, [time, schedule])

  function stageDetail(stage, id) {
    const next = upNext[stage]
 
    if (next === null || next === undefined) { return null }
    const currentTrack = stageName() === id ? 'current-track' : '';

    return (
      <div id={ id } key={ id } className={ `track ${currentTrack}` }>
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
      <h1>{ props.title || "Workshops" }</h1>
      <div className="up-next workshops">
        { venues.sort().map(venue => stageDetail(venue, venue))}
      </div>
    </div>
  )
}
