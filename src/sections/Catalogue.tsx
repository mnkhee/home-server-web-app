import { useRef } from "react";
import placeholder from "../assets/placeholder.png";

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
        <MovieRow key={category.title} category={category} />
      ))}
    </section>
  );
};

type MovieRowProps = {
  category: Category;
};

const MovieRow = ({ category }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  const getScrollAmount = (): number => {
    const row = rowRef.current;

    if (!row) {
      return 0;
    }

    const firstCard = row.querySelector<HTMLElement>("[data-movie-card]");

    if (!firstCard) {
      return 0;
    }

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 8;

    return (cardWidth + gap) * 6;
  };

  const scrollNext = (): void => {
    const row = rowRef.current;

    if (!row) {
      return;
    }

    row.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  };

  const scrollPrevious = (): void => {
    const row = rowRef.current;

    if (!row) {
      return;
    }

    row.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-10">
      <h2 className="mb-3 text-2xl tracking-wide text-white">
        {category.title}
      </h2>

      <div className="group relative">
        {/* Previous button */}
        <button
          type="button"
          onClick={scrollPrevious}
          aria-label={`Previous ${category.title}`}
          className="
            absolute left-0 top-1/2 z-30
            flex h-30 w-12 -translate-y-1/2
            items-center justify-center
            bg-black/60
            text-white
            opacity-0
            transition-all duration-200
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

        {/* Next button */}
        <button
          type="button"
          onClick={scrollNext}
          aria-label={`Next ${category.title}`}
          className="
            absolute right-0 top-1/2 z-30
            flex h-30 w-12 -translate-y-1/2
            items-center justify-center
            bg-black/60
            text-white
            opacity-0
            transition-all duration-200
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

        {/* Movie row */}
        <div
          ref={rowRef}
          className="
            flex gap-2
            overflow-x-auto
            overflow-y-hidden
            pb-4
            scrollbar-none
          "
        >
          {category.movies.map((movie, index) => (
            <div
              key={`${category.title}-${index}`}
              data-movie-card
              className="
                group/card relative
                h-[124px] w-[220px]
                flex-shrink-0
                cursor-pointer
                overflow-hidden
                rounded-sm
                transition-transform duration-300
                hover:z-20
                hover:scale-105
                md:h-[150px] md:w-[267px]
              "
            >
              <img
                src={placeholder}
                alt={movie}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/card:bg-black/20" />
            </div>
          ))}
        </div>

        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0b0b0b] to-transparent" />
      </div>
    </div>
  );
};
