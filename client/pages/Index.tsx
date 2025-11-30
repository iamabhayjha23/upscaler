import Header from "@/components/Header";
import SubmissionForm from "@/components/SubmissionForm";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Tagline Section */}
      <div className="bg-gradient-to-b from-yellow-50 to-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <p className="text-gray-600 text-sm md:text-base font-medium text-center">
            Find, hire & manage your offshore team seamlessly.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        {/* Blue left accent border */}
        <div className="absolute left-0 top-20 w-1 h-48 bg-blue-600"></div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="block md:whitespace-nowrap">Hire Top Talents quickly</span>
              <span className="block md:whitespace-nowrap">with AI & Human Intelligence</span>
            </h1>

            {/* Description */}
            <p className="text-gray-700 text-base md:text-lg max-w-lg leading-relaxed">
              Uplers is an end-to-end AI-hiring platform for tech companies to
              hire top engineering & marketing talents from India.
            </p>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
              <SubmissionForm
                onSuccess={() => {
                  // Optionally redirect to dashboard after success
                }}
              />
            </div>

            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Dashboard →
            </Link>
          </div>

          {/* Right Decorative Circle */}
          <div className="hidden md:flex justify-center items-center relative h-96">
            <div className="absolute w-72 h-72 bg-gradient-to-br from-yellow-300 to-yellow-200 rounded-full opacity-70 blur-3xl"></div>
            <div className="absolute w-56 h-56 bg-yellow-300 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Mobile decorative element */}
        <div className="md:hidden mt-12 relative h-64 -mr-4">
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-full opacity-40 blur-3xl"></div>
        </div>
      </main>
    </div>
  );
}
