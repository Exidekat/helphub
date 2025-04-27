// ./frontend/pages/AdminPage.tsx
import React, { useState } from "react";
import Footer from "../components/ui/Footer";
import { BASE_API_URL } from "../config";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { QrCode, MapPin, FileText } from "lucide-react";

type ApiResponse = {
  code_id: string;
  code_created: string;
  location: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    description: string | null;
    created_at: string;
  };
  help_center_id: string;
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [helpCenterId, setHelpCenterId] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${BASE_API_URL}/admin/qrcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          description,
          help_center_id: helpCenterId || undefined,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: ApiResponse = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="sticky top-0 bg-white border-b p-4">
        <h1 className="text-2xl font-bold">Admin – Generate QR Code</h1>
      </header>

      <main className="flex-1 p-6 max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Location Name</label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Latitude</label>
              <Input
                type="number"
                step="any"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Longitude</label>
              <Input
                type="number"
                step="any"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Description (optional)</label>
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Help Center ID (optional)</label>
            <Input
              value={helpCenterId}
              onChange={e => setHelpCenterId(e.target.value)}
              placeholder="Leave blank to auto-assign nearest"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Generating…" : "Generate & Print QR Code"}
          </Button>
          {error && <p className="text-red-600">{error}</p>}
        </form>

        {result && (
          <div className="p-4 border rounded space-y-2">
            <div className="flex items-center gap-2">
              <QrCode className="h-6 w-6 text-green-600" />
              <span className="font-medium">Code ID:</span> {result.code_id}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{result.location.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-500">
                Created at {new Date(result.code_created).toLocaleString()}
              </span>
            </div>
            {/* Here you can embed <QRCode value={result.code_id} /> from `qrcode.react` to render a printable SVG */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
