import { useEffect, useMemo, useRef, useState } from 'react';

const BEST_ITEMS = 16;

export default function useBestActivities() {
  const [page, setPage] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getLayout = (width: number) => {
    if (width >= 1024) return { preview: 4, gap: 24 };
    if (width >= 768) return { preview: 2, gap: 20 };

    return { preview: 2, gap: 12 };
  };

  const { preview, gap, maxPage } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { preview: 2, gap: 12, maxPage: 1 };
    }

    const { preview, gap } = getLayout(window.innerWidth);
    const maxPage = Math.ceil(BEST_ITEMS / preview);

    return { preview, gap, maxPage };
  }, []);

  const handleScroll = (type: 'prev' | 'next') => {
    setPage((prev) => {
      if (type === 'next') return Math.min(prev + 1, maxPage);
      return Math.max(prev - 1, 1);
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const firstItem = container.firstElementChild as HTMLElement | null;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const scrollLeft = (itemWidth + gap) * preview * (page - 1);

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }, [page, preview, gap]);

  const previewCount =
    typeof window !== 'undefined' && window.innerWidth >= 1024 ? 4 : 2;
  const maxPageCount = Math.ceil(BEST_ITEMS / previewCount);

  const isFirstPage = page > 1;
  const isLastPage = page < maxPageCount;

  return {
    scrollRef,
    handleScroll,
    isFirstPage,
    isLastPage,
  };
}
