"use client";

import React from "react";

export default function Footer() {
    // Automatically detect current year
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-8 py-4 flex justify-center items-center bg-foreground text-background">
            <p className="text-sm sm:text-base">
                © SJ ResQ {currentYear}. All rights reserved.
            </p>
        </footer>
    );
}
