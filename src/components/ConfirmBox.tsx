interface ConfirmBoxProps {
  text: string;
  children: React.ReactNode;
}

function ConfirmBox({ text, children }: ConfirmBoxProps) {
  return (
    <section className="absolute flex flex-col items-center justify-center h-32 space-y-3 bg-white border-2 border-black rounded-md w-80">
      <p className="mt-1 text-sm">{text}</p>
      {children}
    </section>
  );
}

export default ConfirmBox;
