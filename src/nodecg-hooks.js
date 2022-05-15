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

export function useReplicatedTime () {
  const [time, setTime] = useState(new Date())
  let timer = null

  useEffect(() => {
    function onTimeReceived (newValue) {
      console.log("New time received", newValue)
      setTime(new Date(newValue))
    }

    function incrementTime () {
      setTime(new Date(time.getTime() + 1000))
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