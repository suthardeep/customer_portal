import { useLoginDialogStore } from '../stores/loginDialogStore';

export const useLoginDialog = () => {
  const open = useLoginDialogStore((state) => state.open);
  const close = useLoginDialogStore((state) => state.close);
  const isOpen = useLoginDialogStore((state) => state.isOpen);

  return { open, close, isOpen };
};
