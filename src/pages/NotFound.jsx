import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { HandNote, InkButton, MarginNote, PixelHeading, StickyNote } from "../components/ui";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found · Anand Rathod";
  }, []);

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 pb-28 pt-20 text-center sm:pt-28">
      <div className="relative inline-block pt-12 sm:pt-9">
        <PixelHeading className="text-[8rem] sm:text-[12rem]">404</PixelHeading>
        <MarginNote>hmm…</MarginNote>
      </div>
      <StickyNote color="pink" rotate={-2} tape="lilac" className="mt-8 max-w-xs">
        <HandNote className="text-xl leading-snug">This page fell off the desk. It might have moved, or never existed.</HandNote>
      </StickyNote>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <InkButton as={Link} to="/" icon={<FiArrowUpRight />}>
          Back home
        </InkButton>
        <Link to="/work" className="mono-label border-b border-ink pb-0.5 hover:text-marker-blue">
          See my work
        </Link>
      </div>
    </section>
  );
}
