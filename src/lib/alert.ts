import Swal, { SweetAlertOptions, SweetAlertPosition } from "sweetalert2";

// Configure default sweetalert toast positioned at the bottom left
export const BottomLeftAlert = Swal.mixin({
  toast: true,
  position: "bottom-start" as SweetAlertPosition,
  showConfirmButton: false,
  timer: 4500,
  timerProgressBar: true,
  background: "#151121",
  color: "#ffffff",
  iconColor: "#d2bbff",
  showClass: {
    popup: "swal2-show animate-in fade-in slide-in-from-bottom-4 duration-300",
  },
  hideClass: {
    popup: "swal2-hide animate-out fade-out slide-out-to-bottom-4 duration-200",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    popup:
      "!bg-[#151121]/95 !backdrop-blur-2xl !border !border-purple-500/35 !rounded-2xl !p-4 !shadow-[0_16px_40px_rgba(124,58,237,0.35)] !m-5 !gap-3 !z-[9999]",
    title: "!text-white !text-sm !font-semibold !font-headline !m-0 !tracking-tight",
    htmlContainer: "!text-purple-200/90 !text-xs !font-body !mt-1 !leading-relaxed",
    timerProgressBar: "!bg-gradient-to-r !from-purple-500 !to-indigo-500",
  },
});

export const showAlert = (options: SweetAlertOptions) => {
  return BottomLeftAlert.fire({
    position: "bottom-start",
    ...options,
  });
};

export const showSuccessAlert = (title: string, text?: string) => {
  return BottomLeftAlert.fire({
    icon: "success",
    title,
    text,
    iconColor: "#34d399",
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  return BottomLeftAlert.fire({
    icon: "error",
    title,
    text,
    iconColor: "#f87171",
  });
};

export const showWarningAlert = (title: string, text?: string) => {
  return BottomLeftAlert.fire({
    icon: "warning",
    title,
    text,
    iconColor: "#fbbf24",
  });
};

export const showInfoAlert = (title: string, text?: string) => {
  return BottomLeftAlert.fire({
    icon: "info",
    title,
    text,
    iconColor: "#7bd0ff",
  });
};

export default BottomLeftAlert;
