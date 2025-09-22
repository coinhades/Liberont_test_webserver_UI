import { useEffect, useState } from "react";
import type { Product } from "../lib/types";
import { getProducts, deleteProduct } from "../lib/api";
import ConfirmModal from "./ConfirmModal";
import LoadingOverlay from "./LoadingOverlay";

type Filters = { name?: string; priceMin?: number; priceMax?: number };

type Props = {
  onEdit: (product: Product) => void;
  filters?: Filters;
  reloadKey?: number;
};

export default function ProductTable({ onEdit, filters, reloadKey = 0 }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10; // 👈 always 10 per page

  const load = async () => {
    setErr(null);
    setLoading(true);
    try {
      const res = await getProducts({ ...filters, page, pageSize });
      setProducts(res.data);
      setTotal(res.total);
    } catch (e: any) {
      setErr(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.name, filters?.priceMin, filters?.priceMax, reloadKey, page]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteId);
      load(); // reload current page
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const fmtJPY = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

  const totalPages = Math.ceil(total / pageSize);

  if (err) return <p className="p-6 text-red-600">{err}</p>;

  return (
    <div className="relative">
      {/* Table */}
      <table className="min-w-full bg-white shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-center text-gray-700">
            <th className="p-3 font-semibold">#</th>
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Price</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center p-6 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : products.length > 0 ? (
            products.map((p, idx) => (
              <tr
                key={p.id}
                className="border-b last:border-b-0 odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition text-center text-black"
              >
                <td className="p-3">{(page - 1) * pageSize + idx + 1}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{fmtJPY(p.price)}</td>
                <td className="p-3">
                  <div className="flex gap-3 justify-center">
                    <button
                      className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                      onClick={() => setDeleteId(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-6 text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* delete confirm */}
      <ConfirmModal
        open={!!deleteId}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        confirmLabel="Delete"
        confirmColor="bg-red-600 hover:bg-red-700"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* blur overlay while deleting */}
      <LoadingOverlay show={deleting} />
    </div>
  );
}
