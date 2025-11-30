import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SubmissionForm from "@/components/SubmissionForm";
import { Submission, submissionApi } from "@/services/submissionApi";
import { toast } from "sonner";
import { Trash2, Edit2 } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "edit">("dashboard");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Submission | undefined>();

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const data = await submissionApi.getAll();
      setSubmissions(data);
    } catch (error) {
      toast.error("Failed to fetch submissions");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      await submissionApi.delete(id);
      setSubmissions(submissions.filter((s) => s.id !== id));
      toast.success("Submission deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete submission");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (submission: Submission) => {
    setEditingData(submission);
    setEditingId(submission.id || "");
    setActiveTab("edit");
  };

  const handleFormSuccess = () => {
    setEditingId(null);
    setEditingData(undefined);
    setActiveTab("dashboard");
    fetchSubmissions();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <p className="text-gray-500 text-sm mb-8">Dashboard</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-20">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute z-10"></div>
                </div>
                <span className="text-lg font-bold text-black">uplers</span>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition text-left ${
                    activeTab === "dashboard"
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingData(undefined);
                    setActiveTab("edit");
                  }}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition text-left ${
                    activeTab === "edit"
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Edit
                </button>
              </div>

              {/* Back to Home */}
              <Link
                to="/"
                className="mt-8 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Submission
                </h2>

                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading submissions...</p>
                  </div>
                ) : submissions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No submissions yet</p>
                    <Link
                      to="/"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Go back and create one
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="bg-yellow-100 rounded-lg p-6 hover:shadow-lg transition"
                      >
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-semibold text-gray-700">
                              Full Name
                            </p>
                            <p className="text-gray-900">
                              {submission.fullName}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Phone
                            </p>
                            <p className="text-gray-900">{submission.phone}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Email
                            </p>
                            <p className="text-gray-900">{submission.email}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Additional Info
                            </p>
                            <p className="text-gray-900">
                              {submission.additionalInfo || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Roles
                            </p>
                            <p className="text-gray-900">{submission.roles}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Budget
                            </p>
                            <p className="text-gray-900">
                              {submission.budget || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Talents
                            </p>
                            <p className="text-gray-900">
                              {submission.talents || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">
                              Persona
                            </p>
                            <p className="text-gray-900">
                              {submission.persona || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-6 pt-6 border-t border-yellow-200">
                          <button
                            onClick={() => handleEdit(submission)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(submission.id!)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-medium"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Edit Tab */}
            {activeTab === "edit" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingId ? "Edit Submission" : "Create New Submission"}
                </h2>

                <SubmissionForm
                  initialData={editingData}
                  onSuccess={handleFormSuccess}
                />

                {editingId && (
                  <button
                    onClick={handleCancelEdit}
                    className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    ← Cancel
                  </button>
                )}

                {submissions.length > 0 && !editingId && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Submissions List
                    </h3>
                    <div className="space-y-2">
                      {submissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                        >
                          <span className="font-medium text-gray-900">
                            {submission.fullName}
                          </span>
                          <button
                            onClick={() => handleEdit(submission)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
