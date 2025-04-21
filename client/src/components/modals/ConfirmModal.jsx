const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-[9999]">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;
  