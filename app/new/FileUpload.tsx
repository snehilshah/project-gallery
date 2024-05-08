import { upload } from '@/lib/cloudinaryUpload';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Plus, UploadCloudIcon, X } from 'lucide-react';
import { useState } from 'react';

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    console.log('Selected Files', selectedFiles);
    if (selectedFiles) {
      const newFiles: File[] = Array.from(selectedFiles);

      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const MAX_SIZE_IN_BYTES = 2 * 1024 * 1024; // 2mb
        if (file.size > MAX_SIZE_IN_BYTES) {
          alert('File size exceeds 2mb');
          return;
        }
      }

      // append new files to the existing files
      setFiles([...files, ...newFiles]);

      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setFileUrls([...fileUrls, ...newUrls]);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    console.log('Dropped');
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const newFiles: File[] = Array.from(droppedFiles);

      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const MAX_SIZE_IN_BYTES = 2 * 1024 * 1024; // 2mb
        if (file.size > MAX_SIZE_IN_BYTES) {
          alert('File size exceeds 2mb');
          return;
        }
      }

      // append new files to the existing files
      setFiles([...files, ...newFiles]);

      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setFileUrls([...fileUrls, ...newUrls]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    console.log('Dragging');
    event.preventDefault();
  };

  const deleteFile = (index: number) => {
    console.log('Deleting', index);
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    const updateUrls = [...fileUrls];
    updateUrls.splice(index, 1);

    setFiles(updatedFiles);
    setFileUrls(updateUrls);
  };

  const CreatePost = async () => {
    console.log('Creating Post');
    const formData = new FormData();

    const resultArray = [];

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      const fileType = files[i].type;
      console.log('Form Data', formData);
      try {
        const result = await upload({ formData, fileType });
        resultArray.push({ url: result, fileType: fileType });
      } catch (err) {
        console.log('Error Uploading', err);
      }
    }
  };
  return (
    <div className="mx-auto flex w-full flex-col items-center">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative mx-auto h-[400px] max-h-[600px] min-h-[400px] w-[900px] rounded-xl outline-dotted outline-black hover:outline"
      >
        {fileUrls.length > 0 ? (
          <Carousel className="h-full w-full">
            <CarouselContent>
              {fileUrls.map((url, index) => (
                <CarouselItem
                  key={index}
                  className="relative h-[400px] w-[900px]"
                >
                  <img
                    src={url}
                    alt={files[index].name}
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <Button
                    type="button" // shadcn button submits form by default, so we need to specify type as button
                    onClick={() => deleteFile(index)}
                    className="absolute right-1 top-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-700 p-3"
                  >
                    <X className="m-3 min-h-6 min-w-6" />
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <label
              style={{ zIndex: '1000' }}
              htmlFor="image"
              className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-dotted border-black bg-gray-100"
            >
              <Plus className="h-6 w-6" />
              <input
                multiple
                onChange={handleFileChange}
                type="file"
                name="image"
                id="image"
                className="hidden"
              />
            </label>
            <CarouselPrevious className="left-0 z-50" />
            <CarouselNext className="right-0 z-50" />
          </Carousel>
        ) : (
          // Keep the htmlFor and id the same for the input and label to make the input work even if the input is hidden
          // See: https://stackoverflow.com/questions/43589955/input-type-file-not-working-if-hidden
          <label
            htmlFor="image"
            className="absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer flex-col items-center justify-center"
          >
            <UploadCloudIcon className="text-3xl opacity-70" />
            <span className="block">Click or Drag your Files</span>
            <span className="block">
              Maximum File Size <u>2MB</u>
            </span>
            <input
              multiple
              onChange={handleFileChange}
              type="file"
              name="image"
              id="image"
              className="hidden"
            />
          </label>
        )}
      </div>
      <Button className="mx-auto my-2 w-60" onClick={CreatePost}>
        Upload
      </Button>
    </div>
  );
}
