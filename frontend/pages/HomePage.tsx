import React from 'react';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-8 sm:p-20 gap-12">

      {/* Hero Section */}
      <section className="w-full max-w-3xl flex flex-col items-center gap-6">
        <img
          src="/helphub-icon-alpha.png"
          alt="HelpHub Icon"
          className="w-32 h-32 rounded-lg shadow-lg"
        />
        <h1 className="text-5xl font-bold text-white text-center">
          HelpHub
        </h1>
        <p className="text-lg text-gray-300 text-center">
          One scan, instant help. QR‑powered emergency assistance and community
          resources at your fingertips.
        </p>
      </section>

      {/* Key Features */}
      <section className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Emergency Call
          </h2>
          <p className="text-gray-300">
            Directly dial 911 with one tap for urgent assistance.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Non‑Emergency
          </h2>
          <p className="text-gray-300">
            Contact San Jose non‑emergency line for community issues.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Find Help Center
          </h2>
          <p className="text-gray-300">
            Locate nearest shelters and clinics instantly.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Report an Issue
          </h2>
          <p className="text-gray-300">
            Submit anonymous reports on safety or infrastructure problems.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-3xl text-gray-300">
        <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Scan any HelpHub QR code installed in public spaces.</li>
          <li>
            Choose an action: Emergency Call, Non‑Emergency, Find Help Center, or
            Report Issue.
          </li>
          <li>Get connected instantly—no app download required.</li>
        </ul>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}