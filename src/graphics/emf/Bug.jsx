import PropTypes from 'prop-types'
const imageUrl = new URL(
  './images/logo.png?width=275&height=98',
  import.meta.url
)

export function Bug (props) {
  if (!props.visible) {
    return null
  }

  return (
    <img id="bug" src={imageUrl} width="275" height="98" />
  )
}
Bug.propTypes = {
  visible: PropTypes.bool
}
