/* eslint-disable @typescript-eslint/no-explicit-any */

const log = (
  message: string,
  data?: any,
  type?: "info" | "error" | "success"
) => {
  // Puedes enviar logs a un backend, o solo a consola
  //   if (import.meta.env.VITE_APP_STATE === "development") {
  //     console.log(`[LOG] ${new Date().toISOString()}: ${message}`, data || "");
  //   }

  switch (type) {
    case "info":
      console.info(
        `[INFO] ${new Date().toISOString()}: ${message}`,
        data || ""
      );
      break;
    case "success":
      console.log(
        `[SUCCESS] ${new Date().toISOString()}: ${message}`,
        data || ""
      );
      break;
    case "error":
      console.error(
        `[ERROR] ${new Date().toISOString()}: ${message}`,
        data || ""
      );
      break;
    default:
      console.log(`[LOG] ${new Date().toISOString()}: ${message}`, data || "");
  }
  // Aquí podrías enviar logs a un servidor si lo necesitas
};

const logService = {
  info: (message: string, data?: any) => log(message, data, "info"),
  error: (message: string, data?: any) => log(message, data, "error"),
  success: (message: string, data?: any) => log(message, data, "success"),
};

export default logService;
