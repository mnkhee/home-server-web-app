import { createPortal } from "react-dom";
import placeholder from "../assets/placeholder.png";
import { Play, Plus} from "lucide-react";

export type HoveredCard = {
  movie: string;
  rect: DOMRect;
};

type CardProps = {
  movie: string;
  onMouseEnter: (
    movie: string,
    element: HTMLElement,
  ) => void;
  onMouseLeave: () => void;
};

export const Card = ({
  movie,
  onMouseEnter,
  onMouseLeave,
}: CardProps) => {
  return (
    <div
      data-movie-card
      className="
        group/card
        relative
        h-[124px]
        w-[220px]
        flex-shrink-0
        cursor-pointer
        md:h-[150px]
        md:w-[267px]
      "
      onMouseEnter={(event) => {
        onMouseEnter(movie, event.currentTarget);
      }}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="
          h-full
          w-full
          overflow-hidden
          rounded-md
        "
      >
        <img
          src={placeholder}
          alt={movie}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-300
            group-hover/card:brightness-75
          "
        />
      </div>
    </div>
  );
};

type HoverPreviewProps = {
  movie: string;
  rect: DOMRect;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const HoverPreview = ({
  movie,
  rect,
  onMouseEnter,
  onMouseLeave,
}: HoverPreviewProps) => {
  const width =
    window.innerWidth >= 768 ? 340 : 300;

  const height = 390;

  let left =
    rect.left +
    rect.width / 2 -
    width / 2;

  const horizontalPadding = 12;

  left = Math.max(
    horizontalPadding,
    Math.min(
      left,
      window.innerWidth -
        width -
        horizontalPadding,
    ),
  );

  let top = rect.top - 60;

  const verticalPadding = 16;

  top = Math.max(
    verticalPadding,
    Math.min(
      top,
      window.innerHeight -
        height -
        verticalPadding,
    ),
  );

  return (
    <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="
        fixed
        z-[99999]
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#181818]
        shadow-[0_20px_60px_rgba(0,0,0,0.9)]
        animate-[previewIn_200ms_ease-out]
    "
    style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
    }}
    >
        {/* Image */}

    <div className="relative h-[190px] w-full">
        <img
        src={placeholder}
        alt={movie}
        className="
            h-full
            w-full
            object-cover
        "
        />

        <div
        className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-28
            bg-gradient-to-t
            from-[#181818]
            via-[#181818]/50
            to-transparent
        "
        />
    </div>

    <div className="px-4 pb-5">
        {/* Buttons */}
        <div className="mb-3 flex items-center gap-2">
            {/* Play */}
            <button
                type="button"
                aria-label={`Play ${movie}`}
                className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                transition-transform
                duration-150
                hover:scale-110
                "
            >
            <Play size={18} fill="currentColor" />
            </button>

            {/* Add */}
            <button
                type="button"
                aria-label={`Add ${movie}`}
                className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/50
                bg-[#2a2a2a]
                text-white
                transition
                hover:border-white
                hover:bg-[#3a3a3a]
                "
            >
                <Plus size={18}/>
            </button>

            </div>

            {/* Title */}
            <h3 className="mb-2 text-lg font-semibold text-white">
            {movie}
            </h3>

            {/* Genre (idk if use this) */}
            <p className="text-sm text-white/70">
            PUT GENRES HERE
            </p>

            {/* Desc */}
            <p className="mt-2 text-sm leading-5 text-white/60">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet eaque laboriosam vero ipsam quis voluptatibus eligendi dolores aspernatur obcaecati culpa.
            </p>
        </div>
        </div>
    );
};
