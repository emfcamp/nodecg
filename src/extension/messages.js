import https from 'https'
import dummyMessages from './dummy-schedule-messages.json'

export function messages (nodecg) {
  const messagesUrl = 'https://www.emfcamp.org/api/schedule_messages'

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
  
  function loadMessages() {
    let messages = []

    request(messagesUrl, response => {
      response.forEach(message => {
        messages.push(message)
      });

      console.log("Publishing messages")
      let r = nodecg.Replicant('messages', messages)
      r.value = messages
    })
  }

  loadMessages()
  setInterval(loadMessages, 60000) // Reload the schedule once a minute
}
