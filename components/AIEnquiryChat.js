"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  CheckCircle2,
  Clock3,
} from "lucide-react";

// ============================================================================
// GENERATE RANDOM 5-DIGIT CHAT ID
// ============================================================================

function generateChatId() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// ============================================================================
// SESSION CONFIGURATION
// ============================================================================

const INITIAL_SESSION_SECONDS = 5 * 60;
const EXTENSION_SECONDS = 2 * 60;
const MAX_EXTENSIONS = 10;

const SUBMIT_BUTTON_AFTER_SECONDS = 3 * 60 + 30;
const WARNING_SECONDS = 30;

// ============================================================================
// AI ENQUIRY CHAT
// ============================================================================

export default function AIEnquiryChat() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [chatId, setChatId] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  // ==========================================================================
  // AI READINESS
  // ==========================================================================

  const [readyForSubmission, setReadyForSubmission] = useState(false);

  // ==========================================================================
  // SUBMISSION STATES
  // ==========================================================================

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ==========================================================================
  // SESSION STATES
  // ==========================================================================

  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  const [extensionCount, setExtensionCount] = useState(0);

  const [remainingSeconds, setRemainingSeconds] = useState(
    INITIAL_SESSION_SECONDS
  );

  const [showExpiryWarning, setShowExpiryWarning] = useState(false);

  const [submitButtonForced, setSubmitButtonForced] = useState(false);

  // ==========================================================================
  // STRUCTURED ENQUIRY DATA
  // ==========================================================================

  const [enquiryData, setEnquiryData] = useState({});

  // ==========================================================================
  // REFS
  // ==========================================================================

  const enquiryDataRef = useRef({});
  const messagesRef = useRef([]);

  const isSubmittingRef = useRef(false);
  const submittedRef = useRef(false);
  const sessionEndedRef = useRef(false);

  const extensionCountRef = useRef(0);

  const sessionEndTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const expiryWarningShownRef = useRef(false);

  // Prevent duplicate submit-prompt messages.
  const submitPromptShownRef = useRef(false);

  const sessionStartedRef = useRef(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ==========================================================================
  // KEEP REFS SYNCHRONIZED WITH STATE
  // ==========================================================================

  useEffect(() => {
    enquiryDataRef.current = enquiryData;
  }, [enquiryData]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // ==========================================================================
  // CREATE CHAT ID
  // ==========================================================================

  useEffect(() => {
    setChatId(generateChatId());
  }, []);

  // ==========================================================================
  // CLEAN UP TIMER
  // ==========================================================================

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, []);

  // ==========================================================================
  // SOUNDS
  // ==========================================================================

  const playSendSound = () => {
    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContext();

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

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
      console.log("Send sound unavailable");
    }
  };

  const playReplySound = () => {
    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContext();

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

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
      console.log("Reply sound unavailable");
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
    submitButtonForced,
    showExpiryWarning,
    sessionEnded,
  ]);

  // ==========================================================================
  // NORMALIZE OPTIONAL VALUE
  //
  // IMPORTANT:
  // Missing optional fields become NULL.
  // We do NOT send "Not provided".
  // ==========================================================================

  const optionalValue = (value) => {
    if (
      value === undefined ||
      value === null
    ) {
      return null;
    }

    const normalized = String(value).trim();

    return normalized || null;
  };

  // ==========================================================================
  // GET REQUIREMENT DESCRIPTION
  //
  // Email + requirement are the ONLY mandatory fields.
  //
  // Gemini may place the requirement in:
  // message
  // summary
  // product
  // application
  // technicalGrade
  // grade
  //
  // If message/summary is unavailable, construct a useful description from
  // the structured information instead of incorrectly rejecting the enquiry.
  // ==========================================================================

  const getRequirementDescription = (
    data = enquiryDataRef.current
  ) => {
    const directMessage = String(
      data.message ||
        data.summary ||
        ""
    ).trim();

    if (directMessage) {
      return directMessage;
    }

    const parts = [];

    const product = String(
      data.product || ""
    ).trim();

    const application = String(
      data.application || ""
    ).trim();

    const technicalGrade = String(
      data.technicalGrade ||
        data.grade ||
        ""
    ).trim();

    const quantity = String(
      data.quantity ||
        data.monthlyQuantity ||
        data.sampleQuantity ||
        ""
    ).trim();

    const specifications = String(
      data.specifications ||
        data.technicalSpecifications ||
        ""
    ).trim();

    if (product) {
      parts.push(`Product: ${product}`);
    }

    if (application) {
      parts.push(`Application: ${application}`);
    }

    if (technicalGrade) {
      parts.push(`Grade: ${technicalGrade}`);
    }

    if (quantity) {
      parts.push(`Quantity: ${quantity}`);
    }

    if (specifications) {
      parts.push(`Specifications: ${specifications}`);
    }

    return parts.join(" | ").trim();
  };

  // ==========================================================================
  // BASIC ENQUIRY VALIDATION
  //
  // ONLY TWO THINGS ARE REQUIRED:
  //
  // 1. Email
  // 2. Requirement / description
  //
  // Everything else is optional.
  // ==========================================================================

  const hasBasicEnquiryDetails = () => {
    const email = String(
      enquiryDataRef.current.email || ""
    ).trim();

    const requirement =
      getRequirementDescription(
        enquiryDataRef.current
      );

    return Boolean(
      email && requirement
    );
  };

  // ==========================================================================
  // FORMAT TIMER
  // ==========================================================================

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(
      0,
      Number(seconds) || 0
    );

    const minutes = Math.floor(
      safeSeconds / 60
    );

    const remaining = safeSeconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remaining).padStart(2, "0")}`;
  };

  // ==========================================================================
  // SHOW SUBMIT PROMPT ONCE
  //
  // Gemini can indicate readiness at any point.
  // The timer can also force it at 3:30.
  //
  // This function guarantees the prompt is added only ONCE.
  // ==========================================================================

  const showSubmitPromptOnce = () => {
    if (
      submitPromptShownRef.current ||
      submittedRef.current ||
      sessionEndedRef.current
    ) {
      return;
    }

    submitPromptShownRef.current = true;

    setReadyForSubmission(true);
    setSubmitButtonForced(true);

    setMessages((previous) => {
      const alreadyExists = previous.some(
        (message) =>
          message.type === "submit-prompt"
      );

      if (alreadyExists) {
        return previous;
      }

      const newMessage = {
        id: `submit-prompt-${Date.now()}`,
        sender: "ai",
        type: "submit-prompt",
        text:
          'Before we finish, you can submit your enquiry to the Enviol team now. If you have already shared your contact details and requirement, simply click "Confirm & Send Enquiry" below. You can also add anything else you would like us to know.',
      };

      const updated = [
        ...previous,
        newMessage,
      ];

      messagesRef.current = updated;

      return updated;
    });

    playReplySound();
  };

  // ==========================================================================
  // 30-SECOND EXPIRY WARNING
  // ==========================================================================

  const showExpiryWarningMessage = () => {
    if (
      expiryWarningShownRef.current ||
      submittedRef.current ||
      sessionEndedRef.current
    ) {
      return;
    }

    expiryWarningShownRef.current = true;

    setShowExpiryWarning(true);

    setMessages((previous) => {
      const alreadyExists = previous.some(
        (message) =>
          message.type === "expiry-warning" &&
          message.sessionEndMarker ===
            sessionEndTimeRef.current
      );

      if (alreadyExists) {
        return previous;
      }

      const newMessage = {
        id: `expiry-warning-${Date.now()}`,
        sender: "ai",
        type: "expiry-warning",
        sessionEndMarker:
          sessionEndTimeRef.current,
        text:
          "⏳ Your chat session will end in 30 seconds. If you need more time, you can extend the chat by 2 minutes. Otherwise, your enquiry will be submitted automatically when this session ends.",
      };

      const updated = [
        ...previous,
        newMessage,
      ];

      messagesRef.current = updated;

      return updated;
    });

    playReplySound();
  };

  // ==========================================================================
  // FINAL ENQUIRY SUBMISSION
  //
  // Called by:
  //
  // 1. Customer clicking Confirm & Send Enquiry
  // 2. Session timer expiring
  //
  // Always reads the latest refs.
  // ==========================================================================

  const submitEnquiry = async (
    automatic = false
  ) => {
    if (
      isSubmittingRef.current ||
      submittedRef.current
    ) {
      return false;
    }

    // ========================================================================
    // FINAL VALIDATION
    // ========================================================================

    if (
      !hasBasicEnquiryDetails()
    ) {
      if (!automatic) {
        setMessages((previous) => {
          const validationAlreadyShown =
            previous.some(
              (message) =>
                message.type ===
                "validation-error"
            );

          if (validationAlreadyShown) {
            return previous;
          }

          const validationMessage = {
            id: `validation-${Date.now()}`,
            sender: "ai",
            type: "validation-error",
            text:
              "Before I submit this enquiry, I still need your email address and a clear description of your requirement. Other details such as company name, phone number, contact person, quantity, grade and delivery location are optional.",
          };

          const updated = [
            ...previous,
            validationMessage,
          ];

          messagesRef.current = updated;

          return updated;
        });

        playReplySound();
      }

      return false;
    }

    isSubmittingRef.current = true;

    setIsSubmitting(true);

    try {
      // ======================================================================
      // ALWAYS USE LATEST DATA
      // ======================================================================

      const currentEnquiryData = {
        ...enquiryDataRef.current,
      };

      const currentMessages = [
        ...messagesRef.current,
      ];

      // ======================================================================
      // COMPLETE TRANSCRIPT
      // ======================================================================

      const transcript =
        currentMessages.map(
          (message) => ({
            role:
              message.sender === "ai"
                ? "assistant"
                : "user",
            text: message.text,
          })
        );

      // ======================================================================
      // NORMALIZE DATA
      //
      // ONLY EMAIL + MESSAGE ARE REQUIRED.
      //
      // EVERY OTHER FIELD IS NULL WHEN NOT PROVIDED.
      // ======================================================================

      const company =
        optionalValue(
          currentEnquiryData.company
        );

      const person =
        optionalValue(
          currentEnquiryData.person ||
            currentEnquiryData.contactPerson
        );

      const email =
        String(
          currentEnquiryData.email ||
            ""
        ).trim();

      const phone =
        optionalValue(
          currentEnquiryData.phone
        );

      const category =
        optionalValue(
          currentEnquiryData.category
        );

      const product =
        optionalValue(
          currentEnquiryData.product
        );

      const application =
        optionalValue(
          currentEnquiryData.application
        );

      const technicalGrade =
        optionalValue(
          currentEnquiryData.technicalGrade ||
            currentEnquiryData.grade
        );

      const message =
        getRequirementDescription(
          currentEnquiryData
        );

      // ======================================================================
      // FINAL API PAYLOAD
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

              enquiryData:
                currentEnquiryData,

              transcript,

              automaticSubmission:
                automatic,

              extensionCount:
                extensionCountRef.current,
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

      submittedRef.current = true;
      sessionEndedRef.current = true;

      setSubmitted(true);
      setSessionEnded(true);

      setReadyForSubmission(false);
      setSubmitButtonForced(false);
      setShowExpiryWarning(false);

      if (timerIntervalRef.current) {
        clearInterval(
          timerIntervalRef.current
        );

        timerIntervalRef.current =
          null;
      }

      setRemainingSeconds(0);

      const successMessage = {
        id: `success-${Date.now()}`,
        sender: "ai",
        type: "success",
        text:
          `🙏 Thank you. Your enquiry has been successfully submitted to the Enviol team.\n\n` +
          `Your Chat ID is #${
            data.chatId || chatId
          }.\n\n` +
          `Our team will review your requirement and get back to you.\n\n` +
          `Chat session ended.\n\n` +
          `Tata 👋`,
      };

      messagesRef.current = [
        ...messagesRef.current,
        successMessage,
      ];

      setMessages((previous) => [
        ...previous,
        successMessage,
      ]);

      playReplySound();

      return true;
    } catch (error) {
      console.error(
        "AI ENQUIRY SUBMISSION ERROR:",
        error
      );

      isSubmittingRef.current = false;
      setIsSubmitting(false);

      const errorMessage = {
        id: `submission-error-${Date.now()}`,
        sender: "ai",
        type: "submission-error",
        text:
          automatic
            ? 'I’m sorry, I could not automatically submit your enquiry right now. Your enquiry is still available. Please click "Confirm & Send Enquiry" below to try again.'
            : "I’m sorry, I could not submit the enquiry right now. Please try again in a moment.",
      };

      messagesRef.current = [
        ...messagesRef.current,
        errorMessage,
      ];

      setMessages((previous) => [
        ...previous,
        errorMessage,
      ]);

      playReplySound();

      return false;
    }
  };

  // ==========================================================================
  // START / RESET SESSION TIMER
  // ==========================================================================

  const startSessionTimer = (
    durationSeconds
  ) => {
    if (
      submittedRef.current ||
      sessionEndedRef.current
    ) {
      return;
    }

    if (timerIntervalRef.current) {
      clearInterval(
        timerIntervalRef.current
      );
    }

    const endTime =
      Date.now() +
      durationSeconds * 1000;

    sessionEndTimeRef.current =
      endTime;

    expiryWarningShownRef.current =
      false;

    setShowExpiryWarning(false);

    setRemainingSeconds(
      durationSeconds
    );

    timerIntervalRef.current =
      setInterval(() => {
        if (
          submittedRef.current ||
          sessionEndedRef.current
        ) {
          clearInterval(
            timerIntervalRef.current
          );

          timerIntervalRef.current =
            null;

          return;
        }

        const secondsLeft =
          Math.max(
            0,
            Math.ceil(
              (
                sessionEndTimeRef.current -
                Date.now()
              ) / 1000
            )
          );

        setRemainingSeconds(
          secondsLeft
        );

        // ================================================================
        // SHOW SUBMIT BUTTON AT 3:30 DURING INITIAL SESSION
        // ================================================================

        const elapsedSeconds =
          durationSeconds -
          secondsLeft;

        if (
          durationSeconds ===
            INITIAL_SESSION_SECONDS &&
          elapsedSeconds >=
            SUBMIT_BUTTON_AFTER_SECONDS
        ) {
          showSubmitPromptOnce();
        }

        // ================================================================
        // 30 SECOND WARNING
        // ================================================================

        if (
          secondsLeft <=
            WARNING_SECONDS &&
          secondsLeft > 0
        ) {
          showExpiryWarningMessage();
        }

        // ================================================================
        // SESSION EXPIRY
        // ================================================================

        if (
          secondsLeft <= 0
        ) {
          clearInterval(
            timerIntervalRef.current
          );

          timerIntervalRef.current =
            null;

          setRemainingSeconds(0);

          // ============================================================
          // AUTOMATIC SUBMISSION
          //
          // Do NOT mark session as ended before submitEnquiry().
          // Otherwise submitEnquiry() would refuse to run.
          // ============================================================

          submitEnquiry(true);
        }
      }, 1000);
  };

  // ==========================================================================
  // START SESSION
  // ==========================================================================

  const startChatSession = () => {
    if (
      sessionStartedRef.current ||
      submittedRef.current ||
      sessionEndedRef.current
    ) {
      return;
    }

    sessionStartedRef.current =
      true;

    setSessionStarted(true);

    startSessionTimer(
      INITIAL_SESSION_SECONDS
    );
  };

  // ==========================================================================
  // EXTEND CHAT SESSION
  // ==========================================================================

  const extendChatSession = () => {
    if (
      submittedRef.current ||
      sessionEndedRef.current ||
      isSubmittingRef.current
    ) {
      return;
    }

    if (
      extensionCountRef.current >=
      MAX_EXTENSIONS
    ) {
      submitEnquiry(true);

      return;
    }

    const newCount =
      extensionCountRef.current + 1;

    extensionCountRef.current =
      newCount;

    setExtensionCount(newCount);

    setShowExpiryWarning(false);

    expiryWarningShownRef.current =
      false;

    // Keep submit button available if it was already shown.
    if (
      submitPromptShownRef.current
    ) {
      setSubmitButtonForced(true);
      setReadyForSubmission(true);
    }

    const remainingExtensions =
      MAX_EXTENSIONS - newCount;

    const extensionMessage = {
      id: `extension-${Date.now()}`,
      sender: "ai",
      type: "extension",
      text:
        `⏱️ Chat extended by 2 minutes. You have ${remainingExtensions} extension${
          remainingExtensions === 1
            ? ""
            : "s"
        } remaining.`,
    };

    messagesRef.current = [
      ...messagesRef.current,
      extensionMessage,
    ];

    setMessages((previous) => [
      ...previous,
      extensionMessage,
    ]);

    playReplySound();

    startSessionTimer(
      EXTENSION_SECONDS
    );
  };

  // ==========================================================================
  // OPEN CHAT
  // ==========================================================================

  const openChat = () => {
    if (
      submittedRef.current ||
      sessionEndedRef.current
    ) {
      return;
    }

    setOpen(true);

    // ================================================================
    // START SESSION ONLY ON FIRST OPEN
    // ================================================================

    if (
      !sessionStartedRef.current
    ) {
      startChatSession();
    }

    // ================================================================
    // INITIAL ENY GREETING
    // ================================================================

    if (
      messagesRef.current.length === 0
    ) {
      setTimeout(() => {
        if (
          sessionEndedRef.current ||
          submittedRef.current
        ) {
          return;
        }

        const timestamp =
          Date.now();

        const initialMessages = [
          {
            id: timestamp,
            sender: "ai",
            text:
              "🙏 Namaste! Welcome to Enviol Polytech Solutions.",
          },
          {
            id: timestamp + 1,
            sender: "ai",
            text:
              "I am ENY from the Enviol TechSupport AI team. I am grateful for your visit.",
          },
          {
            id: timestamp + 2,
            sender: "ai",
            text:
              "I would be happy to understand your requirement and help identify the right polyol or polyurethane solution for your application.",
          },
          {
            id: timestamp + 3,
            sender: "ai",
            text:
              "May I know what you are looking for today?",
          },
        ];

        messagesRef.current =
          initialMessages;

        setMessages(
          initialMessages
        );

        playReplySound();
      }, 400);
    }

    setTimeout(() => {
      if (
        !sessionEndedRef.current &&
        !submittedRef.current
      ) {
        inputRef.current?.focus();
      }
    }, 500);
  };

  // ==========================================================================
  // SEND MESSAGE TO AI CHAT ROUTE
  // ==========================================================================

  const sendMessage = async () => {
    const text = input.trim();

    if (
      !text ||
      isTyping ||
      submitted ||
      isSubmitting ||
      sessionEnded
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
      ...messagesRef.current,
      userMessage,
    ];

    messagesRef.current =
      updatedMessages;

    setMessages(
      updatedMessages
    );

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
      //
      // Every field Gemini returns is merged.
      // Existing fields are preserved unless Gemini supplies a newer value.
      // ======================================================================

      if (
        data.enquiryData &&
        typeof data.enquiryData ===
          "object" &&
        !Array.isArray(
          data.enquiryData
        )
      ) {
        const mergedData = {
          ...enquiryDataRef.current,
          ...data.enquiryData,
        };

        // IMPORTANT:
        // Update ref immediately, not only through React state.
        enquiryDataRef.current =
          mergedData;

        setEnquiryData(
          mergedData
        );
      }

      // ======================================================================
      // GEMINI READINESS
      //
      // Once the button has appeared, Gemini can NEVER hide it.
      // ======================================================================

      if (
        typeof data.readyForSubmission ===
          "boolean"
      ) {
        if (
          data.readyForSubmission
        ) {
          showSubmitPromptOnce();
        } else if (
          !submitPromptShownRef.current
        ) {
          setReadyForSubmission(
            false
          );
        }
      }

      // ======================================================================
      // AI REPLY
      // ======================================================================

      if (data.reply) {
        const aiMessage = {
          id: Date.now() + 1,
          sender: "ai",
          text: data.reply,
        };

        const updatedWithReply = [
          ...messagesRef.current,
          aiMessage,
        ];

        messagesRef.current =
          updatedWithReply;

        setMessages(
          updatedWithReply
        );

        playReplySound();
      }
    } catch (error) {
      console.error(
        "AI CHAT ERROR:",
        error
      );

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        type: "chat-error",
        text:
          "I’m sorry, I’m having a little difficulty connecting right now. Please try again in a moment. You can also submit your requirement through our enquiry form.",
      };

      const updatedMessagesWithError = [
        ...messagesRef.current,
        errorMessage,
      ];

      messagesRef.current =
        updatedMessagesWithError;

      setMessages(
        updatedMessagesWithError
      );

      playReplySound();
    } finally {
      setIsTyping(false);
    }
  };

  // ==========================================================================
  // ENTER KEY
  // ==========================================================================

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  // ==========================================================================
  // EFFECTIVE SUBMISSION BUTTON
  //
  // Gemini OR 3:30 timer can activate it.
  //
  // Once activated, it remains available.
  // ==========================================================================

  const canSubmit =
    (
      readyForSubmission ||
      submitButtonForced
    ) &&
    !submitted &&
    !sessionEnded &&
    !isSubmitting;

  // ==========================================================================
  // SESSION STATUS TEXT
  // ==========================================================================

  const sessionStatusText =
    sessionEnded
      ? "Chat session ended"
      : sessionStarted
      ? `Session ${formatTime(
          remainingSeconds
        )}`
      : "Chat session";

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

              <div
                className="
                  text-[10px]
                  text-gray-400
                  mt-1
                  flex
                  items-center
                  gap-1
                "
              >
                <Clock3 size={10} />

                {sessionStatusText}
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
                    message.sender ===
                    "user"
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
                        message.sender ===
                        "user"
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
          {/* 30-SECOND WARNING */}
          {/* ================================================================= */}

          {showExpiryWarning &&
            !submitted &&
            !sessionEnded && (
              <div
                className="
                  px-3
                  pt-2
                  bg-white
                "
              >
                <div
                  className="
                    rounded-lg
                    bg-amber-50
                    border
                    border-amber-200
                    px-3
                    py-2
                    text-center
                  "
                >
                  <div
                    className="
                      text-xs
                      font-semibold
                      text-amber-800
                    "
                  >
                    ⏳ Session ends in{" "}
                    {formatTime(
                      remainingSeconds
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* ================================================================= */}
          {/* SUBMIT ENQUIRY / EXTEND */}
          {/* ================================================================= */}

          {!submitted &&
            !sessionEnded &&
            (canSubmit ||
              showExpiryWarning) && (
              <div
                className="
                  px-3
                  pt-3
                  bg-white
                  space-y-2
                "
              >
                {canSubmit && (
                  <button
                    onClick={() =>
                      submitEnquiry(
                        false
                      )
                    }
                    disabled={
                      isSubmitting
                    }
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
                    <CheckCircle2
                      size={17}
                    />

                    {isSubmitting
                      ? "Sending..."
                      : "✓ Confirm & Send Enquiry"}
                  </button>
                )}

                {showExpiryWarning && (
                  <button
                    onClick={
                      extendChatSession
                    }
                    disabled={
                      isSubmitting ||
                      extensionCount >=
                        MAX_EXTENSIONS
                    }
                    className="
                      w-full
                      text-sm
                      font-semibold
                      text-[#42b3a5]
                      border
                      border-[#42b3a5]
                      rounded-lg
                      py-2.5
                      hover:bg-[#42b3a5]
                      hover:text-white
                      disabled:opacity-50
                      transition
                    "
                  >
                    {extensionCount >=
                    MAX_EXTENSIONS
                      ? "Maximum Chat Time Reached"
                      : "＋ Extend Chat by 2 Minutes"}
                  </button>
                )}
              </div>
            )}

          {/* ================================================================= */}
          {/* QUICK ENQUIRY FORM */}
          {/* ================================================================= */}

          {!submitted &&
            !sessionEnded && (
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

          {!submitted &&
            !sessionEnded && (
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
                    onKeyDown={
                      handleKeyDown
                    }
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
                    onClick={
                      sendMessage
                    }
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

          {/* ================================================================= */}
          {/* SESSION ENDED */}
          {/* ================================================================= */}

          {sessionEnded && (
            <div
              className="
                p-4
                bg-white
                border-t
                text-center
              "
            >
              <div
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Chat Session Ended
              </div>

              <div
                className="
                  text-xs
                  text-gray-400
                  mt-1
                "
              >
                Please refresh the page or continue
                browsing Enviol's website to start a
                new chat session.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
