import React from 'react';

export default function TaskCard({ title, subtitle, assignee, type }) {
  // Define exact colors based on the design
  const styles = {
    'todo': { bg: '#FCF3F1', border: '#D94545' },
    'progress': { bg: '#FDF7EE', border: '#ECA336' },
    'done': { bg: '#F0F5F2', border: '#5FAD77' }
  };

  const currentStyle = styles[type] || styles['todo'];

  return (
    <div style={{ 
      backgroundColor: currentStyle.bg, 
      borderRadius: '8px', 
      padding: '20px', 
      borderLeft: `5px solid ${currentStyle.border}`,
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: '600', color: '#333' }}>
        {title}
      </h3>
      
      {subtitle && (
        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 15px 0' }}>
          {subtitle}
        </p>
      )}
      
      {assignee && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
          <span style={{ fontSize: '12px', color: '#555' }}>{assignee}</span>
        </div>
      )}
    </div>
  );
}