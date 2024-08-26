"use client";
import { useState } from "react";
import SkillsModal from "./SkillsModal";

export default function SkillsCard({ title }) {
  const [badges, useBadges] = useState([]);
  return (
    <div className="bg-base-100 flex flex-col items-start justify-between px-6 w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between w-full py-3">
        <h1 className="text-2xl py-3">{title}</h1>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <SkillsModal placeholder={title} />
      </div>
      <div className="w-full card-actions justify-end pb-4">
        <div className="badge badge-secondary h-6">NEW</div>
        <div className="badge badge-outline h-6">Fashion</div>
        <div className="badge badge-outline h-6">Products</div>
      </div>
    </div>
  );
}
