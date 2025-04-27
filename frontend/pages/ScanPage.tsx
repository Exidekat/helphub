"use client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Phone,
  PhoneCall,
  MapPin,
  AlertTriangle,
  ArrowLeft,
  Share2,
  Info,
  Clock,
} from "lucide-react";
import Footer from "../components/ui/Footer";
import { API_BASE } from "../config";
import LocationMap from "@/components/LocationMap";

type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
};

export default function ScanPage() {
  const { code_id } = useParams<{ code_id: string }>();
  const [locationInfo, setLocationInfo] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reportDetails, setReportDetails] = useState("");
  const [reportSent, setReportSent] = useState(false);

  useEffect(() => {
    if (!code_id) return;

    fetch(`${API_BASE}/scan/${code_id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => setLocationInfo(data.location))
      .catch((err) => setError("QR code not found or server error"));
  }, [code_id]);

  const sendReport = async () => {
    try {
      await fetch(`${API_BASE}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code_id,
          type: "infrastructure",
          details: reportDetails,
        }),
      });
      setReportSent(true);
    } catch {
      setError("Failed to send report");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!locationInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
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
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Emergency Assistance
                </h1>
                <p className="text-gray-500">
                  QR Code:{" "}
                  <span className="font-medium text-gray-900">{code_id}</span>
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Emergency Buttons */}
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-red-700">
                      <Phone className="mr-2 h-5 w-5" />
                      Emergency Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      asChild
                    >
                      <a href="tel:911">Call 911</a>
                    </Button>
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
                    <Button variant="outline" className="w-full" asChild>
                      <a href="tel:4082778900">Call (408) 277-8900</a>
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
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={`https://www.google.com/maps/search/Help+center/@${locationInfo.latitude},${locationInfo.longitude},14z`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Map
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-gray-700">
                      <Info className="mr-2 h-5 w-5" />
                      Emergency Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/info">Learn More</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Report a Problem */}
              <Card>
                <CardHeader>
                  <CardTitle>Report a Problem with this QR Code</CardTitle>
                  <CardDescription>
                    Is this QR code damaged or in need of maintenance? Let us
                    know.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="issue" className="text-sm font-medium">
                        Issue Description
                      </label>
                      <Input
                        id="issue"
                        placeholder="Describe the issue with this QR code"
                        value={reportDetails}
                        onChange={(e) => setReportDetails(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    disabled={!reportDetails.trim()}
                    onClick={sendReport}
                  >
                    {reportSent ? "Report Sent!" : "Submit Report"}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Location Info */}
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
                        <p className="text-sm text-gray-500">
                          {locationInfo.latitude}, {locationInfo.longitude}
                        </p>
                        {locationInfo.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {locationInfo.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        QR Code ID: {code_id}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        Scanned: {new Date().toLocaleString()}
                      </p>
                    </div>

                    {/* Here is the new San Jose emergency numbers section */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Police Department</p>
                      <p className="text-sm text-gray-500">(408) 277-8900</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Fire Department</p>
                      <p className="text-sm text-gray-500">(408) 794-7000</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Poison Control</p>
                      <p className="text-sm text-gray-500">(800) 222-1222</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Mental Health Crisis Line
                      </p>
                      <p className="text-sm text-gray-500">(855) 278-4204</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "HelpHub Location",
                          text: `Check out this emergency help location: ${locationInfo.name}`,
                          url: window.location.href,
                        });
                      } else {
                        alert("Sharing is not supported on this device.");
                      }
                    }}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Location
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
