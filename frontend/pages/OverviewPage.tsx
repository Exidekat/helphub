// frontend/pages/OverviewPage.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { BASE_API_URL } from '../config';

type Report = {
  report_id: string;
  type: string;
  details: string;
  created_at: string;
};

type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  created_at: string;
};

type QRCode = {
  code_id: string;
  code_created: string;
  location: Location;
  reports: Report[];
};

export default function OverviewPage() {
  const [codes, setCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_API_URL}/qrcodes`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json() as Promise<QRCode[]>;
      })
      .then(data => {
        setCodes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('OverviewPage fetch error:', err);
        setError('Failed to load QR codes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-secondary">
        Loading QR codes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen text-text p-8 sm:p-12">
      <h1 className="text-4xl font-bold mb-6">All QR Codes Overview</h1>

      {codes.length === 0 ? (
        <p className="text-secondary">No QR codes found.</p>
      ) : (
        <div className="space-y-8">
          {codes.map(code => (
            <div key={code.code_id} className="border border-secondary rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">
                {code.location.name}
              </h2>

              <p>
                <strong>Code ID:</strong>{' '}
                <Link
                  to={`/scan/${code.code_id}`}
                  className="text-accent underline hover:text-accent/80"
                >
                  {code.code_id}
                </Link>
              </p>

              <p>
                <strong>Created At:</strong>{' '}
                {new Date(code.code_created).toLocaleString()}
              </p>

              <p>
                <strong>Location:</strong>{' '}
                ({code.location.latitude}, {code.location.longitude})
              </p>

              {code.location.description && (
                <p>
                  <strong>Description:</strong> {code.location.description}
                </p>
              )}

              <h3 className="text-xl font-semibold mt-4">
                Reports ({code.reports.length})
              </h3>

              {code.reports.length === 0 ? (
                <p className="text-secondary">No reports</p>
              ) : (
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {code.reports.map(rep => (
                    <li key={rep.report_id}>
                      <p>
                        <strong>Type:</strong> {rep.type}
                      </p>
                      <p>
                        <strong>Details:</strong> {rep.details}
                      </p>
                      <p>
                        <strong>Reported At:</strong>{' '}
                        {new Date(rep.created_at).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
