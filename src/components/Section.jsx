import Container from "./Container.jsx";

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="py-20 bg-black text-gray-100 scroll-mt-[88px]">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 mangolaine">
          {title}
          <span className="block mx-auto mt-4 h-1 w-16 rounded bg-cyan-500" />
        </h2>
        {children}
      </Container>
    </section>
  );
}
