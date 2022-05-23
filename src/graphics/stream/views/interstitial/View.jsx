import { Sponsors } from './Sponsors'
import { UpNext } from '~/src/graphics/components/UpNext'
import { SlideShow, Slide } from '~/src/graphics/components/SlideShow'

export function InterstitialView () {
  const sponsors = <Sponsors />
  const up_next = <UpNext />

  return (
    <div id="content">
      <SlideShow>
        <Slide timeout={30000}>
          { up_next }
        </Slide>
        <Slide timeout={30000}>
          { sponsors }
        </Slide>
      </SlideShow>
    </div>
  )
}
