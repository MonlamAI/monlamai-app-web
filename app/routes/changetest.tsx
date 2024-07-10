import { useState } from "react";
function handleChatGPTStream(prompt, onData) {
  const eventSource = new EventSource(
    "/api/translation/stream?text=" + prompt + "&target=bo"
  );

  eventSource.onmessage = (event) => {
    let data = JSON.parse(event.data);

    if (data?.generated_text) {
      eventSource.close();
    } else {
      // TODO: Parse event.data
      let content = data?.token?.text;
      if (content) {
        // Invoke the callback with the new text
        onData(content);
      }
    }
  };

  eventSource.onerror = (event) => {
    eventSource.close();
  };
}

export default function Test() {
  const [streamedText, setStreamedText] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        handleChatGPTStream(formData.get("prompt"), (newText) => {
          setStreamedText((prevText) => prevText + newText);
        });
      }}
    >
      <label>
        Prompt
        <textarea required name="prompt" />
      </label>
      <div>
        <button type="submit">Send</button>
      </div>
      {streamedText && <pre>{streamedText}</pre>}
    </form>
  );
}
