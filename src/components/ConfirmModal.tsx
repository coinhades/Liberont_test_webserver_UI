type Props = {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title = "Confirm",
  message,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  confirmColor = "bg-blue-600 hover:bg-blue-700",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white ${confirmColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
