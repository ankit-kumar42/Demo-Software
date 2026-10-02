import { useState } from "react";
import { DEPTS } from "./data.js";

export default function Auth({ role, mode, setMode, onBack, onDone }) {
  const isStudent = role === "student";
  const reg = mode === "register";
  const [f, setF] = useState({ name: "", id: "", dept: DEPTS[0], email: "", password: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!f.email.includes("@") || f.password.length < 6) return setErr("Enter a valid email and a password of at least 6 characters.");
    if (reg && (!f.name || !f.id)) return setErr("Please fill in all the fields.");
    const nice = f.email.split("@")[0].replace(/[._]/g, " ");
    onDone({
      role, email: f.email, dept: f.dept,
      name: f.name || (isStudent ? "Rohan Verma" : "Dr. " + nice),
      roll: isStudent ? f.id || "22MI501" : undefined,
      empId: !isStudent ? f.id : undefined,
    });
  };

  return (
    <div className="auth">
      <aside className="auth-side" style={{ backgroundImage: "url(/campus.jpg)" }}>
        <div className="auth-shade">
          <img src="/nith-logo.png" alt="" />
          <h2>{isStudent ? "Student portal" : "Faculty portal"}</h2>
          <p>{isStudent ? "Your thesis, your feedback, one dashboard." : "Review and guide thesis work across your department."}</p>
        </div>
      </aside>
      <form className="auth-form" onSubmit={submit}>
        <button type="button" className="link" onClick={onBack}>Back to home</button>
        <h1>{reg ? "Create your account" : "Welcome back"}</h1>
        <p className="muted">{reg ? "Register as a " : "Login as a "}{role}.</p>
        {reg && (<>
          <label>Full name<input value={f.name} onChange={set("name")} placeholder="Your full name" /></label>
          <label>{isStudent ? "Roll number" : "Employee ID"}<input value={f.id} onChange={set("id")} placeholder={isStudent ? "e.g. 22MI501" : "e.g. NITH-1042"} /></label>
          <label>Department<select value={f.dept} onChange={set("dept")}>{DEPTS.map((d) => <option key={d}>{d}</option>)}</select></label>
        </>)}
        <label>Institute email<input type="email" value={f.email} onChange={set("email")} placeholder="name@nith.ac.in" /></label>
        <label>Password<input type="password" value={f.password} onChange={set("password")} placeholder="At least 6 characters" /></label>
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn wide">{reg ? "Create account" : "Login"}</button>
        <p className="muted center">
          {reg ? "Already registered?" : "New here?"}{" "}
          <button type="button" className="link" onClick={() => { setErr(""); setMode(reg ? "login" : "register"); }}>{reg ? "Login" : "Register"}</button>
        </p>
      </form>
    </div>
  );
}
