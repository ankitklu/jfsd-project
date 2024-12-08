import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Login from "./Login"; // Assuming Login component exists
import Content from "./Content"; // Import the Content component
import { FaSignInAlt } from "react-icons/fa";
import Marquee from "./Marquee";
import Courses from "./Courses";
import Table from "./Table";
import Footer from "./Footer";

export default function Home() {
  const [showButton, setShowButton] = useState(false);

  // Show the "Scroll to Top" button on scroll
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white">
        <div className="flex justify-between items-center h-16 px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
              <div className="h-8 w-26 flex items-center rounded">
                  <h1 className="text-lg font-bold text-gray-500 text-2xl ">
                    <span className="text-blue-300 text-3xl">&lt;</span>
                    <span className="text-blue-500 text-3xl">M</span>entor
                    <span className="text-blue-500 text-3xl">P</span>ick
                    <span className="text-blue-300 text-3xl"> /&gt;</span>
                  </h1>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="px-4 py-2 border-2 border-black text-xl font-medium rounded-[10px] text-black bg-white hover:border-green-900 hover:bg-green-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center">
              <Link to="/login" element={Login}>
                Sign In
              </Link>
              <ChevronRight />
            </button>
            <button className="mx-5 ml-3 px-4 py-2 border border-transparent text-xl font-medium rounded-[10px] text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 flex items-center">
              Book Your Trial, Now
              <ChevronRight />
            </button>
          </div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="flex-grow container mx-auto px-8 py-16 text-gray-800 space-y-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Welcome to MentorPick!
          </h1>
          <p className="text-lg mt-4 font-light">
            Organize, track, and excel in all your areas of interests.
          </p>
          <Link to="/signup">
            <button className="mt-6 bg-yellow-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition">
              Get Started
            </button>
          </Link>
        </section>

        {/* Additional Content Section */}
        <Content />
        <Marquee/>
        <Courses/>
        <Table/>
        <Footer/>

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-2 fixed bottom-0 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm leading-tight">
            &copy; 2024 MentorPick. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-10 bg-gray-700 text-white w-16 h-16 p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
