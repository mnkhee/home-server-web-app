import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
    Card,
    HoverPreview,
    type HoveredCard,
  } from "../components/Card.tsx";

type Category = {
    title: string;
    movies: string[];
};

const categories: Category[] = [
    {
      title: "Continue Watching",
        movies: [
          "Movie 1",
          "Movie 2",
          "Movie 3",
          "Movie 4",
          "Movie 5",
          "Movie 6",
          "Movie 7",
          "Movie 8",
          "Movie",
          "Movie",
          "Movie",
          "Movie",
          "Movie",
          "Movie",
        ],
    },
  {
    title: "Movies",
      movies: [
        "Movie 1",
        "Movie 2",
        "Movie 3",
        "Movie 4",
        "Movie 5",
        "Movie 6",
        "Movie 7",
      ],
  },
  {
    title: "TV Shows",
      movies: [
        "Show 1",
        "Show 2",
        "Show 3",
        "Show 4",
        "Show 5",
        "Show 6",
        "Show 7",
    ],
  },
  {
    title: "Recently Added",
      movies: [
        "Movie 1",
        "Movie 2",
        "Movie 3",
        "Movie 4",
        "Movie 5",
        "Movie 6",
        "Movie 7",
        "Movie 8",
        "Movie 9",
      ],
  },
];

