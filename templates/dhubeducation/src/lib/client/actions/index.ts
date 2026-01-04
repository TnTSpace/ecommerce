import type { iResult } from "@toolsntuts/utils";
import { capitalize } from "lodash";
import { toast } from "svelte-sonner";


// Loosely define a file type that may be a string or iFile
type FileOrId = { xata_id: string } | string | undefined;

interface HasMaybeFileAndContent {
  file?: FileOrId;
  content?: any;
}

interface SubmitFormOptions<T extends HasMaybeFileAndContent> {
  resource: 'campaigns' | 'services' | 'partners' | 'courses' | 'blogs';
  data: Partial<T>;
  entity?: { xata_id: string };
}

export const submitForm = async <T extends HasMaybeFileAndContent>(
  evt: SubmitEvent,
  { resource, data, entity }: SubmitFormOptions<T>
) => {
  const form = evt.target as HTMLFormElement;
  const formData = new FormData(form);
  const entries = Object.fromEntries(formData.entries());

  // Handle the possibility that `file` may be a string or an object
  const fileValue = typeof data.file === 'object' && data.file !== null
    ? data.file.xata_id
    : data.file;

  const payload = {
    ...entries,
    ...data,
    file: fileValue, // Safely assign correct value
  };

  const isUpdating = Boolean(entity?.xata_id);
  const url = isUpdating ? `/api/${resource}/${entity!.xata_id}` : `/api/${resource}`;
  const method = isUpdating ? 'PATCH' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { message, status } = (await response.json()) as iResult;

    const action = isUpdating ? 'updating' : 'creating';
    const capitalized = capitalize(resource)

    if (status === 'error') {
      toast.error(message, {
        description: `Error ${action} ${resource.slice(0, -1)}`,
      });
    } else {
      toast.success(message, {
        description: `${capitalized} ${isUpdating ? 'updated' : 'created'} successfully`,
      });
      location.reload();
    }
  } catch (error: any) {
    toast.error(error.message, {
      description: `Error ${isUpdating ? 'updating' : 'creating'} ${resource.slice(0, -1)}`,
    });
  }
};
