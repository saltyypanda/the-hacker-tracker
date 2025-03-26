export function ContactMeModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal(): void;
}) {
  return (
    <>
      {/* background */}
      <div
        className={`fixed inset-0 m-0 p-0 min-w-screen min-h-screen z-40 bg-base-100 transition-opacity duration-300 ${
          open
            ? "opacity-40 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      />

      {/* jerryrigged modal tehe */}
      <div
        className={`fixed inset-0 m-0 p-0 min-w-screen min-h-screen z-50 grid place-items-center transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="flex flex-col items-center justify-between w-[85%] min-h-[85vh] mt-[64px] p-10 bg-base-100 text-black rounded-[4rem] shadow-2xl mx-[5%] py-12"
          style={{ transform: "scale(0.9)" }}
        >
          <div id="modal-header" className="flex flex-col text-center gap-4">
            <header className="text-5xl font-bold text-base-content">
              Coming Soon!
            </header>
            <p className="text-xl text-center text-base-content opacity-60">
              This is the feature I'm working on right now :)
            </p>
          </div>



          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
