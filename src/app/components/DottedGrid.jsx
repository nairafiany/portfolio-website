export default function DottedGrid() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, #52525b 2px, transparent 2px)",
        backgroundSize: "30px 30px",
        opacity: 0.4,
      }}
    />
  );
}
