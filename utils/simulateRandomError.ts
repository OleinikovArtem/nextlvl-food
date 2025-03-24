export function simulateRandomError() {
  const randomError = Math.random() > 0.3
  if (randomError) {
    throw new Error('Random error for Testing')
  }
}
