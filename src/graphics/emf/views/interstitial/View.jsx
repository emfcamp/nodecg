import { Sponsors } from './Sponsors'
import { UpNext } from '~/src/graphics/UpNext'
import { SlideShow, Slide } from '~/src/graphics/SlideShow'

export function InterstitialView () {
  return (
    <div id="content">
      <SlideShow>
        <Slide timeout={30000}>
          <Sponsors />
        </Slide>
        <Slide timeout={30000}>
          <UpNext />
        </Slide>
      </SlideShow>
    </div>
  )
}
