import React from 'react'

export default function MainPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '80vh'
      }}
    >
      <div style={{ fontSize: '40px' }}>The most</div>
      <div style={{ fontSize: '30px' }}>fashionable</div>
      <div style={{ fontSize: '60px' }}>
        <span style={{ color: '#4caf50' }}>marketplace</span>
        <span style={{ color: '#fbc02d' }}> in</span>
      </div>
      <div style={{ fontSize: '40px' }}>your</div>
      <div style={{ fontSize: '30px' }}>neighborhood</div>
    </div>
  )
}
