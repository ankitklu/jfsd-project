import React from 'react';
import p1 from '../images/p1.png'
import p2 from '../images/p2.jpg'
import p3 from '../images/p3.jpg'
import p4 from '../images/p4.jpg'

export default function Marquee() {
  const graduates = [
    { profileImage: p1, name: "Ankit Kumar Mishra", company: "CRED" },
    { profileImage: p2, name: "Hasan Shaikh", company: "briq" }, // No image for this graduate
    { profileImage: p3, name: "Rishav Raj", company: "Walmart" },
    { profileImage: p4, name: "Arjun Grover", company: "Arcesium" }, // No image for this graduate
    { profileImage: './images/p5.png', name: "Samyak Gangwal", company: "vicara." },
    { profileImage: './images/p6.png', name: "Shubham Sharma", company: "CISCO" },
    { profileImage: './images/p7.png', name: "Soumyabrata Majumder", company: "EY" },
    { profileImage: './images/p8.png', name: "Gokulakanna", company: "Reliance Industries Limited" },
    { profileImage: './images/p9.png', name: "Anjira Singh", company: "PhonePe" },
    { profileImage: './images/p10.png', name: "Monika Raut", company: "Placeholder" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <h1 className="text-5xl font-bold text-center mb-2 ">MentorPick Grads</h1>
      <h2 className="text-3xl font-bold text-center mb-8">Have Cracked Their Dream Careers In</h2>
      
      <div className="relative">
        <div className="flex animate-marquee">
          {graduates.map((grad, index) => (
            <div key={index} className="flex-shrink-0 w-64 mx-4">
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center shadow-md">
                {grad.profileImage ? (
                  <img
                    src={grad.profileImage}
                    alt={grad.name}
                    className="w-15 h-20 rounded-full mb-4"
                  />
                ) : (
                  <div className="w-15 h-20 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
                    <span>Profile Pic</span> {/* Fallback if no image */}
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-1">{grad.name}</h3>
                <p className="text-sm text-gray-600 mb-2">is in</p>
                {/* <img
                  src={`/placeholder.svg?height=40&width=120`} // Placeholder for company logo
                  alt={`${grad.company} logo`}
                  className="h-10 object-contain"
                /> */}
                <p className="text-md  text-black  mb-2">{grad.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
