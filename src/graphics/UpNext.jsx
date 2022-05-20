export function UpNext () {
  return (
    <div id="top">
      <h1>Up Next</h1>
      <div className="up-next">
        <div id="stage-a" className="track">
          <div className="time-and-place">
            <p className="venue">Stage A</p>
            <p className="time">3:45pm</p>
          </div>
          <div className="content">
            <p className="title">How I'm building my monstrous electric motorcycle from hacked scrap EV & Hybrid parts.
</p>
            <p className="speaker">Russell Couper</p>
          </div>
        </div>
        <div id="stage-b" className="track">
          <div className="time-and-place">
            <p className="venue">Stage B</p>
            <p className="time">3:40pm</p>
          </div>
          <div className="content">
            <p className="title">Adventures with Home Energy Monitoring (with a Raspberry Pi &amp; many Arduinos)</p>
            <p className="speaker">Lee V</p>
          </div>
        </div>
        <div id="stage-c" className="track">
          <div className="time-and-place">
            <p className="venue">Stage C</p>
            <p className="time">3:50pm</p>
          </div>
          <div className="content">
            <p className="title">Being YouTubers!</p>
            <p className="speaker">James Bruton, Matt Denton, Ruth Amos</p>
          </div>
        </div>
      </div>
    </div>
  )
}