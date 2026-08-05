import React from 'react';
import TableMakerApp from '../lib/table-maker';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5EE] text-[#1C2826] font-sans">
      {/* Navigation Header */}
      <nav className="border-b border-[#1C2826]/10 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl tracking-wider">LTE</span>
          <span className="text-xs uppercase bg-[#1C2826] text-white px-2 py-0.5 rounded font-mono">Table Maker</span>
        </div>
        <a 
          href="/admin" 
          className="text-xs font-semibold text-[#1C2826]/60 hover:text-[#1C2826] transition-colors uppercase tracking-wider"
        >
          Admin Panel
        </a>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-12 max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold tracking-widest text-[#E05A47] uppercase bg-[#E05A47]/10 px-3 py-1 rounded-full inline-block mb-4">
          Let's Talk in English
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
          Friday Meetup Table Assignment
        </h1>
        <p className="text-lg text-[#1C2826]/70 max-w-2xl mx-auto">
          Sign up for this week's English meetup and get automatically assigned to your discussion table!
        </p>
      </section>

      {/* Main App Container */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <TableMakerApp />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1C2826]/10 py-8 text-center text-xs text-[#1C2826]/50">
        <p>© LTE (Let's Talk in English) Table Maker. All rights reserved.</p>
      </footer>
    </main>
  );
}
