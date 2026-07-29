import GuestbookSection from "@/components/GuestbookSection";
import CountdownSection from "@/components/CountdownSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F4]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/wedding-hero.svg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F4]/30 via-[#FDF8F4]/10 to-[#FDF8F4]" />
        <div className="relative z-10 flex flex-col items-center justify-center py-24 px-4 text-center sm:py-32 md:py-40">
          <p className="mb-3 font-serif text-sm tracking-[0.35em] text-[#8B7355] uppercase sm:text-base">
            Together with their families
          </p>
          <h1 className="font-serif text-5xl leading-tight text-[#3D3027] sm:text-6xl md:text-7xl lg:text-8xl">
            Andy <span className="font-light italic text-[#C4956A]">&amp;</span> Laura
          </h1>
          <p className="mt-2 font-serif text-lg tracking-wider text-[#8B7355] sm:text-xl md:text-2xl">
            Low &middot; Kauderer
          </p>
          <div className="my-6 flex items-center gap-4">
            <span className="block h-px w-12 bg-[#C4956A]/50 sm:w-20" />
            <span className="text-[#C4956A] text-xl">♥</span>
            <span className="block h-px w-12 bg-[#C4956A]/50 sm:w-20" />
          </div>
          <p className="font-serif text-xl tracking-wide text-[#5C4D3C] sm:text-2xl">
            19 September 2026
          </p>
          <p className="mt-2 font-serif text-base text-[#8B7355]/80 italic">
            We invite you to celebrate our love
          </p>
        </div>
      </section>

      {/* Floral Divider */}
      <div className="flex justify-center -mt-4">
        <img
          src="/images/floral-divider.svg"
          alt="floral divider"
          className="h-16 object-contain opacity-80 sm:h-20"
        />
      </div>

      {/* Countdown */}
      <CountdownSection />

      {/* Guestbook Section */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] text-[#C4956A] uppercase mb-2">
            Leave Your Wishes
          </p>
          <h2 className="font-serif text-3xl text-[#3D3027] sm:text-4xl">
            Sign Our Guestbook
          </h2>
          <p className="mt-3 text-[#8B7355] text-sm max-w-md mx-auto">
            Share your heartfelt message with us. Our AI will read the mood of
            your note and colour it accordingly —{" "}
            <span className="inline-block px-2 py-0.5 rounded bg-[#EAF6E9] text-xs">happy</span>{" "}
            <span className="inline-block px-2 py-0.5 rounded bg-[#FDECEA] text-xs">sad</span>{" "}
            <span className="inline-block px-2 py-0.5 rounded bg-[#F1F2F4] text-xs">neutral</span>{" "}
            <span className="inline-block px-2 py-0.5 rounded bg-[#FFF4E5] text-xs">mixed</span>
          </p>
        </div>
        <GuestbookSection />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8DDD0] bg-[#F9F2EB] py-10 text-center">
        <p className="font-serif text-lg text-[#5C4D3C]">
          Andy &amp; Laura
        </p>
        <p className="mt-1 text-xs text-[#8B7355]">
          19 September 2026 &middot; Made with ♥
        </p>
        <p className="mt-3 text-[10px] text-[#B8A99A] tracking-wider uppercase">
          AI-Powered Cloud Guestbook
        </p>
      </footer>
    </main>
  );
}
