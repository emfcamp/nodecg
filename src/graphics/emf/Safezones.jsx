import PropTypes from 'prop-types'
const imageUrl = new URL(
  './images/safezones.png',
  import.meta.url
)

export function Safezones (props) {
  if (!props.visible) {
    return null
  }

  return (
    <img id="safezones" src={imageUrl} width="1920" height="1080" />
  )
}
Safezones.propTypes = {
  visible: PropTypes.bool
}
