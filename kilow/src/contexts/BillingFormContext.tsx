import { createContext, ReactNode, useState } from 'react';

interface BillingContextProps {
  referenceMonth: string;
  setReferenceMonth: (month: string) => void;
  referenceYear: string;
  setReferenceYear: (year: string) => void;
  billingNickname: string;
  setBillingNickname: (nickname: string) => void;
  billingAmount: number | undefined;
  setBillingAmount: (amount: number | undefined) => void;
  billingKwh: number | undefined;
  setBillingKwh: (kwh: number | undefined) => void;
}

export const BillingFormContext = createContext<BillingContextProps>(
  {} as BillingContextProps,
);

export const BillingFormProvider = ({ children }: { children: ReactNode }) => {
  const [referenceMonth, setReferenceMonth] = useState('');
  const [referenceYear, setReferenceYear] = useState('');
  const [billingNickname, setBillingNickname] = useState('');
  const [billingAmount, setBillingAmount] = useState<number | undefined>(
    undefined,
  );
  const [billingKwh, setBillingKwh] = useState<number | undefined>(undefined);

  return (
    <BillingFormContext.Provider
      value={{
        referenceMonth,
        setReferenceMonth,
        referenceYear,
        setReferenceYear,
        billingAmount,
        setBillingAmount,
        billingNickname,
        setBillingNickname,
        billingKwh,
        setBillingKwh,
      }}
    >
      {children}
    </BillingFormContext.Provider>
  );
};
