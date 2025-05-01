import { Member } from "../types";

type MemberCardProps = {
  member: Member;
  onView: () => void;
  onDelete: () => void;
};

export default function MemberCard({
  member,
  onView,
  onDelete,
}: MemberCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6 cursor-pointer" onClick={onView}>
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-xl font-bold">
            {member.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {member.email}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
              Section:
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-200">
              {member.section}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
              Department:
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-200">
              {member.department}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          aria-label="Delete member"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
          className="p-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200"
          aria-label="View member details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
