import React from 'react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header style={{ backgroundColor: '#1b5e20', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#ffffff' }}>
      <div 
        onClick={() => setActiveTab('home')} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div style={{ backgroundColor: '#43a047', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          F
        </div>
        <h1 style={{ margin: 0, fontSize: '20px' }}>BIG F COMMUNITY</h1>
      </div>

      <nav style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setActiveTab('home')}
          style={{
            background: activeTab === 'home' ? '#43a047' : 'transparent',
            color: '#ffffff', border: '1px solid #43a047', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer'
          }}
        >
          🏠 Home
        </button>
        <button 
          onClick={() => setActiveTab('challenges')}
          style={{
            background: activeTab === 'challenges' ? '#43a047' : 'transparent',
            color: '#ffffff', border: '1px solid #43a047', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer'
          }}
        >
          🏆 Challenges
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          style={{
            background: activeTab === 'profile' ? '#43a047' : 'transparent',
            color: '#ffffff', border: '1px solid #43a047', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          👤 Profile
        </button>
      </nav>
    </header>
  );
}