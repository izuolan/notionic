export function register() {
  if (typeof console !== 'undefined') {
    const _consoleError = console.error.bind(console)
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Each child in a list should have a unique')
      ) return
      _consoleError(...args)
    }
  }
}
