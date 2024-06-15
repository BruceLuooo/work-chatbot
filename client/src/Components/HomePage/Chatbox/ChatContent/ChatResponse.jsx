import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import FileAttachment from "./FileAttachment";

import "./ChatResponse.scoped.css";

function ChatResponse({ messageData, scrollMessageContainer, scrollToBottom }) {
  const [isLoadingAnimationFinished, setIsLoadingAnimationFinished] = useState(
    !messageData.isOutputLoading
  );
  const [isResponseTyped, setIsResponseTyped] = useState(
    !messageData.isOutputLoading
  );
  const [typedResponseText, setTypedResponseText] = useState("\u00A0");

  const loadingDotTransition = {
    duration: 0.45,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 0.45,
  };
  const finishedLoadingDotTransition = {
    delay: 0.1,
    duration: 0.1,
    ease: "linear",
  };

  const loadingResponseVariants = {
    loading: {
      transition: {
        staggerChildren: 0.175,
      },
    },
  };

  const loadingResponseDotVariants = {
    finishLoading: (i) => {
      return {
        x: `-${i * 20}px`,
        transition: { duration: 0.1, ease: "easeOut" },
      };
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingAnimationFinished(!messageData.isOutputLoading);
    }, 500);
  }, [messageData.isOutputLoading]);

  useEffect(() => {
    if (!isResponseTyped && isLoadingAnimationFinished) {
      for (let i = 1; i <= messageData.outputMessage.length; i++) {
        setTimeout(() => {
          setTypedResponseText(messageData.outputMessage.slice(0, i));
          scrollMessageContainer();
        }, 12 * i);
      }

      setTimeout(
        () => {
          setIsResponseTyped(true);
          scrollToBottom();
        },
        12 * messageData.outputMessage.length + 300
      );
    }
  }, [isLoadingAnimationFinished]);

  return (
    <div className="chat-response-container">
      {!isLoadingAnimationFinished ? (
        <motion.div
          variants={loadingResponseVariants}
          animate={messageData.isOutputLoading ? "loading" : "finishLoading"}
          className="loading-response-container"
        >
          {[...Array(3).keys()].map((idx) => {
            return (
              <motion.div
                variants={loadingResponseDotVariants}
                custom={idx}
                className="loading-response-dot-container"
              >
                <motion.div
                  variants={{
                    loading: {
                      y: ["-50%", "-100%", "-50%"],
                      backgroundColor: ["#dfdfdf", "#ffffff", "#dfdfdf"],
                      transition: loadingDotTransition,
                    },
                    finishLoading: {
                      y: "-16px",
                      scale: 2 / 3,
                      backgroundColor: "#ffffff",
                      transition: finishedLoadingDotTransition,
                    },
                  }}
                  style={{ x: "-50%", originX: 0, originY: 0.5 }}
                  className="loading-response-dot"
                ></motion.div>
                <motion.div
                  variants={{
                    loading: {
                      scaleY: [0, 1, 0],
                      backgroundColor: ["#dfdfdf", "#ffffff", "#dfdfdf"],
                      transition: loadingDotTransition,
                    },
                    finishLoading: {
                      y: "-4px",
                      scaleX: 2 / 3,
                      scaleY: 4 / 3,
                      backgroundColor: "#ffffff",
                      transition: finishedLoadingDotTransition,
                    },
                  }}
                  style={{ originX: 0, originY: 0.5 }}
                  className="loading-response-dot-center"
                ></motion.div>
                <motion.div
                  variants={{
                    loading: {
                      y: ["-50%", "0%", "-50%"],
                      backgroundColor: ["#dfdfdf", "#ffffff", "#dfdfdf"],
                      transition: loadingDotTransition,
                    },
                    finishLoading: {
                      y: "0px",
                      scale: 2 / 3,
                      backgroundColor: "#ffffff",
                      transition: finishedLoadingDotTransition,
                    },
                  }}
                  style={{ x: "-50%", originX: 0, originY: 0.5 }}
                  className="loading-response-dot"
                ></motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <>
          <p className="assistant-message">
            {typedResponseText}
            {!isResponseTyped && <span className="insertion-caret"></span>}
          </p>
          {isResponseTyped && (
            <div className="attached-files">
              {messageData.files.map((file) => {
                return <FileAttachment fileData={file} />;
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChatResponse;
