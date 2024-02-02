"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imgName, setImgName] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setImgName(data.fileName);
      console.log("DATA: ", data);
      setUploading(false);
    } catch (e: any) {
      console.error(e);
      setUploading(false);
    }
  };
  return (
    <>
      <h1>Upload Form</h1>
      <form onSubmit={handleSubmit}>
        {imgName ? (
          <Image src={imgName} alt="Uploaded Image" width={200} height={200} />
        ) : null}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  );
};

export default UploadForm;
