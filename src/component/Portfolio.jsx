"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import { useInView } from "react-intersection-observer"
import profile from '../assets/gaurav.jpg'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaAws,
  FaDocker,
  FaPython,
  FaJava,
  FaCode,
  FaCloud,
  FaLayerGroup,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGraduationCap,
  FaSchool,
  FaUniversity,
  FaMedal,
  FaCertificate,
  FaLaptopCode,
} from "react-icons/fa"



// Utility function for throttling
const throttle = (func, limit) => {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Background Particles Component
const BackgroundParticles = ({ count = 15 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 0),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 0),
            scale: 0,
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 0),
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 0),
            ],
            y: [
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 0),
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 0),
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Timeline Item Component
const TimelineItem = ({ data, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center w-full`}
    >
      <div className="w-1/2 px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10
                   hover:border-blue-500/50 transition-all shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            {data.icon}
            <h3 className="text-xl font-bold">{data.title}</h3>
          </div>
          <p className="text-blue-500 font-semibold mb-2">{data.year}</p>
          <p className="text-gray-400">{data.institution}</p>
          <p className="text-sm text-gray-500 mt-2">{data.description}</p>
          {data.achievements && (
            <motion.ul className="mt-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <FaMedal className="text-yellow-500" />
                  {achievement}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </div>
      <div className="w-12 flex justify-center">
        <div className="w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
          />
        </div>
      </div>
      <div className="w-1/2 px-4" />
    </motion.div>
  )
}

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState("home")
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [cursorVariant, setCursorVariant] = useState("default")
  
    // Cursor variants
    const cursorVariants = {
      default: {
        height: 32,
        width: 32,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        mixBlendMode: "screen",
      },
      hover: {
        height: 64,
        width: 64,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        x: mousePosition.x - 32,
        y: mousePosition.y - 32,
      },
    }
  
    // Mouse movement effect
    useEffect(() => {
      const handleMouseMove = throttle((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }, 16)
  
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])
  
    return (
      <ParallaxProvider>
        <div className="min-h-screen bg-gray-900 text-white relative">
          {/* Navbar */}
          <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <motion.a
                  href="#"
                  className="text-2xl font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  Gaurav<span className="text-blue-500">.dev</span>
                </motion.a>
                
                <div className="hidden md:flex space-x-8">
                  {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-blue-500 transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
  
                <div className="flex space-x-4">
                  {[
                    { icon: FaGithub, link: "https://github.com/Gaurav-Mohadikar" },
                    { icon: FaLinkedin, link: "https://www.linkedin.com/in/gaurav-mohadikar-1256a3287/" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </nav>
  
          {/* Hero Section */}
          <section id="home" className="pt-32 pb-20 relative min-h-screen flex items-center">
            <BackgroundParticles count={15} />
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Hi, I'm <span className="text-blue-500">Gaurav</span>
                  </h1>
                  <h2 className="text-2xl md:text-4xl text-gray-400 mb-8">
                    MERN / Full Stack Developer
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    I build exceptional digital experiences that make life easier and more enjoyable."Designing seamless user experiences with powerful backend solutions for scalable, high-performance web applications."
                  </p>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg
                               font-semibold hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      View Projects
                    </motion.button>
                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border border-blue-500 rounded-lg font-semibold
                               hover:bg-blue-500/10"
                    >
                      Contact Me
                    </motion.button> */}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="relative w-[450px] aspect-square">
                    <img
                      src={profile}
                      alt="Gaurav Mohadikar"
                      className="rounded-full w-[450px] h-[450px] object-cover border-4 border-blue-500"
                    />
                    <div className="absolute -inset-4 rounded-full border border-blue-500/50 animate-spin-slow" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

                  {/* About Section */}
        <section id="about" className="py-20 relative">
          <BackgroundParticles count={8} />
          <div className="container mx-auto px-4">
            <Parallax speed={-10}>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20"
              >
                About <span className="text-blue-500">Me</span>
              </motion.h2>
            </Parallax>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold">
                "A passionate MERN / Full Stack Developer based in Nagpur, India."
                </h3>
                <p className="text-gray-400">
                "With over a year of experience in web development, I specialize in building scalable and efficient applications using modern technologies. Driven by a passion for coding, I create intuitive and high-performance digital solutions."
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaCode className="text-blue-500" />
                    <span>1+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLayerGroup className="text-blue-500" />
                    <span>10+ Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCertificate className="text-blue-500" />
                    <span>5+ Certifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-blue-500" />
                    <span>Graduate</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { number: "1+", label: "Years of experience" },
                  { number: "10+", label: "Projects completed" },
                  { number: "7+", label: "Happy clients" },
                  { number: "15+", label: "Technologies" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10
                             hover:border-blue-500/50 transition-all text-center"
                  >
                    <h4 className="text-3xl font-bold text-blue-500">{stat.number}</h4>
                    <p className="text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 relative">
          <BackgroundParticles count={10} />
          <div className="container mx-auto px-4">
            <Parallax speed={-10}>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20"
              >
                My <span className="text-blue-500">Skills</span>
              </motion.h2>
            </Parallax>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend Development",
                  icon: <FaReact className="text-4xl text-blue-500" />,
                  skills: ["React.js",  "JavaScript", "Tailwind CSS", "Redux"],
                },
                {
                  title: "Backend Development",
                  icon: <FaNodeJs className="text-4xl text-green-500" />,
                  skills: ["Node.js", "Express.js", "JavaScript", "RESTful APIs"],
                },
                {
                  title: "Database & Cloud",
                  icon: <FaDatabase className="text-4xl text-purple-500" />,
                  skills: ["MongoDB", "MySQL", "AWS", "Firebase"],
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10
                           hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">
                    {category.icon}
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">{skill}</span>
                          <span className="text-blue-500">90%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "90%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 relative">
          <BackgroundParticles count={8} />
          <div className="container mx-auto px-4">
            <Parallax speed={-10}>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20"
              >
                My <span className="text-blue-500">Education</span>
              </motion.h2>
            </Parallax>

            <div className="space-y-12">
              {[
                {
                  title: "Bachelor`s of Commerce in  Computer Applications",
                  year: "2020 - 2023",
                  institution: "Kamla Nehru Mahavidyalaya, Sakkardara, Nagpur ",
                  description: "Specialized in Advanced Software Development and System Design",
                  icon: <FaUniversity className="text-2xl text-blue-500" />,
                  achievements: [
                   "Excelled in business and IT projects.",
                  
                    "Led college technical team",
                  ],
                },
                {
                  title: "Commerce",
                  year: " 2018 - 2020",
                  institution: "Shri Ram Swami jr. Collage",
                  description: "Passionate commerce student exploring finance, business, and market strategies.",
                  icon: <FaGraduationCap className="text-2xl text-blue-500" />,
                  achievements: [
                    "Active member of commerce club.",
                   "Excelled in accounting and finance.",
                    
                  ],
                },
              ].map((education, index) => (
                <TimelineItem key={index} data={education} index={index} />
              ))}
            </div>
          </div>
        </section>

                {/* Projects Section */}
                <section id="projects" className="py-20 relative">
          <BackgroundParticles count={10} />
          <div className="container mx-auto px-4">
            <Parallax speed={-10}>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20"
              >
                My <span className="text-blue-500">Projects</span>
              </motion.h2>
            </Parallax>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-Commerce Platform",
                  description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
                  image: "/projects/ecommerce.jpg",
                  tech: ["React", "Node.js", "MongoDB", "Redux"],
                  link: "https://github.com/project1",
                },
                {
                  title: "AI Chat Application",
                  description: "Real-time chat app with AI integration using OpenAI's GPT-3",
                  image: "/projects/chat.jpg",
                  tech: ["Next.js", "OpenAI", "WebSocket", "Tailwind"],
                  link: "https://github.com/project2",
                },
                {
                  title: "Cloud Management Dashboard",
                  description: "AWS cloud resource management dashboard with real-time monitoring",
                  image: "/projects/dashboard.jpg",
                  tech: ["React", "AWS", "GraphQL", "TypeScript"],
                  link: "https://github.com/project3",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/5 rounded-2xl overflow-hidden backdrop-blur-lg border 
                           border-white/10 hover:border-blue-500/50 transition-all"
                >
                  <div className="relative aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-500 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500
                               rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      View Project
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <BackgroundParticles count={8} />
          <div className="container mx-auto px-4">
            <Parallax speed={-10}>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-bold text-center mb-20"
              >
                Get In <span className="text-blue-500">Touch</span>
              </motion.h2>
            </Parallax>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold">"Let’s Connect and Innovate Together!"</h3>
                <p className="text-gray-400">
                  I'm always open to discussing new projects, creative ideas or opportunities to
                  be part of your visions."Looking for a skilled developer to bring your vision to life? Whether it’s a web app, a business solution, or a new venture, I’m here to help. Let’s connect!"
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FaEnvelope className="text-2xl text-blue-500" />
                    <a href="mailto:contact@example.com" className="text-gray-400 hover:text-blue-500">
                      gauravmohadikar12@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <FaLinkedin className="text-2xl text-blue-500" />
                    <a
                      href="https://www.linkedin.com/in/gaurav-mohadikar-1256a3287/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      linkedin.com/gaurav
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10
                             focus:border-blue-500 focus:outline-none text-white"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10
                             focus:border-blue-500 focus:outline-none text-white"
                    placeholder="Your email"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-gray-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10
                             focus:border-blue-500 focus:outline-none text-white resize-none"
                    placeholder="Your message"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500
                           rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2025 Gaurav.dev.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                {[
                  { icon: FaGithub, link: "https://github.com/Gaurav-Mohadikar" },
                  { icon: FaLinkedin, link: "https://www.linkedin.com/in/gaurav-mohadikar-1256a3287/" },
                  { icon: FaEnvelope, link: "gauravmohadikar12@gmail.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Custom Cursor */}
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
          variants={cursorVariants}
          animate={cursorVariant}
        />
      </div>
    </ParallaxProvider>
  )
}

export default Portfolio