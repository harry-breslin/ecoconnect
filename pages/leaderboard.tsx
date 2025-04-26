import React, { useState } from "react";

export default function LeaderBoard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Top 3 players data
  const topPlayers = [
    {
      name: "Brook",
      place: "1st",
      points: "1500 Pts",
      order: 0,
      avatar: "B",
      color: "#328E6E",
    },
    {
      name: "Robert",
      place: "2nd",
      points: "1200 Pts",
      order: 1,
      avatar: "R",
      color: "#67AE6E",
    },
    {
      name: "Darrell",
      place: "3rd",
      points: "500 Pts",
      order: 2,
      avatar: "D",
      color: "#90C67C",
    },
  ];

  // Leaderboard table data
  const leaderboardData = [
    { name: "Cody Fisher", place: 4, points: 300, avatar: "C" },
    { name: "Kathryn Murphy", place: 5, points: 200, avatar: "K" },
    { name: "Kristin Watson", place: 6, points: 150, avatar: "K" },
    { name: "Jerome Bell", place: 7, points: 120, avatar: "J" },
    { name: "Annette Black", place: 8, points: 100, avatar: "A" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-700">
              🌱 EcoConnect
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/home" className="text-green-700 hover:text-emerald-600">
              Home
            </a>
            <a
              href="/leaderboard"
              className="font-semibold text-emerald-600 border-b-2 border-emerald-500"
            >
              Leaderboard
            </a>
            <a
              href="/activities"
              className="text-green-700 hover:text-emerald-600"
            >
              Activities
            </a>
            <a
              href="/community"
              className="text-green-700 hover:text-emerald-600"
            >
              Community
            </a>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-3">
            <a href="/home" className="block py-2 text-green-700">
              Home
            </a>
            <a
              href="/leaderboard"
              className="block py-2 font-semibold text-emerald-600"
            >
              Leaderboard
            </a>
            <a href="/activities" className="block py-2 text-green-700">
              Activities
            </a>
            <a href="/community" className="block py-2 text-green-700">
              Community
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-2">
          Community Leaderboard
        </h1>
        <p className="text-center text-green-600 mb-12">
          Our top eco-warriors making a difference
        </p>

        {/* Podium Section */}
        <div className="relative mb-20">
          <div className="flex justify-center items-end space-x-4 md:space-x-8 h-64">
            {topPlayers.map((player, index) => (
              <div
                key={player.name}
                className={`flex flex-col items-center transition-all duration-300 ${
                  index === 1 ? "h-48" : "h-40"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 shadow-lg ${
                    index === 1 ? "mb-6" : "mb-4"
                  }`}
                  style={{ backgroundColor: player.color }}
                  aria-label={`Avatar for ${player.name}`}
                >
                  {player.avatar}
                </div>

                {/* Podium */}
                <div
                  className={`w-20 md:w-24 rounded-t-lg flex flex-col items-center justify-end ${
                    index === 1 ? "h-40" : "h-32"
                  }`}
                  style={{ backgroundColor: player.color }}
                >
                  <span className="text-white font-bold text-lg mb-2">
                    {player.place}
                  </span>
                  <div className="w-full bg-white bg-opacity-30 py-2 text-center">
                    <span className="text-white font-medium text-sm">
                      {player.points}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="mt-4 font-bold text-green-800 text-center">
                  {player.name}
                </h2>
              </div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 text-center opacity-10">
            <span className="text-6xl md:text-8xl font-black text-green-700">
              LEADERS
            </span>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto">
          <div className="grid grid-cols-12 bg-green-600 text-white font-semibold">
            <div className="col-span-1 py-3 text-center">#</div>
            <div className="col-span-8 py-3 pl-4">Member</div>
            <div className="col-span-3 py-3 text-center">Points</div>
          </div>

          {leaderboardData.map((player) => (
            <div
              key={player.name}
              className="grid grid-cols-12 border-b border-gray-100 last:border-b-0 hover:bg-green-50 transition-colors"
            >
              <div className="col-span-1 py-4 text-center text-gray-500">
                {player.place}
              </div>
              <div className="col-span-8 py-4 pl-4 flex items-center">
                <div
                  className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mr-3"
                  aria-label={`Avatar for ${player.name}`}
                >
                  {player.avatar}
                </div>
                <span className="font-medium text-green-800">
                  {player.name}
                </span>
              </div>
              <div className="col-span-3 py-4 text-center text-green-600 font-medium">
                {player.points}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-green-700 mb-6">Want to climb the leaderboard?</p>
          <a
            href="/activities"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all"
          >
            Join More Activities
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} EcoConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
