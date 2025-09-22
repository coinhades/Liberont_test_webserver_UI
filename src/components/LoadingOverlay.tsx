export default function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-40">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
    </div>
  );
}
