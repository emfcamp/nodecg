import { useEffect, useState } from 'react'
import { useReplicant, useReplicatedTime, stageName } from '~/src/nodecg-hooks'

export function Villages (props) {
  const time = useReplicatedTime()
  const [schedule] = useReplicant('villages/schedule')
  const [contentIds, setContentIds] = useState([])
  const [content, setContent] = useState([])
  const [contentHash, setContentHash] = useState([])

  // This is annoyingly complex because of React.
  //
  // We want to display a random selection of content, but we also don't want to
  // show anything in the past. We can't update the content selection everytime
  // the time changes because then it will update once a second and be confusing.
  //
  // The result of a map operation also changes every update in React state land,
  // so we turn the full set of ids currently visible as a string, which means the
  // select only gets updated if the available content to display has changed.
  useEffect(() => {
    if (schedule === null) { return }

    let futureContent = schedule.filter(item => {
      let start_time = new Date(item.start_date)

      return start_time >= time && start_time.getDay() == time.getDay()
    })

    let ids = futureContent.map(i => i.id)
    setContentIds(ids.sort())
    setContentHash(ids.sort().join(''))
  }, [schedule, time])

  useEffect(() => {
    if (schedule === null) { return }

    let selectedIds = []
    for (let i = 0; i < 4; i++) {
      let idx = Math.floor(Math.random() * contentIds.length)
      selectedIds.push(contentIds[idx])
    }

    setContent(schedule.filter(i => selectedIds.includes(i.id)))
  }, [contentHash])

  function detail(content) {
    if (content === null || content === undefined) { return null }
    
    return (
      <div id={ content.id } key={ content.id } className="track current-track">
        <div className="time-and-place">
          <p className="venue">{ content.venue }</p>
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
      <h1>{ props.title || "Around The Site" }</h1>
      <h2>A random selection of content run by villages and attendees today</h2>
      <div className="up-next villages">
        { content.map(i => detail(i)) }
      </div>
    </div>
  )
}
