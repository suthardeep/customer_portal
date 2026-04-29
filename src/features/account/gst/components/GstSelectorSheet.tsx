import Sheet from "@/components/base/sheet/Sheet";
import { Button } from "@/components/base/button/Button";
import FallbackView from "@/components/empty-states/FallbackView";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import { useToggle } from "@/hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { gstQueries } from "../gstQueries";
import type { GstProfile } from "../types/types";
import AddGstDialog from "./AddGstDialog";
import DeleteGstDialog from "./DeleteGstDialog";
import EditGstDialog from "./EditGstDialog";
import GstListItem from "./GstListItem";
import GstListSkeleton from "./skeletons/GstListSkeleton";

interface GstSelectorSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const GstSelectorSheet = ({ isOpen, onClose }: GstSelectorSheetProps) => {
  const addDialog = useToggle();
  const editDialog = useToggle();
  const deleteDialog = useToggle();
  const [selectedProfile, setSelectedProfile] = useState<GstProfile | null>(
    null,
  );

  const { savedGstDetails, setGstDetailsId } = useCheckoutStore();

  const { data: profiles, isLoading } = useQuery({
    ...gstQueries.list(),
    enabled: isOpen,
  });

  const handleSelect = (profile: GstProfile) => {
    setGstDetailsId(profile.id, profile);
    onClose();
  };

  const handleEdit = (profile: GstProfile) => {
    setSelectedProfile(profile);
    editDialog.open();
  };

  const handleDelete = (profile: GstProfile) => {
    setSelectedProfile(profile);
    deleteDialog.open();
  };

  return (
    <>
      <Sheet isOpen={isOpen} onClose={onClose} title="GST Profiles" size="md">
        <div>
          {isLoading ? (
            <GstListSkeleton />
          ) : profiles && profiles.length > 0 ? (
            <div className="flex flex-col gap-3">
              {profiles.map((profile) => (
                <GstListItem
                  key={profile.id}
                  profile={profile}
                  isSelected={savedGstDetails?.id === profile.id}
                  onSelect={handleSelect}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              <Button
                variant="outline"
                color="neutral"
                startIcon="Add"
                fullWidth
                onClick={addDialog.open}
              >
                Add GST Profile
              </Button>
            </div>
          ) : (
            <FallbackView
              title="No GST profiles yet"
              subtitle="Add your business GST details for tax invoices"
              icon="Invoice"
              footer={
                <Button
                  variant="filled"
                  color="primary"
                  startIcon="Add"
                  onClick={addDialog.open}
                  className="mt-2"
                >
                  Add GST Profile
                </Button>
              }
            />
          )}
        </div>
      </Sheet>

      <AddGstDialog isOpen={addDialog.isOpen} onClose={addDialog.close} />
      <EditGstDialog
        gstProfile={selectedProfile}
        isOpen={editDialog.isOpen}
        onClose={editDialog.close}
      />
      <DeleteGstDialog
        gstProfile={selectedProfile}
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.close}
      />
    </>
  );
};

export default GstSelectorSheet;
