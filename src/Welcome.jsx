const ROLES = [
  { id: "student", icon: "🎓", title: "I am a student", text: "Upload your thesis, track its status and read your supervisor's remarks." },
  { id: "professor", icon: "📚", title: "I am a professor", text: "Review submitted theses, leave remarks and approve work for the archive." },
];

export default function Welcome({ onPick }) {
  return (
    <div className="welcome">
      <header className="topbar">
        <img src="/nith-logo.png" alt="NIT Hamirpur logo" />
        <div><b>National Institute of Technology Hamirpur</b><span>Thesis Repository</span></div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Submit, review and archive thesis work in one place</h1>
          <p>The institute's central repository for B.Tech, M.Tech and PhD thesis work. Choose how you want to continue.</p>
          <div className="roles">
            {ROLES.map((r) => (
              <article key={r.id} className="role-card">
                <span className="role-icon">{r.icon}</span>
                <h2>{r.title}</h2>
                <p>{r.text}</p>
                <div className="role-actions">
                  <button className="btn" onClick={() => onPick(r.id, "login")}>Login</button>
                  <button className="btn ghost" onClick={() => onPick(r.id, "register")}>Register</button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="hero-img" style={{ backgroundImage: "url(/campus.jpg)" }} role="img" aria-label="NIT Hamirpur campus">
          <div className="hero-badge">उद्यमेन हि सिद्ध्यन्ति कार्याणि न मनोरथैः</div>
        </div>
      </section>

      <footer className="foot">© NIT Hamirpur, Himachal Pradesh. Demo version.</footer>
    </div>
  );
}
