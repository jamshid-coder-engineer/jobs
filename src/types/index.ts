export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "To'liq stavka" | "Masofaviy" | "Gibrid";
  postedAt: string;
}