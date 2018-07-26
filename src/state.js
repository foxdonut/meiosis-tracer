export const createStates = size => {
  const states = []

  for (let i = 0; i < size; i++) {
    states.push({
      history: [],
      value: 0,
    })
  }

  return states
}