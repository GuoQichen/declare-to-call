import { h, ref } from 'vue'
import type { Component } from 'vue'

import { createByAdaptor } from '../base'

type Hyperscript = typeof h

class VueAdaptor implements Adaptor<Hyperscript, Component> {
  list = ref<CreatedItem<Component>[]>([])
  mounted = false
  _uid = 0

  add(getComponent: (h: Hyperscript) => Component) {
    if (!this.mounted) {
      throw new Error('[create-api] You should mount MountPoint first')
    }
    const createdItem = {
      key: ++this._uid,
      component: getComponent(h),
    }
    this.list.value.push(createdItem)
    return () => {
      this.list.value = this.list.value.filter((item) => item.key !== createdItem.key)
    }
  }

  createMountPoint() {
    return () => {
      this.mounted = true
      return this.list.value.map(({ key, component }) => h(component, { key }))
    }
  }
}

const vueAdaptor = new VueAdaptor()
export default createByAdaptor<Hyperscript, Component>(vueAdaptor)
export const MountPoint = vueAdaptor.createMountPoint()
export const Mount = (App: Component): Component => () => [h(App), h(MountPoint)]
