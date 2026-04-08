import Dialog from "@/components/base/Dialog";

interface ApplyCouponsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyCouponsDialog: React.FC<ApplyCouponsDialogProps> = (props) => {
  const { isOpen, onClose } = props;
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Apply Coupon">
      hi
    </Dialog>
  );
};

export default ApplyCouponsDialog;