export const Catalogue = () => {
    return (
        <section className="relative z-10 -mt-24 bg-transparent pl-[4%] pb-16">
            {categories.map((category) => (
                <MovieRow
                    key={category.title}
                    category={category}
                />
            ))}
        </section>
    );
  };

  type MovieRowProps = {
      category: Category;
  };

  const MovieRow = ({ category }: MovieRowProps) => {
      const rowRef = useRef<HTMLDivElement | null>(null);

      const animationFrame = useRef<number | null>(null);

      const [hoveredCard, setHoveredCard] =
        useState<HoveredCard | null>(null);

      const closeTimeout = useRef<
        ReturnType<typeof setTimeout> | null
      >(null);

      const showTimeout = useRef<
        ReturnType<typeof setTimeout> | null
      >(null);

      const hoveredMovie = useRef<string | null>(null);


      const cancelAllTimers = () => {
          if (showTimeout.current) {
              clearTimeout(showTimeout.current);
              showTimeout.current = null;
            }

            if (closeTimeout.current) {
              clearTimeout(closeTimeout.current);
              closeTimeout.current = null;
          }
      };


    // Calculates scroll amount
    const getScrollAmount = (): number => {
        const row = rowRef.current;

        if (!row) {
            return 0;
        }

        const firstCard =
            row.querySelector<HTMLElement>(
                "[data-movie-card]",
            );

          if (!firstCard) {
              return 0;
          }

        const cardWidth =
            firstCard.getBoundingClientRect().width;

        const gap = 8;

        return (cardWidth + gap) * 6;
    };

    /*
    * Custom smooth scrolling animation.
    */
    const animateScroll = (
        distance: number,
        duration = 700,
      ) => {
        const row = rowRef.current;

      if (!row) {
        return;
      }

      /*
      * Cancel an existing animation before starting
      * another one.
      */
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      const start = row.scrollLeft;
      const startTime = performance.now();

      // Ease in animation
      const easeInOutCubic = (t: number) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1,
        );

        const easedProgress =
          easeInOutCubic(progress);

        row.scrollLeft =
          start + distance * easedProgress;

        if (progress < 1) {
          animationFrame.current =
            requestAnimationFrame(animate);
        } else {
          animationFrame.current = null;
        }
      };

      animationFrame.current =
        requestAnimationFrame(animate);
    };

    //Scroll right
    const scrollNext = () => {
      const row = rowRef.current;

      if (!row) {
        return;
      }

      cancelAllTimers();
      setHoveredCard(null);

      animateScroll(
        getScrollAmount(),
        700,
      );
    };

    // Scroll left
    const scrollPrevious = () => {
      const row = rowRef.current;

      if (!row) {
        return;
      }

      cancelAllTimers();
      setHoveredCard(null);

      animateScroll(
        -getScrollAmount(),
        700,
      );
    };


    // Hover start
    const handleMouseEnter = (
      movie: string,
      element: HTMLElement,
    ) => {
      cancelAllTimers();

      hoveredMovie.current = movie;

      const rect = element.getBoundingClientRect();

      showTimeout.current = setTimeout(() => {
        if (hoveredMovie.current !== movie) {
          return;
        }

        setHoveredCard({
          movie,
          rect,
        });

        showTimeout.current = null;
      }, 500);
    };

    // Stop hover when cursor leaves
    const handleMouseLeave = () => {
      if (showTimeout.current) {
        clearTimeout(showTimeout.current);
        showTimeout.current = null;
      }

      hoveredMovie.current = null;

      closeTimeout.current = setTimeout(() => {
        setHoveredCard(null);
        closeTimeout.current = null;
      }, 120);
    };

    // Cursor enters  preview.
    const handlePreviewMouseEnter = () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    };

    // Cursor leaves preview
    const handlePreviewMouseLeave = () => {
      setHoveredCard(null);
      hoveredMovie.current = null;
    };

    // Close preview when scrolling
    useEffect(() => {
      if (!hoveredCard) {
        return;
      }

      const handleScroll = () => {
        cancelAllTimers();
        setHoveredCard(null);
        hoveredMovie.current = null;
      };

      window.addEventListener(
        "scroll",
        handleScroll,
        true,
      );

      return () => {
        window.removeEventListener(
          "scroll",
          handleScroll,
          true,
        );
      };
    }, [hoveredCard]);


    useEffect(() => {
        return () => {
            cancelAllTimers();

            if (animationFrame.current !== null) {
                cancelAnimationFrame(
                  animationFrame.current,
                );

                animationFrame.current = null;
            }
        };
    }, []);

    return (
      <div className="mb-10">
        <h2 className="mb-3 text-2xl tracking-wide text-white">
          {category.title}
        </h2>

        <div className="group relative">
          {/* Previous */}

          <button
            type="button"
            onClick={scrollPrevious}
            aria-label={`Previous ${category.title}`}
            className="
              absolute
              left-0
              top-1/2
              z-[100]
              flex
              h-30
              w-12
              -translate-y-1/2
              items-center
              justify-center
              bg-black/60
              text-white
              opacity-0
              transition-all
              duration-200
              hover:bg-black/80
              group-hover:opacity-100
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 5l-7 7 7 7"
              />
            </svg>
          </button>

          {/* Next */}

          <button
            type="button"
            onClick={scrollNext}
            aria-label={`Next ${category.title}`}
            className="
              absolute
              right-0
              top-1/2
              z-[100]
              flex
              h-30
              w-12
              -translate-y-1/2
              items-center
              justify-center
              bg-black/60
              text-white
              opacity-0
              transition-all
              duration-200
              hover:bg-black/80
              group-hover:opacity-100
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Row */}

          <div
            ref={rowRef}
            className="
              flex
              gap-2
              overflow-x-auto
              overflow-y-hidden
              pb-4
              scrollbar-none
            "
          >
            {category.movies.map((movie, index) => (
              <Card
                key={`${category.title}-${index}`}
                movie={movie}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Right fade */}
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-[95]
              h-full
              w-24
              bg-gradient-to-l
              from-[#0b0b0b]
              to-transparent
            "
          />
        </div>

        {/* Preview */}
        {hoveredCard &&
          createPortal(
            <HoverPreview
              movie={hoveredCard.movie}
              rect={hoveredCard.rect}
              onMouseEnter={handlePreviewMouseEnter}
              onMouseLeave={handlePreviewMouseLeave}
            />,
            document.body,
          )}
      </div>
    );
};
