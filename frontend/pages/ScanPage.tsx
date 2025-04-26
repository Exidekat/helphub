"use client"
import { Link, useParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Phone, PhoneCall, MapPin, AlertTriangle, ArrowLeft, Share2, Info, Clock } from "lucide-react"
import Footer from "../components/ui/Footer"
import LocationMap from "../components/LocationMap"

export default function ScanPage() {
  const { code_id } = useParams<{ code_id: string }>()

  // This would normally come from an API based on the code_id
  const locationInfo = {
    name: "San Jose City Hall",
    address: "200 E Santa Clara St, San Jose, CA 95113",
    coordinates: { lat: 37.3375, lng: -121.8868 },
    qrCode: code_id || "unknown",
    timestamp: new Date().toISOString(),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 md:px-6">
        <div className="container flex h-16 items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">HelpHub</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-8 md:py-12 max-w-6xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-[2fr_1fr] 2xl:max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Emergency Assistance</h1>
                <p className="text-gray-500">
                  QR Code: <span className="font-medium text-gray-900">{code_id}</span>
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-red-700">
                      <Phone className="mr-2 h-5 w-5" />
                      Emergency Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">For immediate life-threatening emergencies</p>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Call 911</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-blue-700">
                      <PhoneCall className="mr-2 h-5 w-5" />
                      Non-Emergency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">For non-urgent police assistance</p>
                    <Button variant="outline" className="w-full">
                      Call (408) 277-8900
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-green-700">
                      <MapPin className="mr-2 h-5 w-5" />
                      Find Help Centers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Locate nearby shelters and resources</p>
                    <Button variant="outline" className="w-full">
                      View Map
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-amber-700">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Report Issue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">Report safety or infrastructure problems</p>
                    <Button variant="outline" className="w-full">
                      File Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Report a Problem with this QR Code</CardTitle>
                  <CardDescription>Is this QR code damaged or in need of maintenance? Let us know.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="issue" className="text-sm font-medium">
                        Issue Description
                      </label>
                      <Input id="issue" placeholder="Describe the issue with this QR code" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Submit Report</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-[200px] rounded-md overflow-hidden bg-slate-100">
                    <LocationMap location={locationInfo} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{locationInfo.name}</p>
                        <p className="text-sm text-gray-500">{locationInfo.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">QR Code ID: {locationInfo.qrCode}</p>
                    </div>

                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Scanned: {new Date().toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Location
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Police Department</p>
                    <p className="text-sm text-gray-500">(408) 277-8900</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fire Department</p>
                    <p className="text-sm text-gray-500">(408) 535-7900</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Poison Control</p>
                    <p className="text-sm text-gray-500">(800) 222-1222</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Mental Health Crisis Line</p>
                    <p className="text-sm text-gray-500">(800) 273-8255</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
