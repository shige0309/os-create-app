import "./WorkList.css";

import CircularProgress from "@mui/joy/CircularProgress";
import { Card } from "components/Card/WorkCard";
import { SectionTitle } from "components/SectionTitle";
import { useWork } from "hooks/useWork";
import { useCallback, useEffect, useRef, useState } from "react";
import { GetWorkType } from "Type";

const WORKS_PER_PAGE = 6;

export const WorkList = () => {
  const [works, setWorks] = useState<GetWorkType[]>([]);
  const { getWorksPage } = useWork();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const initialFetchStartedRef = useRef(false);
  const fetchingRef = useRef(false);

  const fetchWorks = useCallback(
    async (targetPage: number) => {
      if (fetchingRef.current) {
        return;
      }

      fetchingRef.current = true;
      setLoading(true);
      try {
        const result = await getWorksPage({
          page: targetPage,
          limit: WORKS_PER_PAGE,
        });
        setWorks((prevWorks) =>
          targetPage === 1
            ? result.data.works
            : [...prevWorks, ...result.data.works],
        );
        setHasMore(result.data.hasMore);
        setPage(targetPage + 1);
      } finally {
        fetchingRef.current = false;
        setLoading(false);
      }
    },
    [getWorksPage],
  );

  useEffect(() => {
    if (initialFetchStartedRef.current) {
      return;
    }

    initialFetchStartedRef.current = true;
    fetchWorks(1);
  }, [fetchWorks]);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) {
        return;
      }

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchWorks(page);
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [fetchWorks, hasMore, loading, page],
  );

  return (
    <section>
      <SectionTitle en="WORK" title="直近の制作サイト" />
      {loading && works.length === 0 && (
        <div className="c-homeWork-progress">
          <CircularProgress size="lg" />
          <p>ローディング中</p>
        </div>
      )}
      <div className="c-homeWork-card">
        {works.length > 0 ? (
          works.map((work: GetWorkType) => <Card props={work} key={work._id} />)
        ) : !loading ? (
          <p>WORKSがありません。</p>
        ) : null}
      </div>
      {hasMore && <div className="c-homeWork-sentinel" ref={loadMoreRef} />}
      {loading && works.length > 0 && (
        <div className="c-homeWork-progress">
          <CircularProgress size="md" />
          <p>ローディング中</p>
        </div>
      )}
    </section>
  );
};
