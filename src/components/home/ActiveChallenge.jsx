import React from 'react';

export default function ActiveChallenge() {
  return (
    <section className="challenge">
      <span className="badge">🔥 Active Weekly Challenge</span>
      <h2>Cook The Best BIG F Noodles</h2>
      <div className="challenge-details">
        <p>🏆 <strong>Prize:</strong> KSh 10,000</p>
        <p>👥 <strong>Participants:</strong> 1,247 Cooks</p>
        <p>⏰ <strong>Time Left:</strong> 5 Days</p>
      </div>
      <button className="btn-primary">Join Challenge</button>
    </section>
  );
}