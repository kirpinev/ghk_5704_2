declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      e: "event",
      action: string,
      variant_name: Record<string, string>,
    ) => void;
  }
}

interface Payload {
  screensaver: string;
  icon: string;
}

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbyrDlN_oOBa62j8lbD-FaLrwUsasEGQ5phri3rab0iX35db8Bd4wB2U3wPW-czeFy3a/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
          date,
          variant: "ghk_5704_2",
          form_name: "forms_1",
          ...payload,
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
