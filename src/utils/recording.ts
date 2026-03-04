let chunks: Blob[] = [];
let mediaRecorder: MediaRecorder | null = null;

export const startRecord = async (onRecordingReady?: (data: Blob) => void) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);

  if (mediaRecorder) {
    mediaRecorder.start();

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      chunks = [];

      if (onRecordingReady) onRecordingReady(blob);
    };

    mediaRecorder.ondataavailable = (event) => {
      if (event.data) {
        chunks.push(event.data);
      }
    };
  }
};

export const stopRecord = async () => {
  mediaRecorder?.stop();
  mediaRecorder?.stream.getTracks().forEach((stream) => stream.stop());
};
