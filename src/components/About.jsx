import React from 'react';
import abt from "../assets/abt1.png";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header with animated background */}
      <div className="relative py-16 text-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>
        <h1 className="relative inline-block text-4xl md:text-5xl font-bold text-white px-6">
          About Me
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
        </h1>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          {/* Image with glow effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={abt}
                alt="Darshan Jain"
                className="max-w-sm w-full h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="lg:max-w-2xl">
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              Darshan Jain
              <div className="absolute -bottom-2 left-0 right-0 h-1 w-24 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </h2>
            
            <p className="text-lg text-gray-300 my-6 leading-relaxed">
              Hi, I'm Darshan Jain, a passionate programmer with a love for turning ideas into reality. 
              With a keen eye for detail and a commitment to excellence, I enjoy tackling new challenges 
              and continuously learning.
            </p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-600/20 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">Web Development</h3>
                  <p className="text-gray-400">Creating responsive and intuitive web applications</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-600/20 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">Mobile Development</h3>
                  <p className="text-gray-400">Building cross-platform mobile applications</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a 
                href="https://darshanjainportfolio.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center"
              >
                Visit my portfolio
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}