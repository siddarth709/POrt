import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ImageUploader from './ImageUploader';
import { TextField, TextArea, SaveButton } from './FieldInput';
import SocialsEditor from './SocialsEditor';
import VisibilityToggle from './VisibilityToggle';
import ItemListEditor from './ItemListEditor';
import Messages from './Messages';

const TABS = [
  'Hero', 'About', 'Education', 'Experience', 'Certifications', 'Projects', 'Chronicles', 'Contact', 'Messages',
];

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState('Hero');
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const load = async () => {
    const res = await api.get('/content');
    setContent(res.data);
  };

  useEffect(() => { load(); }, []);

  const flashSaved = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const saveSection = async (section, data) => {
    setSaving(true);
    try {
      const res = await api.patch(`/content/${section}`, data);
      setContent(res.data);
      flashSaved();
    } finally {
      setSaving(false);
    }
  };

  if (!content) return <div className="min-h-screen flex items-center justify-center text-muted">Loading…</div>;

  const doLogout = () => { logout(); navigate('/dashboard/login'); };

  return (
    <div className="min-h-screen bg-base flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/10 p-5 hidden md:flex flex-col">
        <h2 className="font-display font-semibold gradient-text mb-8">Owner Dashboard</h2>
        <nav className="flex flex-col gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                tab === t ? 'bg-accent/15 text-accent2' : 'text-muted hover:bg-white/5'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <a href="/" target="_blank" rel="noreferrer" className="text-xs text-muted hover:text-white">View live site ↗</a>
          <button onClick={doLogout} className="text-xs text-red-400 text-left hover:underline">Log out</button>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass p-2 flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap ${tab === t ? 'bg-accent/20 text-accent2' : 'text-muted'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main panel */}
      <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-semibold">{tab}</h1>
          {savedFlash && <span className="text-xs text-accent2">Saved ✓ — live instantly</span>}
        </div>

        {tab === 'Hero' && (
          <HeroForm data={content.hero} onSave={(d) => saveSection('hero', d)} saving={saving} />
        )}
        {tab === 'About' && (
          <AboutForm data={content.about} onSave={(d) => saveSection('about', d)} saving={saving} />
        )}
        {tab === 'Education' && (
          <>
            <VisibilityToggle section="education" visible={content.education.visible} onChanged={setContent} />
            <div className="mt-5">
              <ItemListEditor
                section="education"
                title="Education entries"
                items={content.education.items}
                onChange={(items) => setContent({ ...content, education: { ...content.education, items } })}
                fields={[
                  { name: 'degree', label: 'Degree / Program', type: 'text' },
                  { name: 'institution', label: 'Institution', type: 'text' },
                  { name: 'year', label: 'Year', type: 'text' },
                  { name: 'logo', label: 'Institution Logo (Optional)', type: 'image' },
                  { name: 'description', label: 'Description', type: 'textarea' },
                ]}
              />
            </div>
          </>
        )}
        {tab === 'Experience' && (
          <>
            <VisibilityToggle section="experience" visible={content.experience.visible} onChanged={setContent} />
            <div className="mt-5">
              <ItemListEditor
                section="experience"
                title="Experience entries"
                items={content.experience.items}
                onChange={(items) => setContent({ ...content, experience: { ...content.experience, items } })}
                fields={[
                  { name: 'role', label: 'Role', type: 'text' },
                  { name: 'company', label: 'Company', type: 'text' },
                  { name: 'duration', label: 'Duration', type: 'text' },
                  { name: 'logo', label: 'Company Logo (Optional)', type: 'image' },
                  { name: 'description', label: 'Description', type: 'textarea' },
                ]}
              />
            </div>
          </>
        )}
        {tab === 'Certifications' && (
          <>
            <VisibilityToggle section="certifications" visible={content.certifications.visible} onChanged={setContent} />
            <div className="mt-5">
              <ItemListEditor
                section="certifications"
                title="Certifications"
                items={content.certifications.items}
                onChange={(items) => setContent({ ...content, certifications: { ...content.certifications, items } })}
                fields={[
                  { name: 'title', label: 'Certificate title', type: 'text' },
                  { name: 'issuer', label: 'Issuer', type: 'text' },
                  { name: 'date', label: 'Date', type: 'text' },
                  { name: 'image', label: 'Certificate image', type: 'image' },
                ]}
              />
            </div>
          </>
        )}
        {tab === 'Projects' && (
          <>
            <VisibilityToggle section="projects" visible={content.projects.visible} onChanged={setContent} />
            <div className="mt-5">
              <ItemListEditor
                section="projects"
                title="Projects"
                items={content.projects.items}
                onChange={(items) => setContent({ ...content, projects: { ...content.projects, items } })}
                fields={[
                  { name: 'title', label: 'Project title', type: 'text' },
                  { name: 'shortDescription', label: 'Short description (card)', type: 'textarea' },
                  { name: 'details', label: 'Full details (shown in popup)', type: 'textarea' },
                  { name: 'techStack', label: 'Tech stack (comma separated)', type: 'tags' },
                  { name: 'image', label: 'Cover image', type: 'image' },
                  { name: 'githubUrl', label: 'GitHub URL', type: 'text' },
                  { name: 'liveUrl', label: 'Live URL', type: 'text' },
                ]}
              />
            </div>
          </>
        )}
        {tab === 'Chronicles' && (
          <>
            <VisibilityToggle section="chronicles" visible={content.chronicles.visible} onChanged={setContent} />
            <div className="mt-5">
              <ItemListEditor
                section="chronicles"
                title="Chronicles (events attended)"
                items={content.chronicles.items}
                onChange={(items) => setContent({ ...content, chronicles: { ...content.chronicles, items } })}
                fields={[
                  { name: 'title', label: 'Event title', type: 'text' },
                  { name: 'date', label: 'Date', type: 'text' },
                  { name: 'location', label: 'Location', type: 'text' },
                  { name: 'description', label: 'Description', type: 'textarea' },
                  { name: 'image', label: 'Image', type: 'image' },
                ]}
              />
            </div>
          </>
        )}
        {tab === 'Contact' && (
          <ContactForm data={content.contact} onSave={(d) => saveSection('contact', d)} saving={saving} />
        )}
        {tab === 'Messages' && <Messages />}
      </main>
    </div>
  );
}

