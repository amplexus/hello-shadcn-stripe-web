export default function AboutPage() {
  return (
    <div className="bg-muted/60
      flex flex-col items-center justify-center text-center text-balance gap-8 px-4">
      <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">About</h1>
      <p className="text-lg lg:text-3xl max-w-screen-xl">
        A demonstration website using nextjs, shadcn and nextauth.
      </p>
    </div>
  );
}
