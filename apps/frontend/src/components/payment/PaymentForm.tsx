// components/payment/PaymentForm.tsx
"use client";

import React, { useState } from "react";

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
}

export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });

  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});
  const [cardType, setCardType] = useState<
    "visa" | "mastercard" | "amex" | "unknown"
  >("unknown");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when field is edited
    if (errors[name as keyof PaymentFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Detect card type based on first digit
    if (name === "cardNumber") {
      const firstDigit = value.charAt(0);
      const firstTwoDigits = Number(value.substring(0, 2));

      if (firstDigit === "4") {
        setCardType("visa");
      } else if (firstDigit === "5") {
        setCardType("mastercard");
      } else if (firstTwoDigits >= 34 && firstTwoDigits <= 37) {
        setCardType("amex");
      } else {
        setCardType("unknown");
      }
    }
  };

  // Format card number as the user types
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    // Remove all non-digit characters
    value = value.replace(/\D/g, "");

    // Format with spaces
    if (value.length > 0) {
      if (cardType === "amex") {
        // AMEX format: XXXX XXXXXX XXXXX
        value = value.substring(0, 15);
        if (value.length > 10) {
          value = `${value.substring(0, 4)} ${value.substring(4, 10)} ${value.substring(10)}`;
        } else if (value.length > 4) {
          value = `${value.substring(0, 4)} ${value.substring(4)}`;
        }
      } else {
        // Other cards: XXXX XXXX XXXX XXXX
        value = value.substring(0, 16);
        if (value.length > 12) {
          value = `${value.substring(0, 4)} ${value.substring(4, 8)} ${value.substring(8, 12)} ${value.substring(12)}`;
        } else if (value.length > 8) {
          value = `${value.substring(0, 4)} ${value.substring(4, 8)} ${value.substring(8)}`;
        } else if (value.length > 4) {
          value = `${value.substring(0, 4)} ${value.substring(4)}`;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      cardNumber: value,
    }));

    // Clear error when field is edited
    if (errors.cardNumber) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: undefined,
      }));
    }

    // Detect card type based on first digit
    const firstDigit = value.charAt(0);
    const firstTwoDigits = Number(value.substring(0, 2));

    if (firstDigit === "4") {
      setCardType("visa");
    } else if (firstDigit === "5") {
      setCardType("mastercard");
    } else if (firstTwoDigits >= 34 && firstTwoDigits <= 37) {
      setCardType("amex");
    } else {
      setCardType("unknown");
    }
  };

  // Format expiry date as MM / YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    // Remove non-digits
    value = value.replace(/\D/g, "");

    // Max 4 digits (MMYY)
    value = value.substring(0, 4);

    // Format as MM / YY
    if (value.length > 2) {
      value = `${value.substring(0, 2)} / ${value.substring(2)}`;
    }

    setFormData((prev) => ({
      ...prev,
      expiryDate: value,
    }));

    // Clear error when field is edited
    if (errors.expiryDate) {
      setErrors((prev) => ({
        ...prev,
        expiryDate: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "El nombre es obligatorio";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "El número de tarjeta es obligatorio";
    } else {
      // Check if valid card number (simplified validation)
      const digitsOnly = formData.cardNumber.replace(/\D/g, "");
      const isAmex = cardType === "amex";
      const expectedLength = isAmex ? 15 : 16;

      if (digitsOnly.length !== expectedLength) {
        newErrors.cardNumber = `El número debe tener ${expectedLength} dígitos`;
      }
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "La fecha de expiración es obligatoria";
    } else {
      // Basic expiry date validation (MM/YY)
      const digitsOnly = formData.expiryDate.replace(/\D/g, "");

      if (digitsOnly.length !== 4) {
        newErrors.expiryDate = "La fecha debe tener formato MM/YY";
      } else {
        const month = parseInt(digitsOnly.substring(0, 2), 10);
        if (month < 1 || month > 12) {
          newErrors.expiryDate = "Mes inválido";
        }

        // Check if card is not expired
        const year = parseInt(digitsOnly.substring(2, 4), 10);
        const currentYear = new Date().getFullYear() % 100; // Last 2 digits of year
        const currentMonth = new Date().getMonth() + 1; // 1-12

        if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          newErrors.expiryDate = "La tarjeta ha expirado";
        }
      }
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "El CVV es obligatorio";
    } else {
      // Amex CVV is 4 digits, others are 3
      const expectedLength = cardType === "amex" ? 4 : 3;
      if (formData.cvv.length !== expectedLength) {
        newErrors.cvv = `El CVV debe tener ${expectedLength} dígitos`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-6">Método de Pago</h2>

      {/* Card Type Selection */}
      <div className="flex space-x-3 mb-6">
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${cardType === "visa" ? "bg-[#254040] text-white" : "bg-[#f8f8f8] text-[#1a3a3a]"}`}
          onClick={() => setCardType("visa")}
        >
          VISA
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${cardType === "mastercard" ? "bg-[#254040] text-white" : "bg-[#f8f8f8] text-[#1a3a3a]"}`}
          onClick={() => setCardType("mastercard")}
        >
          MasterCard
        </div>
        <div
          className={`px-4 py-2 rounded-md cursor-pointer ${cardType === "amex" ? "bg-[#254040] text-white" : "bg-[#f8f8f8] text-[#1a3a3a]"}`}
          onClick={() => setCardType("amex")}
        >
          American Express
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cardholder Name */}
        <div>
          <label
            htmlFor="cardholderName"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Nombre en la tarjeta:
          </label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d1c5a5] outline-none
              ${errors.cardholderName ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="Juan Pérez López"
          />
          {errors.cardholderName && (
            <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-[#254040] mb-1"
          >
            Número de tarjeta:
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d1c5a5] outline-none
              ${errors.cardNumber ? "border-red-500" : "border-[#1a3a3a]/30"}`}
            placeholder="•••• •••• •••• ••••"
          />
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-4">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-[#254040] mb-1"
            >
              Fecha de expiración:
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleExpiryChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d1c5a5] outline-none
                ${errors.expiryDate ? "border-red-500" : "border-[#1a3a3a]/30"}`}
              placeholder="MM / YY"
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>

          <div className="col-span-3 relative">
            <div className="flex items-center">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-[#254040] mb-1 mr-2"
              >
                CVV:
              </label>
              <div className="group relative">
                <button
                  type="button"
                  className="w-5 h-5 rounded-full bg-[#254040] text-white flex items-center justify-center text-xs mb-1"
                >
                  ?
                </button>
                <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-white text-xs text-[#1a3a3a] shadow-lg rounded border border-[#d1c5a5] bottom-full left-1/2 transform -translate-x-1/2 mb-1">
                  El código de seguridad de 3 dígitos en el reverso de la
                  tarjeta (4 dígitos para American Express, al frente)
                </div>
              </div>
            </div>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength={cardType === "amex" ? 4 : 3}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d1c5a5] outline-none
                ${errors.cvv ? "border-red-500" : "border-[#1a3a3a]/30"}`}
              placeholder={cardType === "amex" ? "1234" : "123"}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Save Card */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="saveCard"
            name="saveCard"
            checked={formData.saveCard}
            onChange={handleChange}
            className="w-4 h-4 text-[#254040] focus:ring-[#d1c5a5] border-[#1a3a3a]/30 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 text-sm text-[#254040]">
            Guardar esta tarjeta para compras futuras
          </label>
        </div>

        {/* Security Message */}
        <p className="text-sm text-gray-500 italic mt-2">
          Todos los pagos están encriptados y protegidos contra maldiciones
          digitales.
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;
