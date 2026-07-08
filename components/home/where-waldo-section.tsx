import Image from "next/image";

export function WhereWaldoSection() {
  return (
    <section className="new-where-waldo-section new-home-section new-home-wide" aria-labelledby="where-waldo-title">
      <div className="new-where-waldo-copy" data-animate="blur-fade">
        <Image
          className="new-where-waldo-waldo"
          src="/assets/home/mascots/watching-dark-mode.svg"
          alt=""
          width={181}
          height={137}
        />
        <h2 id="where-waldo-title" className="type-h2">
          Where’s Waldo?
        </h2>
        <p className="type-body">Already three steps ahead.</p>
      </div>
    </section>
  );
}
