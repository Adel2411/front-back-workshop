import { useState } from "react";
import { Member } from "./types";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import MemberDetailsModal from "./components/MemberDetailsModal";
import RegisterModal from "./components/RegisterModal";
import MemberCard from "./components/MemberCard";
import "./App.css";

export default function Home() {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const addMember = (member: Member) => {
    setMembers([...members, member]);
  };

  const updateMember = (updatedMember: Member) => {
    setMembers(
      members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member,
      ),
    );
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  // Modal handlers
  const handleOpenDetails = (member: Member) => {
    setCurrentMember(member);
    setShowDetailsModal(true);
  };

  const handleDelete = () => {
    if (currentMember) {
      deleteMember(currentMember.id);
      setShowDeleteModal(false);
      setShowDetailsModal(false);
      setCurrentMember(null);
    }
  };

  const handleOpenDeleteConfirm = (member: Member) => {
    setCurrentMember(member);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Members Management
            </h1>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium transition-colors duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Register Member
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {members.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-200">
              No members yet
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Get started by registering a new member.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onView={() => handleOpenDetails(member)}
                onDelete={() => handleOpenDeleteConfirm(member)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSubmit={(member) => {
            addMember(member);
            setShowRegisterModal(false);
          }}
        />
      )}

      {showDetailsModal && currentMember && (
        <MemberDetailsModal
          member={currentMember}
          onClose={() => {
            setShowDetailsModal(false);
            setCurrentMember(null);
          }}
          onDelete={() => setShowDeleteModal(true)}
          onUpdate={(updatedMember) => {
            updateMember(updatedMember);
            setShowDetailsModal(false);
            setCurrentMember(null);
          }}
        />
      )}

      {showDeleteModal && currentMember && (
        <DeleteConfirmModal
          memberName={currentMember.name}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
