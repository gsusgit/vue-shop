import { ref, watch } from 'vue'

export default function useLocalStorageRef(key, defaultValue) {
  let initialValue = defaultValue

  try {
    const storedValue = localStorage.getItem(key)
    if (storedValue !== null) {
      initialValue = JSON.parse(storedValue)
    }
  } catch (error) {
    console.warn(`useLocalStorageRef: could not read "${key}"`, error)
  }

  const value = ref(initialValue)

  watch(value, newValue => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.warn(`useLocalStorageRef: could not persist "${key}"`, error)
    }
  }, { deep: true })

  return value
}
