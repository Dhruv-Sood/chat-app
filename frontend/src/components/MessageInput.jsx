import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full border-t border-black/10">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl shadow-lg border border-black/10 transition-transform hover:scale-105"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-white/80 backdrop-blur
              flex items-center justify-center border border-black/10 opacity-0 group-hover:opacity-100
              transition-opacity hover:bg-white"
              type="button"
            >
              <X className="size-3.5 text-black" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-black
            focus:outline-none focus:ring-2 focus:ring-black/20 transition-all
            placeholder:text-black/40"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex size-10 items-center justify-center rounded-xl
            border border-black/10 bg-white hover:bg-black/5 transition-colors
            ${imagePreview ? "text-black" : "text-black/50"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="size-10 rounded-xl bg-black/5 hover:bg-black/10 disabled:opacity-50
          disabled:cursor-not-allowed transition-all flex items-center justify-center
          disabled:hover:bg-black/5"
        >
          <Send className="size-5 text-black" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
