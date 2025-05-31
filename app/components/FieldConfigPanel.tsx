import { useFormStore, Field } from "~/store/useFormStore";
import { useState } from "react";

interface Props {
  selectedFieldId: string | null;
}

export function FieldConfigPanel({ selectedFieldId }: Props) {
  const { fields, updateField } = useFormStore();
  const field = fields.find((f) => f.id === selectedFieldId);

  const [newOption, setNewOption] = useState("");

  if (!field) {
    return <div className="p-4 text-gray-500">Select a field to configure.</div>;
  }

  const handleChange = (key: keyof Field, value: any) => {
    updateField(field.id, { [key]: value });
  };

  const addOption = () => {
    if (newOption.trim()) {
      const updatedOptions = [...(field.options || []), newOption];
      updateField(field.id, { options: updatedOptions });
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    const updated = [...(field.options || [])];
    updated.splice(index, 1);
    updateField(field.id, { options: updated });
  };

  return (
    <div className="p-4 space-y-4 border-l bg-gray-50">
      <h2 className="font-semibold text-lg">Field Configuration</h2>

      <div>
        <label className="block text-sm font-medium">Label</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={field.label}
          onChange={(e) => handleChange("label", e.target.value)}
        />
      </div>

      {field.type !== "checkbox" && (
        <div>
          <label className="block text-sm font-medium">Placeholder</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={field.placeholder || ""}
            onChange={(e) => handleChange("placeholder", e.target.value)}
          />
        </div>
      )}

      <div>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleChange("required", e.target.checked)}
          />
          <span>Required</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium">Help Text</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={field.helpText || ""}
          onChange={(e) => handleChange("helpText", e.target.value)}
        />
      </div>

      {field.type === "dropdown" && (
        <div>
          <label className="block text-sm font-medium mb-1">Options</label>
          <div className="space-y-2">
            {(field.options || []).map((opt, index) => (
              <div key={index} className="flex items-center gap-2">
                <input className="w-full p-1 border rounded" value={opt} disabled />
                <button
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="New option"
                className="w-full p-1 border rounded"
              />
              <button
                onClick={addOption}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
