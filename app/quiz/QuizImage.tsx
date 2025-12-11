"use client";
import Image from "next/image";

const QuizImage = ({ src }: { src?: string }) =>
  src ? (
    <div className="-mx-4">
      <Image
        src={src}
        alt=""
        width={800}
        height={500}
        className="w-full h-44 md:h-60 object-cover rounded-t-2xl"
      />
    </div>
  ) : null;

export default QuizImage;
