const goldSponsors = [
  new URL('~/src/graphics/emf/images/sponsors/google.png?height=160', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/lucid.png?height=160', import.meta.url),
];

const silverSponsors = [
  new URL('~/src/graphics/emf/images/sponsors/pcbgogo.png?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/sos.png?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/ucl.png?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/ardc.jpeg?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/iluli.png?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/onega.png?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/mathworks.png?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/sargasso.png?height=70', import.meta.url),
  new URL('~/src/graphics/emf/images/sponsors/aiven.png?height=70', import.meta.url),
]

export function Sponsors (props) {
  return (
    <div id="top" className="sponsors">
      <h1>Sponsored by</h1>
      <div className="container">
        <div className="gold">
          {goldSponsors.map(logo => <img key={logo} src={logo} height="160" />)}
        </div>
        <div className="silver">
          {silverSponsors.map(logo => <img key={logo} src={logo} height="70" />)}
        </div>
      </div>
    </div>
  )
}