import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    distance?: string;
    className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 800,
    distance = '30px',
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    const getTransform = () => {
        if (isVisible) return 'none';
        switch (direction) {
            case 'up': return `translateY(${distance})`;
            case 'down': return `translateY(-${distance})`;
            case 'left': return `translateX(${distance})`;
            case 'right': return `translateX(-${distance})`;
            default: return `translateY(${distance})`;
        }
    };

    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </div>
    );
};
