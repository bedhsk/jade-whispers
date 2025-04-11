// components/ProgressBar.tsx
"use client";

import React from "react";
import Link from "next/link";

interface ProgressStep {
  name: string;
  number: number;
  path: string;
  active: boolean;
  completed: boolean;
}

interface ProgressBarProps {
  currentStep: "carrito" | "envio" | "pago" | "confirmacion";
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps: ProgressStep[] = [
    {
      name: "Carrito",
      number: 1,
      path: "/carrito",
      active: currentStep === "carrito",
      completed: ["envio", "pago", "confirmacion"].includes(currentStep),
    },
    {
      name: "Envío",
      number: 2,
      path: "/envio",
      active: currentStep === "envio",
      completed: ["pago", "confirmacion"].includes(currentStep),
    },
    {
      name: "Pago",
      number: 3,
      path: "/pago",
      active: currentStep === "pago",
      completed: ["confirmacion"].includes(currentStep),
    },
    {
      name: "Confirmación",
      number: 4,
      path: "/confirmacion",
      active: currentStep === "confirmacion",
      completed: false,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <Link href={step.completed || step.active ? step.path : "#"}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full 
                    ${step.completed ? "bg-[#1a3a3a] text-white" : ""}
                    ${step.active ? "bg-[#254040] text-white ring-2 ring-[#d98c53]" : ""}
                    ${!step.active && !step.completed ? "bg-[#f8f8f8] text-[#1a3a3a] border border-[#1a3a3a]" : ""}
                    cursor-${step.completed || step.active ? "pointer" : "default"}`}
                >
                  {step.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
              </Link>
              <span
                className={`mt-2 text-sm font-medium ${step.active ? "text-[#254040] font-bold" : "text-[#1a3a3a]"}`}
              >
                {step.name}
              </span>
            </div>

            {/* Connector Line (except after last step) */}
            {index < steps.length - 1 && (
              <div
                className={`w-full h-0.5 flex-1 ${
                  index < steps.indexOf(steps.find((s) => s.active) || steps[0])
                    ? "bg-[#1a3a3a]"
                    : "bg-[#e8e4d9]"
                }`}
                style={{ margin: "0 4px", transform: "translateY(-8px)" }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
