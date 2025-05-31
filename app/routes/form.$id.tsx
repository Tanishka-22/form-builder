import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const fields = [
    {
      id: "1",
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      id: "2",
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
  ];
  return json(fields);
}

export default function FormFiller() {
  const fields = useLoaderData<typeof loader>();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Fill the Form</h1>
      <form className="space-y-4">
        {fields.map((f: any) => (
          <div key={f.id}>
            <label className="block">{f.label}</label>
            <input
              className="w-full p-2 border"
              placeholder={f.placeholder}
              required={f.required}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
