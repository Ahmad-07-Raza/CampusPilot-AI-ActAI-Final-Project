import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';
import {
  User,
  GraduationCap,
  Sparkles,
  Code2,
  Terminal,
  Cpu,
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Send,
  Lightbulb,
  Target,
  Layers,
  Compass,
  Zap,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Heart,
  Globe,
  Database,
  GitBranch,
  Layout,
  Flame,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

interface DeveloperViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const DeveloperView: React.FC<DeveloperViewProps> = ({ setActiveTab }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // SEO title and description metadata update
    document.title = 'About Developer | CampusPilot AI';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Meet Ahmad Raza, the developer behind CampusPilot AI.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Meet Ahmad Raza, the developer behind CampusPilot AI.';
      document.head.appendChild(meta);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ahmadrazapugc@gmail.com');
    setCopiedEmail(true);
    setShowToast(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    setTimeout(() => setShowToast(false), 3000);
  };

  const skillsList = [
    { name: 'Python', category: 'Backend & AI', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    { name: 'JavaScript', category: 'Language', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    { name: 'TypeScript', category: 'Language', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    { name: 'React', category: 'Frontend', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' },
    { name: 'Next.js', category: 'Framework', color: 'bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 border-slate-500/20' },
    { name: 'Tailwind CSS', category: 'Styling', color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20' },
    { name: 'AI Engineering', category: 'Core Domain', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
    { name: 'Google Gemini API', category: 'LLM SDK', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
    { name: 'SQL', category: 'Database', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
    { name: 'Git', category: 'Version Control', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
    { name: 'GitHub', category: 'DevOps & Collaboration', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
  ];

  const techStack = [
    { name: 'Next.js', desc: 'App Router & SSR Architecture', icon: Globe },
    { name: 'React', desc: 'Interactive Component Trees & State', icon: Code2 },
    { name: 'TypeScript', desc: 'End-to-end Type Safety & Interfaces', icon: Terminal },
    { name: 'Tailwind CSS', desc: 'Modern Utility-First Design System', icon: Layout },
    { name: 'Gemini AI', desc: 'Google AI Studio & GenAI SDK Integration', icon: Sparkles },
    { name: 'Vercel', desc: 'Global Edge Cloud Deployment', icon: Zap },
    { name: 'Framer Motion', desc: 'Fluid Micro-Interactions & Transitions', icon: Flame },
    { name: 'shadcn/ui', desc: 'Accessible Radix-backed Visual Primitives', icon: ShieldCheck },
  ];

  const timelineSteps = [
    {
      phase: 'Idea & Vision',
      title: 'Conceptualization',
      desc: 'Identified core student challenges in managing multiple study workflows, fragmented tools, and exam prep anxiety.',
      date: 'Phase 1',
      icon: Lightbulb,
    },
    {
      phase: 'Design System',
      title: 'UX & Architecture',
      desc: 'Crafted a modern SaaS aesthetic, dark/light theme tokens, glassmorphic layout cards, and responsive navigation.',
      date: 'Phase 2',
      icon: Compass,
    },
    {
      phase: 'Development',
      title: 'Full Stack Engineering',
      desc: 'Implemented React, TypeScript, Express proxy endpoints, Gemini 3.6 API integrations, and local storage state.',
      date: 'Phase 3',
      icon: Code2,
    },
    {
      phase: 'Testing & Optimization',
      title: 'Refinement & Quality',
      desc: 'Benchmarked prompt outputs, optimized O(N) complexity analysis logic, and polished line-by-line code breakdowns.',
      date: 'Phase 4',
      icon: Target,
    },
    {
      phase: 'Deployment',
      title: 'Production Launch',
      desc: 'Packaged Cloud Run containerization, SSR optimization, and automated environment provisioning for university scholars.',
      date: 'Phase 5',
      icon: Rocket,
    },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">Copied to Clipboard</p>
              <p className="text-[11px] text-slate-300">Email copied to clipboard.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 lg:p-12 border border-slate-800 shadow-2xl"
      >
        {/* Decorative Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CampusPilot AI Creator</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Developer</span>
            </h1>

            <p className="text-sm lg:text-base text-slate-300 leading-relaxed font-normal">
              The creator behind CampusPilot AI — empowering students with intelligent study engines, interactive quizzes, automated summaries, and schedule planners.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={handleCopyEmail}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Developer</span>
              </button>

              <a
                href="#contact"
                className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
              >
                <span>Social Profiles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Professional Developer Badge Illustration */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500" />
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-3xl bg-slate-900 border border-slate-700/80 p-4 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-md">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-indigo-500/30 mb-3">
                AR
              </div>
              <span className="font-bold text-sm text-white tracking-tight">Ahmad Raza</span>
              <span className="text-[11px] text-indigo-300 font-medium">Software Engineer</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Developer Profile Card */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-10 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Developer Profile
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Academic background and engineering motivation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Main Info */}
          <div className="md:col-span-1 space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Name</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ahmad Raza</h3>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Role & Major</span>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mt-0.5">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>BS Information Technology Student</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">University</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mt-0.5">
                University of the Punjab, Gujranwala Campus
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Personal Biography
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                "I am passionate about Artificial Intelligence, Full Stack Development, and building practical software solutions that solve real-world problems. CampusPilot AI was developed as my university final project to help students improve productivity through AI-powered tools."
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Built with passion for fellow students
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Final Year University Project 2026
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-10 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Technical Core Skills
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Languages, frameworks, databases, and AI tooling utilized across projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          {skillsList.map((skill, idx) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.03, y: -2 }}
              className={`p-3.5 rounded-2xl border font-semibold text-xs flex flex-col justify-between space-y-2 shadow-2xs transition-all ${skill.color}`}
            >
              <span className="text-[10px] uppercase font-bold opacity-75">{skill.category}</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Project Motivation Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-10 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Project Motivation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Why CampusPilot AI was envisioned and built.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Empowering University Students</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Higher education demands tackling heavy reading loads, dense lecture slides, intricate coding assignments, and strict exam dates. CampusPilot AI equips students with immediate academic clarity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">All-in-One Integrated Study Suite</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Instead of switching between disjointed apps for flashcards, AI chat, calendar planning, and code debuggers, CampusPilot unifies all essential academic tools inside one modern dashboard.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Boosting Academic Productivity</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Automated structured summaries, active recall flip-cards, and O(N) line breakdowns save dozens of study hours every week, allowing scholars to master core concepts without burnout.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Next-Gen AI-Powered Learning</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Leveraging Google Gemini models to deliver context-aware tutoring, accurate thesis statement formation, step-by-step math/code explanations, and interactive quiz grading.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Technologies Used Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-10 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Technologies & Infrastructure
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Modern full-stack technologies powering CampusPilot AI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{tech.name}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {tech.desc}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Development Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-10 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Project Development Timeline
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              From initial idea to full production deployment.
            </p>
          </div>
        </div>

        <div className="relative pt-4 pl-2 space-y-6 before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.phase} className="relative flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-indigo-400 border border-slate-700 flex items-center justify-center font-bold shrink-0 z-10 shadow-md">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/60 p-4 lg:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {step.phase}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                      {step.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 lg:p-10 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Get in Touch & Connect
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reach out for academic inquiries, software feedback, or collaboration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Email Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 dark:from-slate-800/90 dark:to-slate-800/40 border border-indigo-200 dark:border-indigo-800/60 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-500 tracking-wider">Email Address</span>
                <p className="font-mono text-xs font-bold text-slate-900 dark:text-white truncate">
                  ahmadrazapugc@gmail.com
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleCopyEmail}
                className="w-full py-2 px-3 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 text-indigo-600 dark:text-indigo-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="mailto:ahmadrazapugc@gmail.com"
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            </div>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-100/60 to-slate-200/30 dark:from-slate-800/90 dark:to-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">GitHub Profile</span>
                <p className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                  @ahmadraza
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore open source repositories, algorithms, and AI tools.
              </p>
            </div>

            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Visit GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-slate-800/90 dark:to-slate-800/40 border border-blue-200 dark:border-blue-800/60 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-wider">LinkedIn Network</span>
                <p className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                  Ahmad Raza
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connect professionally, review experience, and discuss tech.
              </p>
            </div>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Call To Action Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl p-8 lg:p-12 border border-slate-800 text-center space-y-6 shadow-xl"
      >
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold mx-auto">
          <GraduationCap className="w-6 h-6" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Thank you for exploring CampusPilot AI.
          </h3>
          <p className="text-xs lg:text-sm text-slate-300">
            Designed and engineered by Ahmad Raza to transform university learning and student productivity.
          </p>
        </div>

        <div>
          <button
            onClick={() => setActiveTab('overview')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/30 transition-all inline-flex items-center gap-2"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.section>
    </div>
  );
};
