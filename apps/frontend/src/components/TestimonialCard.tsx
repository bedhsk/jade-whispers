"use client";

interface TestimonialCardProps {
  text: string;
  author: string;
  since: string;
}

const TestimonialCard = ({ text, author, since }: TestimonialCardProps) => {
  return (
    <div className="bg-[#e8e4d9] p-6 rounded-md shadow-sm">
      <p className="text-[#1a3a3a] italic mb-6 text-lg">"{text}"</p>
      <div className="text-[#1a3a3a]">
        <p className="font-semibold text-lg">- {author}</p>
        <p className="text-sm text-[#1a3a3a]/80">{since}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
