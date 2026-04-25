import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  BarChart3, 
  Share2, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Award,
  Plus
} from 'lucide-react';
import LandingNavbar from '../components/LandingNavbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-premium text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <LandingNavbar />

      {/* Background Decorative Blurs & Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/15 rounded-full blur-[140px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/15 rounded-full blur-[140px] animate-blob delay-1000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[120px] animate-blob delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-36 px-4">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent-blue">Elite Certification Management</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-[900] leading-[1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Track your <br />
              <span className="text-gradient drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">progress</span>, <br />
              prove your <span className="text-gradient">skills</span>.
            </h1>
            
            <p className="text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
              The professional way to manage, monitor, and share your certification journey. 
              Stay organized and hit your career milestones faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <Link to="/register" className="group w-full sm:w-auto bg-gradient-to-r from-accent-blue to-accent-purple text-white px-8 py-4 rounded-2xl font-black text-lg shadow-glow hover:scale-105 transition-all flex items-center justify-center gap-2">
                Start Tracking <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto glass hover:bg-white/10 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                View Demo
              </button>
            </div>
          </div>

          {/* Hero Image / Dashboard Preview */}
          <div className="relative animate-in zoom-in duration-1000 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/40 to-accent-purple/40 rounded-[32px] blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="glass rounded-[32px] border-white/20 overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] glow-border backdrop-blur-2xl">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs font-bold text-white/40 tracking-widest uppercase">CertTracker Dashboard</div>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass p-4 rounded-2xl bg-white/5 border-white/5">
                    <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Certifications</p>
                    <p className="text-3xl font-black text-accent-blue">12</p>
                  </div>
                  <div className="glass p-4 rounded-2xl bg-white/5 border-white/5">
                    <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Progress</p>
                    <p className="text-3xl font-black text-secondary">84%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold">AWS Solutions Architect</p>
                    <p className="text-sm font-bold text-accent-blue">75%</p>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div className="bg-accent-blue h-full w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Recent Milestones</p>
                  <div className="flex items-center gap-3 glass p-3 rounded-xl bg-white/5 border-white/5">
                    <CheckCircle2 size={18} className="text-secondary" />
                    <span className="text-sm font-medium">Finished VPC Course</span>
                  </div>
                  <div className="flex items-center gap-3 glass p-3 rounded-xl bg-white/5 border-white/5 opacity-50">
                    <div className="w-4 h-4 rounded-full border-2 border-white/20"></div>
                    <span className="text-sm font-medium">Practice Exam #1</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl bg-white/10 border-white/20 shadow-xl animate-bounce duration-[3000ms]">
               <Award size={32} className="text-accent-purple mb-2" />
               <p className="text-xs font-bold uppercase tracking-tighter">Certified!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-accent-blue font-bold uppercase tracking-[0.2em] text-sm">Features</h2>
            <h3 className="text-4xl lg:text-5xl font-black">Everything you need to <span className="text-gradient">succeed</span>.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Plus />, title: 'Track Certs', desc: 'Add and manage multiple certifications in one central place.' },
              { icon: <BarChart3 />, title: 'Monitor Progress', desc: 'Visual progress bars and stat tracking for every goal.' },
              { icon: <Share2 />, title: 'Share & Export', desc: 'Public share pages and CSV/PDF exports for your team.' },
              { icon: <Zap />, title: 'Milestones', desc: 'Break down complex exams into manageable weekly tasks.' },
            ].map((f, i) => (
              <div key={i} className="group glass p-8 rounded-[32px] border-white/10 hover:border-accent-blue/50 transition-all hover:-translate-y-3 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.2)]">
                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all shadow-lg border border-white/5 group-hover:scale-110">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{f.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-accent-purple font-bold uppercase tracking-[0.2em] text-sm">Process</h2>
                <h3 className="text-4xl lg:text-5xl font-black">How it Works.</h3>
              </div>
              
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Add Certification', desc: 'Input your exam details, provider, and target date.' },
                  { step: '02', title: 'Track Progress', desc: 'Update your study status and complete milestones daily.' },
                  { step: '03', title: 'Share & Download', desc: 'Showcase your progress with a public link or export reports.' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center text-accent-purple font-black text-xl group-hover:bg-accent-purple group-hover:text-white transition-all">
                      {s.step}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold">{s.title}</h4>
                      <p className="text-text-secondary leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute inset-0 bg-accent-purple/10 rounded-full blur-[100px]"></div>
               <div className="glass rounded-3xl p-2 border-white/5">
                 <div className="bg-dark-bg/80 rounded-2xl p-8 aspect-video flex items-center justify-center border border-white/5">
                    <div className="text-center space-y-4">
                       <div className="w-20 h-20 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto border border-accent-blue/20">
                          <Plus className="text-accent-blue" size={32} />
                       </div>
                       <p className="text-sm font-bold text-text-muted">Interactive Demo Placeholder</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto glass rounded-[40px] p-12 lg:p-24 text-center relative overflow-hidden border-white/10">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-blue/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-purple/20 rounded-full blur-[80px]"></div>
          
          <div className="relative space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black leading-tight">
              Start building your certification <br className="hidden lg:block" /> journey <span className="text-gradient">today</span>.
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Join thousands of professionals tracking their path to expertise.
              No credit card required.
            </p>
            <Link to="/register" className="inline-flex items-center gap-3 bg-white text-dark-bg px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all active:scale-95 shadow-2xl">
              Get Started for Free <ChevronRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Award className="text-accent-blue" size={24} />
            <span className="text-xl font-black tracking-tighter">CertTracker</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-text-muted">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} CertTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
