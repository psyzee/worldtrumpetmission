import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ReceiptsTable from './components/ReceiptsTable.jsx'
import axios from 'axios'
import './styles.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
const API_KEY = import.meta.env.VITE_RECEIPTS_API_KEY || 'devkey'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export default function App(){
  const [receipts, setReceipts] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 10
  const cachedRef = useRef([])

  async function fetchRemote(){
    if(USE_MOCK) return null
    try{
      const res = await axios.get(`${API_BASE}/receipts`, { headers: { 'x-api-key': API_KEY } })
      return res.data.receipts || []
    }catch(e){
      console.error('fetchRemote error', e.response?.status, e.message)
      return null
    }
  }

  useEffect(()=>{
    let mounted = true
    async function loadAndCompare(){
      const data = await fetchRemote()
      if(!mounted) return
      if(data === null) return
      const sorted = [...data].sort((a,b)=> (b.txn_date||'').localeCompare(a.txn_date||'')).slice(0,50)
      const prev = cachedRef.current || []
      const equal = prev.length === sorted.length && prev.every((p,i)=> p.id===sorted[i].id && (p.txn_date||'')===(sorted[i].txn_date||''))
      if(!equal){
        cachedRef.current = sorted
        setReceipts(sorted)
      }
    }

    if(USE_MOCK){
      import('./mock/mockData.js').then(mod => {
        cachedRef.current = mod.mockReceipts.slice(0,50)
        setReceipts(cachedRef.current)
      })
    } else {
      loadAndCompare()
    }

    const t = setInterval(loadAndCompare, 5000)
    return ()=> { mounted=false; clearInterval(t) }
  },[])

  const totalPages = Math.max(1, Math.ceil(receipts.length / perPage))
  const pageItems = receipts.slice((page-1)*perPage, page*perPage)

  return (
    <div>
      <Sidebar onConnect={()=> window.location.href = `${API_BASE}/connect`} onRefresh={()=>{ cachedRef.current=[]; window.location.reload(); }} />
      <main className="main">
        <h1 style={{color:'#ffcb74', fontFamily:'Playfair Display', fontSize:30}}>QuickBooks Online Receipts</h1>
        <div style={{marginTop:12}}>
          <ReceiptsTable items={pageItems} page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </main>
    </div>
  )
}