function HeroForm({ data, onSave, saving }) {
  const [form, setForm] = useState(data);
  useEffect(() => setForm(data), [data]);
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4 max-w-lg">
      <ImageUploader label="Hero image / photo" value={form.image} onUploaded={(url) => setForm({ ...form, image: url })} />
      <TextField label="Name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <TextField label="Tagline" value={form.tagline || ''} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
      <SocialsEditor socials={form.socials || []} onChange={(socials) => setForm({ ...form, socials })} />
      <SaveButton onClick={() => onSave(form)} disabled={saving}>{saving ? 'Saving…' : 'Save Hero'}</SaveButton>
    </div>
  );
}

function AboutForm({ data, onSave, saving }) {
  const [form, setForm] = useState(data);
  useEffect(() => setForm(data), [data]);
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4 max-w-lg">
      <ImageUploader label="About photo" value={form.image} onUploaded={(url) => setForm({ ...form, image: url })} />
      <TextField label="Heading" value={form.heading || ''} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
      <TextArea label="Bio" rows={6} value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <TextField label="Resume URL (optional)" value={form.resumeUrl || ''} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
      <SaveButton onClick={() => onSave(form)} disabled={saving}>{saving ? 'Saving…' : 'Save About'}</SaveButton>
    </div>
  );
}

function ContactForm({ data, onSave, saving }) {
  const [form, setForm] = useState(data);
  useEffect(() => setForm(data), [data]);
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4 max-w-lg">
      <ImageUploader label="Contact image (optional - if set, replaces text block)" value={form.image} onUploaded={(url) => setForm({ ...form, image: url })} />
      <TextField label="Heading" value={form.heading || ''} onChange={(e) => setForm({ ...form, heading: e.target.value })} />
      <TextField label="Email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <TextField label="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <SocialsEditor socials={form.socials || []} onChange={(socials) => setForm({ ...form, socials })} />
      <SaveButton onClick={() => onSave(form)} disabled={saving}>{saving ? 'Saving…' : 'Save Contact'}</SaveButton>
    </div>
  );
}
