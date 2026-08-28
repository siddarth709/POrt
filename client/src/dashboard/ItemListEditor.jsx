import React, { useState } from 'react';
import api from '../api/axios';
import ImageUploader from './ImageUploader';
import { TextField, TextArea, SaveButton } from './FieldInput';

/*
Generic CRUD editor for array-based sections: education, experience,
certifications, projects, chronicles.

`fields` describes the shape of one item, e.g.:
[
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'techStack', label: 'Tech (comma separated)', type: 'tags' },
]
*/
export default function ItemListEditor({ section, title, items = [], fields, onChange }) {
  const [editing, setEditing] = useState(null); // item being edited, or {} for new
  const [saving, setSaving] = useState(false);

  const blankItem = () => Object.fromEntries(fields.map((f) => [f.name, f.type === 'tags' ? [] : '']));

  const openNew = () => setEditing(blankItem());
  const openEdit = (item) => setEditing({ ...item });

  const setField = (name, value) => setEditing((prev) => ({ ...prev, [name]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...editing };
      fields.forEach((f) => {
        if (f.type === 'tags' && typeof payload[f.name] === 'string') {
          payload[f.name] = payload[f.name].split(',').map((t) => t.trim()).filter(Boolean);
        }
      });
      let res;
      if (payload._id) {
        res = await api.put(`/items/${section}/${payload._id}`, payload);
      } else {
        res = await api.post(`/items/${section}`, payload);
      }
      onChange(res.data[section].items);
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this entry?')) return;
    const res = await api.delete(`/items/${section}/${id}`);
    onChange(res.data[section].items);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-medium">{title}</h3>
        <button onClick={openNew} className="text-xs px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent2 hover:bg-accent/20">
          + Add new
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border border-white/10 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              {(item.image || item.logo) && <img src={item.image || item.logo} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10" />}
              <span className="text-sm truncate">{item.title || item.degree || item.role || 'Untitled'}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="text-xs text-accent2 hover:underline">Edit</button>
              <button onClick={() => remove(item._id)} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted text-sm">Nothing added yet.</p>}
      </div>

      {editing && (
        <div className="mt-6 border-t border-white/10 pt-6 flex flex-col gap-4">
          {fields.map((f) => {
            if (f.type === 'image') {
              return (
                <ImageUploader
                  key={f.name}
                  label={f.label}
                  value={editing[f.name]}
                  onUploaded={(url) => setField(f.name, url)}
                />
              );
            }
            if (f.type === 'textarea') {
              return (
                <TextArea
                  key={f.name}
                  label={f.label}
                  rows={4}
                  value={editing[f.name] || ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                />
              );
            }
            if (f.type === 'tags') {
              return (
                <TextField
                  key={f.name}
                  label={f.label}
                  value={Array.isArray(editing[f.name]) ? editing[f.name].join(', ') : editing[f.name] || ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                />
              );
            }
            return (
              <TextField
                key={f.name}
                label={f.label}
                value={editing[f.name] || ''}
                onChange={(e) => setField(f.name, e.target.value)}
              />
            );
          })}
          <div className="flex gap-3">
            <SaveButton onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save entry'}</SaveButton>
            <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-lg border border-white/10 text-sm text-muted">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
