import { cn } from '@/utils/cn';

const Container = ({ children, className }) => (
    <div className={cn('w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8', className)}>
        {children}
    </div>
);

export default Container;
