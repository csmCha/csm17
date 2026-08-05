'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

interface Participant {
  id: string;
  name: string;
  topic: string;
  level: string;
}

export default function TableMakerApp() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);

  const fetchParticipants = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error && data) {
      setParticipants(data);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !topic) {
      alert('Please fill in both your name and preferred topic.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('users').insert([{ name, topic, level }]);
    setLoading(false);

    if (error) {
      alert('Failed to submit application. Please try again.');
    } else {
      setName('');
      setTopic('');
      fetchParticipants();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#1C2826]/10 space-y-8">
      {/* Registration Form */}
      <div>
        <h2 className="text-xl font-bold mb-1">Sign Up for the Meetup</h2>
        <p className="text-xs text-[#1C2826]/60 mb-6">Enter your details to join this week's tables.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
              Name / Nickname
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-4 py-2.5 rounded-lg border border-[#1C2826]/20 focus:outline-none focus:border-[#1C2826] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
              Preferred Topic / Interest
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Travel, Movies, AI, Daily Life"
              className="w-full px-4 py-2.5 rounded-lg border border-[#1C2826]/20 focus:outline-none focus:border-[#1C2826] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
              English Proficiency Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#1C2826]/20 focus:outline-none focus:border-[#1C2826] text-sm bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E05A47] text-white font-bold rounded-lg hover:bg-[#d04a37] transition-colors text-sm shadow-md disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Join Friday Meetup'}
          </button>
        </form>
      </div>

      {/* Participant List */}
      <div className="pt-6 border-t border-[#1C2826]/10">
        <h3 className="text-lg font-bold mb-4">Current Participants ({participants.length})</h3>
        {participants.length === 0 ? (
          <p className="text-xs text-[#1C2826]/50 italic">No participants signed up yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {participants.map((p) => (
              <div key={p.id} className="p-3 rounded-lg bg-[#F7F5EE] border border-[#1C2826]/5 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm">{p.name}</div>
                  <div className="text-xs text-[#1C2826]/60">Topic: {p.topic}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#1C2826]/80 font-medium">
                  {p.level}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}