export function delayImport<T>(factory: () => Promise<T>, ms: number = 2000): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      factory().then(resolve)
    }, ms)
  })
}