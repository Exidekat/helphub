import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import Footer from "../components/ui/Footer"
import { Phone, PhoneCall, Home, AlertTriangle, QrCode, ArrowRight, MapPin, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 md:px-6">
        <div className="container flex h-16 items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">HelpHub</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </a>
            <a href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] 2xl:max-w-6xl mx-auto">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    One scan, instant help.
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    QR‑powered emergency assistance and community resources at your fingertips.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Link to="/overview" className="flex items-center">
                      Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline">Find QR Locations</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] overflow-hidden rounded-lg border bg-white p-2 shadow-xl">
                  <div className="flex h-full w-full items-center justify-center bg-red-100 rounded-md">
                    <QrCode className="h-32 w-32 text-red-600" strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 backdrop-blur p-4 shadow-lg">
                    <p className="text-sm font-medium">Scan any HelpHub QR code for instant emergency assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access critical services with just one scan - no app download required.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 2xl:gap-8">
              {/* Emergency Call */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-red-100 p-4">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold">Emergency Call</h3>
                <p className="text-center text-sm text-gray-500">
                  Directly dial 911 with one tap for urgent assistance.
                </p>
              </div>

              {/* Non-Emergency */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-4">
                  <PhoneCall className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Non-Emergency</h3>
                <p className="text-center text-sm text-gray-500">
                  Contact San Jose non-emergency line for community issues.
                </p>
              </div>

              {/* Find Help Center */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Find Help Center</h3>
                <p className="text-center text-sm text-gray-500">Locate nearest shelters and clinics instantly.</p>
              </div>

              {/* Report an Issue */}
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-amber-100 p-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">Report an Issue</h3>
                <p className="text-center text-sm text-gray-500">
                  Submit anonymous reports on safety or infrastructure problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple steps to get the help you need, when you need it.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 2xl:gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">1</div>
                <h3 className="text-xl font-bold">Scan QR Code</h3>
                <p className="text-center text-sm text-gray-500">
                  Scan any HelpHub QR code installed in public spaces.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">2</div>
                <h3 className="text-xl font-bold">Choose Action</h3>
                <p className="text-center text-sm text-gray-500">
                  Select Emergency Call, Non-Emergency, Find Help Center, or Report Issue.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">3</div>
                <h3 className="text-xl font-bold">Get Connected</h3>
                <p className="text-center text-sm text-gray-500">Get connected instantly—no app download required.</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">4</div>
                <h3 className="text-xl font-bold">Receive Help</h3>
                <p className="text-center text-sm text-gray-500">
                  Get the assistance you need from emergency services or community resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 2xl:max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About HelpHub</h2>
                <p className="mt-4 text-gray-500 md:text-xl/relaxed">
                  HelpHub is a lightweight, mobile-optimized web app that empowers residents and visitors to access
                  emergency assistance, city services, and community support with a simple QR scan.
                </p>
                <ul className="mt-8 grid gap-4">
                  <li className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                      <Home className="h-4 w-4 text-red-600" />
                    </div>
                    <span>Accessible from any smartphone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                      <FileText className="h-4 w-4 text-red-600" />
                    </div>
                    <span>No app download required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                    <span>Located throughout San Jose public spaces</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Contact Us</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                  <img
                    src="/frontend/public/globe.svg"
                    alt="People using HelpHub QR codes in a public space"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-600 text-white">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to help your community?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join us in making emergency assistance and community resources more accessible.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-red-600 hover:bg-gray-100">Partner With Us</Button>
                <Button variant="outline" className="bg-red-700 border-white text-white hover:bg-red-500">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
