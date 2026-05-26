import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FizzBuzzPage from './FizzBuzzPage'

describe('FizzBuzzPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders number input and submit button', () => {
    render(<FizzBuzzPage />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /check/i })).toBeInTheDocument()
  })

  it('displays FizzBuzz result after successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ result: 'FizzBuzz' }),
    } as Response)

    render(<FizzBuzzPage />)
    await userEvent.type(screen.getByRole('spinbutton'), '15')
    await userEvent.click(screen.getByRole('button', { name: /check/i }))

    expect(await screen.findByRole('status')).toHaveTextContent('FizzBuzz')
  })

  it('displays error detail when fetch returns 400', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ detail: 'n must be a positive integer' }),
    } as Response)

    render(<FizzBuzzPage />)
    await userEvent.type(screen.getByRole('spinbutton'), '-1')
    await userEvent.click(screen.getByRole('button', { name: /check/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent('n must be a positive integer')
  })
})
