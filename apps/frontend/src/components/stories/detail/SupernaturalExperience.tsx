"use client";

interface SupernaturalExperienceProps {
  experience: string;
}

const SupernaturalExperience = ({
  experience,
}: SupernaturalExperienceProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-[#e8e4d9] p-6 rounded-lg">
        <h3 className="text-[#1a3a3a] font-bold mb-3">
          Mi experiencia sobrenatural:
        </h3>
        <blockquote className="text-[#1a3a3a] italic text-lg">
          "{experience}"
        </blockquote>
      </div>
    </div>
  );
};

export default SupernaturalExperience;
