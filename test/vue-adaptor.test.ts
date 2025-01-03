import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import createApi, { Mount, MountPoint } from '../src/adaptor/vue'

describe('vueAdaptor', () => {
  it('should throw error if MountPoint is not mounted', () => {
    const TestComponent = {
      template: '<div>Test</div>',
    }

    expect(() => {
      createApi(TestComponent)({})
    }).toThrow('[create-api] You should mount MountPoint first')
  })

  it('should create and mount component correctly', () => {
    const TestComponent = {
      template: '<div>Test Component</div>',
    }
    const App = Mount(TestComponent)

    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Test Component')
  })

  it('should handle async component creation and cleanup', async () => {
    const Modal = {
      props: ['onResolve', 'onReject', 'message'],
      template: `
        <div>
          <div>{{ message }}</div>
          <button data-test="confirm" @click="onResolve('success')">Confirm</button>
          <button data-test="cancel" @click="onReject('cancelled')">Cancel</button>
        </div>
      `,
    }

    const App = {
      setup() {
        const handleClick = async () => {
          const result = await createApi(Modal)({ message: 'Test Message' })
          expect(result).toBe('success')
        }

        return () => h('div', [
          h('button', { onClick: handleClick }, 'Open Modal'),
          h(MountPoint),
        ])
      },
    }

    const wrapper = mount(App)

    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Test Message')

    await wrapper.find('button[data-test="confirm"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain('Test Message')
  })
})
