import { LoaderCircle } from "lucide-react";

/**
 * Reusable button with built-in loading state.
 *
 * @param {"primary" | "ghost"} variant
 *   "primary" → uses `add-btn add-btn-fill` classes (violet filled)
 *   "ghost"   → uses `card-btn` classes (violet outlined)
 */
const Button = ({
    children,
    variant = "primary",
    loading = false,
    disabled = false,
    onClick,
    type = "button",
    className = "",
}) => {
    const baseClass =
        variant === "ghost"
            ? `card-btn ${loading ? "opacity-50 cursor-not-allowed" : ""}`
            : `add-btn add-btn-fill ${loading ? "opacity-50 cursor-not-allowed" : ""}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClass} ${className}`.trim()}
        >
            {loading ? (
                <>
                    <LoaderCircle size={16} className="w-4 h-4 animate-spin" />
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
