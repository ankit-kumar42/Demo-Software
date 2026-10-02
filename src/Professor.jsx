import { useState } from "react";
import Shell, { Pill, Remarks, Stats } from "./Shell.jsx";
import { STATUSES } from "./data.js";

export default function Professor({ user, subs, onReview, onLogout }) {
  const [tab, setTab] = useState("Overview");
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Under review");
  const [saved, setSaved] = useState(false);
  const count = (st) => subs.filter((s) => s.status === st).length;
  const sel = subs.find((s) => s.id === open);
  const list = subs.filter((s) => (filter === "All" || s.status === filter) &&
    (s.title + s.student + s.roll).toLowerCase().includes(q.toLowerCase()));

  const openThesis = (s) => { setOpen(s.id); setStatus(s.status); setText(""); setSaved(false); };
  const save = () => { onReview(sel.id, status, text.trim()); setText(""); setSaved(true); };

  return (
    <Shell user={user} tabs={["Overview", "Submissions"]} tab={tab} setTab={(t) => { setTab(t); setOpen(null); }} onLogout={onLogout}>
      {tab === "Overview" && (<>
        <h1>Welcome, {user.name}</h1>
        <p className="muted">A summary of thesis work waiting on you.</p>
        <Stats items={[[subs.length, "Total theses"], [count("Pending"), "Not yet opened"], [count("Under review"), "Under review"], [count("Approved"), "Approved"]]} />
        <div className="card"><h2>Awaiting your review</h2>
          {subs.filter((s) => s.status === "Pending").map((s) => (
            <div key={s.id} className="item" onClick={() => { setTab("Submissions"); openThesis(s); }}>
              <h3>{s.title}</h3><span className="muted">{s.student} · {s.roll}</span>
            </div>
          ))}
          {!count("Pending") && <div className="empty">You are all caught up.</div>}
        </div>
      </>)}

      {tab === "Submissions" && (sel ? (
        <div className="card">
          <button className="link" onClick={() => setOpen(null)}>Back to submissions</button>
          <div className="row"><h1>{sel.title}</h1><Pill s={sel.status} /></div>
          <p className="muted">{sel.student} ({sel.roll}) · {sel.dept} · Submitted {sel.date}</p>
          <p>{sel.abs}</p>
          <p><span className="file">{sel.file}</span></p>
          <h2>Remarks</h2>
          <Remarks list={sel.remarks} empty="No remarks yet." />
          <label>Add a remark<textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write feedback for the student" /></label>
          <label>Decision<select value={status} onChange={(e) => setStatus(e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label>
          <button className="btn" onClick={save}>Save review</button>
          {saved && <span className="ok"> Review saved</span>}
        </div>
      ) : (<>
        <h1>Submissions</h1>
        <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, student or roll number" />
        <div className="chips">{["All", ...STATUSES].map((s) => <button key={s} className={"chip" + (s === filter ? " on" : "")} onClick={() => setFilter(s)}>{s}</button>)}</div>
        {list.length ? list.map((s) => (
          <div key={s.id} className="item" onClick={() => openThesis(s)}>
            <div className="row"><h3>{s.title}</h3><Pill s={s.status} /></div>
            <span className="muted">{s.student} ({s.roll}) · {s.dept} · {s.date}</span>
          </div>
        )) : <div className="empty">No theses match your search or filter.</div>}
      </>))}
    </Shell>
  );
}
