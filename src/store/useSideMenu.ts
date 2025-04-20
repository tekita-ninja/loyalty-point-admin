import { create } from 'zustand'
type TSideMenu = {
  isOpen: boolean
  isHidden:boolean
  setIsOpen: () => void
  setIsHidden: () => void
}

const useSideMenu = create<TSideMenu>()((set) => ({
  isOpen: true,
  isHidden: true,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsHidden: () => set((state) => ({ isHidden: !state.isHidden })),
}))

export default useSideMenu