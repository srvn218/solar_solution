import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { MapPin, Calendar, Zap, Award, Users, ShieldCheck } from 'lucide-react';
import { storageService } from '../services/storageService';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(storageService.getProjects());
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      
      {/* About Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 md:p-14 flex flex-col justify-center order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm w-fit mb-6">
              About Aswin Solar
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Pioneering the Future of <span className="text-primary-600">Clean Energy</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              At Aswin Solar, we don't just sell panels; we engineer energy independence. Founded by a team of certified electrical engineers and renewable energy enthusiasts, we are dedicated to transforming how homes and businesses power their future. With our AI-driven approach, we ensure precision in every calculation and perfection in every installation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2.5 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Top Rated</div>
                  <div className="text-xs text-gray-500">Service</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2.5 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Expert Team</div>
                  <div className="text-xs text-gray-500">Certified</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2.5 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">25 Year</div>
                  <div className="text-xs text-gray-500">Warranty</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-64 lg:h-auto order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1548613053-220e39908a8d?w=800&auto=format&fit=crop&q=60" 
              alt="Solar Installation Team" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful installations. From cozy homes to large industrial complexes, we've powered them all.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <p>No projects to display yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer h-80 md:h-96 border border-gray-100">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                    <div className="flex flex-wrap gap-3 md:gap-4 text-white/90 text-xs md:text-sm">
                      <span className="flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1.5" /> {project.location}
                      </span>
                      <span className="flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <Zap className="w-3 h-3 md:w-4 md:h-4 mr-1.5 text-yellow-400" /> {project.capacity}
                      </span>
                      <span className="flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1.5" /> {project.completionDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;