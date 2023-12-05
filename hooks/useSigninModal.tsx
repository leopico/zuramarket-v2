import { create } from 'zustand';

interface SigninModal {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useSigninModal = create<SigninModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({isOpen: false})
}))

export default useSigninModal;