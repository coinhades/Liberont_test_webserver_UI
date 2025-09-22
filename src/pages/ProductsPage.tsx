import { useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import FormModal from "../components/FormModal";
import LoadingOverlay from "../components/LoadingOverlay";
import SearchBar, { type SearchFilters } from "../components/SearchBar"; // ✅ type-only import
import { createProduct, updateProduct } from "../lib/api";
import type { Product } from "../lib/types";

export default function ProductsPage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [busy, setBusy] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const bumpReload = () => setReloadKey((k) => k + 1);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* 🔎 Advanced Search */}
      <div className="mb-4">
        <SearchBar onSearch={setFilters} />
      </div>

      {/* Table */}
      <ProductTable
        onEdit={(product) => setEditingProduct(product)}
        filters={filters}
        reloadKey={reloadKey}
      />

      {/* Add Modal */}
      <FormModal
        open={isCreateOpen}
        title="Add Product"
        onClose={() => setIsCreateOpen(false)}
      >
        <ProductForm
          initial={{ name: "", price: 0 }}
          submitLabel="Create"
          onSubmit={async (data) => {
            setBusy(true);
            try {
              await createProduct(data);
              setIsCreateOpen(false);
              bumpReload();
            } finally {
              setBusy(false);
            }
          }}
        />
      </FormModal>

      {/* Edit Modal */}
      <FormModal
        open={!!editingProduct}
        title="Edit Product"
        onClose={() => setEditingProduct(null)}
      >
        {editingProduct && (
          <ProductForm
            initial={{ name: editingProduct.name, price: editingProduct.price }}
            submitLabel="Update"
            onSubmit={async (data) => {
              await updateProduct(editingProduct.id, data);
              setEditingProduct(null);
              bumpReload();
            }}
          />
        )}
      </FormModal>

      <LoadingOverlay show={busy} />
    </div>
  );
}
