import { create } from "zustand";
import { nanoid } from "nanoid";

export type FieldType = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'date';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options?: string[];
}

type FormState = {
  fields: Field[];
  steps: string[][]; // Each step is an array of field IDs
  addField: (type: FieldType) => void;
  updateField: (id: string, field: Partial<Field>) => void;
  deleteField: (id: string) => void;
  reorderFields: (newOrder: Field[]) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
};

export const useFormStore = create<FormState>((set) => ({
  fields: [],
  steps: [[]], // Start with one empty step by default
  addField: (type) =>
    set((state) => {
      const newField: Field = {
        id: nanoid(),
        type,
        label: 'Untitled',
        required: false,
      };
      // Add new field to the last step by default
      const steps = [...state.steps];
      if (steps.length === 0) steps.push([]);
      steps[steps.length - 1] = [...steps[steps.length - 1], newField.id];
      return {
        fields: [...state.fields, newField],
        steps,
      };
    }),
  updateField: (id, updated) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    })),
  deleteField: (id) =>
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
      steps: state.steps.map((step) => step.filter((fid) => fid !== id)),
    })),
  reorderFields: (newOrder) => set(() => ({ fields: newOrder })),
  addStep: () =>
    set((state) => ({
      steps: [...state.steps, []],
    })),
  removeStep: (index) =>
    set((state) => {
      const removedFieldIds = state.steps[index];
      const steps = state.steps.filter((_, i) => i !== index);
      const fields = state.fields.filter((f) => !removedFieldIds.includes(f.id));
      return { steps, fields };
    }),
}));