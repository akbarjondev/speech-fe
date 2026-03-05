# Speech Recognition App

This is a simple speech recognition application built using React.js and Browser's SpeechRecognition api. The app allows users to convert spoken Uzbek words into English text using OpenAI's API. OpenAI's transcription service is used to convert the audio input into text and then translate it from Uzbek to English.

Used models:

- gpt-4o-transcribe - for transcribing audio to text
- gpt-5.2 - for translating Uzbek text to English

## How to run the app in build mode

1. Clone the repository:

   ```bash
    git clone https://github.com/akbarjondev/speech-fe.git
   ```

2. Navigate to the project directory:
   ```bash
    cd speech-fe
   ```
3. Install the dependencies:
   ```bash
    npm install
   ```
4. Create a .env file in the root directory and add VITE_BASE_URL:
   ```
    VITE_BASE_URL='http://localhost:4000'
   ```
5. Run build command:
   ```bash
    npm run build
   ```
6. Run build folder:
   ```bash
    npm run preview
   ```

## How to run the app in development mode

1. Clone the repository:

   ```bash
    git clone https://github.com/akbarjondev/speech-fe.git
   ```

2. Navigate to the project directory:
   ```bash
    cd speech-fe
   ```
3. Install the dependencies:
   ```bash
    npm install
   ```
4. Create a .env file in the root directory and add VITE_BASE_URL:
   ```
    VITE_BASE_URL='http://localhost:4000'
   ```
5. Start the development server:
   ```bash
    npm run dev
   ```

## Issue Resolved

1. The issue regarding to recording old audio and sending it to the server has been resolved. The root cause I did not clear the audio chunks array after sending the audio data to the server. Now, after sending the audio data, the audio chunks array is cleared, ensuring that only new audio data is recorded and sent to the server in subsequent recordings.
