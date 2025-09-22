import { useState } from "react";

type Props = {
  initial?: { name: string; price: number };
  onSubmit: (data: { name: string; price: number }) => Promise<void> | void;
  submitLabel?: string;
};

export default function ProductForm({ initial, onSubmit, submitLabel = "Save" }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  // 👇 store price as string so input can be empty
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const parsedPrice = Number(price);
      if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        setErr("Price must be a non-negative number");
      } else {
        await onSubmit({ name, price: parsedPrice });
      }
    } catch (e: any) {
      setErr(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      {err && <div className="p-2 bg-red-100 text-red-700 rounded">{err}</div>}
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Price (JPY)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
          min={0}
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {busy ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
