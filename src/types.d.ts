interface CreatedItem<C> {
  key: number
  component: C
}

interface Adaptor<H, C> {
  add: (getComponent: (h: H) => C) => () => void
  createMountPoint: () => C
}
