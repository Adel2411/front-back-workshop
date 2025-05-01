import type React from "react";

import { useState } from "react";
import { Member } from "../types";
import { BACK_URL, DEPARTMENTS, SECTIONS } from "../constants";

type RegisterModalProps = {
  onClose: () => void;
  onSubmit: (member: Member) => void;
};

export default function RegisterModal({
  onClose,
  onSubmit,
}: RegisterModalProps) {
  const [formData, setFormData] = useState<Omit<Member, "id">>({
    discordId: "",
    name: "",
    email: "",
    section: SECTIONS[0],
    department: DEPARTMENTS[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (apiError) setApiError(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.discordId.trim())
      newErrors.discordId = "Discord ID is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACK_URL}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to register member");
      }

      const result = await response.json();
      console.log("Member registered successfully:", result);
      onSubmit(result);
    } catch (error) {
      console.error("Error registering member:", error);
      setApiError(
        error instanceof Error ? error.message : "Registration failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500/30 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="relative z-10 w-full max-w-lg px-6 pt-6 pb-6 overflow-hidden text-left bg-white rounded-xl shadow-xl dark:bg-gray-800">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-white rounded-md hover:text-gray-500 dark:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Register New Member
              </h3>

              {apiError && (
                <div className="mt-2 p-3 bg-red-50 text-red-700 rounded border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="discordId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Discord ID
                  </label>
                  <input
                    type="text"
                    name="discordId"
                    id="discordId"
                    value={formData.discordId}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${errors.discordId ? "border-red-500" : ""}`}
                  />
                  {errors.discordId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.discordId}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="section"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Section
                  </label>
                  <select
                    name="section"
                    id="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {SECTIONS.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Department
                  </label>
                  <select
                    name="department"
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {DEPARTMENTS.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-indigo-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="inline-flex justify-center w-full px-5 py-3 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
