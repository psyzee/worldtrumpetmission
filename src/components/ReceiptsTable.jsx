import React from 'react'
import ReceiptPreview from './ReceiptPreview.jsx'

export default function ReceiptsTable({items,page,setPage,totalPages}){
  function openPreview(r){
    const w = window.open('','_blank','toolbar=0,location=0,menubar=0,width=420,height=880')
    if(!w) return alert('Allow popups')
    const html = ReceiptPreview.printHTML(r)
    w.document.write(html); w.document.close()
    w.onload = ()=> { try { w.focus(); setTimeout(()=> w.print(),300) } catch(e){} }
  }

  return (
    <div className="card">
      <table className="table">
        <thead><tr><th>Date</th><th>Receipt #</th><th>Customer</th><th style={{textAlign:'right'}}>Total</th></tr></thead>
        <tbody>
          {items.map(it=> (
            <tr key={it.id} style={{cursor:'pointer'}} onClick={()=> openPreview(it)}>
              <td>{it.txn_date}</td>
              <td>{it.id}</td>
              <td>{it.customer}</td>
              <td style={{textAlign:'right'}}>{it.total_amt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div style={{display:'flex', gap:8}}>
          <button className="pag-btn" onClick={()=> setPage(1)}>⏮⏮ First</button>
          <button className="pag-btn" onClick={()=> setPage(p=> Math.max(1,p-1))}>◀ Prev</button>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="pag-btn" onClick={()=> setPage(p=> Math.min(totalPages,p+1))}>Next ▶</button>
          <button className="pag-btn" onClick={()=> setPage(totalPages)}>⏩⏩ Last</button>
        </div>
      </div>
    </div>
  )
}
