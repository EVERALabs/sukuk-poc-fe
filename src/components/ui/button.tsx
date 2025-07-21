import { cn } from "@/utils/style";
import React from "react";

type TPrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    textClassName?: string;
    disabled?: boolean;
    isLoading?: boolean;
    loadingMessage?: string;
};

export const PrimaryButton = React.forwardRef<
    HTMLButtonElement,
    TPrimaryButtonProps
>(function PrimaryButton(
    {
        className,
        children,
        disabled = false,
        isLoading = false,
        loadingMessage = "Please Wait",
        textClassName,
        ...props
    },
    ref
) {
    return (
        <button
            className={`${cn(
                "px-4 py-2 rounded-full cursor-pointer font-onestSemibold uppercase w-fit h-fit outline-0 relative",
                className
            )} ${disabled
                ? "bg-gradient-to-r from-muted-gradient-start to-muted-gradient-end cursor-not-allowed"
                : "bg-gradient-to-r from-gradient-blue-end via-gradient-blue-start to-gradient-blue-end bg-size-[200%_200%] bg-position-[100%_100%] hover:bg-position-[0%_0%] duration-500 transition-all"
                }`}
            ref={ref}
            disabled={disabled}
            {...props}
        >
            {isLoading ? (
                <p className="text-white">{loadingMessage}</p>
            ) : (
                <span
                    className={cn(
                        "flex items-center gap-[10px]",
                        disabled ? "text-muted" : "text-white",
                        textClassName
                    )}
                >
                    {children}
                </span>
            )}
        </button>
    );
});

export const SecondaryButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(function SecondaryButton({ className, children, ...props }, ref) {
    return (
        <button
            className={cn(
                "bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all px-3 py-1 rounded-full w-fit h-fit outline-0 cursor-pointer",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
});

export const GhostButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(function GhostButton({ className, children, ...props }, ref) {
    return (
        <button
            className={cn("outline-0 cursor-pointer", className)}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
});

export const OutlineButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(function OutlineButton({ className, children, ...props }, ref) {
    return (
        <button
            className={cn(
                "border border-blue-800 outline-0 ring-0 hover:bg-blue-800 hover:text-background flex items-center justify-center gap-2 transition-all rounded-lg cursor-pointer",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
});
