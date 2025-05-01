import { useState } from "react";
import { BACK_URL } from "../constants";

type DeleteConfirmModalProps = {
  memberId: string; // Added member ID prop
  memberName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({
  memberId,
  memberName,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${BACK_URL}/members/${memberId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }

      onConfirm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete member");
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500/30 backdrop-blur-sm"
          onClick={onCancel}
        ></div>

        <div className="relative z-10 w-full max-w-lg px-6 pt-6 pb-6 overflow-hidden text-left bg-white rounded-xl shadow-xl dark:bg-gray-800">
          <div className="sm:flex sm:items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="w-6 h-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Delete Member
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {memberName}
                  </span>{" "}
                  ? This action cannot be undone.
                </p>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex justify-center w-full px-5 py-3 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="inline-flex justify-center w-full px-5 py-3 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
