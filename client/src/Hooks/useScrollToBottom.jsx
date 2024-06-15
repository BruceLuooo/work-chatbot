export const useScrollToBottom = (messagesEndRef, delay) => {
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView(
        { behavior: "smooth" },
        { block: "end" }
      );
    }, delay);
  };

  return { scrollToBottom };
};
