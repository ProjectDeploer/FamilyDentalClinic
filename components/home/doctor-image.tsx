"use client";

import Image from "next/image";
import { useState } from "react";
import { clinic } from "@/config/clinic";

export function DoctorImage() {
  const [src, setSrc] = useState<string>(clinic.doctor.image);
  return (
    <Image
      src={src}
      alt={
        src === clinic.doctor.image
          ? `${clinic.doctor.name}, ${clinic.doctor.title}`
          : "Family Dental Clinic treatment room"
      }
      fill
      sizes="(max-width:1024px) 100vw, 50vw"
      className="object-cover"
      onError={() => setSrc("/images/hero/consultation.png")}
    />
  );
}
