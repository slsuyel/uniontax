import { useEffect, useRef, useState } from "react";
import { Button, Card, Input, List } from "antd";
import {
  SendOutlined,
  MessageOutlined,
  CloseOutlined,
} from "@ant-design/icons";

interface Message {
  text: string | JSX.Element;
  sender: "user" | "bot";
}

interface QAPair {
  question: string;
  answer: string;
}

const predefinedQuestions: QAPair[] = [
  {
    question: "ইউনিয়ন পরিষদ থেকে কী কী সেবা প্রদান করা হয়?",
    answer:
      "ইউনিয়ন পরিষদ থেকে ট্রেড লাইসেন্স, চারিত্রিক সনদপত্র, ভূমিহীন সনদপত্র, ওয়ারিশান সনদপত্র, অবিবাহিত সনদপত্র, প্রত্যয়নপত্র, অস্বচ্ছল প্রত্যয়নপত্র, নাগরিক সনদপত্র, উত্তরাধিকার সনদপত্র ইত্যাদি সেবা প্রদান করা হয়।",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেম কী?",
    answer:
      "ক্যাশলেস ইউপি সেবা সিস্টেম হলো একটি ডিজিটাল প্ল্যাটফর্ম যার মাধ্যমে ইউনিয়ন পরিষদ থেকে বিভিন্ন সেবা যেমন নাগরিকত্ব সনদ, ট্রেড লাইসেন্স, চারিত্রিক সনদ ইত্যাদি অনলাইনে আবেদন করা যায় এবং নির্ধারিত ফি অনলাইনে পরিশোধ করা যায়।",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেমের মাধ্যমে কী কী সেবা পাওয়া যায়?",
    answer:
      "এই সিস্টেমের মাধ্যমে নাগরিকত্ব সনদ, ট্রেড লাইসেন্স, চারিত্রিক সনদ, ভূমিহীন সনদ, উত্তরাধিকার সনদ, অবিবাহিত সনদ, বিভিন্ন প্রত্যয়নপত্র এবং অন্যান্য সেবা পাওয়া যায়।",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেমে ফি কীভাবে পরিশোধ করতে হয়?",
    answer:
      "ফি অনলাইনে বিকাশ, নগদ বা অন্যান্য ডিজিটাল পেমেন্ট সিস্টেমের মাধ্যমে পরিশোধ করা যায়। ফি পরিশোধের পর সেবাগ্রহীতা একটি প্রাপ্তি স্বীকারপত্র এবং রসিদ পাবেন।",
  },
  {
    question: "সাপোর্টে কিভাবে যোগাযোগ করব?",
    answer:
      "আপনি আমাদের <a href='/contact' target='_blank'>যোগাযোগ পৃষ্ঠা</a> ভিজিট করে বা <a href='mailto:support@uniontax.gov.bd'>support@uniontax.gov.bd</a> ইমেইল করে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে পারেন। ",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেমে আবেদন করার প্রক্রিয়া কী?",
    answer:
      "www.uniontax.gov.bd ওয়েবসাইটে গিয়ে বিভাগ, জেলা, উপজেলা এবং ইউনিয়ন নির্বাচন করুন। এরপর কাঙ্খিত সেবা নির্বাচন করে প্রয়োজনীয় তথ্য দিয়ে আবেদন করুন এবং অনলাইনে ফি পরিশোধ করুন।",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেমের সুবিধা কী?",
    answer:
      "এই সিস্টেমের মাধ্যমে সেবাগ্রহীতারা সময়, খরচ এবং যাতায়াতের ঝামেলা থেকে মুক্তি পাচ্ছেন। এছাড়া, ফি পরিশোধের স্বচ্ছতা নিশ্চিত করা হয়েছে এবং দুর্নীতির সুযোগ কমেছে।",
  },
  {
    question:
      "ক্যাশলেস ইউপি সেবা সিস্টেমে সনদপত্রের সত্যতা যাচাই করা যায় কীভাবে?",
    answer:
      "সনদপত্রে একটি কিউআর কোড থাকে, যা স্ক্যান করে যেকোনো সময় সনদপত্রের সত্যতা যাচাই করা যায়।",
  },
  {
    question:
      "ক্যাশলেস ইউপি সেবা সিস্টেমে আবেদন করার পর সনদপত্র কীভাবে পাওয়া যায়?",
    answer:
      "আবেদন অনুমোদিত হলে সেবাগ্রহীতার মুঠোফোন এবং ই-মেইলে একটি বার্তা পাঠানো হবে। সনদপত্রটি ডাউনলোড করে নেওয়া যাবে এবং এতে সংশ্লিষ্ট কর্তৃপক্ষের স্বাক্ষর থাকবে।",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেমে ফি পরিশোধের পর কী হয়?",
    answer:
      "ফি পরিশোধের পর সেবাগ্রহীতা একটি প্রাপ্তি স্বীকারপত্র এবং রসিদ পাবেন। এরপর ইউপি কর্তৃপক্ষ আবেদনটি যাচাই করে নির্ধারিত সময়ের মধ্যে সনদপত্র ইস্যু করবেন।",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেমে কেন নগদ টাকা গ্রহণ করা হয় না?",
    answer:
      "নগদ টাকা গ্রহণ না করার উদ্দেশ্য হলো দুর্নীতি এবং অর্থ তছরুপের সম্ভাবনা কমিয়ে আনা। এছাড়া, ডিজিটাল পেমেন্টের মাধ্যমে ফি পরিশোধের স্বচ্ছতা নিশ্চিত করা হয়।",
  },
  {
    question: "ক্যাশলেস ইউপি সেবা সিস্টেমে সেবাগ্রহীতারা কীভাবে সনদপত্র পাবেন?",
    answer:
      "সেবাগ্রহীতারা আবেদন অনুমোদিত হলে তাদের মুঠোফোন এবং ই-মেইলে একটি বার্তা পাবেন। সনদপত্রটি ডাউনলোড করে নেওয়া যাবে এবং এতে সংশ্লিষ্ট কর্তৃপক্ষের স্বাক্ষর থাকবে।",
  },
  {
    question:
      "ক্যাশলেস ইউপি সেবা সিস্টেমে সেবাগ্রহীতারা কীভাবে ফিডব্যাক দিতে পারেন?",
    answer:
      "সেবাগ্রহীতারা ওয়েবসাইটের মাধ্যমে বা সংশ্লিষ্ট ইউনিয়ন পরিষদে সরাসরি ফিডব্যাক দিতে পারেন। এছাড়া, সেবার মান উন্নয়নের জন্য তাদের মতামত গুরুত্বপূর্ণ।",
  },
  {
    question: "ইউনিয়ন পরিষদ সেবাগুলোকে জনবান্ধব করার জন্য কী করা হয়েছে?",
    answer:
      "ইউনিয়ন পরিষদ সেবাগুলোকে জনবান্ধব করার জন্য একটি ডিজিটাল প্ল্যাটফর্ম তৈরি করা হয়েছে। www.uniontax.gov.bd নামক একটি অনলাইন সিস্টেম চালু করা হয়েছে, যা স্বল্প খরচে, স্বল্প সময়ে এবং হয়রানিমুক্তভাবে সেবা প্রদান নিশ্চিত করে।",
  },
  {
    question: "www.uniontax.gov.bd অনলাইন সিস্টেমটি কখন চালু করা হয়?",
    answer:
      "www.uniontax.gov.bd অনলাইন সিস্টেমটি গত ২০১৯-২০ অর্থবছরে সম্ভব্যতা যাচাইয়ের মাধ্যমে চালু করা হয়।",
  },

  {
    question: "www.uniontax.gov.bd অনলাইন সিস্টেমটির শুভ উদ্বোধন কে করেন?",
    answer:
      "www.uniontax.gov.bd অনলাইন সিস্টেমটির শুভ উদ্বোধন করেন রংপুর বিভাগের মাননীয় বিভাগীয় কমিশনার জনাব মো: আব্দুল ওয়াহাব ভূঞা মহোদয়।",
  },

  {
    question: "ইউনিয়ন পরিষদ ডিজিটাল সেবা সফটওয়্যারটির উদ্দেশ্য কী?",
    answer:
      "ইউনিয়ন পরিষদ ডিজিটাল সেবা সফটওয়্যারটির উদ্দেশ্য হলো ইউনিয়ন পরিষদ থেকে প্রদত্ত সেবাসমূহকে জনগণের কাছে স্বল্প খরচে, স্বল্প সময়ে এবং হয়রানিমুক্তভাবে প্রদান নিশ্চিত করা।",
  },

  {
    question: "ক্যাশলেস ইউনিয়ন সেবা সিস্টেমে কিউআর কোডের ব্যবহার কী?",
    answer:
      "ক্যাশলেস ইউনিয়ন সেবা সিস্টেমে সনদপত্র এবং রশিদে কিউআর কোড যুক্ত করা হয়। এই কোড স্ক্যান করে সেবাগ্রহীতারা যেকোনো সময় সনদপত্রের সত্যতা যাচাই করতে পারেন।",
  },
  {
    question:
      "ক্যাশলেস সেবা সিস্টেম চালুর ফলে ইউনিয়ন পরিষদের আয় কীভাবে প্রভাবিত হয়েছে?",
    answer:
      "ক্যাশলেস সেবা সিস্টেম চালুর ফলে ইউনিয়ন পরিষদের আয়ের স্বচ্ছতা নিশ্চিত হয়েছে। ডিজিটাল পেমেন্টের মাধ্যমে ফি সরাসরি ইউনিয়ন পরিষদের ব্যাংক অ্যাকাউন্টে জমা হয়, যা অর্থ তছরুপের সম্ভাবনা কমিয়ে দিয়েছে।",
  },
  {
    question: "ক্যাশলেস সেবা সিস্টেমে হোল্ডিং ট্যাক্স কীভাবে পরিশোধ করা যায়?",
    answer:
      "ক্যাশলেস সেবা সিস্টেমের মাধ্যমে হোল্ডিং ট্যাক্স অনলাইনে পরিশোধ করা যায়। নগদ বা বিকাশের মতো ডিজিটাল পেমেন্ট পদ্ধতি ব্যবহার করে টাকা সরাসরি ইউনিয়ন পরিষদের অ্যাকাউন্টে জমা দেওয়া হয়।",
  },
  {
    question: "ক্যাশলেস সেবা সিস্টেমে সেবাগ্রহীতাদের কী কী সুবিধা রয়েছে?",
    answer:
      "ক্যাশলেস সেবা সিস্টেমে সেবাগ্রহীতারা সময়, অর্থ এবং ভ্রমণ খরচ সাশ্রয় করতে পারেন। এছাড়া, অনলাইনে আবেদন এবং ফি পরিশোধের মাধ্যমে হয়রানিমুক্ত সেবা পাওয়া যায়।",
  },
  {
    question: "ক্যাশলেস সেবা সিস্টেমে ট্রেড লাইসেন্সের আবেদন কীভাবে করা যায়?",
    answer:
      "ট্রেড লাইসেন্সের জন্য আবেদন করতে www.uniontax.gov.bd ওয়েবসাইটে গিয়ে প্রয়োজনীয় তথ্য দিয়ে আবেদন করুন এবং অনলাইনে ফি পরিশোধ করুন। আবেদন অনুমোদিত হলে সনদপত্র ডাউনলোড করা যাবে।",
  },
  {
    question:
      "ক্যাশলেস সেবা সিস্টেমে সেবাগ্রহীতাদের উপস্থিতি কীভাবে প্রভাবিত হয়েছে?",
    answer:
      "ক্যাশলেস সেবা সিস্টেম চালুর ফলে ইউনিয়ন পরিষদে সেবাগ্রহীতাদের উপস্থিতি উল্লেখযোগ্যভাবে হ্রাস পেয়েছে। অনলাইনে সেবা পাওয়ার সুবিধার কারণে তাদের ইউনিয়ন পরিষদে আসার প্রয়োজন হয় না।",
  },
  {
    question: "ক্যাশলেস সেবা সিস্টেমে অর্থ তছরুপের সম্ভাবনা কীভাবে কমেছে?",
    answer:
      "ক্যাশলেস সেবা সিস্টেমে ফি সরাসরি ইউনিয়ন পরিষদের ব্যাংক অ্যাকাউন্টে জমা হয়, যা নগদ অর্থ আদায়ের সময় হওয়া তছরুপের সম্ভাবনা কমিয়ে দিয়েছে।",
  },
  {
    question:
      "ক্যাশলেস সেবা সিস্টেমে সেবাগ্রহীতারা কীভাবে ফিডব্যাক দিতে পারেন?",
    answer:
      "সেবাগ্রহীতারা ওয়েবসাইটের মাধ্যমে বা সংশ্লিষ্ট ইউনিয়ন পরিষদে সরাসরি ফিডব্যাক দিতে পারেন। এছাড়া, সেবার মান উন্নয়নের জন্য তাদের মতামত গুরুত্বপূর্ণ।",
  },
  {
    question: "ক্যাশলেস সেবা সিস্টেমে সেবাগ্রহীতারা কীভাবে সনদপত্র পাবেন?",
    answer:
      "আবেদন অনুমোদিত হলে সেবাগ্রহীতার মুঠোফোন এবং ই-মেইলে একটি বার্তা পাঠানো হবে। সনদপত্রটি ডাউনলোড করে নেওয়া যাবে এবং এতে সংশ্লিষ্ট কর্তৃপক্ষের স্বাক্ষর থাকবে।",
  },
  {
    question: "ক্যাশলেস সেবা সিস্টেমে সেবাগ্রহীতারা কীভাবে ফি পরিশোধ করেন?",
    answer:
      "সেবাগ্রহীতারা অনলাইনে বিকাশ, নগদ বা অন্যান্য ডিজিটাল পেমেন্ট সিস্টেমের মাধ্যমে ফি পরিশোধ করতে পারেন। ফি পরিশোধের পর তারা একটি প্রাপ্তি স্বীকারপত্র এবং রসিদ পাবেন।",
  },
  {
    question:
      "ইউনিয়ন পরিষদ ডিজিটাল সেবা সফটওয়্যারটির মাধ্যমে কী কী সেবা প্রদান করা হয়?",
    answer:
      "ইউনিয়ন পরিষদ ডিজিটাল সেবা সফটওয়্যারটির মাধ্যমে নাগরিকত্ব সনদ, ট্রেড লাইসেন্স, ওয়ারিশান সনদ, উত্তরাধিকারী সনদ, বিবিধ প্রত্যয়নপত্র, চারিত্রিক সনদ, ভূমিহীন সনদ, পারিবারিক সনদ, অবিবাহিত সনদ, পুনঃ বিবাহ না হওয়া, বার্ষিক আয়ের প্রত্যয়ন, একই নামের প্রত্যয়ন, প্রতিবন্ধী সনদপত্র, অনাপত্তি সনদপত্র, আর্থিক অস্বচ্ছলতার সনদপত্র ইত্যাদি সেবা প্রদান করা হয়।",
  },
];
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "হ্যালো, আমি আপনার ইউনিয়ন পরিষদ ডিজিটাল সেবা সহকারী। আমি আপনাকে কিভাবে সাহায্য করতে পারি?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  //   useEffect(() => {
  //     const lastMessage = messages[messages.length - 1];
  //     if (lastMessage && lastMessage.sender === "bot") {
  //       const beepSound = new Audio("/message-tune.mp3");
  //       beepSound.currentTime = 0;
  //       beepSound.play().catch((error) => {
  //         console.error("Failed to play beep sound:", error);
  //       });
  //     }
  //   }, [messages]);
  const findNearestQuestion = (
    input: string,
    questions: QAPair[]
  ): QAPair | null => {
    const inputWords = input.toLowerCase().split(/\s+/);

    for (const question of questions) {
      const questionWords = question.question.toLowerCase().split(/\s+/);
      const match = inputWords.some((inputWord) =>
        questionWords.some((questionWord) => questionWord.includes(inputWord))
      );

      if (match) {
        return question;
      }
    }

    return null;
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");

      setIsBotTyping(true); // Show typing indicator

      // Simulate bot response
      setTimeout(() => {
        const lowerCaseInput = inputValue.toLowerCase();
        let botResponse = "";

        // Check for common phrases
        if (["hi", "hello", "hey", "হাই", "হ্যালো"].includes(lowerCaseInput)) {
          botResponse =
            "হ্যালো! ইউনিয়ন পরিষদ ডিজিটাল সেবায় আপনাকে স্বাগতম। আমি আপনাকে কিভাবে সাহায্য করতে পারি? 😊";
        } else if (
          [
            "no thanks",
            "no thank you",
            "not now",
            "না ধন্যবাদ",
            "আরেকবার",
          ].includes(lowerCaseInput)
        ) {
          botResponse =
            "কোন সমস্যা নেই! প্রয়োজনে আবার যোগাযোগ করুন। আমরা আপনার সাহায্যের জন্য এখানে আছি।";
        } else if (["ok", "okay", "ঠিক আছে"].includes(lowerCaseInput)) {
          botResponse =
            "বুঝেছি! যদি ইউনিয়ন পরিষদের সেবা সম্পর্কে আপনার কোনো প্রশ্ন থাকে, তাহলে আমাকে জানান।";
        } else if (
          ["bye", "goodbye", "see you", "বিদায়"].includes(lowerCaseInput)
        ) {
          botResponse =
            "বিদায়! ইউনিয়ন পরিষদ ডিজিটাল সেবা ব্যবহার করার জন্য ধন্যবাদ। আবার আসবেন!";
        } else if (
          ["thanks", "thank you", "ধন্যবাদ"].includes(lowerCaseInput)
        ) {
          botResponse =
            "আপনাকে স্বাগতম! আমরা আপনাকে সাহায্য করতে পেরে খুশি। আর কোনো সাহায্য প্রয়োজন হলে জানাবেন।";
        } else if (
          ["how are you", "how's it going", "কেমন আছেন"].includes(
            lowerCaseInput
          )
        ) {
          botResponse =
            "আমি একটি বট, কিন্তু ইউনিয়ন পরিষদের সেবা নিয়ে আপনাকে সাহায্য করতে এখানে আছি। আজকে আমি আপনাকে কিভাবে সাহায্য করতে পারি?";
        } else if (
          ["what can you do", "help", "সাহায্য"].includes(lowerCaseInput)
        ) {
          botResponse =
            "আমি আপনাকে ট্রেড লাইসেন্স, চারিত্রিক সনদ, ভূমিহীন সনদ, ওয়ারিশ সনদ ইত্যাদি সেবা সম্পর্কে সাহায্য করতে পারি। জিজ্ঞাসা করুন!";
        } else if (
          ["tell me a joke", "joke", "রসিকতা"].includes(lowerCaseInput)
        ) {
          botResponse =
            "অবশ্যই! ইউনিয়ন পরিষদ কেন ডিজিটাল হলো? কারণ কাগজের কাজে কেউ যেন হারিয়ে না যায়! 😄";
        } else if (
          [
            "what's your name",
            "who are you",
            "তোমার নাম কি",
            "তুমি কে",
          ].includes(lowerCaseInput)
        ) {
          botResponse =
            "আমি ইউনিয়ন পরিষদ ডিজিটাল সেবার সহকারী, আপনাকে অনলাইন সেবা সম্পর্কে সাহায্য করতে এখানে আছি। আজকে আমি আপনাকে কিভাবে সাহায্য করতে পারি?";
        } else if (
          ["i need help", "help me", "আমার সাহায্য প্রয়োজন"].includes(
            lowerCaseInput
          )
        ) {
          botResponse =
            "অবশ্যই! আপনি কোন সেবা সম্পর্কে সাহায্য চান—সনদপত্র, লাইসেন্স, বা অন্য কিছু?";
        } else if (
          ["is this service free", "is it free", "এটা কি বিনামূল্যে"].includes(
            lowerCaseInput
          )
        ) {
          botResponse =
            "হ্যাঁ, বেশিরভাগ ইউনিয়ন পরিষদ সেবা নামমাত্র খরচে প্রদান করা হয়। কিছু সেবার জন্য সরকারি নিয়ম অনুযায়ী ফি প্রদান করতে হতে পারে।";
        } else if (
          [
            "how do i apply for a certificate",
            "apply for certificate",
            "সনদপত্রের জন্য আবেদন কিভাবে করব",
          ].includes(lowerCaseInput)
        ) {
          botResponse =
            "আপনি আমাদের ওয়েবসাইট www.uniontax.gov.bd-এ গিয়ে অনলাইনে সনদপত্রের জন্য আবেদন করতে পারেন। রেজিস্টার করুন, প্রয়োজনীয় তথ্য পূরণ করুন এবং আবেদন জমা দিন।";
        } else if (
          ["how is privacy ensured", "privacy", "গোপনীয়তা"].includes(
            lowerCaseInput
          )
        ) {
          botResponse =
            "আপনার গোপনীয়তা আমাদের অগ্রাধিকার। ইউনিয়ন পরিষদ ডিজিটাল সেবা প্ল্যাটফর্মে জমা দেওয়া সমস্ত তথ্য সুরক্ষিত এবং এনক্রিপ্টেড।";
        } else if (
          [
            "how can i contact support",
            "contact support",
            "সাপোর্টে কিভাবে যোগাযোগ করব",
          ].includes(lowerCaseInput)
        ) {
          botResponse =
            "আপনি আমাদের <a href='/contact' target='_blank'>যোগাযোগ পৃষ্ঠা</a> ভিজিট করে বা <a href='mailto:support@uniontax.gov.bd'>support@uniontax.gov.bd</a> ইমেইল করে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে পারেন। ";
        } else {
          // Check for exact or partial matches with predefined questions
          const matchedQuestion = predefinedQuestions.find(
            (q) => q.question.toLowerCase() === lowerCaseInput
          );

          if (matchedQuestion) {
            botResponse = matchedQuestion.answer;
          } else {
            // Find the nearest question based on partial match
            const nearestQuestion = findNearestQuestion(
              inputValue,
              predefinedQuestions
            );

            if (nearestQuestion) {
              botResponse = `আপনি কি এটি জিজ্ঞাসা করতে চেয়েছিলেন: "${nearestQuestion.question}"? উত্তর হলো: ${nearestQuestion.answer}`;
            } else {
              botResponse =
                "দুঃখিত, আমি বুঝতে পারিনি। অনুগ্রহ করে আপনার প্রশ্নটি আবার লিখুন বা নিচের সাজেস্টেড প্রশ্নগুলি থেকে একটি বেছে নিন।";
            }
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            text: botResponse,
            sender: "bot",
          },
        ]);
        setIsBotTyping(false); // Hide typing indicator

        setShowSuggestions(true);
      }, 1000);
    }
  };
  const handleSuggestedQuestionClick = (question: string) => {
    // Add the user's selected question to the messages
    setMessages((prev) => [...prev, { text: question, sender: "user" }]);

    setIsBotTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const matchedQuestion = predefinedQuestions.find(
        (q) => q.question.toLowerCase() === question.toLowerCase()
      );

      if (matchedQuestion) {
        setMessages((prev) => [
          ...prev,
          {
            text: matchedQuestion.answer,
            sender: "bot",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "I'm sorry, I don't understand. Can you rephrase or choose another question?",
            sender: "bot",
          },
        ]);
      }
      setIsBotTyping(false); // Hide typing indicator
      setShowSuggestions(true);
    }, 1000);
  };

  const renderSuggestedQuestions = () => {
    if (!showSuggestions) return null;

    // Shuffle the predefined questions to make them random
    const shuffledQuestions = [...predefinedQuestions].sort(
      () => Math.random() - 0.5
    );

    // Filter out the questions that have already been asked
    const filteredQuestions = shuffledQuestions.filter(
      (q) => !messages.some((msg) => msg.text === q.question)
    );

    // If no nearest questions are found, use the filtered list
    const nearestQuestions = predefinedQuestions
      .filter((q) => findNearestQuestion(inputValue, [q]))
      .slice(0, 2);

    // If nearestQuestions is empty, use the first 2 filtered questions
    let suggestions =
      nearestQuestions.length > 0
        ? nearestQuestions.filter(
            (q) => !messages.some((msg) => msg.text === q.question)
          )
        : filteredQuestions.slice(0, 2);

    // If no suggestions are available (all questions have been asked), reset the filter
    if (suggestions.length === 0) {
      suggestions = shuffledQuestions.slice(0, 2);
    }

    return (
      <div className="mb-3">
        <List
          dataSource={suggestions}
          renderItem={(item) => (
            <List.Item className="my-1 py-0 border-0">
              <Button
                className="border ms-auto overflow-hidden"
                type="link"
                onClick={() => handleSuggestedQuestionClick(item.question)}
              >
                {item.question}
              </Button>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-3 " style={{ zIndex: 999 }}>
      {!isOpen && (
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined style={{ fontSize: "24px" }} />}
          size="large"
          onClick={() => setIsOpen(true)}
          className="shadow"
          aria-label="Open chat"
          style={{
            width: "56px",
            height: "56px",
            zIndex: 100,
          }}
        />
      )}
      {isOpen && (
        <Card
          title="ইউনিয়ন ট্যাক্স চ্যাট"
          extra={
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            />
          }
          style={{
            width: "95%",
            maxWidth: 450,
            minWidth: 300,
            zIndex: 999,
          }}
          className="shadow w-100 "
        >
          <div
            ref={chatBoxRef}
            style={{
              height: `calc(${window.innerHeight * 0.5}px)`,
              overflowY: "auto",
              marginBottom: "16px",
            }}
          >
            <List
              className="mb-3"
              dataSource={messages}
              renderItem={(item) => (
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent:
                      item.sender === "user" ? "flex-end" : "flex-start",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        item.sender === "user" ? "#e6f7ff" : "#f0f0f0",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      maxWidth: "70%",
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                </List.Item>
              )}
            />
            {isBotTyping && (
              <List.Item className="d-flex justify-content-start">
                <div
                  className="bg-light p-2 rounded"
                  style={{ maxWidth: "70%" }}
                >
                  <span className="me-2">অপেক্ষা করুন</span>
                  <div className="d-inline-block">
                    <span
                      className="d-inline-block bg-secondary rounded-circle me-1"
                      style={{
                        width: "6px",
                        height: "6px",
                        animation: "bounce 1s infinite",
                      }}
                    />
                    <span
                      className="d-inline-block bg-secondary rounded-circle me-1"
                      style={{
                        width: "6px",
                        height: "6px",
                        animation: "bounce 1s infinite",
                        animationDelay: "0.2s",
                      }}
                    />
                    <span
                      className="d-inline-block bg-secondary rounded-circle"
                      style={{
                        width: "6px",
                        height: "6px",
                        animation: "bounce 1s infinite",
                        animationDelay: "0.4s",
                      }}
                    />
                  </div>
                </div>
              </List.Item>
            )}
          </div>
          {renderSuggestedQuestions()}
          <div className="d-flex">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSend}
              placeholder="Type a message..."
              className="flex-grow-1 me-2"
              style={{ flex: 1 }} // Ensure input field takes up available space
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              aria-label="Send message"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
