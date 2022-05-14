import PropTypes from 'prop-types'

export function SpeakerDetails (props) {
  if (!props.visible) {
    return null
  }

  return (
    <div id="speaker-details">
      <h1>{ props.title }</h1>
      <h2>{ props.speaker }</h2>
    </div>
  )
}
SpeakerDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  speaker: PropTypes.string.isRequired
}
