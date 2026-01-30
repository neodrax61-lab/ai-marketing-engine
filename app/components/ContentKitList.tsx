type ContentKitItem = {
  label: string;
  value: string;
};

export function ContentKitList({ items }: { items: ContentKitItem[] }) {
  return (
    <div className="card">
      <h3>Kit de conteúdo gerado</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
