import { useState, cloneElement, Children } from "react"
import { useTimeout } from "~/src/nodecg-hooks"

export function SlideShow (props) {
  const [activeChild, setActiveChild] = useState(0)

  function nextSlide() {
    console.log("Active child", activeChild, props.children.length)
    if (activeChild == props.children.length - 1) {
      setActiveChild(0)
      return
    }

    setActiveChild(activeChild + 1)
    console.log("Active child", activeChild, props.children.length)
  }

  return cloneElement(props.children[activeChild], { triggerNextSlide: nextSlide })
}

export function Slide (props) {
  useTimeout(props.timeout, () => props.triggerNextSlide())

  return props.children
}