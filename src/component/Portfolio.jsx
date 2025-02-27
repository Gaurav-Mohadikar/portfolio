"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax"
import { useInView } from "react-intersection-observer"
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaLayerGroup,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGraduationCap,
  FaUniversity,
  FaMedal,
  FaCertificate,
} from "react-icons/fa"

import profile from '../assets/gaurav.jpg'
// import profile from '../assets/img/Gaurav.png'
import beacon from '/src/assets/img/beacon-Academy.png'
import mobile from '/src/assets/img/ashish-mobile.png'
import cheap from '/src/assets/img/cheap-book.png'
import durgesh from '/src/assets/img/durgesh-furniture.png'

import madhuprem from '/src/assets/img/madhuprem.png'
import omsai from "/src/assets/img/om-sai.png"; // Try this

import shinde from '/src/assets/img/shinde.png'
import shiv from '/src/assets/img/shiv-shakti.png'

import port from '/src/assets/img/port.png'
import attendance from '/src/assets/img/attendance.png'
import cars from '/src/assets/img/car.jpg'



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
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handleResize = throttle(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 200)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: 0,
          }}
          animate={{
            x: [Math.random() * dimensions.width, Math.random() * dimensions.width],
            y: [Math.random() * dimensions.height, Math.random() * dimensions.height],
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
      initial={{ opacity: 0, x: 0, y: 50 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-8 sm:pl-0 mb-12 last:mb-0"
    >
      {/* Timeline line and dot (visible on all screens) */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 sm:left-1/2 sm:ml-[-0.5px]">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
        />
      </div>

      {/* Content container */}
      <div className={`sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8 sm:ml-auto" : "sm:pl-8"}`}>
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
    </motion.div>
  )
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  // Profile image
  const profileImage = "/placeholder.svg?height=450&width=450"

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gray-900 text-white relative">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <motion.a href="#" className="text-2xl font-bold" whileHover={{ scale: 1.05 }}>
                Gaurav<span className="text-blue-500">.dev</span>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {["Home", "About", "Skills","Education","Experience", "Projects", "Contact"].map((item) => (
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

              {/* Mobile Menu Button */}
              <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>

              {/* Social Icons */}
              <div className="hidden md:flex space-x-4">
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-white/10"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-500 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex space-x-4 pt-2">
                  {[
                    { icon: FaGithub, link: "https://github.com/Gaurav-Mohadikar" },
                    { icon: FaLinkedin, link: "https://www.linkedin.com/in/gaurav-mohadikar-1256a3287/" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 relative min-h-screen flex items-center">
          <BackgroundParticles count={10} />
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
              {/* Profile Image - Now first on mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex justify-center md:justify-start order-1 md:order-2 ml-[70px] "
              >
                <div className="relative w-[280px] md:w-[350px] lg:w-[450px] aspect-square">
                  <img
                    src={profile}
                    alt="Gaurav Mohadikar"
                    className="rounded-full w-full h-full object-cover border-4 border-blue-500"
                  />
                  <div className="absolute -inset-4 rounded-full border border-blue-500/50 animate-spin-slow" />
                </div>
              </motion.div>

              {/* Text Content - Now second on mobile */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center md:text-left order-2 md:order-1"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  Hi, I'm <span className="text-blue-500">Gaurav</span>
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 mb-8">
                  MERN / Full Stack Developer
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8">
                  I build exceptional digital experiences that make life easier and more enjoyable. Designing seamless
                  user experiences with powerful backend solutions for scalable, high-performance web applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg
                             font-semibold hover:shadow-lg hover:shadow-blue-500/25 text-center"
                  >
                    View Projects
                  </motion.a>
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
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20"
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
                <h3 className="text-3xl font-bold">A passionate MERN / Full Stack Developer based in Nagpur, India.</h3>
                <p className="text-gray-400">
                  With over a year of experience in web development, I specialize in building scalable and efficient
                  applications using modern technologies. Driven by a passion for coding, I create intuitive and
                  high-performance digital solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
        {/* Skills Section */}
<section id="skills" className="py-20 relative">
  <BackgroundParticles count={10} />
  <div className="container mx-auto px-4">
    <Parallax speed={-10}>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20"
      >
        My <span className="text-blue-500">Skills</span>
      </motion.h2>
    </Parallax>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Frontend Development",
          icon: <FaReact className="text-4xl text-blue-500" />,
          skills: [
            { name: "React.js", per: 60 },
            { name: "JavaScript", per: 65 },
            { name: "Tailwind CSS", per: 50 },
            { name: "Redux", per: 40 },
          ]
        },
        {
          title: "Backend Development",
          icon: <FaNodeJs className="text-4xl text-green-500" />,
          skills: [
            { name: "Node.js", per: 55 },
            { name: "Express.js", per: 50 },
            { name: "JavaScript", per: 65 },
            { name: "RESTful APIs", per: 60 },
          ]
        },
        {
          title: "Database & Cloud",
          icon: <FaDatabase className="text-4xl text-purple-500" />,
          skills: [
            { name: "MongoDB", per: 90 },
            { name: "MySQL", per: 80 },
            { name: "AWS", per: 80 },
            { name: "Firebase", per: 80 },
          ]
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
                  <span className="text-gray-400">{skill.name}</span>
                  <span className="text-blue-500">{skill.per}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.per}%` }}
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
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20"
              >
                My <span className="text-blue-500">Education</span>
              </motion.h2>
            </Parallax>

            <div className="space-y-12">
              {[
                {
                  title: "Bachelor`s of Commerce in Computer Applications",
                  year: "2020 - 2023",
                  institution: "Kamla Nehru Mahavidyalaya, Sakkardara, Nagpur ",
                  description: "Specialized in Advanced Software Development and System Design",
                  icon: <FaUniversity className="text-2xl text-blue-500" />,
                  achievements: ["Excelled in business and IT projects.", "Led college technical team"],
                },
                {
                  title: "Commerce",
                  year: " 2018 - 2020",
                  institution: "Shri Ram Swami jr. Collage",
                  description: "Passionate commerce student exploring finance, business, and market strategies.",
                  icon: <FaGraduationCap className="text-2xl text-blue-500" />,
                  achievements: ["Active member of commerce club.", "Excelled in accounting and finance."],
                },
              ].map((education, index) => (
                <TimelineItem key={index} data={education} index={index} />
              ))}
            </div>
          </div>
        </section>




{/* Work Experience Section */}
<section id="experience" className="py-20 relative overflow-hidden">
  <BackgroundParticles count={12} />
  {/* Decorative Elements */}
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
  </div>

  <div className="container mx-auto px-4 relative">
    <Parallax speed={-10}>
      <motion.div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-blue-500 text-lg font-semibold mb-4 block"
        >
          My Professional Journey
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold inline-block bg-gradient-to-r 
                     from-white to-gray-500 bg-clip-text text-transparent"
        >
          Work <span className="text-blue-500">Experience</span>
        </motion.h2>
      </motion.div>
    </Parallax>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {[
        {
          company: "PSK Technologies Pvt. Ltd",
          period: "2024 - Present",
          role: "MERN Stack Developer",
          description: "Helping businesses grow with tailored, efficient, and scalable web solutions using the MERN stack."

,
          // icon: "👨‍💻",
          achievements: [
            "Developed and deployed 10+ responsive websites for various businesses",
            "Implemented modern UI/UX practices to enhance user engagement",
            "Managed end-to-end project lifecycle from conception to deployment",
            "Achieved 95% client satisfaction rate"
          ],
          technologies: ["React", "Node.js", "MongoDB", "Express", "AWS"],
          // stats: [
          //   { label: "Projects", value: "10+" },
          //   { label: "Clients", value: "7+" },
          //   { label: "Satisfaction", value: "95%" }
          // ],
          color: "blue"
        },
        {
          company: "PSK Technologies Pvt. Ltd",
          period: "2024 - Present",
          role: "Frontend Developer",
          description: "Independent Frontend Developer crafting responsive, user-friendly, and visually appealing web interfaces.",
          // icon: "🚀",
          achievements: [
            "Contributed to 5+ client projects",
            "Optimized website performance by 40%",
            "Collaborated with senior developers on complex features",
            "Learned and implemented best coding practices"
          ],
          technologies: ["JavaScript", "React", "HTML5", "CSS3", "Git"],
          // stats: [
          //   { label: "Projects", value: "5+" },
          //   { label: "Performance", value: "40%" },
          //   { label: "Growth", value: "100%" }
          // ],
          color: "purple"
        }
      ].map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          whileHover={{ y: -5 }}
          className="relative group"
        >
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-lg border border-white/10 
                         hover:border-blue-500/50 transition-all duration-300 h-full
                         hover:bg-white/10">
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br 
                          from-blue-500 to-purple-500 rounded-2xl rotate-12 opacity-80
                          group-hover:rotate-45 transition-transform duration-300">
              <span className="absolute inset-0 flex items-center justify-center text-3xl">
                {experience.icon}
              </span>
            </div>
            
            {/* Period Badge */}
            <div className="absolute -top-4 left-4 px-4 py-2 bg-gradient-to-r 
                          from-blue-500/80 to-purple-500/80 rounded-full text-sm font-semibold
                          backdrop-blur-md shadow-lg transform -rotate-2 group-hover:rotate-0
                          transition-transform duration-300">
              {experience.period}
            </div>

            {/* Content */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 
                            bg-clip-text text-transparent">{experience.company}</h3>
              <p className="text-blue-400 font-semibold mb-4">{experience.role}</p>
              <p className="text-gray-400 mb-6">{experience.description}</p>

              {/* Stats Grid */}
              {/* <div className="grid grid-cols-3 gap-4 mb-6">
                {experience.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-center p-2 rounded-lg bg-white/5"
                  >
                    <div className="text-xl font-bold text-blue-500">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div> */}

              {/* Achievements */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-white/90">Key Achievements:</h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3 text-gray-400 group/item"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        className="w-2 h-2 rounded-full bg-blue-500 group-hover/item:bg-purple-500
                                 transition-colors duration-300"
                      />
                      <span className="group-hover/item:text-blue-400 transition-colors duration-300">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-white/90">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                               rounded-full text-blue-400 text-sm border border-blue-500/20
                               hover:border-blue-500/50 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-blue-500/50 rounded-2xl opacity-0 
                         group-hover:opacity-100 transition-all duration-300 pointer-events-none
                         group-hover:scale-105" />
          </div>
        </motion.div>
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
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20"
              >
                My <span className="text-blue-500">Projects</span>
              </motion.h2>
            </Parallax>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Portfolio",
                  description: "Passionate developer building responsive, user-friendly, and innovative web solutions.",
                  image: port,
                  tech: ["React.js", "HTML", "Tailwind CSS"],
                  link: "https://github.com/project1",
                },
                {
                  title: "Cars Nagpur",
                  description: "Discover the latest cars, accessories, and top deals at our car shop.",
                  image: cars,
                  tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
                  link: "https://carsnagpur.com/",
                },
                {
                  title: "Attendance System",
                  description: "Efficiently manage and track employee attendance with our user-friendly system.",
                  image: attendance,
                  tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
                  link: "https://attendance.com/",
                },
                {
                  title: "Ashish Mobile Shop",
                  description: "Discover the latest smartphones, accessories, and top deals at our mobile shop.",
                  image: mobile,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://ashishmobile.in/",
                },
                {
                  title: "Beacon Academy",
                  description: "Empowering learners with quality courses, expert guidance, and interactive resources.",
                  image: beacon,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://beaconacademynagpur.in/",
                },
                {
                  title: "Cheap-Book Depot",
                  description: "Explore bestsellers, academic texts, and rare finds at unbeatable prices!",
                  image: cheap,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://cheapbookdepot.com/",
                },
                {
                  title: "Durgesh Furniture",
                  description: "Explore our collection of modern, classic, and custom designs to elevate your home or office!",
                  image: durgesh,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://durgeshfurniture.in/",
                },
                // {
                //   title: "Fortune Mall",
                //   description: "Experience the ultimate shopping, dining, and entertainment destination at Fortune Mall. ",
                //   image: fortune,
                //   tech: ["React", "Node.js", "MongoDB", "Redux"],
                //   link: "https://fortunemallnagpur.in/",
                // },
                {
                  title: "Madhuprem Caterers",
                  description: "Delicious cuisine, exceptional service! We cater for all events, from weddings to corporate gatherings",
                  image: madhuprem,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://madhupremcaterers.in/",
                },
                {
                  title: "Om Sai Battery",
                  description: "Power up with high-quality batteries for all your needs! From cars to electronics",
                  image: omsai,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://omsaibattery.in/",
                },
                {
                  title: "Shinde Education",
                  description: "Unlock knowledge and skills with our expert-led courses and resources. Empowering learners for a brighter future!",
                  image: shinde,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://shindeseducationgallery.com/",
                },
                {
                  title: "Shiv Shakti Travel",
                  description: "Explore the world with seamless travel experiences! Discover amazing destinations, exclusive deals, and unforgettable adventures.",
                  image: shiv,
                  tech: ["JavaScript", "HTML", "CSS", "Bootstrap"],
                  link: "https://shivshaktitravelsnagpur.com/",
                },
                // {
                //   title: "SS Computer",
                //   description: "Your one-stop shop for the latest computers, laptops, and accessories. Get top brands, great deals, and expert support!",
                //   image: ss,
                //   tech: ["React", "AWS", "GraphQL", "TypeScript"],
                //   link: "https://sscomputernagpur.in/",
                // },
               
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
                  <div className="relative aspect-video bg-gray-800">
                    <img
                      src={project.image || "/placeholder.svg"}
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
                        <span key={techIndex} className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-500 text-sm">
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
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-20"
              >
                Get In <span className="text-blue-500">Touch</span>
              </motion.h2>
            </Parallax>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-bold">Let's Connect and Innovate Together!</h3>
                <p className="text-gray-400">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your
                  visions. Looking for a skilled developer to bring your vision to life? Whether it's a web app, a
                  business solution, or a new venture, I'm here to help. Let's connect!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FaEnvelope className="text-2xl text-blue-500" />
                    <a href="mailto:gauravmohadikar12@gmail.com" className="text-gray-400 hover:text-blue-500">
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
              <p className="text-gray-400 text-center md:text-left">© 2025 Gaurav.dev.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                {[
                  { icon: FaGithub, link: "https://github.com/Gaurav-Mohadikar" },
                  { icon: FaLinkedin, link: "https://www.linkedin.com/in/gaurav-mohadikar-1256a3287/" },
                  { icon: FaEnvelope, link: "mailto:gauravmohadikar12@gmail.com" },
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
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 hidden md:block"
          variants={cursorVariants}
          animate={cursorVariant}
        />
      </div>
    </ParallaxProvider>
  )
}

export default Portfolio

