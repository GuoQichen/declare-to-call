/* eslint-disable ts/no-use-before-define */
export function createByAdaptor<H extends Function, C>(adaptor: Adaptor<H, C>) {
  return <Value = unknown, Reason = any>(C: C) =>
    (props?: Record<string, any>, getChildren?: (h: H) => C) => {
      let __resolve: Function
      let __reject: Function

      const injectProps = {
        onResolve: (value?: Value) => {
          __resolve(value)
          clear()
        },
        onReject: (reason?: Reason) => {
          __reject(reason || 'create api rejected')
          clear()
        },
      }

      const clear = adaptor.add((h) => {
        return (() =>
          h(
            C,
            {
              ...props,
              ...injectProps,
            },
            getChildren?.(h),
          )) as C
      })

      return new Promise<Value>((resolve, reject) => {
        __resolve = resolve
        __reject = reject
      })
    }
}
