import { useState, useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error loading projects data');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center text-xl font-bold">Loading projects...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center text-xl font-bold text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a href={project.link} className="text-blue-400 hover:text-blue-300 transition-colors my-4">
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
