"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/ui/Footer"
import { BASE_API_URL } from "../config"
import { QrCode, MapPin, FileText, AlertTriangle, Loader2, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"

type Report = {
  report_id: string
  type: string
  details: string
  created_at: string
}

type Location = {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string | null
  created_at: string
}

type QRCode = {
  code_id: string
  code_created: string
  location: Location
  reports: Report[]
}

export default function OverviewPage() {
  const [codes, setCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${BASE_API_URL}/qrcodes`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json() as Promise<QRCode[]>
      })
      .then((data) => {
        setCodes(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("OverviewPage fetch error:", err)
        setError("Failed to load QR codes")
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 md:px-6">
        <div className="container flex h-16 items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">HelpHub</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link to="/overview" className="text-sm font-medium text-red-600 underline underline-offset-4">
              Overview
            </Link>
            <Link to="/admin" className="text-sm font-medium hover:underline underline-offset-4">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 bg-red-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">QR Codes Overview</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl mx-auto md:mx-0">
                View and manage all HelpHub QR codes and their associated locations and reports.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-red-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading QR codes...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
                <p className="text-red-600 font-medium">{error}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setLoading(true)
                    setError(null)
                    fetch(`${BASE_API_URL}/qrcodes`)
                      .then((res) => {
                        if (!res.ok) throw new Error(`Status ${res.status}`)
                        return res.json() as Promise<QRCode[]>
                      })
                      .then((data) => {
                        setCodes(data)
                        setLoading(false)
                      })
                      .catch((err) => {
                        console.error("OverviewPage fetch error:", err)
                        setError("Failed to load QR codes")
                        setLoading(false)
                      })
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : codes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <QrCode className="h-12 w-12 text-gray-300 mb-4" strokeWidth={1.5} />
                <h2 className="text-xl font-medium text-gray-900 mb-2">No QR Codes Found</h2>
                <p className="text-gray-500 max-w-md mb-6">
                  There are currently no QR codes in the system. Create your first QR code to get started.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Create QR Code <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {codes.map((code) => (
                  <div
                    key={code.code_id}
                    className="flex flex-col rounded-lg border bg-white shadow-sm overflow-hidden"
                  >
                    <div className="bg-red-50 p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{code.location.name}</h2>
                        <QrCode className="h-6 w-6 text-red-600" />
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-1">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 mt-0.5">
                            <QrCode className="h-3 w-3 text-red-600" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Code ID:</span>{" "}
                            <Link to={`/scan/${code.code_id}`} className="text-red-600 hover:underline font-medium">
                              {code.code_id}
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 mt-0.5">
                            <FileText className="h-3 w-3 text-blue-600" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Created:</span>{" "}
                            <span className="text-gray-900">
                              {new Date(code.code_created).toLocaleDateString()} at{" "}
                              {new Date(code.code_created).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mt-0.5">
                            <MapPin className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Location:</span>{" "}
                            <span className="text-gray-900">
                              ({code.location.latitude.toFixed(6)}, {code.location.longitude.toFixed(6)})
                            </span>
                          </div>
                        </div>

                        {code.location.description && (
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 mt-0.5">
                              <FileText className="h-3 w-3 text-purple-600" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Description:</span>{" "}
                              <span className="text-gray-900">{code.location.description}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
                          <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-700">
                            {code.reports.length}
                          </span>
                        </div>

                        {code.reports.length === 0 ? (
                          <p className="text-sm text-gray-500">No reports submitted yet</p>
                        ) : (
                          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {code.reports.map((rep) => (
                              <div key={rep.report_id} className="rounded-md bg-gray-50 p-3 text-sm">
                                <div className="flex items-center gap-2 mb-1">
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  <span className="font-medium">{rep.type}</span>
                                </div>
                                <p className="text-gray-700 mb-1">{rep.details}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(rep.created_at).toLocaleDateString()} at{" "}
                                  {new Date(rep.created_at).toLocaleTimeString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 border-t">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Link to={`/scan/${code.code_id}`} className="flex items-center gap-1">
                          View Details
                          </Link>
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
