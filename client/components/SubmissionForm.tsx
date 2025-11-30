import { useState } from "react";
import ReusableInput from "./ReusableInput";
import { Submission, submissionApi } from "@/services/submissionApi";
import { toast } from "sonner";

interface SubmissionFormProps {
  initialData?: Submission;
  onSuccess?: () => void;
}

export default function SubmissionForm({
  initialData,
  onSuccess,
}: SubmissionFormProps) {
  const [formData, setFormData] = useState<Submission>(
    initialData || {
      fullName: "",
      phone: "",
      email: "",
      additionalInfo: "",
      roles: "",
      budget: "",
      talents: "",
      persona: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Submission>>({});

  const validateForm = () => {
    const newErrors: Partial<Submission> = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.roles.trim()) newErrors.roles = "Roles is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof Submission]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      if (initialData?.id) {
        // Update existing
        await submissionApi.update(initialData.id, formData);
        toast.success("Submission updated successfully!");
      } else {
        // Create new
        await submissionApi.create(formData);
        toast.success("Submission created successfully!");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          additionalInfo: "",
          roles: "",
          budget: "",
          talents: "",
          persona: "",
        });
      }
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to save submission");
      console.error("Form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReusableInput
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />
        <ReusableInput
          label="Phone"
          name="phone"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
      </div>

      <ReusableInput
        label="Email"
        name="email"
        type="email"
        placeholder="test@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <ReusableInput
        label="Additional Info"
        name="additionalInfo"
        placeholder="Any additional information..."
        value={formData.additionalInfo}
        onChange={handleChange}
      />

      <ReusableInput
        label="Roles"
        name="roles"
        placeholder="e.g., Developer, Designer"
        value={formData.roles}
        onChange={handleChange}
        error={errors.roles}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReusableInput
          label="Budget"
          name="budget"
          placeholder="e.g., 100cr"
          value={formData.budget}
          onChange={handleChange}
        />
        <ReusableInput
          label="Talents"
          name="talents"
          placeholder="e.g., MultiTask"
          value={formData.talents}
          onChange={handleChange}
        />
      </div>

      <ReusableInput
        label="Persona"
        name="persona"
        placeholder="e.g., Tech Professional"
        value={formData.persona}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading
          ? "Saving..."
          : initialData?.id
            ? "Update Submission"
            : "Create Submission"}
      </button>
    </form>
  );
}
