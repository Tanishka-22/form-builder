import type { FieldType } from "~/store/useFormStore";

const fieldTypes: FieldType[] = ['text', 'textarea', 'dropdown', 'checkbox', 'date'];

export function FieldPalette({ onAdd }: { onAdd: (type: FieldType) => void }) {
  return (
    <div className="py-4 px-4 space-y-2 bg-gray-100">
      <h2 className="text-lg font-semibold">Add Fields</h2>
      {fieldTypes.map((type) => (
        <button
          key={type}
          onClick={() => onAdd(type)}
          className="w-full px-3 py-2 bg-white rounded shadow hover:bg-gray-50"
        >
          {type}
        </button>
      ))}
    </div>
  );
}
