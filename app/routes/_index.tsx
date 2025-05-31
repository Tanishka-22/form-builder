
import type { MetaFunction } from "@remix-run/node";
import { useFormStore } from "~/store/useFormStore";
import { FieldPalette } from "~/components/FieldPalette";
import { BuilderCanvas } from "~/components/BuilderCanvas";

export const meta: MetaFunction = () => {
  return [
    { title: "Form-Builder" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { addField } = useFormStore();

  return (
    <div className="grid grid-cols-4 h-screen">
      <div className="col-span-1 border-r">
        <FieldPalette onAdd={addField} />
      </div>
      <div className="col-span-3 p-6">
        <h1 className="text-3xl font-bold mb-4">Form Builder</h1>
        <BuilderCanvas />
      </div>
    </div>
  );
}
