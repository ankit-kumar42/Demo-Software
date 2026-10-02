export const PROFS = ["Dr. Meera Sharma", "Dr. Anil Kapoor", "Dr. Sunita Rana"];
export const DEPTS = ["Computer Science", "Electronics", "Electrical", "Mechanical", "Civil", "Chemical"];
export const STATUSES = ["Pending", "Under review", "Changes requested", "Approved"];
export const today = () =>
  new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const SEED = [
  { id: 1, title: "Federated Learning for Privacy-Preserving Medical Imaging", student: "Rohan Verma", roll: "22MI501", dept: "Computer Science", sup: PROFS[0], abs: "Studies how hospitals can train a shared diagnostic model without exchanging patient scans.", file: "fl_medical_imaging_v2.pdf", date: "12 Sep 2026", status: "Changes requested", remarks: [{ by: PROFS[0], text: "Good literature review. Please add a comparison against centralised training in Chapter 4.", date: "20 Sep 2026" }] },
  { id: 2, title: "Low-Power LoRa Mesh for Hill Region Weather Sensing", student: "Ananya Thakur", roll: "22EC114", dept: "Electronics", sup: PROFS[1], abs: "A battery-efficient mesh network design tested across three valleys near Hamirpur.", file: "lora_mesh_final.pdf", date: "28 Sep 2026", status: "Pending", remarks: [] },
  { id: 3, title: "Seismic Response of Reinforced Masonry in Himachal", student: "Karan Chauhan", roll: "22CE230", dept: "Civil", sup: PROFS[2], abs: "Shake-table analysis of masonry walls with different reinforcement layouts.", file: "masonry_seismic.pdf", date: "2 Sep 2026", status: "Approved", remarks: [{ by: PROFS[2], text: "Approved for archive. Excellent experimental rigour.", date: "15 Sep 2026" }] },
  { id: 4, title: "Blockchain-Based Degree Verification", student: "Priya Negi", roll: "22MI377", dept: "Computer Science", sup: PROFS[0], abs: "A tamper-proof ledger so employers can verify NIT degrees instantly.", file: "degree_chain.pdf", date: "30 Sep 2026", status: "Under review", remarks: [] },
];
