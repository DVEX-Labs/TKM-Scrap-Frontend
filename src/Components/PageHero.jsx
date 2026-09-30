function PageHero({ eyebrow, title, description, children }) {
  return (
    <div className="w-full bg-white pt-32 md:pt-36 pb-16 md:pb-20 relative overflow-hidden border-b border-gray-100">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
        <p className="text-[#18931D] font-semibold text-xs tracking-[0.15em] uppercase mb-3">
          {eyebrow}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-5 tracking-normal">
          {title}
        </h1>
        {description && (
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}

export default PageHero;
