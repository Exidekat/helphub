"use client";

//import { useState, useEffect } from "react";
import { motion } from "framer-motion";
//import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "../components/Footer";

export default function HomePage() {
    //const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-black min-h-screen flex flex-col items-center p-8 sm:p-20 gap-12"
        >
            {/* Hero Section */}
            <section className="w-full max-w-5xl flex flex-col gap-8 items-center">
                <Image
                    className="rounded-full shadow-lg"
                    src="/helphub-icon-alpha.png"
                    alt="App Icon"
                    width={150}
                    height={150}
                    priority
                />
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-white">
                    HelpHub by SJ ResQ
                </h1>
                <p className="text-center text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                    HelpHub is a lightweight, mobile-optimized web app that empowers residents and visitors to access emergency assistance, city services, and community support with a simple QR scan. Whether you need urgent help, want to report a safety issue, or find the nearest open shelter, SafeLink makes assistance just a tap away — no downloads, no barriers.
                </p>
            </section>

            {/* Content Blocks */}
            <section className="flex flex-col gap-12 w-full max-w-3xl text-gray-300">
                <h2 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet</h2>
                {/* Block #1: Teamwork and Collaboration */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-white">Lorem ipsum dolor sit amet</h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                        <span className="text-white font-semibold"> Lorem ipsum dolor sit amet </span>
                        Lorem ipsum dolor sit amet <span className="text-white font-semibold">Lorem ipsum dolor sit amet</span>,
                        Lorem ipsum dolor sit amet
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                        <span className="text-white font-semibold">Lorem ipsum dolor sit amet</span>
                        Lorem ipsum dolor sit amet
                    </p>
                </div>

                {/* Block #2 */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-white">Lorem ipsum dolor sit amet</h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                        <span className="text-white font-semibold">Lorem ipsum dolor sit amet</span>
                        Lorem ipsum dolor sit amet
                        “<span className="text-white italic">Lorem ipsum dolor sit amet</span>,”
                        Lorem ipsum dolor sit amet
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>

                {/* Block #3 */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-white">Looking Ahead</h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>

                {/* Block #4 */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-white">Lorem ipsum dolor sit amet</h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                        “<span className="text-white italic">Without struggle, there is no progress.</span>”
                        Lorem ipsum dolor sit amet
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
            </section>

            {/* Closing Remarks */}
            <section className="max-w-2xl text-center text-sm sm:text-base text-gray-300 leading-relaxed">
                <p className="mt-8">
                    Thank you for visiting my site.
                </p>
            </section>
            <Footer />
        </motion.div>
    );
}
