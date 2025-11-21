export default function ReceiptPreview(){ return null }

ReceiptPreview.printHTML = function(r){
  const lines = (r.line_items||[]).map(li=>`
    <tr>
      <td style="padding:10px 6px; width:35%; border-bottom:1px dashed #666">${li.item_ref||''}</td>
      <td style="padding:10px 6px; width:45%; border-bottom:1px dashed #666">${li.description||''}</td>
      <td style="padding:10px 6px; width:20%; text-align:right; border-bottom:1px dashed #666">${li.amount||''}</td>
    </tr>
  `).join('')

  return `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${r.id}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    body{ font-family: Roboto, sans-serif; margin:0; padding:0; background:#fff; color:#111 }
    .receipt{ width:280px; margin:6px auto; padding:16px; border:1px solid #000; }
    .header{ text-align:center; font-family:'Playfair Display', serif; font-size:28px; font-weight:700; margin-bottom:14px }
    .contact{ text-align:center; line-height:1.6; margin-bottom:12px }
    table{ width:100%; border-collapse:collapse; margin-top:10px }
    td,th{ padding:10px; font-size:14px }
    thead th{ border-bottom:2px solid #000; text-align:left }
    .total{ text-align:right; font-weight:700; margin-top:14px }
    .footer{ text-align:center; margin-top:20px; font-weight:700 }
    .controls{ display:flex; gap:8px; justify-content:center; margin-top:12px }
    @media print{ .controls{ display:none !important } @page{ size:80mm auto; margin:3mm } }
  </style>
  </head><body>
    <div class="receipt">
      <div class="header">Nations Prayer Mountain</div>
      <div class="contact"><div>P.O BOX 8085 Kampala Ug</div><div>TEL: +256706695466 / +256771930796</div><div>Email: info@worldtrumpetmission.org</div></div>
      <hr style="border:none;border-top:1px solid #000;margin:10px 0" />
      <div style="display:flex;justify-content:space-between"><div><strong>Date:</strong> ${r.txn_date||''}</div><div><strong>Receipt:</strong> ${r.id||''}</div></div>
      <div style="margin-top:12px"><strong>With thanks from:</strong> ${r.customer||''}</div>
      <div style="margin-top:8px"><strong>Contact:</strong> ${r.bill_email||''}</div>
      <table><thead><tr><th>Item</th><th>Description</th><th style="text-align:right">Amount</th></tr></thead><tbody>${lines}</tbody></table>
      <div class="total">Total: ${r.total_amt||''}</div>
      <div style="margin-top:10px"><strong>Issued By:</strong> ${(r.meta||{}).IssuedBy||''}</div>
      <div class="footer">May the Lord Answer your Prayers</div>
      <div class="controls">
        <button onclick="window.print()" style="padding:8px 12px;border-radius:8px">Print</button>
        <button onclick="window.close()" style="padding:8px 12px;border-radius:8px">Close</button>
      </div>
    </div>
  </body></html>`
}
