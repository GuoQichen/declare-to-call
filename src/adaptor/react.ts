import { createElement as h, useState } from 'react'
import type { ComponentClass, Dispatch, FunctionComponent, ReactNode } from 'react'

import { createByAdaptor } from '../base'

type Hyperscript = typeof h
type Component = ComponentClass<any> | FunctionComponent<any>
type RenderNode = Component | ReactNode

class ReactAdaptor implements Adaptor<Hyperscript, RenderNode> {
  list: Array<CreatedItem<RenderNode>> = []
  forceUpdate?: Dispatch<any>
  _uid = 0

  add(getComponent: (h: Hyperscript) => RenderNode) {
    if (!this.forceUpdate) {
      throw new Error('[create-api] You should mount MountPoint first')
    }
    const emitRender = this.forceUpdate
    const createdItem = {
      key: ++this._uid,
      component: getComponent(h),
    }
    this.list.push(createdItem)
    emitRender({})
    return () => {
      this.list = this.list.filter((item) => item.key !== createdItem.key)
      emitRender({})
    }
  }

  createMountPoint() {
    return () => {
      const [, set] = useState()
      this.forceUpdate = set
      return this.list.map(({ key, component }) =>
        h(component as Component, { key }),
      )
    }
  }
}

const reactAdaptor = new ReactAdaptor()
export default createByAdaptor<Hyperscript, RenderNode>(reactAdaptor)
export const MountPoint = reactAdaptor.createMountPoint()
export const Mount = (App: Component): Component => () => [h(App), h(MountPoint)]
