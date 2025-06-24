"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

type UploadResponse = {
  data: {
    url: string;
  };
};

type UploadParams = {
  file: File;
  folder?: string;
};

const uploadFile = async (file: File, folder = "__file") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await axiosInstance.post<UploadResponse>(
    "file/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.status === 201) {
    toast.success("Upload success");
    return response.data.data.url;
  }

  throw new Error("Upload failed");
};

export const useFile = () => {
  const upload = useMutation<string, Error, UploadParams>({
    mutationFn: ({ file, folder = "__file" }) => uploadFile(file, folder),
  });

  return { upload };
};
