import { useState, useEffect, useCallback, useRef } from "react"

// Value debouncing
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// Function debouncing
export function useDebounceFunction<T>(
  callback: (value: T) => void,
  delay: number
): (value: T) => void {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(value)
      }, delay)
    },
    [callback, delay]
  )
}
