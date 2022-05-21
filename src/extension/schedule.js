import https from 'https'

export function schedule (nodecg) {
  const scheduleUrl = 'https://www.emfcamp.org/schedule/2018.json'
  const venues = {
    "stage-a": ["Stage A"],
    "stage-b": ["Stage B"],
    "stage-c": ["Stage C"],
    "workshops": ["Workshop 1", "Workshop 2", "Workshop 3", "Workshop 4", "Workshop 5", "Workshop 6", "Youth Workshop"],
    "villages": []
  }

  const schedules = [
    "stage-a",
    "stage-b",
    "stage-c",
    "workshops",
    "villages",
  ]

  // Yeah, this sucks. So does NodeCG's support for more friendly
  // Node modules I tried to pull the schedule.
  function request(url, callback) {
    https.get(url, (res) => {
      let body = ""

      res.on("data", (chunk) => {
          body += chunk
      });

      res.on("end", () => {
          try {
              let json = JSON.parse(body)
              callback(json)
          } catch (error) {
              console.error(error.message)
          };
      });
    })
  }

  function venueToScheduleName(venue) {
    let matchingScheduled = schedules.filter((schedule) => venues[schedule].includes(venue))
    if (matchingScheduled.length > 0) {
      return matchingScheduled
    }

    return ["villages"]
  }

  function loadSchedule() {
    let groupedSchedules = {
      "stage-a": [],
      "stage-b": [],
      "stage-c": [],
      "workshops": [],
      "villages": [],
    }

    request(scheduleUrl, response => {
      response.forEach(event => {
        let schedule = venueToScheduleName(event.venue)
        groupedSchedules[schedule].push(event)
      });

      schedules.forEach(schedule => {
        sortedSchedule = groupedSchedules[schedule].sort((a, b) => {
          if (a.start_date < b.start_date) { return -1 }
          if (b.start_date < a.start_date) { return 1 }
          return 0
        })

        console.log("Publishing schedule", schedule)
        let r = nodecg.Replicant(`${schedule}/schedule`)
        r.value = groupedSchedules[schedule]
      })
    })
  }

  loadSchedule()
  setInterval(loadSchedule, 60000) // Reload the schedule once a minute
}