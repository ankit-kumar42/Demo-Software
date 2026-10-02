import { useState } from "react";
import Welcome from "./Welcome.jsx";
import Auth from "./Auth.jsx";
import Student from "./Student.jsx";
import Professor from "./Professor.jsx";
import { SEED, today } from "./data.js";

export default function App() {
  const [view, setView] = useState({ page: "welcome" });
  const [user, setUser] = useState(null);
  const [subs, setSubs] = useState(SEED);

  const addThesis = (t) => setSubs((p) => [{ id: Date.now(), status: "Pending", remarks: [], date: today(), ...t }, ...p]);
  const review = (id, status, text) =>
    setSubs((p) => p.map((s) => s.id !== id ? s : {
      ...s, status,
      remarks: text ? [...s.remarks, { by: user.name, text, date: today() }] : s.remarks,
    }));
  const logout = () => { setUser(null); setView({ page: "welcome" }); };

  if (user?.role === "student") return <Student user={user} subs={subs} onSubmit={addThesis} onLogout={logout} />;
  if (user?.role === "professor") return <Professor user={user} subs={subs} onReview={review} onLogout={logout} />;
  if (view.page === "auth")
    return <Auth role={view.role} mode={view.mode} setMode={(m) => setView({ ...view, mode: m })}
      onBack={() => setView({ page: "welcome" })} onDone={setUser} />;
  return <Welcome onPick={(role, mode) => setView({ page: "auth", role, mode })} />;
}
