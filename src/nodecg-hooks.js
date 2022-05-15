import { useState, useEffect } from 'react'

export function useReplicant (name, defaultValue = null) {
  const replicant = window.nodecg.Replicant(name, { defaultValue })
  const [value, setValue] = useState(defaultValue)

  function setReplicantValue (newValue) {
    replicant.value = newValue
    setValue(newValue)

    if (opts.onUpdate) {
      opts.onUpdate(newValue)
    }
  }

  useEffect(() => {
    function onReplicantChanged (newValue) {
      setValue(newValue)
    }

    replicant.on('change', onReplicantChanged)

    return () => {
      replicant.removeListener('change', onReplicantChanged)
    }
  })

  return [value, setReplicantValue]
}

export function useScopedReplicant (name, defaultValue = null) {
  const scope = document.location.pathname.split("/")[4]

  return useReplicant(`${scope}/${name}`, defaultValue)
}

export function useBooleanReplicant (name, defaultValue = false) {
  const [value, setValue] = useReplicant(name, defaultValue)

  function toggleValue () {
    setValue(!value)
  }

  return [value, toggleValue, setValue]
}

export function useBooleanState (defaultValue = false) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue () {
    setValue(!value)
  }

  return [value, toggleValue, setValue]
}

// DO NOT RUN AN EVENT OVER MULTIPLE TIMEZONES, THIS WILL FALL FLAT ON ITS ARSE
export function useReplicatedTime () {
  const [startTime] = useState(new Date())
  const [lastServerTime, setLastServerTime] = useState(startTime.getTime())
  const [lastUpdateReceived, setLastUpdateReceived] = useState(startTime.getTime())
  const [time, setTime] = useState(new Date(lastServerTime))

  useEffect(() => {
    function onTimeReceived (newValue) {
      setLastServerTime(newValue)
      setLastUpdateReceived(new Date().getTime())
      setTime(new Date(newValue))
    }

    function incrementTime () {
      let now = new Date().getTime()
      let timeSinceLastUpdate = now - lastUpdateReceived
      if (timeSinceLastUpdate > 1500) {
        console.log("No time update received, incrementing locally. Time since last update: ", timeSinceLastUpdate, now, lastUpdateReceived)
        setTime(new Date(lastServerTime + timeSinceLastUpdate))
      }
    }

    window.nodecg.listenFor('tick', onTimeReceived)
    timer = setInterval(incrementTime, 1000)

    return () => {
      window.nodecg.unlisten('tick', onTimeReceived)
      clearInterval(timer)
    }
  })

  return time
}