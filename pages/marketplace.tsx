import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  getListings,
  createListing,
  updateListing,
  deleteListing,
  updateUserPoints,
  createUserProfile,
} from "../lib/db";
import { useAuth } from "../lib/AuthContext";

export default function Marketplace() {
  const { user } = useAuth(); // Access the current user
  const [scrollY, setScrollY] = useState(0);
  const [listings, setListings] = useState([]);
  const dummyListings = [
    {
      title: "Eco-friendly Water Bottle",
      price: "WTT: MTH2025 Textbook",
      image:
        "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg",
      tags: ["BPA Free", "1L Capacity"],
    },
    {
      title: "Bamboo Cutlery Set",
      price: "WTT: Treat me to coffee at Wholefoods",
      image:
        "https://images.pexels.com/photos/5217960/pexels-photo-5217960.jpeg",
      tags: ["Travel Set", "6 Pieces"],
    },
    {
      title: "Reusable Shopping Bags",
      price: "Free - I don't use them",
      image:
        "https://images.pexels.com/photos/4498135/pexels-photo-4498135.jpeg",
      tags: ["Foldable", "3 Pack"],
    },
    {
      title: "Organic Cotton Tote",
      price: "WTT: Compost for my Apple tree!",
      image:
        "https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg",
      tags: ["Handmade", "Large"],
    },
    {
      title: "Wooden Hair Brush",
      price: "WTT: Any homemade goodies",
      image:
        "https://images.pexels.com/photos/4207785/pexels-photo-4207785.jpeg",
      tags: ["Bamboo", "Anti-static"],
    },
    {
      title: "Vintage Denim Jacket",
      price: "WTT: Your dad's old clothes",
      image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg",
      tags: ["Size M", "Light Wash"],
    },
  ];

  // Fetch listings from the backend
  useEffect(() => {
    const fetchListings = async () => {
      const fetchedListings = await getListings();
      setListings(fetchedListings);
    };
    fetchListings();
  }, []);

  // Add dummy listings to the backend for testing
  useEffect(() => {
    const addDummyListings = async () => {
      for (let i = 0; i < dummyListings.length; i++) {
        const dummyOwnerId = `dummyOwner${i}`;
        await createUserProfile({
          uid: dummyOwnerId,
          displayName: `Dummy User ${i}`,
          email: `dummy${i}@example.com`,
        });
        await createListing({
          ...dummyListings[i],
          ownerId: dummyOwnerId,
        });
      }
    };
    addDummyListings();
  }, []);

  // Handle completing a swap
  const handleCompleteSwap = async (listingId, ownerId) => {
    if (!user) {
      alert("You must be logged in to complete a swap.");
      return;
    }

    try {
      // Mark the listing as completed
      await updateListing(listingId, {
        status: "completed",
        swappedWith: user.uid, // Current user's ID
      });

      // Delete the listing after marking it as completed
      await deleteListing(listingId);

      // Refresh listings after completing the swap
      const updatedListings = await getListings();
      setListings(updatedListings);
    } catch (error) {
      console.error("Error completing swap:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Marketplace - EcoConnect</title>
        <meta
          name="description"
          content="Trade sustainable goods with your community"
        />
        <style jsx global>{`
          @keyframes sway {
            0%,
            100% {
              transform: rotate(-2deg);
            }
            50% {
              transform: rotate(2deg);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-sway {
            animation: sway 6s ease-in-out infinite;
            transform-origin: bottom center;
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .parallax-bg {
            background-position: center calc(50% + ${scrollY * 0.3}px);
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating leaves */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 opacity-20 text-4xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            >
              {i % 3 === 0 ? "🍃" : i % 2 === 0 ? "🌿" : "🍂"}
            </div>
          ))}

          {/* Swaying trees in background */}
          <div
            className="absolute bottom-0 left-10 w-40 h-40 animate-sway"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-6xl">🌳</div>
          </div>
          <div
            className="absolute bottom-0 right-20 w-32 h-32 animate-sway"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-5xl">🌴</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="backdrop-blur-md bg-white/80 border-b border-green-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-green-700 flex items-center hover:scale-105 transition-transform"
            >
              <span className="mr-2">🌱</span> EcoConnect
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/chat"
                className="text-green-700 hover:text-emerald-600 transition-colors font-medium"
              >
                Chat
              </Link>
              <Link
                href="/leaderboard"
                className="text-green-700 hover:text-emerald-600 transition-colors font-medium"
              >
                Leaderboard
              </Link>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                Add Listing
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto py-16 px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-4">
              Sustainable <span className="text-emerald-600">Swaps</span>
            </h1>
            <p className="text-xl text-green-700 max-w-2xl mx-auto mb-8">
              Trade eco-friendly goods with your community. No money needed -
              just good intentions.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link
                href="/marketplace"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Browse Listings
              </Link>
              <Link
                href="/"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </section>

          {/* Product Grid */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-emerald-600 font-semibold mb-4">
                      {item.price}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleCompleteSwap(item.id, item.ownerId)
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        Swap
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-green-800 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer content remains the same */}
          </div>
        </footer>
      </div>
    </>
  );
}
