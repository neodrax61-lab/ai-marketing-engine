export type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="card">
      <p className="badge">{label}</p>
      <h3>{value}</h3>
      {helper && <p>{helper}</p>}
    </div>
  );
}
