import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  signInWithEmail,
  createUserWithEmail,
  signInWithGoogle,
} from "../lib/auth";
import { useAuth } from "../lib/AuthContext";

const EcoConnectLogin = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmail(email, password);
      router.push("/"); // Redirect to landing page after login
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        // Create account if user doesn't exist
        try {
          await createUserWithEmail(email, password);
          router.push("/");
        } catch (createError) {
          setError(createError.message);
        }
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    // router.push("/"); // Redirect if already logged in
    // return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <span className="text-3xl mr-2" aria-hidden="true">
                🌱
              </span>
              <h1 className="text-3xl font-bold text-emerald-700">
                EcoConnect
              </h1>
            </div>
            <p className="text-gray-600">
              Join our community of eco-conscious individuals
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-emerald-50 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-emerald-50 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Log In / Sign Up
            </button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center py-2 px-4 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Sign in with Google"
            onClick={handleGoogleLogin}
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M20.2834 12.0002C20.2834 11.4695 20.2384 10.9387 20.1392 10.4172H12.2031V13.3043H16.7145C16.5255 14.2585 15.9947 15.1039 15.1685 15.6347V17.5779H17.6438C19.0895 16.2502 20.2834 14.3454 20.2834 12.0002Z"
                fill="#4285F4"
              />
              <path
                d="M12.2035 20.0008C14.2548 20.0008 15.9868 19.2506 17.6441 17.5777L15.1689 15.6345C14.4559 16.1286 13.4832 16.4372 12.2035 16.4372C9.87033 16.4372 7.89553 14.8715 7.20402 12.7073H4.65332V14.7103C6.30142 17.8612 9.06209 20.0008 12.2035 20.0008Z"
                fill="#34A853"
              />
              <path
                d="M7.20409 12.7072C6.98672 12.1395 6.86772 11.5257 6.86772 10.8927C6.86772 10.2597 6.98772 9.64587 7.20409 9.07816V7.07516H4.65339C3.96288 8.55074 3.56348 10.1922 3.56348 10.8927C3.56348 11.5932 3.96288 13.2347 4.65339 14.7102L7.20409 12.7072Z"
                fill="#FBBC05"
              />
              <path
                d="M12.2035 5.34816C13.4832 5.34816 14.6215 5.79387 15.5388 6.67009L17.7452 4.46372C15.9868 2.80285 14.2548 2.00072 12.2035 2.00072C9.06209 2.00072 6.30142 4.14025 4.65332 7.29116L7.20401 9.29416C7.89552 7.12996 9.87033 5.34816 12.2035 5.34816Z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Right side - Decorative */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-700 relative">
          {/* <div className="absolute inset-0 bg-[url('/images/nature-pattern.png')] opacity-10"></div> */}
          <div className="relative h-full flex flex-col justify-center items-center p-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md">
              <div className="bg-white/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6.00001 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6.00001Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14V18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 18H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Join Our Green Community
              </h2>
              <p className="text-white/90 text-center mb-6">
                Connect with like-minded individuals working together to create
                a sustainable future.
              </p>

              <div className="space-y-4">
                {[
                  "Track your environmental impact",
                  "Discover sustainable practices",
                  "Earn rewards for green actions",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 12L11 14L15 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoConnectLogin;
