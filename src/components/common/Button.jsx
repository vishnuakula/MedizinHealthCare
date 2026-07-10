import { cn } from '@/utils/cn';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none';

    const sizeMap = {
        sm: 'px-4 py-2 text-sm gap-1.5',
        md: 'px-5 py-2.5 text-sm gap-2',
        lg: 'px-7 py-3.5 text-base gap-2',
    };

    const variantMap = {
        primary: 'text-white shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[.97]',
        secondary: 'text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[.97]',
        outline: 'bg-transparent border-2 border-[#0A4CB5] text-[#0A4CB5] hover:bg-[#0A4CB5] hover:text-white active:scale-[.97]',
        ghost: 'bg-transparent text-[#0F172A] hover:bg-gray-100 active:scale-[.97]',
        white: 'bg-white text-[#0A4CB5] shadow-lg hover:shadow-xl hover:bg-gray-50 active:scale-[.97]',
    };

    const bgStyle = variant === 'primary'
        ? { background: 'linear-gradient(135deg, #0A4CB5, #0D5BC0)' }
        : variant === 'secondary'
            ? { background: 'linear-gradient(135deg, #18B66B, #15A35F)' }
            : {};

    return (
        <button
            disabled={disabled || loading}
            className={cn(base, sizeMap[size], variantMap[variant], disabled && 'opacity-50 cursor-not-allowed', className)}
            style={bgStyle}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing…
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
                    {children}
                    {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
                </>
            )}
        </button>
    );
};

export default Button;
