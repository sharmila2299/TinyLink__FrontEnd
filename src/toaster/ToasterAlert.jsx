import { Toaster } from "sonner";

const ToasterAlert = () => {
  return (
    <>
      <div>
        <Toaster position="top-right" expand={false} closeButton richColors />
      </div>
    </>
  );
};

export default ToasterAlert;
