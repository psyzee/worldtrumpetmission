import React from 'react'

export default function Sidebar({onConnect,onRefresh}){
  return (
    <aside className="sidebar">
      <div style={{display:'flex', gap:14, alignItems:'center'}}>
        <img src="/logo.png" alt="logo" className="logo" />
        <div>
          <div style={{fontFamily:'Playfair Display', fontSize:18, color:'#ffcb74'}}>QUICKBOOKS ONLINE RECEIPT</div>
          <div style={{fontSize:13, color:'#ddd', marginTop:4}}>Nations Prayer Mountain</div>
        </div>
      </div>

      <div style={{marginTop:18}}>
        <button className="connect-btn big-btn" onClick={onConnect}>🟢 Connect</button>
      </div>

      <div style={{marginTop:14}}>
        <button className="big-btn" onClick={onRefresh} style={{background:'#222', color:'#fff'}}>🔁 Refresh</button>
      </div>

      <div style={{position:'absolute', bottom:24}}>
        <div style={{marginBottom:6}}>📞 0740744216</div>
        <div>📞 0792168477</div>
      </div>
    </aside>
  )
}
