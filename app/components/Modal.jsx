export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95">
        {children}
      </div>
    </div>
  );
}