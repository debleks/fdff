import React, { useState, useEffect } from 'react';
import { 
  Heart, Wind, BookOpen, Home, Settings, Plus, CheckCircle, 
  Sun, Cloud, CloudRain, Moon, Target, ListTodo, 
  Trash2, Check, ArrowRight, X, Award, Zap, User,
  Droplet, Star, TrendingUp
} from 'lucide-react';

export default function MindScapeApp() {
  // State
  const [setupDone, setSetupDone] = useState(false);
  const [view, setView] = useState('setup');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [dark, setDark] = useState(true);
  const [color, setColor] = useState('#2563eb');
  const [modules, setModules] = useState([]);
  const [moods, setMoods] = useState([]);
  const [journal, setJournal] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [water, setWater] = useState(0);
  const [gratitude, setGratitude] = useState([]);
  const [goals, setGoals] = useState([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Einatmen');

  // Config
  const allMods = [
    { id: 'mood', icon: Heart, name: 'Stimmung', desc: 'Gefühle tracken' },
    { id: 'journal', icon: BookOpen, name: 'Tagebuch', desc: 'Gedanken schreiben' },
    { id: 'breath', icon: Wind, name: 'Atmung', desc: 'Entspannung' },
    { id: 'habit', icon: Target, name: 'Gewohnheiten', desc: 'Routinen' },
    { id: 'task', icon: ListTodo, name: 'Aufgaben', desc: 'To-Do' },
    { id: 'water', icon: Droplet, name: 'Wasser', desc: 'Hydration' },
    { id: 'gratitude', icon: Star, name: 'Dankbarkeit', desc: 'Dankbar sein' },
    { id: 'goals', icon: TrendingUp, name: 'Ziele', desc: 'Ziele erreichen' }
  ];

  const colors = ['#2563eb', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b', '#06b6d4'];
  const moodOpts = [
    { val: 1, emoji: '😢', txt: 'Sehr schlecht' },
    { val: 2, emoji: '😟', txt: 'Schlecht' },
    { val: 3, emoji: '😐', txt: 'Neutral' },
    { val: 4, emoji: '🙂', txt: 'Gut' },
    { val: 5, emoji: '😊', txt: 'Sehr gut' }
  ];

  // Load/Save
  useEffect(() => {
    const saved = localStorage.getItem('mindscape');
    if (saved) {
      const d = JSON.parse(saved);
      setSetupDone(d.setupDone || false);
      setName(d.name || '');
      setDark(d.dark !== undefined ? d.dark : true);
      setColor(d.color || '#2563eb');
      setModules(d.modules || []);
      setMoods(d.moods || []);
      setJournal(d.journal || []);
      setTasks(d.tasks || []);
      setHabits(d.habits || []);
      setWater(d.water || 0);
      setGratitude(d.gratitude || []);
      setGoals(d.goals || []);
      setPoints(d.points || 0);
      setStreak(d.streak || 0);
      if (d.setupDone) setView('home');
    }
  }, []);

  useEffect(() => {
    if (setupDone) {
      localStorage.setItem('mindscape', JSON.stringify({
        setupDone, name, dark, color, modules, moods, journal, tasks, habits, water, gratitude, goals, points, streak
      }));
    }
  }, [setupDone, name, dark, color, modules, moods, journal, tasks, habits, water, gratitude, goals, points, streak]);

  // Functions
  const addPts = (n) => setPoints(p => p + n);
  const avgMood = () => moods.length === 0 ? 3 : (moods.reduce((s, e) => s + e.mood, 0) / moods.length).toFixed(1);
  
  const getScenery = () => {
    const avg = avgMood();
    if (avg >= 4) return { icon: Sun, color: '#fbbf24', text: 'Sonnig', bg: 'linear-gradient(135deg, #1e40af, #3b82f6)' };
    if (avg >= 2.5) return { icon: Cloud, color: '#94a3b8', text: 'Bewölkt', bg: 'linear-gradient(135deg, #334155, #475569)' };
    return { icon: CloudRain, color: '#60a5fa', text: 'Regnerisch', bg: 'linear-gradient(135deg, #1e293b, #334155)' };
  };

  // Styles
  const s = {
    app: { minHeight: '100vh', background: dark ? 'linear-gradient(to bottom, #0f172a, #000)' : 'linear-gradient(to bottom, #f8fafc, #fff)', color: dark ? '#fff' : '#0f172a', fontFamily: '-apple-system, sans-serif', paddingBottom: setupDone ? '80px' : '0' },
    head: { background: dark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: dark ? '1px solid #1e293b' : '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 40, padding: '12px 16px' },
    box: { padding: '16px' },
    card: { background: dark ? 'rgba(30,41,59,0.6)' : 'rgba(255,255,255,0.9)', border: dark ? '1px solid #334155' : '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', marginBottom: '12px', boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)' },
    btn: { background: color, color: '#fff', fontWeight: '600', padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px', width: '100%' },
    inp: { width: '100%', padding: '12px', background: dark ? 'rgba(51,65,85,0.5)' : '#f8fafc', border: dark ? '1px solid #475569' : '1px solid #cbd5e1', borderRadius: '12px', color: dark ? '#fff' : '#0f172a', fontSize: '16px', outline: 'none', marginBottom: '12px' },
    nav: { position: 'fixed', bottom: 0, left: 0, right: 0, background: dark ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)', borderTop: dark ? '1px solid #1e293b' : '1px solid #e2e8f0', zIndex: 50, padding: '8px 0' }
  };

  // Setup Component
  const Setup = () => (
    <div style={s.box}>
      <div style={{ textAlign: 'center', margin: '32px 0' }}>
        <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${color}, ${color}dd)`, borderRadius: '20px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={40} style={{ color: '#fff' }} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>MindScape</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px' }}>Deine Wellness-App</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
        {[1, 2, 3].map(i => <div key={i} style={{ width: step >= i ? '40px' : '12px', height: '8px', background: step >= i ? color : '#334155', borderRadius: '4px', transition: 'all 0.3s' }} />)}
      </div>

      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>Wie heißt du?</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dein Name..." style={s.inp} />
          <button onClick={() => name.trim() && setStep(2)} disabled={!name.trim()} style={{ ...s.btn, opacity: name.trim() ? 1 : 0.5 }}>
            Weiter <ArrowRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>Wähle Module</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', marginBottom: '20px' }}>Antippen zum Auswählen</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {allMods.map(m => {
              const Icon = m.icon;
              const sel = modules.includes(m.id);
              return (
                <div key={m.id} onClick={() => setModules(sel ? modules.filter(x => x !== m.id) : [...modules, m.id])}
                  style={{ ...s.card, border: sel ? `2px solid ${color}` : s.card.border, cursor: 'pointer', textAlign: 'center', padding: '20px 12px' }}>
                  <Icon size={32} style={{ margin: '0 auto 8px', color: sel ? color : '#94a3b8' }} />
                  <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>{m.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{m.desc}</div>
                </div>
              );
            })}
          </div>
          <button onClick={() => modules.length > 0 && setStep(3)} disabled={modules.length === 0} style={{ ...s.btn, opacity: modules.length > 0 ? 1 : 0.5 }}>
            Weiter <ArrowRight size={18} />
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Wähle eine Farbe</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {colors.map(c => (
              <div key={c} onClick={() => setColor(c)} style={{ width: '80px', height: '80px', background: c, borderRadius: '16px', margin: '0 auto', cursor: 'pointer', border: color === c ? '4px solid #fff' : 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
            ))}
          </div>
          <button onClick={() => { setSetupDone(true); setView('home'); }} style={s.btn}>
            Los geht's! <CheckCircle size={18} />
          </button>
        </div>
      )}
    </div>
  );

  // Home Page
  const HomePage = () => {
    const scenery = getScenery();
    const ScIcon = scenery.icon;
    return (
      <div style={s.box}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Hallo {name}! 👋</h2>
        
        {modules.includes('mood') && (
          <div style={{ ...s.card, background: scenery.bg, padding: '32px 20px', textAlign: 'center', color: '#fff' }}>
            <ScIcon style={{ width: '64px', height: '64px', margin: '0 auto 12px', color: scenery.color }} />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{scenery.text}</h3>
            <p style={{ fontSize: '13px', opacity: 0.9 }}>Durchschnitt: {avgMood()}/5</p>
          </div>
        )}

        <div style={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{points}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Punkte</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{streak} 🔥</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Streak</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{modules.length}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Module</div>
            </div>
          </div>
        </div>

        {habits.slice(0, 3).map(h => {
          const Icon = h.icon || Target;
          return (
            <div key={h.id} style={s.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={20} style={{ color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{h.name}</div>
                  <div style={{ background: dark ? '#1e293b' : '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(h.curr / h.goal) * 100}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>{h.curr}/{h.goal}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Mood Page
  const MoodPage = () => {
    const [txt, setTxt] = useState('');
    return (
      <div style={s.box}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Wie fühlst du dich?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {moodOpts.map(m => (
            <div key={m.val} onClick={() => { setMoods([{ id: Date.now(), date: new Date().toLocaleDateString('de-DE'), mood: m.val }, ...moods]); addPts(10); setView('home'); }}
              style={{ ...s.card, cursor: 'pointer', textAlign: 'center', padding: '16px 8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '4px' }}>{m.emoji}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{m.txt}</div>
            </div>
          ))}
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>Verlauf</h3>
        {moods.slice(0, 5).map(m => {
          const opt = moodOpts.find(o => o.val === m.mood);
          return (
            <div key={m.id} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '28px' }}>{opt?.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>{opt?.txt}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{m.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Journal Page
  const JournalPage = () => {
    const [txt, setTxt] = useState('');
    return (
      <div style={s.box}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Tagebuch</h2>
        <textarea value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Was beschäftigt dich heute?" 
          style={{ ...s.inp, minHeight: '120px', resize: 'vertical' }} />
        <button onClick={() => { if (txt.trim()) { setJournal([{ id: Date.now(), date: new Date().toLocaleDateString('de-DE'), text: txt }, ...journal]); addPts(15); setTxt(''); } }} style={s.btn}>
          Speichern <CheckCircle size={18} />
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>Einträge</h3>
        {journal.slice(0, 5).map(j => (
          <div key={j.id} style={s.card}>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>{j.date}</div>
            <div style={{ fontSize: '15px', lineHeight: '1.5' }}>{j.text}</div>
          </div>
        ))}
      </div>
    );
  };

  // Breathing Page
  const BreathPage = () => {
    useEffect(() => {
      if (!breathing) return;
      const phases = [
        { name: 'Einatmen', duration: 4000 },
        { name: 'Halten', duration: 4000 },
        { name: 'Ausatmen', duration: 4000 },
        { name: 'Pause', duration: 2000 }
      ];
      let idx = 0;
      const cycle = () => {
        setBreathPhase(phases[idx].name);
        idx = (idx + 1) % phases.length;
      };
      const timer = setInterval(cycle, 4000);
      return () => clearInterval(timer);
    }, [breathing]);

    return (
      <div style={{ ...s.box, textAlign: 'center', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '32px' }}>Box Breathing</h2>
        <div style={{ width: breathing ? '200px' : '120px', height: breathing ? '200px' : '120px', background: `linear-gradient(135deg, ${color}, ${color}dd)`, borderRadius: '50%', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 4s ease-in-out' }}>
          <Wind size={48} style={{ color: '#fff' }} />
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color }}>{breathPhase}</div>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>4-4-4-2 Technik</p>
        <button onClick={() => { setBreathing(!breathing); if (breathing) { addPts(10); setView('home'); } }} style={s.btn}>
          {breathing ? 'Beenden' : 'Starten'}
        </button>
      </div>
    );
  };

  // Task Page
  const TaskPage = () => {
    const [txt, setTxt] = useState('');
    return (
      <div style={s.box}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Aufgaben</h2>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Neue Aufgabe..." style={{ ...s.inp, marginBottom: 0 }} />
          <button onClick={() => { if (txt.trim()) { setTasks([...tasks, { id: Date.now(), text: txt, done: false }]); setTxt(''); } }} style={{ ...s.btn, width: 'auto', padding: '12px 16px' }}>
            <Plus size={20} />
          </button>
        </div>
        {tasks.map(t => (
          <div key={t.id} style={{ ...s.card, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => { setTasks(tasks.map(x => x.id === t.id ? { ...x, done: !x.done } : x)); if (!t.done) addPts(5); }} 
              style={{ background: t.done ? color : 'transparent', border: `2px solid ${color}`, borderRadius: '8px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {t.done && <Check size={16} style={{ color: '#fff' }} />}
            </button>
            <div style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}>{t.text}</div>
            <button onClick={() => setTasks(tasks.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Habit Page
  const HabitPage = () => {
    const [txt, setTxt] = useState('');
    const [goal, setGoal] = useState(7);
    return (
      <div style={s.box}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Gewohnheiten</h2>
        <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Neue Gewohnheit..." style={s.inp} />
        <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} placeholder="Ziel (Tage)" style={s.inp} />
        <button onClick={() => { if (txt.trim()) { setHabits([...habits, { id: Date.now(), name: txt, goal, curr: 0, icon: Target }]); setTxt(''); setGoal(7); } }} style={s.btn}>
          Hinzufügen <Plus size={18} />
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>Aktive Gewohnheiten</h3>
        {habits.map(h => (
          <div key={h.id} style={s.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Target size={20} style={{ color }} />
              <div style={{ flex: 1, fontWeight: '600' }}>{h.name}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>{h.curr}/{h.goal}</div>
            </div>
            <div style={{ background: dark ? '#1e293b' : '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: `${(h.curr / h.goal) * 100}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
            </div>
            <button onClick={() => setHabits(habits.map(x => x.id === h.id && x.curr < x.goal ? { ...x, curr: x.curr + 1 } : x))} disabled={h.curr >= h.goal} style={{ ...s.btn, opacity: h.curr >= h.goal ? 0.5 : 1 }}>
              {h.curr >= h.goal ? 'Ziel erreicht! 🎉' : 'Erledigt'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Water Page
  const WaterPage = () => (
    <div style={s.box}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Wasser Tracker 💧</h2>
      <div style={{ ...s.card, textAlign: 'center', padding: '32px' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color, marginBottom: '8px' }}>{water}/8</div>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Gläser heute</p>
        <div style={{ background: dark ? '#1e293b' : '#e2e8f0', height: '16px', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ width: `${(water / 8) * 100}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setWater(w => Math.max(0, w - 1))} style={{ ...s.btn, background: '#ef4444' }}>-1</button>
          <button onClick={() => { if (water < 8) { setWater(w => w + 1); addPts(2); } }} style={{ ...s.btn, opacity: water >= 8 ? 0.5 : 1 }}>+1</button>
        </div>
      </div>
      <button onClick={() => setWater(0)} style={{ ...s.btn, background: '#94a3b8', marginTop: '12px' }}>Zurücksetzen</button>
    </div>
  );

  // Gratitude Page
  const GratitudePage = () => {
    const [txt, setTxt] = useState('');
    return (
      <div style={s.box}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Dankbarkeit ⭐</h2>
        <textarea value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Wofür bist du heute dankbar?" style={{ ...s.inp, minHeight: '100px' }} />
        <button onClick={() => { if (txt.trim()) { setGratitude([{ id: Date.now(), date: new Date().toLocaleDateString('de-DE'), text: txt }, ...gratitude]); addPts(10); setTxt(''); } }} style={s.btn}>
          Speichern <Star size={18} />
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>Einträge</h3>
        {gratitude.slice(0, 5).map(g => (
          <div key={g.id} style={s.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Star size={16} style={{ color: '#fbbf24' }} />
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{g.date}</div>
            </div>
            <div style={{ fontSize: '15px' }}>{g.text}</div>
          </div>
        ))}
      </div>
    );
  };

  // Goals Page
  const GoalsPage = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    return (
      <div style={s.box}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Ziele 🎯</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ziel-Titel..." style={s.inp} />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Beschreibung..." style={{ ...s.inp, minHeight: '80px' }} />
        <button onClick={() => { if (title.trim()) { setGoals([...goals, { id: Date.now(), title, desc, progress: 0 }]); setTitle(''); setDesc(''); } }} style={s.btn}>
          Ziel hinzufügen <Plus size={18} />
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '24px', marginBottom: '12px' }}>Aktive Ziele</h3>
        {goals.map(g => (
          <div key={g.id} style={s.card}>
            <h4 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{g.title}</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>{g.desc}</p>
            <div style={{ background: dark ? '#1e293b' : '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ width: `${g.progress}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setGoals(goals.map(x => x.id === g.id ? { ...x, progress: Math.max(0, x.progress - 10) } : x))} style={{ ...s.btn, background: '#ef4444', fontSize: '14px', padding: '8px' }}>-10%</button>
              <button onClick={() => { setGoals(goals.map(x => x.id === g.id ? { ...x, progress: Math.min(100, x.progress + 10) } : x)); if (g.progress === 90) addPts(50); }} style={{ ...s.btn, fontSize: '14px', padding: '8px' }}>+10%</button>
              <button onClick={() => setGoals(goals.filter(x => x.id !== g.id))} style={{ ...s.btn, background: '#94a3b8', width: 'auto', padding: '8px 12px' }}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Settings Page
  const SettingsPage = () => (
    <div style={s.box}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Einstellungen</h2>
      <div style={s.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <User size={40} style={{ color }} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{modules.length} Module aktiv</div>
          </div>
        </div>
      </div>
      <div style={s.card}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Darstellung</h3>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <button onClick={() => setDark(false)} style={{ ...s.btn, background: !dark ? color : '#94a3b8' }}>
            <Sun size={18} /> Hell
          </button>
          <button onClick={() => setDark(true)} style={{ ...s.btn, background: dark ? color : '#94a3b8' }}>
            <Moon size={18} /> Dunkel
          </button>
        </div>
      </div>
      <button onClick={() => { if (window.confirm('Setup neu starten? (Daten bleiben erhalten)')) { setSetupDone(false); setStep(1); } }} style={s.btn}>
        Setup ändern
      </button>
      <button onClick={() => { if (window.confirm('Wirklich ALLE Daten löschen?')) { localStorage.removeItem('mindscape'); window.location.reload(); } }} style={{ ...s.btn, background: '#ef4444', marginTop: '12px' }}>
        <Trash2 size={20} /> Alle Daten löschen
      </button>
    </div>
  );

  // Navigation
  const Nav = () => {
    const navItems = [
      { id: 'home', icon: Home, txt: 'Start' },
      ...allMods.filter(m => modules.includes(m.id)).map(m => ({ id: m.id, icon: m.icon, txt: m.name })),
      { id: 'settings', icon: Settings, txt: 'Mehr' }
    ].slice(0, 5);

    return (
      <div style={s.nav}>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 8px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const act = view === item.id;
            return (
              <button key={item.id} onClick={() => setView(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px 12px', color: act ? color : (dark ? '#64748b' : '#94a3b8') }}>
                <Icon size={22} strokeWidth={act ? 2.5 : 2} />
                <span style={{ fontWeight: act ? '600' : '400', fontSize: '11px' }}>{item.txt}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Render
  return (
    <div style={s.app}>
      {setupDone && (
        <div style={s.head}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', background: `linear-gradient(135deg, ${color}, ${color}dd)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              MindScape
            </div>
            <button onClick={() => setDark(!dark)} style={{ background: 'none', border: 'none', color: dark ? '#fff' : '#0f172a', cursor: 'pointer', padding: '8px' }}>
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}

      {!setupDone && <Setup />}
      {setupDone && view === 'home' && <HomePage />}
      {setupDone && view === 'mood' && modules.includes('mood') && <MoodPage />}
      {setupDone && view === 'journal' && modules.includes('journal') && <JournalPage />}
      {setupDone && view === 'breath' && modules.includes('breath') && <BreathPage />}
      {setupDone && view === 'task' && modules.includes('task') && <TaskPage />}
      {setupDone && view === 'habit' && modules.includes('habit') && <HabitPage />}
      {setupDone && view === 'water' && modules.includes('water') && <WaterPage />}
      {setupDone && view === 'gratitude' && modules.includes('gratitude') && <GratitudePage />}
      {setupDone && view === 'goals' && modules.includes('goals') && <GoalsPage />}
      {setupDone && view === 'settings' && <SettingsPage />}
      {setupDone && <Nav />}
    </div>
  );
}
