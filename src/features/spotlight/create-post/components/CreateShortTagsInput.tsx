import { useFormContext, useWatch } from "react-hook-form";
import { Icon } from "@/components/base/icon";
import { Input } from "@/components/base/input/Input";
import type { DetailsFormValues } from "../detailsSchema";
import { MAX_TAGS } from "../constants";

const CreateShortTagsInput = () => {
  const { register, setValue, getValues } =
    useFormContext<DetailsFormValues>();
  const tags = useWatch<DetailsFormValues, "tags">({ name: "tags" });

  const handleAddTag = () => {
    const trimmed = getValues("tagInput").trim();
    if (!trimmed || tags.length >= MAX_TAGS || tags.includes(trimmed)) return;
    setValue("tags", [...tags, trimmed]);
    setValue("tagInput", "");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  };

  return (
    <div>
      <Input
        label="Tags"
        placeholder="Add a tag and press Enter"
        {...register("tagInput")}
        onKeyDown={handleTagKeyDown}
        fullWidth
        disabled={tags.length >= MAX_TAGS}
        leftElement={<Icon name="Add" size="sm" className="text-n-500" />}
      />
      {tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-p-50 px-3 py-1 text-sm text-p-700"
            >
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                <Icon
                  name="X"
                  size="xs"
                  className="text-p-500 hover:text-p-700"
                />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateShortTagsInput;
