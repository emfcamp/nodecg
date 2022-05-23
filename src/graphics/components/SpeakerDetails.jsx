import { stageName } from '~/src/nodecg-hooks'
import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

const replicant = window.nodecg.Replicant(`${stageName()}/speakerDetails`)

export function SpeakerDetails () {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [speaker, setSpeaker] = useState("")

  useEffect(() => {
    let timeoutHandle = null
    
    function updateSpeakerDetails(newValue, oldValue) {
      if (oldValue === undefined) { return; }

      if (newValue.visible != oldValue.visible && !timeoutHandle) {
        setTitle(newValue.title)
        setSpeaker(newValue.speaker)
        setVisible(newValue.visible)
        return;
      }

      if (newValue.visible && oldValue.visible) {
        if (newValue.title != oldValue.title || newValue.speaker != oldValue.speaker) {
          setVisible(false)

          timeoutHandle = setTimeout(() => {
            setTitle(newValue.title)
            setSpeaker(newValue.speaker)
            setVisible(true)
            timeoutHandle = null
          }, 1000)
        }
      }
    }

    replicant.on('change', updateSpeakerDetails)

    return () => {
      replicant.removeListener('change', updateSpeakerDetails)
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }
    }
  }, [])

  return (
    <div>
      <CSSTransition
        className="bottom-bar"
        timeout={500}
        in={visible}
        mountOnEnter>

        <div id="speaker-details">
          <h1>{ title }</h1>
          <h2>{ speaker }</h2>
        </div>
      </CSSTransition>
    </div>
  )
}
