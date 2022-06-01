import { useState, cloneElement, Children } from "react"
import { useTimeout } from "~/src/nodecg-hooks"

export function SlideShow (props) {
  const [activeChild, setActiveChild] = useState(0)
  const displayedChildren = props.children.filter(c => c.props.display === undefined || c.props.display)

  function nextSlide() {
    if (activeChild == displayedChildren.length - 1) {
      setActiveChild(0)
      return
    }

    setActiveChild(activeChild + 1)
  }

  return cloneElement(displayedChildren[activeChild], { triggerNextSlide: nextSlide })
}

export function Slide (props) {
  useTimeout(props.timeout, () => props.triggerNextSlide())

  return props.children
}