/// <reference types="@testing-library/jest-dom" />

import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import createApi, { Mount, MountPoint } from '../src/adaptor/react'

describe('reactAdaptor', () => {
  it('should throw error if MountPoint is not mounted', async () => {
    const TestComponent = () => <div>Test</div>

    expect(() => {
      createApi(TestComponent)({})
    }).toThrow('[create-api] You should mount MountPoint first')
  })

  it('should create and mount component correctly', () => {
    const TestComponent = () => <div>Test Component</div>
    const App = Mount(TestComponent)

    render(<App />)
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('should handle async component creation and cleanup', async () => {
    const Modal = ({ onResolve, onReject, message }: any) => (
      <div>
        <div>{message}</div>
        <button onClick={() => onResolve('success')}>Confirm</button>
        <button onClick={() => onReject('cancelled')}>Cancel</button>
      </div>
    )

    const App = () => {
      const handleClick = async () => {
        const result = await createApi(Modal)({ message: 'Test Message' })
        expect(result).toBe('success')
      }

      return (
        <div>
          <button onClick={handleClick}>Open Modal</button>
          <MountPoint />
        </div>
      )
    }

    render(<App />)

    const openButton = screen.getByText('Open Modal')
    await fireEvent.click(openButton)

    expect(screen.getByText('Test Message')).toBeInTheDocument()

    const confirmButton = screen.getByText('Confirm')
    await fireEvent.click(confirmButton)

    expect(screen.queryByText('Test Message')).not.toBeInTheDocument()
  })
})
