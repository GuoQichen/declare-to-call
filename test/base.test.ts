import { describe, expect, it, vi } from 'vitest'
import { createByAdaptor } from '../src/base'

describe('createByAdaptor', () => {
  it('should create component with adaptor correctly', async () => {
    const h = vi.fn()
    const mockAdaptor = {
      add: vi.fn((getComponent) => {
        const component = getComponent(h)
        // fake render component
        component()
        return () => {}
      }),
      createMountPoint: vi.fn(),
    }

    const mockComponent = {}
    const createWithComponent = createByAdaptor(mockAdaptor)(mockComponent)

    const mockChildren = {}
    const getChildren = vi.fn(() => mockChildren)
    const props = { prop: 'value' }
    const promise = createWithComponent(props, getChildren)

    expect(promise).toBeInstanceOf(Promise)
    expect(mockAdaptor.add).toHaveBeenCalled()
    expect(h).toHaveBeenCalledWith(mockComponent, {
      ...props,
      onResolve: expect.any(Function),
      onReject: expect.any(Function),
    }, mockChildren)
    expect(getChildren).toHaveBeenCalledWith(h)
  })

  it('should resolve promise when onResolve is called', async () => {
    const h = vi.fn()
    const clear = vi.fn()
    const mockAdaptor = {
      add: vi.fn((getComponent) => {
        const component = getComponent(h)
        // fake render component
        component()
        return clear
      }),
      createMountPoint: vi.fn(),
    }

    const promise = createByAdaptor(mockAdaptor)({})()
    h.mock.calls[0][1].onResolve('result')
    await expect(promise).resolves.toBe('result')
    expect(clear).toHaveBeenCalled()
  })

  it('should reject promise when onReject is called', async () => {
    const h = vi.fn()
    const mockAdaptor = {
      add: vi.fn((getComponent) => {
        const component = getComponent(h)
        // fake render component
        component()
        return () => {}
      }),
      createMountPoint: vi.fn(),
    }

    const promise = createByAdaptor(mockAdaptor)({})()
    h.mock.calls[0][1].onReject('error')
    await expect(promise).rejects.toBe('error')
  })
})
