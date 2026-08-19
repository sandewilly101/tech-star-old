import { useCallback, useEffect, useState } from 'react'
import { api } from '@/data/site'

/**
 * Live course catalogue from the TechStar admin backend.
 * The backend sleeps on idle, so failures are surfaced with a retry rather
 * than silently swallowed the way the old page did.
 */
export function useCourses() {
  const [state, setState] = useState({ status: 'loading', courses: [], error: null })

  const load = useCallback(async (signal) => {
    try {
      const response = await fetch(api.courses, { signal })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      const data = await response.json()
      setState({ status: 'ready', courses: Array.isArray(data) ? data : [], error: null })
    } catch (error) {
      if (error.name === 'AbortError') return
      setState({ status: 'error', courses: [], error: error.message })
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    // Fetching from the catalogue API is exactly the external-system sync an
    // effect is for; every setState inside `load` happens after an await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  const retry = useCallback(() => {
    setState({ status: 'loading', courses: [], error: null })
    load()
  }, [load])

  return { ...state, retry }
}

export function useCourse(id) {
  const [state, setState] = useState({ status: 'loading', course: null, error: null })

  const load = useCallback(async (signal) => {
    if (!id) return
    try {
      const response = await fetch(`${api.courseDetail}${id}`, { signal })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      const data = await response.json()
      setState({ status: 'ready', course: data, error: null })
    } catch (error) {
      if (error.name === 'AbortError') return
      setState({ status: 'error', course: null, error: error.message })
    }
  }, [id])

  useEffect(() => {
    const controller = new AbortController()
    // Fetching from the catalogue API is exactly the external-system sync an
    // effect is for; every setState inside `load` happens after an await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  const retry = useCallback(() => {
    setState({ status: 'loading', course: null, error: null })
    load()
  }, [load])

  return { ...state, retry }
}
