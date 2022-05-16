import { stageName } from '~/src/nodecg-hooks'
import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

const replicant = window.nodecg.Replicant(`${stageName()}/speakerDetails`)

export function SpeakerDetails () {
  const [visible, setVisible] = useState(null)
  const [title, setTitle] = useState(null)
  const [speaker, setSpeaker] = useState(null)

  useEffect(() => {
    let timeoutHandle = null
    
    function updateSpeakerDetails(newValue, oldValue) {
      if (oldValue === undefined) { return false }

      if (newValue.visible != oldValue.visible && !timeoutHandle) {
        setTitle(newValue.title)
        setSpeaker(newValue.speaker)
        setVisible(newValue.visible)
        return;
      }

      if (newValue.visible && oldValue.visible) {
        setVisible(false)

        timeoutHandle = setTimeout(() => {
          console.log("Triggered timeout")
          setTitle(newValue.title)
          setSpeaker(newValue.speaker)
          setVisible(true)
          timeoutHandle = null
        }, 1000)
      }
    }

    NodeCG.waitForReplicants(replicant).then(() => {
      setVisible(replicant.value.visible)
      setTitle(replicant.value.title)
      setSpeaker(replicant.value.speaker)

      replicant.on('change', updateSpeakerDetails)
    })

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
        in={visible}>

        <div id="speaker-details">
          <h1>{ title }</h1>
          <h2>{ speaker }</h2>
        </div>
      </CSSTransition>
    </div>
  )
}
