import placeholder from "../assets/placeholder.png";
import {
    Play,
    InfoIcon
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <img
            src={placeholder}
            className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Left gradient, Probably not needed */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" /> */}

        {/* Top */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 to-transparent" />

        {/* Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-[18%] left-[4%] z-10 max-w-xl text-white">
            <h1 className="font-bebas text-5xl tracking-wide md:text-6xl">
            Movie Title
            </h1>

            <p className="mt-4 text-sm text-gray-200 md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque porro non consectetur culpa! Quas explicabo, quae inventore nostrum reprehenderit ad.
            </p>

            <div className="mt-6 flex gap-3">
                <button className="flex cursor-pointer items-center gap-2 rounded bg-white px-6 py-2 font-semibold text-black transition hover:bg-white/80">
                    <Play size={18} fill="currentColor" />
                    Play
                </button>

                <button className="flex cursor-pointer items-center gap-2 rounded bg-gray-500/70 px-6 py-2 font-semibold text-white transition hover:bg-gray-500/50">
                    <InfoIcon size={18} />
                    More Info
                </button>
            </div>
        </div>
        </section>
    );
};
