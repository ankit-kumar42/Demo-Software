export default function Shell({ user, tabs, tab, setTab, onLogout, children }) {
  return (
    <div className="shell">
      <aside className="side">
        <div className="brand"><img src="/nith-logo.png" alt="" /><div><b>NIT Hamirpur</b><span>Thesis Repository</span></div></div>
        <nav>{tabs.map((t) => <button key={t} className={t === tab ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</nav>
        <div className="me">
          <b>{user.name}</b>
          <span>{user.role === "student" ? user.roll : "Faculty"} · {user.dept}</span>
          <button className="btn ghost small" onClick={onLogout}>Log out</button>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}

export const Pill = ({ s }) => <span className={"pill " + s.split(" ")[0].toLowerCase()}>{s}</span>;
export const Remarks = ({ list, empty }) =>
  list.length ? list.map((r, i) => (
    <div key={i} className="remark"><b>{r.by}</b> <span className="muted">{r.date}</span><p>{r.text}</p></div>
  )) : <div className="empty">{empty}</div>;
export const Stats = ({ items }) => (
  <div className="stats">{items.map(([n, l]) => <div key={l} className="stat"><b>{n}</b><span>{l}</span></div>)}</div>
);
