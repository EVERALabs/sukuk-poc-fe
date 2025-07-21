import * as React from "react";

import { GhostButton } from "./button";
import { toCurrency } from "@/utils/string";
import { cn } from "@/utils/style";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

type TPrimaryInputProps = {
    label?: string;
    selector?: React.ReactNode;
    balance?: string | number;
    smallBalance?: string;
    handleMax?: () => void;
    isShowBallance?: boolean;
    isError?: boolean;
    wrapperClassName?: string;
    isShowSmallBalance?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const PrimaryInput = ({
    label,
    selector,
    balance,
    smallBalance,
    handleMax,
    isError = false,
    isShowBallance = true,
    isShowSmallBalance = true,
    wrapperClassName,
    value,
    onChange,
    ...props
}: TPrimaryInputProps) => {
    const [rawValue, setRawValue] = useState(value?.toString() || "");
    const [displayValue, setDisplayValue] = useState("");

    // Custom formatter: adds commas, preserves up to 5 decimals, keeps trailing zeros
    function formatNumberWithCommas(val: string) {
        if (!val) return "";
        const [intPart, decPart] = val.split(".");
        const intWithCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (decPart !== undefined) {
            // Only take up to 5 decimals, pad with zeros if needed
            const trimmed = decPart.slice(0, 5);
            return `${intWithCommas}.${trimmed}`;
        }
        return intWithCommas;
    }

    useEffect(() => {
        const valStr = value?.toString() || "";
        setRawValue(valStr);
        setDisplayValue(formatNumberWithCommas(valStr));
    }, [value]);

    const debouncedFormat = useMemo(
        () =>
            debounce((val: string) => {
                setDisplayValue(formatNumberWithCommas(val));
            }, 300),
        []
    );

    useEffect(() => {
        return () => {
            debouncedFormat.cancel();
        };
    }, [debouncedFormat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/,/g, ""); // Remove commas for processing
        // Allow only numbers and one dot
        input = input.replace(/[^0-9.]/g, "");
        const parts = input.split(".");
        let normalized = parts[0];
        if (parts.length > 1) {
            // Only one dot allowed, and up to 5 decimals
            normalized += "." + parts[1].slice(0, 5);
        }
        setRawValue(normalized);
        setDisplayValue(normalized);
        debouncedFormat(normalized);
        onChange?.({
            ...e,
            target: { ...e.target, value: normalized },
        });
    };

    const handleBlur = () => {
        setDisplayValue(formatNumberWithCommas(rawValue));
    };

    const handleFocus = () => {
        setDisplayValue(rawValue);
    };

    return (
        <div
            className={cn(
                `rounded-lg py-3 px-4 flex flex-col gap-[10px] border bg-white hover:border-green-500 transition-all ${isError ? "border-danger" : "border-text-100"
                }`,
                wrapperClassName
            )}
        >
            <label className="text-green-700 text-xs">{label}</label>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                    <div>{selector}</div>
                    <input
                        className={cn(
                            "h-9 text-right w-full text-4xl bg-white placeholder:text-text-300 outline-0 ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                            isError ? "text-danger" : "text-green-950"
                        )}
                        style={{
                            fontSize: `${Math.max(1, 2.5 - displayValue.length * 0.1)}rem`,
                            height: "2.5rem"
                        }}
                        value={displayValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        inputMode="decimal"
                        {...props}
                    />
                </div>

                <div className="flex items-center justify-between">
                    {isShowBallance && (
                        <div className="flex items-center gap-1">
                            <p
                                className={cn(
                                    "text-xs transition-all",
                                    isError ? "text-danger" : "text-text-300"
                                )}
                            >
                                Balance: {balance}
                            </p>
                            <GhostButton
                                onClick={handleMax}
                                className="bg-clip-text text-transparent !font-onestSemibold uppercase text-[10px] text-text-200"
                            >
                                MAX
                            </GhostButton>
                        </div>
                    )}
                    {isShowSmallBalance && smallBalance && (
                        <p className="text-text-400 text-xs ml-auto">
                            ${!isNaN(parseFloat(smallBalance)) ? toCurrency(smallBalance) : "0"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};


type TInputProps = {
    label?: string;
    subLabel?: string;
    rightContent?: React.ReactNode;
    isError?: boolean;
    errorMessage?: string;
    className?: string;
} & React.ComponentProps<"input">;

export const Input = ({
    label,
    subLabel,
    rightContent,
    isError,
    className,
    errorMessage,
    ...props
}: TInputProps) => {
    const [inputValue, setInputValue] = React.useState("");
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };
    return (
        <div className="space-y-1 relative">
            <label className="flex font-onestMedium text-sm items-center">{label} <span className="ml-2 font-onestRegular text-xs text-text-300">{subLabel}</span></label>
            <div className="absolute right-2 top-8 text-sm text-text-400">
                {rightContent}
            </div>
            <input
                value={inputValue}
                onChange={handleInputValue}
                className={cn(
                    "px-2 border border-text-100 rounded-lg h-[44px] w-full bg-background placeholder:text-text-300 outline-0 ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
            {isError && (
                <p
                    className={`text-xs transition-all ${isError ? "text-danger" : "text-text-300"
                        }`}
                >
                    {errorMessage}
                </p>
            )}
        </div>
    );
};
