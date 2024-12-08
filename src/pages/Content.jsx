import React from "react";
import { ChevronDown, ChevronRight, PlayCircle } from "lucide-react";
import img1 from "../images/img1.png";

export default function Content() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 text-cyan-800">
              Learn Like You Would
            </h1>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4  text-cyan-800">
              At India's
            </h1>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4  text-cyan-800">
              Top Tech Mentors.
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              Work-experience based learning programs to land your dream tech
              job
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Build</span>
                professional projects like the top 1% tech professionals.
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Master</span>
                the latest Fullstack/Backend/Automation tech with real work-ex.
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Crack</span>
                your dream role at the best tech companies
              </li>
            </ul>
            <div className="flex items-center mb-8">
              <PlayCircle className="text-green-600 w-6 h-6 mr-2" />
              <span className="text-green-600 font-semibold">
                Upskill with MentorPick
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center bg-white text-black border-2 border-black py-2 px-6 rounded-[10px] font-bold hover:border-green-900 hover:bg-green-900 hover:text-cyan-400 transition duration-300">
                Explore Our Programs
                <ChevronRight className="ml-1 h-5 w-5 mt-1" />{" "}
                {/* Increased size here */}
              </button>
              <button className="flex items-center bg-yellow-400 text-black py-2 px-6 rounded-[10px] font-bold hover:bg-yellow-300 transition duration-300 shadow-md shadow-yellow-300">
                Book Your Trial, Now
                <ChevronRight className="ml-1 h-5 w-5 mt-1" />
              </button>
            </div>
          </div>
          <div className=" lg:mt-0">
            <img
              src={img1}
              alt="Tech learning illustration"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12 text-center">
          {[
            { value: "95%", label: "placed within 9 months of graduation" },
            { value: "10 LPA", label: "average dream job CTC" },
            { value: "21 LPA", label: "average super-dream job CTC" },
            { value: "1000+", label: "Hiring Partners" },
            { value: "81%", label: "Average Salary Hike" },
          ].map((stat, index) => (
            <div key={index} className="bg-green-100 p-5 rounded-[15px] shadow-md">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
