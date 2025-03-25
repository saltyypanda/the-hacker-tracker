export function ContactMeModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal(): void;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 m-0 grid items-center justify-center w-full h-full transition-all duration-300 ${
          open ? "visible" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center w-[60vw] min-h-[70vh] mt-[64px] p-10 bg-[#121212] text-black rounded-[4rem] z-[100]">
          <div className="btn" onClick={closeModal}>
            Close
          </div>
        </div>
      </div>
    </>
  );
}
