import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, ChevronRight, ArrowLeft, Sparkles, User, BrainCircuit, 
  Globe, Target, CheckCircle, ExternalLink, AlertCircle, 
  RefreshCcw, IndianRupee, Calendar, MapPin, Activity, Zap, ShieldCheck, Database
} from 'lucide-react';
import { StudentProfile, Category, EducationLevel, Religion, DSSResult } from './types';
import { fetchDSSAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'form' | 'results'>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DSSResult | null>(null);
  const [profile, setProfile] = useState<StudentProfile>({
    name: '', state: 'Maharashtra', category: Category.GENERAL, religion: Religion.HINDU,
    familyIncome: 250000, isMinority: false, isDisabled: false, educationLevel: EducationLevel.UNDERGRADUATE,
    currentCourse: '', lastYearPercentage: 85, institutionType: 'Government', gender: 'Male', primaryInterest: 'General Studies'
  });

  const isLocalFallback = useMemo(() => {
    return results?.sources[0]?.title.toLowerCase().includes('local') || false;
  }, [results]);

  const loadDemo = () => {
    setProfile({
      ...profile,
      name: 'Aditya Kulkarni',
      familyIncome: 220000,
      category: Category.OBC,
      gender: 'Male',
      currentCourse: 'B.E. Computer Science',
      state: 'Maharashtra',
      lastYearPercentage: 82
    });
    setView('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDSSAnalysis(profile);
      setResults(data);
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "Engine Error: Check Connectivity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">EduScholar <span className="text-indigo-600">DSS</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Decision Support</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full">
              <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">Session: 2025-26 Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-8">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <BrainCircuit className="absolute inset-0 m-auto w-6 h-6 text-indigo-600 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Analyzing Eligibility...</h2>
              <p className="text-slate-500 font-medium italic">Scanning verified database thresholds for match-logic.</p>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-xl mx-auto bg-white border border-rose-100 p-12 rounded-[3rem] text-center shadow-2xl space-y-8">
            <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-2xl font-black">Analysis Interrupted</h2>
              <p className="text-slate-500 font-medium">{error}</p>
            </div>
            <button onClick={() => setView('form')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">Try Different Profile</button>
          </div>
        ) : view === 'home' ? (
          <div className="flex flex-col lg:flex-row items-center gap-20 py-10">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 rounded-full border border-indigo-100 mx-auto lg:mx-0">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Decision Support Engine v3.3</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Funding <br/><span className="text-indigo-600">Decisioned.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                A hybrid system that identifies scholarships using AI Grounding or our verified offline logic backup for 100% reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-4 justify-center lg:justify-start">
                <button onClick={() => setView('form')} className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-12 py-5 rounded-3xl font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl">
                  Analyze My Profile <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                <button onClick={loadDemo} className="bg-white border border-slate-200 text-slate-600 px-12 py-5 rounded-3xl font-black text-lg hover:border-indigo-600 transition-all">
                  Load Demo
                </button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg">
              <div className="glass-card p-10 rounded-[3.5rem] shadow-2xl space-y-8 relative overflow-hidden border-indigo-100">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black">Stability Assurance</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "Govt & Private Matches", color: "text-emerald-500" },
                    { icon: Globe, text: "AI Grounding (High Priority)", color: "text-blue-500" },
                    { icon: Database, text: "Offline Backup (Zero-Failure)", color: "text-indigo-500" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                      <span className="font-bold text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : view === 'form' ? (
          <div className="max-w-4xl mx-auto space-y-10">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-indigo-600 font-bold hover:translate-x-[-4px] transition-all">
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </button>
            <div className="gradient-border shadow-2xl shadow-indigo-100">
              <form onSubmit={handleSubmit} className="gradient-border-inner p-10 md:p-14 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input required value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 font-bold outline-none focus:ring-4 focus:ring-indigo-100" placeholder="Rahul Sharma" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Annual Income (₹)</label>
                    <input required type="number" value={profile.familyIncome} onChange={(e) => setProfile({...profile, familyIncome: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 font-bold outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Year Marks (%)</label>
                    <input required type="number" value={profile.lastYearPercentage} onChange={(e) => setProfile({...profile, lastYearPercentage: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 font-bold outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
                    <input required value={profile.state} onChange={(e) => setProfile({...profile, state: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 font-bold outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-4">
                  Run Decision Engine <Zap className="w-6 h-6 fill-white" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-16 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-10">
              <div className="space-y-3 text-center md:text-left">
                <div className="flex items-center gap-3 text-emerald-600 justify-center md:justify-start">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-xs font-black uppercase tracking-widest">Results Verified</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Best Matches for {profile.name}</h2>
              </div>
              <div className="flex gap-4 justify-center">
                <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full border ${isLocalFallback ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
                  {isLocalFallback ? <Database className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{isLocalFallback ? "Local Mode" : "AI Mode"}</span>
                </div>
                <button onClick={() => setView('form')} className="flex items-center gap-2 bg-white border border-slate-300 px-6 py-2.5 rounded-full font-bold hover:border-indigo-600 transition-all">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {results?.scholarships.map((s, i) => (
                <div key={i} className="group bg-white border border-slate-200 rounded-[3rem] p-10 hover:border-indigo-300 hover:shadow-2xl transition-all border-l-[16px] border-l-indigo-600 flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">{s.provider}</span>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{s.title}</h3>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl text-xl font-black whitespace-nowrap border border-emerald-100">
                      {s.amount}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mb-10 flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Matching Reason</p>
                    <p className="text-slate-700 font-bold leading-relaxed italic text-lg">"{s.eligibilityJustification}"</p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-slate-500 font-bold">
                      <Calendar className="w-5 h-5 text-indigo-500" />
                      <div>
                         <p className="text-[9px] font-black uppercase text-slate-300">Deadline</p>
                         <p className="text-sm">{s.deadline}</p>
                      </div>
                    </div>
                    <a href={s.applicationUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl">
                      Open Portal <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 p-12 rounded-[4rem] text-white space-y-10">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                     <Globe className="w-6 h-6 text-indigo-400" />
                   </div>
                   <h3 className="text-2xl font-black">Decision Data Sources</h3>
                 </div>
                 <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{isLocalFallback ? "Offline Verified" : "Online Real-time"}</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {results?.sources.map((src, i) => (
                   <a key={i} href={src.uri} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-indigo-500 transition-all group">
                     <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center font-black text-indigo-400 text-lg">{i+1}</div>
                     <span className="font-bold text-slate-300 group-hover:text-white truncate">{src.title}</span>
                   </a>
                 ))}
               </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-16 bg-white border-t border-slate-200 text-center">
        <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">EduScholar Decision Support System v3.3 • © 2025</p>
      </footer>
    </div>
  );
};

export default App;