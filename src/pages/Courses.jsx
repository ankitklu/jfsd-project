import { CalendarIcon, BriefcaseIcon, GraduationCapIcon, LockIcon, CodeIcon, CpuIcon, ExternalLinkIcon, CheckCircleIcon } from "lucide-react";
import d1 from '../images/d1.jpg'

export default function Courses() {
    return (
      <>
        <div className="max-w-6xl mx-auto text-center px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
            Immersive Work Ex-Based Programs To Crack Jobs At The Fastest-Growing Companies
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Learn the skills you need to land a Fullstack/Backend Developer or SDET Job at a top product company.
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Gain the work experience of professional developers</span>
            <span className="text-gray-600"> working at Amazon, Netflix, AirBnB, Flipkart,</span>
          </p>
          <p className="text-lg text-gray-600">
            and more, with continuous guidance and support from our mentors.
          </p>
        </div>
  
        <div className="bg-teal-900 text-white p-6 rounded-xl max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <img src={`${d1}?height=80&width=80`} alt="Program Icon" className="w-20 h-20 mb-4 sm:mb-0 sm:mr-6 rounded-[150px]" />
  
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-teal-300 mb-2">Fellowship Program in Software Development</h2>
              <p className="text-sm">
                Learn with real work experience and get assured referrals to transition into a Full-Stack or Backend Developer at product-based companies
              </p>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <div className="bg-teal-800 p-2 rounded-full mr-3">
                <CodeIcon className="w-6 h-6 text-teal-300" /> {/* Icon for MERN or Backend */}
              </div>
              <span className="text-sm">Project-led MERN or Backend Specialisation</span>
            </div>
            <div className="flex items-center">
              <div className="bg-teal-800 p-2 rounded-full mr-3">
                <CpuIcon className="w-6 h-6 text-teal-300" /> {/* Icon for DS, Algo, System Design */}
              </div>
              <span className="text-sm">DS, Algo, and System Design curriculum</span>
            </div>
            <div className="flex items-center">
              <div className="bg-teal-800 p-2 rounded-full mr-3">
                <ExternalLinkIcon className="w-6 h-6 text-teal-300" /> {/* Icon for Externships */}
              </div>
              <span className="text-sm">Externships with Real Tech Companies</span>
            </div>
            <div className="flex items-center">
              <div className="bg-teal-800 p-2 rounded-full mr-3">
                <CheckCircleIcon className="w-6 h-6 text-teal-300" /> {/* Icon for Referrals */}
              </div>
              <span className="text-sm">Assured referrals in top dev roles</span>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-teal-800 p-4 rounded-lg">
              <h3 className="text-teal-300 font-semibold mb-2">Full Stack Specialisation</h3>
              <p className="text-sm mb-2">7 Professional Projects to learn with real work-experience</p>
              <p className="text-xs text-teal-400">(MongoDB, Express, React, NodeJS)</p>
            </div>
            <div className="bg-teal-800 p-4 rounded-lg">
              <h3 className="text-teal-300 font-semibold mb-2">Backend Specialisation</h3>
              <p className="text-sm mb-2">5 Professional projects to learn with real work-experience</p>
              <p className="text-xs text-teal-400">(Core Java and Spring Boot )</p>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-teal-800 p-4 rounded-lg flex items-center">
              <LockIcon className="w-6 h-6 mr-3 text-teal-300" />
              <div>
                <h4 className="font-semibold">Trial Session</h4>
                <p className="text-teal-300">Free</p>
              </div>
            </div>
            <div className="bg-teal-800 p-4 rounded-lg flex items-center">
              <CalendarIcon className="w-6 h-6 mr-3 text-teal-300" />
              <div>
                <h4 className="font-semibold">Duration</h4>
                <p className="text-teal-300">9 months</p>
              </div>
            </div>
            <div className="bg-teal-800 p-4 rounded-lg flex items-center">
              <GraduationCapIcon className="w-6 h-6 mr-3 text-teal-300" />
              <div>
                <h4 className="font-semibold">Scholarships</h4>
                <p className="text-teal-300">Assured Scholarships</p>
              </div>
            </div>
            <div className="bg-teal-800 p-4 rounded-lg flex items-center">
              <BriefcaseIcon className="w-6 h-6 mr-3 text-teal-300" />
              <div>
                <h4 className="font-semibold">Career Services</h4>
                <p className="text-teal-300">Assured Referrals</p>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="border-2 border-white bg-teal-700 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Learn More &gt;
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-teal-900 font-bold py-3 px-6 rounded-lg transition duration-300">
              Apply Now &gt;
            </button>
          </div>
        </div>
      </>
    );
  }
  