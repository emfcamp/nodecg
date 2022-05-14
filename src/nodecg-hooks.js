import { useState, useEffect } from 'react'

export function useReplicant (name, defaultValue = null) {
  const replicant = window.nodecg.Replicant(name, { defaultValue })
  const [value, setValue] = useState(defaultValue)

  function setReplicantValue (newValue) {
    replicant.value = newValue
    setValue(newValue)
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
