// frontend/pages/ScanPage.tsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/ui/Footer'
import { API_BASE } from '../config'

type Location = {
  id: string
  name: string
  latitude: number
  longitude: number
  description?: string
}

export default function ScanPage() {
  const { code_id } = useParams<{ code_id: string }>()
  const [loc, setLoc] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reportDetails, setReportDetails] = useState('')
  const [reportSent, setReportSent] = useState(false)

  useEffect(() => {
    if (!code_id) return
    fetch(`${API_BASE}/scan/${code_id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json()
      })
      .then(data => setLoc(data.location))
      .catch(err => setError('QR code not found or server error'))
  }, [code_id])

  const sendReport = async () => {
    try {
      await fetch(`${API_BASE}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_id,
          type: 'infrastructure', // or 'safety', you could add a selector
          details: reportDetails,
        }),
      })
      setReportSent(true)
    } catch {
      setError('Failed to send report')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-8">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (!loc) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center">
        <p>Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center p-8 sm:p-20 gap-8">
      <h1 className="text-3xl font-bold">{loc.name}</h1>
      {loc.description && <p className="text-gray-400 max-w-xl text-center">{loc.description}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        <a href="tel:911" className="p-4 bg-accent rounded-lg text-center font-semibold">Emergency Call</a>
        <a href="tel:4082778900" className="p-4 bg-secondary rounded-lg text-center font-semibold">Non-Emergency</a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`}
          target="_blank"
          rel="noopener"
          className="p-4 bg-secondary rounded-lg text-center font-semibold"
        >
          Find Help Center
        </a>
        <button
          className="p-4 bg-secondary rounded-lg text-center font-semibold"
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}
        >
          Report an Issue
        </button>
      </div>

      <div className="w-full max-w-md mt-6">
        {reportSent ? (
          <p className="text-green-400">Thank you—your report has been submitted.</p>
        ) : (
          <>
            <textarea
              rows={4}
              value={reportDetails}
              onChange={e => setReportDetails(e.target.value)}
              placeholder="Describe the issue…"
              className="w-full p-3 rounded-lg bg-secondary text-text resize-none"
            />
            <button
              onClick={sendReport}
              disabled={!reportDetails.trim()}
              className="mt-3 w-full p-3 bg-accent rounded-lg font-semibold disabled:opacity-50"
            >
              Submit Report
            </button>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
