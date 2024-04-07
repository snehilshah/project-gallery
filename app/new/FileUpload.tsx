import { upload } from '@/lib/cloudinaryUpload'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Plus, UploadCloudIcon, X } from 'lucide-react'
import { useState } from 'react'
export default function FileUpload() {
	const [files, setFiles] = useState<File[]>([])
	const [fileUrls, setFileUrls] = useState<string[]>([])

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files

		if (selectedFiles) {
			const newFiles: File[] = Array.from(selectedFiles)

			for (let i = 0; i < newFiles.length; i++) {
				const file = newFiles[i]
				const MAX_SIZE_IN_BYTES = 2 * 1024 * 1024 // 2mb
				if (file.size > MAX_SIZE_IN_BYTES) {
					alert('File size exceeds 2mb')
					return
				}
			}

			// append new files to the existing files
			setFiles([...files, ...newFiles])

			const newUrls = newFiles.map((file) => URL.createObjectURL(file))
			setFileUrls([...fileUrls, ...newUrls])
		}
	}

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault()
		const droppedFiles = event.dataTransfer.files

		if (droppedFiles.length > 0) {
			const newFiles: File[] = Array.from(droppedFiles)

			for (let i = 0; i < newFiles.length; i++) {
				const file = newFiles[i]
				const MAX_SIZE_IN_BYTES = 2 * 1024 * 1024 // 2mb
				if (file.size > MAX_SIZE_IN_BYTES) {
					alert('File size exceeds 2mb')
					return
				}
			}

			// append new files to the existing files
			setFiles([...files, ...newFiles])

			const newUrls = newFiles.map((file) => URL.createObjectURL(file))
			setFileUrls([...fileUrls, ...newUrls])
		}
	}

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault()
	}

	const deleteFile = (index: number) => {
		const updatedFiles = [...files]
		updatedFiles.splice(index, 1)

		const updateUrls = [...fileUrls]
		updateUrls.splice(index, 1)

		setFiles(updatedFiles)
		setFileUrls(updateUrls)
	}

	const CreatePost = async () => {
		const formData = new FormData()

		const resultArray = []

		for (let i = 0; i < files.length; i++) {
			formData.append('file', files[i])
			const fileType = files[i].type
			console.log('Form Data', formData)
			try {
				const result = await upload({ formData, fileType })
				resultArray.push({ url: result, fileType: fileType })
			} catch (err) {
				console.log('Error Uploading', err)
			}
		}
	}
	return (
		<div className="flex flex-col items-center bg-fuchsia-400 w-[60%] rounded-3xl mx-auto">
			<div
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className="w-full mx-auto min-h-[400px] max-h-[600px] rounded-md relative"
			>
				{fileUrls.length > 0 ? (
					<Carousel className="w-[900px] h-[400px]">
						<CarouselContent className="-ml-3">
							{fileUrls.map((url, index) => (
								<div key={index} className="relative w-full h-[400px] mx-auto">
									<CarouselItem className="relative w-[600px] h-full md:basis-1/2 lg:basis-1/3">
										<img
											src={url}
											alt={files[index].name}
											className="w-[600px] h-[400px] object-cover rounded-3xl"
										/>
										<Button
											onClick={() => deleteFile(index)}
											className="absolute top-1 right-1 w-8 h-8 rounded-full bg-gray-700 cursor-pointer flex items-center justify-center p-3"
										>
											<X className="min-w-6 min-h-6 m-3" />
										</Button>
									</CarouselItem>
								</div>
							))}
						</CarouselContent>
						<label
							style={{ zIndex: '1000' }}
							htmlFor="image"
							className="absolute bottom-1 right-1 w-10 h-10 rounded-full border-dotted border-[1px] border-black bg-gray-100 cursor-pointer flex items-center justify-center"
						>
							<Plus className="w-6 h-6" />
							<input
								multiple
								onChange={handleFileChange}
								type="file"
								name="image"
								id="image"
								className="hidden"
							/>
						</label>
						<CarouselPrevious className="left-0" />
						<CarouselNext className="right-0" />
					</Carousel>
				) : (
					// Keep the htmlFor and id the same for the input and label to make the input work even if the input is hidden
					// See: https://stackoverflow.com/questions/43589955/input-type-file-not-working-if-hidden
					<label
						htmlFor="image"
						className="absolute top-0 left-0 bottom-0 right-0 cursor-pointer flex items-center justify-center flex-col"
					>
						<UploadCloudIcon className="text-3xl opacity-70" />
						<span className="block">Click or Drag your Files</span>
						<span className="block">Maximum File Size <u>2MB</u></span>
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
			<Button className="my-2 w-60 mx-auto" onClick={CreatePost}>
				Submit
			</Button>
		</div>
	)
}
