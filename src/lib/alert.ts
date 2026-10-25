import Swal, { SweetAlertOptions, SweetAlertPosition } from "sweetalert2";

// Configure refined SweetAlert2 toast positioned strictly at the bottom-right
export const AppAlert = Swal.mixin({
  toast: true,
  position: "bottom-end" as SweetAlertPosition,
  showConfirmButton: false,
  showCloseButton: true,
  timer: 4500,
  timerProgressBar: true,
  grow: false,
  width: "auto",
  backdrop: false,
  background: "transparent",
  color: "#ffffff",
  customClass: {
    popup: "aether-swal-toast",
    title: "aether-swal-title",
    htmlContainer: "aether-swal-desc",
    icon: "aether-swal-icon",
    timerProgressBar: "aether-swal-progress",
    closeButton: "aether-swal-close",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Backward compatibility aliases
export const BottomLeftAlert = AppAlert;
export const BottomRightAlert = AppAlert;

export const showAlert = (options: SweetAlertOptions) => {
  return AppAlert.fire({
    position: "bottom-end",
    ...options,
  });
};

export const showSuccessAlert = (title: string, text?: string) => {
  return AppAlert.fire({
    icon: "success",
    iconHtml: '<span class="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>',
    title,
    text,
    iconColor: "#34d399",
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  return AppAlert.fire({
    icon: "error",
    iconHtml: '<span class="material-symbols-outlined !text-[20px] text-rose-400">cancel</span>',
    title,
    text,
    iconColor: "#f43f5e",
  });
};

export const showWarningAlert = (title: string, text?: string) => {
  return AppAlert.fire({
    icon: "warning",
    iconHtml: '<span class="material-symbols-outlined !text-[20px] text-amber-400">warning</span>',
    title,
    text,
    iconColor: "#fbbf24",
  });
};

export const showInfoAlert = (title: string, text?: string) => {
  return AppAlert.fire({
    icon: "info",
    iconHtml: '<span class="material-symbols-outlined !text-[20px] text-sky-400">info</span>',
    title,
    text,
    iconColor: "#38bdf8",
  });
};

export default AppAlert;
