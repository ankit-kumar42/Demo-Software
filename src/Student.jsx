import { useState } from "react";
import Shell, { Pill, Remarks, Stats } from "./Shell.jsx";
import { PROFS } from "./data.js";

export default function Student({ user, subs, onSubmit, onLogout }) {
  const [tab, setTab] = useState("Overview");
  const [open, setOpen] = useState(null);
  const [file, setFile] = useState(null);
  const [f, setF] = useState({ title: "", sup: PROFS[0], abs: "" });
  const [msg, setMsg] = useState("");
  const mine = subs.filter((s) => s.roll === user.roll);
  const count = (st) => mine.filter((s) => s.status === st).length;
  const sel = mine.find((s) => s.id === open);

  const submit = (e) => {
    e.preventDefault();
    if (!f.title.trim() || !file) return setMsg("Add a title and attach your thesis PDF.");
    onSubmit({ ...f, abs: f.abs || "No abstract provided.", student: user.name, roll: user.roll, dept: user.dept, file: file.name });
    setF({ title: "", sup: PROFS[0], abs: "" }); setFile(null); setMsg(""); setTab("My submissions");
  };

  return (
    <Shell user={user} tabs={["Overview", "Submit thesis", "My submissions"]} tab={tab} setTab={(t) => { setTab(t); setOpen(null); }} onLogout={onLogout}>
      {tab === "Overview" && (<>
        <h1>Hello, {user.name.split(" ")[0]}</h1>
        <p className="muted">Here is where your thesis work stands.</p>
        <Stats items={[[mine.length, "Submitted"], [count("Under review") + count("Pending"), "Waiting for review"], [count("Changes requested"), "Need changes"], [count("Approved"), "Approved"]]} />
        <div className="card"><h2>Latest remarks</h2>
          <Remarks list={mine.flatMap((s) => s.remarks).slice(-3)} empty="No remarks yet. Your supervisor's feedback will appear here." />
        </div>
      </>)}

      {tab === "Submit thesis" && (
        <form className="card form" onSubmit={submit}>
          <h1>Submit your thesis</h1>
          <label>Thesis title<input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Full title of your thesis" /></label>
          <label>Supervisor<select value={f.sup} onChange={(e) => setF({ ...f, sup: e.target.value })}>{PROFS.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label>Abstract<textarea value={f.abs} onChange={(e) => setF({ ...f, abs: e.target.value })} placeholder="Summarise your work in a few lines" /></label>
          <label className={"drop" + (file ? " has" : "")}>
            {file ? file.name + " attached" : "Click to choose your thesis PDF"}
            <input type="file" accept=".pdf" hidden onChange={(e) => setFile(e.target.files[0] || null)} />
          </label>
          {msg && <p className="error" role="alert">{msg}</p>}
          <button className="btn">Submit thesis</button>
        </form>
      )}

      {tab === "My submissions" && (sel ? (
        <div className="card">
          <button className="link" onClick={() => setOpen(null)}>Back to submissions</button>
          <div className="row"><h1>{sel.title}</h1><Pill s={sel.status} /></div>
          <p className="muted">{sel.file} · Submitted {sel.date} · Supervisor {sel.sup}</p>
          <h2>Supervisor remarks</h2>
          <Remarks list={sel.remarks} empty={sel.sup + " has not reviewed this yet."} />
        </div>
      ) : (<>
        <h1>My submissions</h1>
        {mine.length ? mine.map((s) => (
          <div key={s.id} className="item" onClick={() => setOpen(s.id)}>
            <div className="row"><h3>{s.title}</h3><Pill s={s.status} /></div>
            <span className="muted">{s.sup} · {s.date} · {s.remarks.length} remark{s.remarks.length === 1 ? "" : "s"}</span>
          </div>
        )) : <div className="empty">Nothing submitted yet. Use "Submit thesis" to upload your first one.</div>}
      </>))}
    </Shell>
  );
}
