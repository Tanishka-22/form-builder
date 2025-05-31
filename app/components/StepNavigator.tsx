import { useState } from "react";
import { useFormStore } from "~/store/useFormStore";

export function StepNavigation() {
  const { steps, fields } = useFormStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepFields = steps[currentStep]?.map((id) =>
    fields.find((f) => f.id === id)
  ).filter(Boolean);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    currentStepFields?.forEach((field) => {
      const value = formData[field!.id]?.trim() || "";

      if (field?.required && !value) {
        newErrors[field.id] = "Required";
      }

      if (
        field?.type === "text" &&
        field.label.toLowerCase().includes("email")
      ) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          newErrors[field.id] = "Invalid email format";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex items-center space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded ${
              index <= currentStep ? "bg-blue-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Fields */}
      {currentStepFields?.map((field) => (
        <div key={field!.id}>
          <label className="block font-medium">
            {field!.label}
            {field!.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={field!.type}
            className="w-full p-2 border rounded"
            placeholder={field!.placeholder}
            value={formData[field!.id] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [field!.id]: e.target.value })
            }
          />
          {errors[field!.id] && (
            <p className="text-sm text-red-500 mt-1">{errors[field!.id]}</p>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        {currentStep > 0 && (
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}