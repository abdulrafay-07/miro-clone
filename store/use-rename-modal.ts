import { create } from "zustand"

const defaultValues = {
    id: "",
    title: ""
};

interface IRenameModal {
    isOpen: boolean;
    initialValues: typeof defaultValues;
    onOpen: (id: string, title: string) => void;
    onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
    // set default isOpen value to false
    isOpen: false,
    // onOpen, get the id and title and call the set function which sets isOpen to true and sets the initial values to id and the title
    onOpen: (id, title) => set({
        isOpen: true,
        initialValues: {
            id,
            title
        }
    }),
    // onClose, set isOpen to false, and set initial values to default values (empty)
    onClose: () => set({
        isOpen: false,
        initialValues: defaultValues
    }),
    initialValues: defaultValues,
}))