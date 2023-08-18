'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import Image from "next/image";
import addImage from "@/public/icons/add-image.png";

declare global {
  var cloudinary: any
}

const uploadPreset = "epbhod94";

interface ImageUploadProps {
  id? : any;
  onChange: (value: string) => void;
  value?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  onChange,
  value
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            id={id}
            onClick={() => open?.()}
            style={{
                position: 'relative',
                cursor: 'pointer',
                opacity: '1',
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms',
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: '#D1D5DB',
                padding: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                color: '#6B7280'
              }}              
          >
            <Image src={addImage} alt="add-image" height={25} width={25} />
            <div>
              Cliquer pour télécharger une image
            </div>
            {value && (
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '100%'
              }}>
                <Image
                  fill 
                  style={{ objectFit: 'cover' }} 
                  src={value} 
                  alt="value-image" 
                />
              </div>
            )}
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
