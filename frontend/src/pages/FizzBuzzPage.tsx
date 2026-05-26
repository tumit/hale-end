import { useState } from 'react'

export default function FizzBuzzPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResult(null)
    setError(null)

    const response = await fetch('/api/fizzbuzz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ n: Number(input) }),
    })

    const data = await response.json()
    if (response.ok) {
      setResult(data.result)
    } else {
      setError(data.detail ?? 'Something went wrong')
    }
  }

  return (
    <main className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">FizzBuzz</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a number"
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-primary">
          Check
        </button>
      </form>
      {result !== null && (
        <p role="status" className="text-2xl font-semibold">
          {result}
        </p>
      )}
      {error !== null && (
        <p role="alert" className="text-error">
          {error}
        </p>
      )}
    </main>
  )
}
