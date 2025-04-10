"use client";

interface TestimonialProps {
  id: number;
  text: string;
  author: string;
  since: string;
}

const TestimonialSection = ({
  testimonials,
}: {
  testimonials: TestimonialProps[];
}) => {
  return (
    <div className="bg-[#1a3a3a] rounded-lg p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-[#d1c5a5]">
        LO QUE DICEN NUESTROS CLIENTES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-[#e8e4d9] p-6 rounded-md">
            <p className="text-[#1a3a3a] italic mb-6">"{testimonial.text}"</p>
            <div className="text-[#1a3a3a]">
              <p className="font-semibold">- {testimonial.author}</p>
              <p className="text-sm">{testimonial.since}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
