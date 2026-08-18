"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  CheckCircle2,
} from "lucide-react";


// ============================================================================
// GENERATE RANDOM 5-DIGIT CHAT ID
// ============================================================================

function generateChatId() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}


// ============================================================================
// AI ENQUIRY CHAT
// ============================================================================

export default function AIEnquiryChat() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [chatId, setChatId] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  // AI says the enquiry is ready
  const [readyForSubmission, setReadyForSubmission] =
    useState(false);

  // Prevent multiple final submissions
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // Final submission completed
  const [submitted, setSubmitted] =
    useState(false);

  // Structured enquiry information collected by ENY
  const [enquiryData, setEnquiryData] =
    useState({});


  const messagesEndRef = useRef(null);

  const inputRef = useRef(null);


  // ==========================================================================
  // CREATE CHAT ID
  // ==========================================================================

  useEffect(() => {

    setChatId(generateChatId());

  }, []);


  // ==========================================================================
  // SOUNDS
  // ==========================================================================

  const playSendSound = () => {

    try {

      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      const audioContext =
        new AudioContext();

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();


      oscillator.type = "sine";


      oscillator.frequency.setValueAtTime(
        520,
        audioContext.currentTime
      );


      oscillator.frequency.exponentialRampToValueAtTime(
        760,
        audioContext.currentTime + 0.08
      );


      gain.gain.setValueAtTime(
        0.08,
        audioContext.currentTime
      );


      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.12
      );


      oscillator.connect(gain);

      gain.connect(audioContext.destination);


      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.12
      );

    } catch (error) {

      console.log(
        "Send sound unavailable"
      );

    }

  };


  const playReplySound = () => {

    try {

      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      const audioContext =
        new AudioContext();

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();


      oscillator.type = "sine";


      oscillator.frequency.setValueAtTime(
        880,
        audioContext.currentTime
      );


      oscillator.frequency.exponentialRampToValueAtTime(
        660,
        audioContext.currentTime + 0.16
      );


      gain.gain.setValueAtTime(
        0.07,
        audioContext.currentTime
      );


      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.18
      );


      oscillator.connect(gain);

      gain.connect(audioContext.destination);


      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.18
      );

    } catch (error) {

      console.log(
        "Reply sound unavailable"
      );

    }

  };


  // ==========================================================================
  // AUTO SCROLL
  // ==========================================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [
    messages,
    isTyping,
    readyForSubmission,
  ]);


  // ==========================================================================
  // BASIC ENQUIRY VALIDATION
  //
  // This is an additional frontend safety check.
  //
  // ENY should normally collect these through the conversation.
  // The frontend should NEVER blindly submit an empty enquiry.
  // ==========================================================================

  const hasBasicEnquiryDetails = () => {

    const company =
      String(
        enquiryData.company || ""
      ).trim();

    const person =
      String(
        enquiryData.person || ""
      ).trim();

    const email =
      String(
        enquiryData.email || ""
      ).trim();

    const phone =
      String(
        enquiryData.phone || ""
      ).trim();

    const product =
      String(
        enquiryData.product || ""
      ).trim();

    const application =
      String(
        enquiryData.application || ""
      ).trim();

    const message =
      String(
        enquiryData.message ||
        enquiryData.summary ||
        ""
      ).trim();


    return (
      company &&
      person &&
      email &&
      phone &&
      (
        product ||
        application ||
        message
      )
    );

  };


  // ==========================================================================
  // EFFECTIVE SUBMISSION STATE
  //
  // Even if Gemini accidentally says readyForSubmission=true too early,
  // the frontend will not expose the submission button until basic
  // enquiry information exists.
  // ==========================================================================

  const canSubmit =
    readyForSubmission &&
    hasBasicEnquiryDetails() &&
    !submitted &&
    !isSubmitting;


  // ==========================================================================
  // OPEN CHAT
  // ==========================================================================

  const openChat = () => {

    setOpen(true);


    if (messages.length === 0) {

      setTimeout(() => {

        setMessages([

          {
            id: Date.now(),
            sender: "ai",
            text:
              "🙏 Namaste! Welcome to Enviol Polytech Solutions.",
          },

          {
            id: Date.now() + 1,
            sender: "ai",
            text:
              "I am ENY from the Enviol TechSupport AI team. I am grateful for your visit.",
          },

          {
            id: Date.now() + 2,
            sender: "ai",
            text:
              "I would be happy to understand your requirement and help identify the right polyol or polyurethane solution for your application.",
          },

          {
            id: Date.now() + 3,
            sender: "ai",
            text:
              "May I know what you are looking for today?",
          },

        ]);

        playReplySound();

      }, 400);

    }


    setTimeout(() => {

      inputRef.current?.focus();

    }, 500);

  };


  // ==========================================================================
  // SEND MESSAGE TO AI CHAT ROUTE
  //
  // This route is ONLY for conversation and enquiry qualification.
  //
  // It does NOT submit the enquiry.
  // It does NOT insert into PostgreSQL.
  // It does NOT send enquiry email.
  // ==========================================================================

  const sendMessage = async () => {

    const text =
      input.trim();


    if (
      !text ||
      isTyping ||
      submitted ||
      isSubmitting
    ) {

      return;

    }


    playSendSound();


    const userMessage = {

      id: Date.now(),

      sender: "user",

      text,

    };


    const updatedMessages = [
      ...messages,
      userMessage,
    ];


    setMessages(updatedMessages);

    setInput("");

    setIsTyping(true);


    try {

      const response =
        await fetch(
          "/api/ai-chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              chatId,

              messages:
                updatedMessages,

            }),

          }
        );


      if (!response.ok) {

        throw new Error(
          "AI chat request failed"
        );

      }


      const data =
        await response.json();


      // ======================================================================
      // STORE STRUCTURED ENQUIRY DATA
      // ======================================================================

      if (
        data.enquiryData &&
        typeof data.enquiryData === "object" &&
        !Array.isArray(data.enquiryData)
      ) {

        setEnquiryData(
          (previous) => ({

            ...previous,

            ...data.enquiryData,

          })
        );

      }


      // ======================================================================
      // UPDATE READINESS STATE
      //
      // IMPORTANT:
      // Do not only set true.
      //
      // If the route says false, we must also set false.
      // ======================================================================

      if (
        typeof data.readyForSubmission === "boolean"
      ) {

        setReadyForSubmission(
          data.readyForSubmission
        );

      }


      // ======================================================================
      // AI REPLY
      // ======================================================================

      if (data.reply) {

        setMessages(
          (previous) => [

            ...previous,

            {
              id:
                Date.now() + 1,

              sender:
                "ai",

              text:
                data.reply,

            },

          ]
        );


        playReplySound();

      }


    } catch (error) {

      console.error(
        "AI CHAT ERROR:",
        error
      );


      setMessages(
        (previous) => [

          ...previous,

          {
            id:
              Date.now() + 1,

            sender:
              "ai",

            text:
              "I’m sorry, I’m having a little difficulty connecting right now. Please try again in a moment. You can also submit your requirement through our enquiry form.",

          },

        ]
      );


      playReplySound();

    } finally {

      setIsTyping(false);

    }

  };


  // ==========================================================================
  // SUBMIT FINAL ENQUIRY
  //
  // This is the ONLY place where /api/ai-enquiry is called.
  // ==========================================================================

  const submitEnquiry = async () => {

    if (
      isSubmitting ||
      submitted
    ) {

      return;

    }


    // ========================================================================
    // FINAL FRONTEND VALIDATION
    // ========================================================================

    if (!hasBasicEnquiryDetails()) {

      setMessages(
        (previous) => [

          ...previous,

          {
            id:
              Date.now(),

            sender:
              "ai",

            text:
              "Before I submit this enquiry, I still need a few basic contact details such as your company name, contact person, email and phone number. Please share those with me so our team can follow up with you.",
          },

        ]
      );


      playReplySound();

      return;

    }


    setIsSubmitting(true);


    try {

      // ======================================================================
      // BUILD COMPLETE TRANSCRIPT
      //
      // This is the transcript currently available in the browser.
      // ======================================================================

      const transcript =
        messages.map(
          (message) => ({

            role:
              message.sender === "ai"
                ? "assistant"
                : "user",

            text:
              message.text,

          })
        );


      // ======================================================================
      // NORMALIZE FINAL ENQUIRY DATA
      // ======================================================================

      const company =
        String(
          enquiryData.company || ""
        ).trim();

      const person =
        String(
          enquiryData.person || ""
        ).trim();

      const email =
        String(
          enquiryData.email || ""
        ).trim();

      const phone =
        String(
          enquiryData.phone || ""
        ).trim();

      const category =
        String(
          enquiryData.category ||
          "General Enquiry"
        ).trim();

      const product =
        String(
          enquiryData.product || ""
        ).trim();

      const application =
        String(
          enquiryData.application || ""
        ).trim();

      const technicalGrade =
        String(
          enquiryData.technicalGrade ||
          enquiryData.grade ||
          ""
        ).trim();

      const message =
        String(
          enquiryData.message ||
          enquiryData.summary ||
          ""
        ).trim();


      // ======================================================================
      // CALL FINAL ENQUIRY API
      // ======================================================================

      const response =
        await fetch(
          "/api/ai-enquiry",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              chatId,

              company,

              person,

              email,

              phone,

              category,

              product,

              application,

              technicalGrade,

              message,

              // Send all structured information as well.
              enquiryData,

              transcript,

            }),

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.error ||
          "Unable to submit enquiry."
        );

      }


      // ======================================================================
      // SUCCESS
      // ======================================================================

      setSubmitted(true);

      setReadyForSubmission(false);


      setMessages(
        (previous) => [

          ...previous,

          {
            id:
              Date.now(),

            sender:
              "ai",

            text:
              `🙏 Thank you. Your enquiry has been successfully submitted to the Enviol team.

Your Chat ID is #${data.chatId || chatId}.

Our team will review your requirement and get back to you.

Tata 👋`,

          },

        ]
      );


      playReplySound();


    } catch (error) {

      console.error(
        "AI ENQUIRY SUBMISSION ERROR:",
        error
      );


      setMessages(
        (previous) => [

          ...previous,

          {
            id:
              Date.now(),

            sender:
              "ai",

            text:
              "I’m sorry, I could not submit the enquiry right now. Please try again, or use the enquiry form to contact our team.",

          },

        ]
      );


      playReplySound();

    } finally {

      setIsSubmitting(false);

    }

  };


  // ==========================================================================
  // ENTER KEY
  // ==========================================================================

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  };


  // ==========================================================================
  // CHAT UI
  // ==========================================================================

  return (

    <>

      {/* ================================================================== */}
      {/* FLOATING BUTTON */}
      {/* ================================================================== */}

      {!open && (

        <button
          onClick={openChat}
          aria-label="Open Enviol AI Assistant"

          className="
            fixed
            bottom-6
            right-6
            z-[100]
            w-14
            h-14
            rounded-full
            bg-[#42b3a5]
            text-white
            shadow-xl
            flex
            items-center
            justify-center
            hover:scale-105
            transition-transform
          "
        >

          <MessageCircle size={26} />


          <span
            className="
              absolute
              inset-0
              rounded-full
              border-2
              border-[#42b3a5]
              animate-ping
              opacity-30
            "
          />

        </button>

      )}


      {/* ================================================================== */}
      {/* CHAT WINDOW */}
      {/* ================================================================== */}

      {open && (

        <div
          className="
            fixed
            bottom-5
            right-5
            z-[100]
            w-[calc(100vw-2rem)]
            sm:w-[390px]
            h-[600px]
            max-h-[calc(100vh-2rem)]
            bg-white
            rounded-2xl
            shadow-2xl
            overflow-hidden
            flex
            flex-col
            border
            border-gray-200
          "
        >


          {/* ================================================================ */}
          {/* HEADER */}
          {/* ================================================================ */}

          <div
            className="
              bg-[#1f2937]
              text-white
              px-4
              py-3
              flex
              items-center
              justify-between
            "
          >

            <div>

              <div className="font-semibold">
                ENY — Enviol TechSupport AI
              </div>

              <div className="text-xs text-gray-300 mt-1">
                Chat ID: #{chatId}
              </div>

            </div>


            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  setOpen(false)
                }

                className="
                  p-2
                  hover:bg-white/10
                  rounded-lg
                "

                aria-label="Minimize chat"
              >

                <Minimize2 size={18} />

              </button>


              <button
                onClick={() =>
                  setOpen(false)
                }

                className="
                  p-2
                  hover:bg-white/10
                  rounded-lg
                "

                aria-label="Close chat"
              >

                <X size={20} />

              </button>

            </div>

          </div>


          {/* ================================================================ */}
          {/* CHAT BODY */}
          {/* ================================================================ */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-4
              space-y-3
              bg-gray-50
            "
          >

            {messages.map(
              (message) => (

                <div
                  key={message.id}

                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                      max-w-[82%]
                      px-4
                      py-3
                      rounded-2xl
                      text-sm
                      leading-relaxed

                      ${
                        message.sender === "user"
                          ? "bg-[#42b3a5] text-white rounded-br-md"
                          : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                      }
                    `}
                  >

                    {message.text}

                  </div>

                </div>

              )
            )}


            {/* ============================================================ */}
            {/* TYPING INDICATOR */}
            {/* ============================================================ */}

            {isTyping && (

              <div className="flex justify-start">

                <div
                  className="
                    bg-white
                    border
                    border-gray-100
                    shadow-sm
                    px-4
                    py-3
                    rounded-2xl
                    rounded-bl-md
                  "
                >

                  <div className="flex gap-1">

                    <span
                      className="
                        w-2
                        h-2
                        bg-gray-400
                        rounded-full
                        animate-bounce
                      "
                    />

                    <span
                      className="
                        w-2
                        h-2
                        bg-gray-400
                        rounded-full
                        animate-bounce
                        [animation-delay:150ms]
                      "
                    />

                    <span
                      className="
                        w-2
                        h-2
                        bg-gray-400
                        rounded-full
                        animate-bounce
                        [animation-delay:300ms]
                      "
                    />

                  </div>

                </div>

              </div>

            )}


            <div ref={messagesEndRef} />

          </div>


          {/* ================================================================= */}
          {/* SUBMIT ENQUIRY */}
          {/* ================================================================= */}

          {canSubmit && (

            <div
              className="
                px-3
                pt-3
                bg-white
              "
            >

              <button
                onClick={submitEnquiry}
                disabled={isSubmitting}

                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-semibold
                  text-white
                  bg-[#42b3a5]
                  rounded-lg
                  py-3
                  hover:bg-[#36998d]
                  disabled:opacity-50
                  transition
                "
              >

                <CheckCircle2 size={17} />

                {isSubmitting
                  ? "Sending..."
                  : "✓ Confirm & Send Enquiry"}

              </button>

            </div>

          )}


          {/* ================================================================= */}
          {/* QUICK ENQUIRY FORM */}
          {/* ================================================================= */}

          {!submitted && (

            <div
              className="
                px-3
                pt-3
                bg-white
              "
            >

              <button
                onClick={() => {
                  window.location.href =
                    "/contact";
                }}

                className="
                  w-full
                  text-xs
                  font-medium
                  text-[#42b3a5]
                  border
                  border-[#42b3a5]
                  rounded-lg
                  py-2
                  hover:bg-[#42b3a5]
                  hover:text-white
                  transition
                "
              >

                Prefer to fill the enquiry form?

              </button>

            </div>

          )}


          {/* ================================================================= */}
          {/* INPUT */}
          {/* ================================================================= */}

          {!submitted && (

            <div
              className="
                p-3
                bg-white
                border-t
              "
            >

              <div className="flex items-end gap-2">

                <textarea

                  ref={inputRef}

                  value={input}

                  onChange={(event) =>
                    setInput(
                      event.target.value
                    )
                  }

                  onKeyDown={handleKeyDown}

                  placeholder={
                    isTyping
                      ? "ENY is typing..."
                      : "Type your requirement..."
                  }

                  rows={1}

                  disabled={
                    isTyping ||
                    isSubmitting
                  }

                  className="
                    flex-1
                    resize-none
                    border
                    border-gray-300
                    rounded-xl
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-[#42b3a5]
                    focus:ring-1
                    focus:ring-[#42b3a5]
                    disabled:bg-gray-100
                  "

                />


                <button

                  onClick={sendMessage}

                  disabled={
                    !input.trim() ||
                    isTyping ||
                    isSubmitting
                  }

                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#42b3a5]
                    text-white
                    flex
                    items-center
                    justify-center
                    disabled:opacity-40
                    hover:bg-[#36998d]
                    transition
                  "

                  aria-label="Send message"

                >

                  <Send size={18} />

                </button>

              </div>


              <div
                className="
                  text-[10px]
                  text-gray-400
                  text-center
                  mt-2
                "
              >

                Enviol TechSupport AI •
                Chat #{chatId}

              </div>

            </div>

          )}

        </div>

      )}

    </>

  );

}