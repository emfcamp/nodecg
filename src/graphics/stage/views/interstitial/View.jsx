import { Sponsors } from '~/src/graphics/components/Sponsors'
import { UpNext } from '~/src/graphics/components/UpNext'
import { Workshops } from '~/src/graphics/components/Workshops'
import { YouthWorkshops } from '~/src/graphics/components/YouthWorkshops'
import { SlideShow, Slide } from '~/src/graphics/components/SlideShow'

export function InterstitialView () {
  return (
    <div id="content">
      <SlideShow>
        <Slide timeout={1}>
          <UpNext />
        </Slide>
        <Slide timeout={1}>
          <Workshops />
        </Slide>
        <Slide timeout={30000}>
          <YouthWorkshops />
        </Slide>
        <Slide timeout={1}>
          <Sponsors />
        </Slide>
      </SlideShow>
    </div>
  )
}
