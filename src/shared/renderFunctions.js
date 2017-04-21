/**
  * If component has a static fetchData(), call that function. Used for pages
  * Returns a promise
  */
export function getAsyncComponentData (renderProps, store) {
  let { location, params } = renderProps;
  const components = renderProps.components

  let lastIndex = components.length - 1

  while (components[lastIndex] == null && lastIndex >= 0) {
    lastIndex--
  }

  const comp = components[lastIndex]
      , promise = (comp && comp.fetchData)
          ? comp.fetchData({ location, params, store })
          : Promise.resolve()
  return promise;
}
