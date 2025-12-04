'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ems_avatars'); // Provided by user

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dhyefkdwz/image/upload`, // Provided by user
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                onChange([...value, data.secure_url]);
            } else {
                console.error('Upload failed:', data);
                alert('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Something went wrong.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-gray-200"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors border border-gray-300 border-dashed">
                    {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                    <span className="font-medium">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                        type="file"
                        disabled={isUploading}
                        onChange={onUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </label>
                <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, WEBP
                </p>
            </div>
        </div>
    );
}
