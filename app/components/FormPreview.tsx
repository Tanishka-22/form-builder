// app/components/FormPreview.tsx
import { useFormStore } from "~/store/useFormStore";
import { useState } from "react";

export function FormPreview() {
  const { fields } = useFormStore();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const value = formData[f.id]?.trim() || "";
      if (f.required && !value) {
        newErrors[f.id] = "This field is required.";
      }
      if (f.type === "text" && f.label.toLowerCase().includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          newErrors[f.id] = "Invalid email format.";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Form is valid!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.id}>
          <label className="block font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.helpText && (
            <p className="text-sm text-gray-500 mb-1">{field.helpText}</p>
          )}
          {field.type === "textarea" ? (
            <textarea
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            />
          ) : field.type === "dropdown" ? (
            <select
              className="w-full p-2 border rounded"
              value={formData[field.id] || ""}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            >
              <option value="">-- Select --</option>
              {(field.options || []).map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              checked={formData[field.id] === "true"}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.checked.toString() })}
            />
          ) : (
            <input
              type={field.type}
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            />
          )}
          {errors[field.id] && (
            <p className="text-sm text-red-500 mt-1">{errors[field.id]}</p>
          )}
        </div>
      ))}
      {fields.length > 0 && (
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Validate
        </button>
      )}
    </form>
  );
}
