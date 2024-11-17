import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-base-300 to-base-100">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl w-full max-w-6xl h-[calc(100vh-8rem)] shadow-2xl">
          <div className="flex h-full rounded-2xl overflow-hidden">
            <div className="backdrop-blur-sm bg-white/5 border-r border-white/10">
              <Sidebar />
            </div>

            <div className="flex-1 backdrop-blur-sm bg-white/5">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
