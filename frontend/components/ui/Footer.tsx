import { Link } from "react-router-dom"
import { QrCode } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-red-600" />
            <span className="font-bold">HelpHub</span>
          </div>
          <p className="text-sm text-gray-500">© SJ ResQ 2025. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
