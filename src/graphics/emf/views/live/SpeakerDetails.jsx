import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

export function SpeakerDetails (props) {
  return (
    <CSSTransition
      className="anim"
      timeout={500}
      in={props.visible}>

      <div id="speaker-details">
        <h1>{ props.title }</h1>
        <h2>{ props.speaker }</h2>
      </div>
    </CSSTransition>
  )
}
SpeakerDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  speaker: PropTypes.string.isRequired
}
