import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already visible and freeze is enabled, don't observe
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return [ref, isVisible];
}

export function useStaggeredIntersectionObserver(
  count: number,
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>[], boolean[]] {
  const refs = useRef<React.RefObject<HTMLDivElement>[]>(
    Array.from({ length: count }, () => ({ current: null }))
  );
  const [visibleStates, setVisibleStates] = useState<boolean[]>(
    Array(count).fill(false)
  );

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleStates((prev) => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });
          }
        },
        {
          threshold: options.threshold || 0.1,
          root: options.root || null,
          rootMargin: options.rootMargin || '0px',
        }
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && refs.current[index]?.current) {
          observer.unobserve(refs.current[index].current!);
        }
      });
    };
  }, [count, options.threshold, options.root, options.rootMargin]);

  return [refs.current, visibleStates];
}
