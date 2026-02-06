import { useState, useEffect, RefObject } from 'react';

interface ParallaxOptions {
    speed?: number;
    direction?: 'up' | 'down';
}

export const useParallax = (ref: RefObject<HTMLElement>, options: ParallaxOptions = {}) => {
    const { speed = 0.5, direction = 'up' } = options;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how far the element is from center of viewport
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = elementCenter - viewportCenter;

            // Apply parallax offset
            const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? -1 : 1);
            setOffset(parallaxOffset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ref, speed, direction]);

    return offset;
};

interface ScrollRevealState {
    isVisible: boolean;
    progress: number;
}

export const useScrollReveal = (ref: RefObject<HTMLElement>, threshold: number = 0.2): ScrollRevealState => {
    const [state, setState] = useState<ScrollRevealState>({ isVisible: false, progress: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState({
                    isVisible: entry.isIntersecting,
                    progress: entry.intersectionRatio,
                });
            },
            { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [ref, threshold]);

    return state;
};
