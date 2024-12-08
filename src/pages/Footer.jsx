import { Home, MessageCircle, Headphones, Linkedin, Youtube, Instagram, Twitter, Facebook } from 'lucide-react'
import logo from '../images/logo.png'

export default function Footer() {
  return (
    <footer className="bg-emerald-400 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src={`${logo}?height=40&width=40`} alt="MentorPick logo" className="w-30 h-20 mr-2 rounded-xl" />
              <h2 className="text-2xl font-bold">MentorPick</h2>
            </div>
            <div className="flex items-start mb-2">
              <Home className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm">KL University, Vijayawada</p>
            </div>
            <div className="flex items-center mb-2">
              <MessageCircle className="w-5 h-5 mr-2" />
              <a href="mailto:support@MentorPick.com" className="text-sm">support@MentorPick.com</a>
            </div>
            <div className="flex items-center mb-2">
              <Headphones className="w-5 h-5 mr-2" />
              <div className='my-3'>
                <a href="mailto:ping@MentorPick.com" className="text-sm block">ping@MentorPick.com</a>
                <p className="text-sm">2200032823 Ankit Kumar Mishra</p>
                <p className="text-sm">Ph. 6371219061</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">COMMUNITY PROGRAMS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm">#IBelieveInDoing Challenge</a></li>
              <li><a href="#" className="text-sm">MentorPick Winter of Doing</a></li>
              <li><a href="#" className="text-sm">MentorPick Project Hub</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">CAREER PROGRAMS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm">Fellowship Program in Software Development</a></li>
              <li><a href="#" className="text-sm">Fellowship Program in QA Automation (SDET)</a></li>
              <li><a href="#" className="text-sm">Fellowship Program in NextGen Data Analytics with AI</a></li>
              <li><a href="#" className="text-sm">Fellowship Program In System Design</a></li>
            </ul>
            <h3 className="font-bold mt-4 mb-2">FOR BUSINESS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm">Hire from MentorPick</a></li>
              <li><a href="#" className="text-sm">MentorPick Onboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">MentorPick</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm">Placement Report</a></li>
              <li><a href="#" className="text-sm">Success Stories</a></li>
              <li><a href="#" className="text-sm">About</a></li>
              <li><a href="#" className="text-sm">Blog</a></li>
              <li><a href="#" className="text-sm">Terms of Use</a></li>
              <li><a href="#" className="text-sm">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm mb-4 sm:mb-0">Copyright © 2024 MentorPick. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-200"><Linkedin /></a>
            <a href="#" className="text-white hover:text-gray-200"><Youtube /></a>
            <a href="#" className="text-white hover:text-gray-200"><Instagram /></a>
            <a href="#" className="text-white hover:text-gray-200"><Twitter /></a>
            <a href="#" className="text-white hover:text-gray-200"><Facebook /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}