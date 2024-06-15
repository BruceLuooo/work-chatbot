export const mockAddToChatHistory = (messageID, setChatHistory) => {
  setTimeout(() => {
    setChatHistory((prevState) => {
      const messageIdx = prevState.findIndex((message) => {
        return message.messageID === messageID;
      });
      if (messageIdx !== -1) {
        let updatedState = [...prevState];
        updatedState[messageIdx].isOutputLoading = false;
        updatedState[messageIdx].outputMessage =
          "I am an AI question answering agent. I can help you by answering questions using the information provided in the search results. If the search results do not contain enough information to answer your question, I will let you know that I could not find an exact answer.";

        return updatedState;
      } else {
        return prevState;
      }
    });
  }, 2150);
};
