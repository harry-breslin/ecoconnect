import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeStat, setActiveStat] = useState(0);
  const stats = [
    { value: "20K+", label: "Eco-community Members" },
    { value: "1.2M", label: "Pounds of CO₂ Reduced" },
    { value: "500+", label: "Sustainable Swaps Monthly" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>EcoConnect - Building a Sustainable Future</title>
        <meta
          name="description"
          content="Connect with eco-conscious individuals and organizations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Modern gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Glassmorphism navigation */}
        <nav className="backdrop-blur-md bg-white/80 border-b border-green-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-3xl font-bold text-green-700 flex items-center"
              >
                <span className="mr-2">🌱</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                  EcoConnect
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                {["Marketplace", "Chat", "Leaderboard"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-green-700 hover:text-emerald-600 font-medium transition-colors relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero section with modern typography */}
          <section className="relative py-20 px-6 sm:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold text-green-900 leading-tight">
                  <span className="block">Sustainable</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                    Living Made Simple
                  </span>
                </h1>
                <p className="text-xl text-green-700 max-w-lg">
                  Join thousands trading, learning, and growing in our
                  eco-conscious community. Every swap makes a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/marketplace"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold text-center transition-all shadow-md hover:shadow-lg"
                  >
                    Start Trading
                  </Link>
                  <Link
                    href="#impact-section"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl text-lg font-semibold text-center transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative">
                {/* Floating card design */}
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-emerald-100 rounded-2xl rotate-6"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-teal-100 rounded-2xl -rotate-6"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-green-100">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-6xl">🌎</span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-green-800">
                      Today's Featured Swap
                    </h3>
                    <p className="text-green-600 mt-2">
                      Bamboo toothbrush set for reusable produce bags
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats section inspired by reference */}
          <section
            id="impact-section"
            className="py-16 bg-white/50 backdrop-blur-sm"
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
                Our <span className="text-emerald-500">Impact</span> in Numbers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-2xl transition-all duration-500 ${
                      activeStat === index
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-white text-green-800 shadow-md"
                    }`}
                  >
                    <p
                      className={`text-5xl font-bold mb-2 ${
                        activeStat === index ? "text-white" : "text-emerald-500"
                      }`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-lg">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trending section */}
          <section className="py-20 px-6 bg-gradient-to-b from-white to-green-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-green-800">
                    Trending <span className="text-emerald-500">This Week</span>
                  </h2>
                  <p className="text-green-600 mt-2">
                    Most popular sustainable swaps
                  </p>
                </div>
                <Link
                  href="/trending"
                  className="text-emerald-500 font-medium hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Reusable Beeswax Wraps", category: "Kitchen" },
                  { name: "Organic Cotton Totes", category: "Fashion" },
                  { name: "Bamboo Cutlery Sets", category: "Travel" },
                  { name: "Upcycled Glass Jars", category: "Home" },
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center text-5xl">
                        {["🍯", "👜", "🍴", "🍶"][index]}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-emerald-200 text-sm">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-green-800 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EcoConnect</h3>
              <p className="text-green-200">
                Building sustainable communities through conscious consumption.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Explore</h4>
              <ul className="space-y-2">
                {["Marketplace", "Community", "Resources", "Events"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-green-200 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-2">
                {["Our Story", "Impact", "Team", "Careers"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/about#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-green-200 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Stay Connected</h4>
              <div className="flex space-x-4 mb-4">
                {["twitter", "instagram", "facebook"].map((platform) => (
                  <Link
                    key={platform}
                    href={`https://${platform}.com/ecoconnect.macathon`}
                    className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center transition-colors"
                    aria-label={`Follow us on ${platform}`}
                  >
                    {platform === "twitter"
                      ? "🐦"
                      : platform === "instagram"
                      ? "📷"
                      : "👍"}
                  </Link>
                ))}
              </div>
              <p className="text-green-200">
                Subscribe to our sustainability newsletter
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-green-700 text-center text-green-300">
            <p>© {new Date().getFullYear()} EcoConnect. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
