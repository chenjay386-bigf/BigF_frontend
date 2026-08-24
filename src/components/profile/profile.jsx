import React from 'react';

const USER_PROFILE = {
  name: 'Dee',
  handle: '@dee_loves_bigf',
  bio: 'Noodle lover & home chef 🍜 | Slurping my way around Kenya!',
  followers: 20,
  following: 15,
  posts: 8,
  totalLikes: 452,
  orders: [
    { id: 'ORD-10452', item: 'Spicy Chili Oil Artisan Ramen Pack (x3)', date: 'Aug 2, 2026', status: 'Delivered' },
    { id: 'ORD-10480', item: 'BIG F Hand-Pulled Noodle Kit', date: 'Jul 28, 2026', status: 'In Transit' }
  ]
};

export default function Profile() {
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Profile Card */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#2e7d32', color: '#fff', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            👤
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#1b5e20' }}>{USER_PROFILE.name}</h2>
            <span style={{ color: '#666', fontSize: '14px' }}>{USER_PROFILE.handle}</span>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>{USER_PROFILE.bio}</p>
          </div>
        </div>

        {/* Social Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', padding: '12px 0', borderTop: '1px solid #e8f5e9', borderBottom: '1px solid #e8f5e9', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>{USER_PROFILE.followers}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>{USER_PROFILE.following}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Following</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>{USER_PROFILE.posts}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Posts</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>{USER_PROFILE.totalLikes}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Likes</div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#1b5e20' }}>🛍️ My Orders</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {USER_PROFILE.orders.map(order => (
            <div key={order.id} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#e8f5e9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', color: '#1b5e20' }}>{order.item}</strong>
                <span style={{ fontSize: '12px', color: '#666' }}>{order.id} • {order.date}</span>
              </div>
              <span style={{ backgroundColor: order.status === 'Delivered' ? '#2e7d32' : '#f59e0b', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}