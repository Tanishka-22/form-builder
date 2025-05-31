import { useFormStore } from "~/store/useFormStore";
import { useState } from "react";
import { FieldConfigPanel } from "./FieldConfigPanel";

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function fieldsToCSV(fields: any[]) {
  if (!fields.length) return "";
  const headers = Object.keys(fields[0]);
  const rows = fields.map((f) =>
    headers.map((h) => JSON.stringify(f[h] ?? "")).join(",")
  );
  return [headers.join(","), ...rows].join("\r\n");
}

export function BuilderCanvas() {
  const { fields, deleteField } = useFormStore();
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const handleSave = (format: "json" | "csv" | "txt") => {
    if (format === "json") {
      downloadFile(
        "form.json",
        JSON.stringify(fields, null, 2),
        "application/json"
      );
    } else if (format === "csv") {
      downloadFile("form.csv", fieldsToCSV(fields), "text/csv");
    } else if (format === "txt") {
      downloadFile(
        "form.txt",
        fields.map((f) => `${f.label} (${f.type})`).join("\n"),
        "text/plain"
      );
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 border p-4 space-y-4">
        <div className="flex gap-2 mb-1">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={() => handleSave("json")}
          >
            Save as JSON
          </button>
          <button
            className="px-3 py-1 bg-green-600 text-white rounded"
            onClick={() => handleSave("csv")}
          >
            Save as CSV
          </button>
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded"
            onClick={() => handleSave("txt")}
          >
            Save as TXT
          </button>
        </div>
        {fields.map((field) => (
          <div
            key={field.id}
            className={`p-2 border rounded bg-white cursor-pointer ${
              selectedFieldId === field.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedFieldId(field.id)}
          >
            <p>
              <strong>{field.label}</strong> ({field.type})
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteField(field.id);
                if (selectedFieldId === field.id) setSelectedFieldId(null);
              }}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="w-96">
        <FieldConfigPanel selectedFieldId={selectedFieldId} />
      </div>
    </div>
  );
}
