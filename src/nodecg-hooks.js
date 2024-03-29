import { useState, useEffect } from 'react'

export function useReplicant (name, defaultValue = null) {
  const replicant = window.nodecg.Replicant(name, { defaultValue })
  const [value, setValue] = useState(null)

  function setReplicantValue (newValue) {
    replicant.value = newValue
    setValue(newValue)
  }

  useEffect(() => {
    NodeCG.waitForReplicants(replicant).then(() => {
      setValue(replicant.value)
    })

    function onReplicantChanged (newValue) {
      setValue(newValue)
    }

    replicant.on('change', onReplicantChanged)

    return () => {
      replicant.removeListener('change', onReplicantChanged)
    }
  }, [])

  return [value, setReplicantValue]
}

export function stageName () {
  return document.location.pathname.split("/")[4].replace(/-(stream|stage)/, '')
}

export function useScopedReplicant (name, defaultValue = null) {
  return useReplicant(`${stageName()}/${name}`, defaultValue)
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

export function useListener (message, callback) {
  useEffect(() => {
    window.nodecg.listenFor(message, callback)

    return () => {
      window.nodecg.unlisten(message, callback)
    }
  }, [])
}

export function useScopedListener (message, callback) {
  return useListener(`${stageName()}/${message}`, callback)
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
    const timer = setInterval(incrementTime, 1000)

    return () => {
      window.nodecg.unlisten('tick', onTimeReceived)
      clearInterval(timer)
    }
  })

  return time
}

export function useTimeout(timeout, callback) {
  useEffect(() => {
    let timer = setTimeout(() => { console.log('Triggered timeout', timeout); callback() }, timeout)

    return () => {
      clearTimeout(timer)
    }
  })
}