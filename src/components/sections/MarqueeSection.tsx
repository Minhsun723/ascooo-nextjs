export function MarqueeSection() {
  const logos = Array.from({ length: 8 });
  return (
    <section className="p-marquee" aria-label="Ascooo">
      <div className="p-marquee__inner">
        {[false, true].map((hidden) => (
          <div className="p-marquee__track" aria-hidden={hidden || undefined} key={String(hidden)}>
            {logos.map((_, index) => <div className="p-marquee__item" key={index}><img src="/assets/img/logo_dark.svg" alt={hidden ? "" : "Ascooo"} draggable="false" /></div>)}
          </div>
        ))}
      </div>
    </section>
  );
}
