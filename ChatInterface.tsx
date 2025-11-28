import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Paperclip, Smile, CheckCheck, MessageCircle } from 'lucide-react';
import { Message, Sender } from '../types';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { Chat } from "@google/genai";
import { WHATSAPP_NUMBER } from '../constants';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! 👋 Welcome to Koddz Empire. I'm your AI assistant. How can I help you grow your business today?",
      sender: Sender.BOT,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Use a ref to persist the chat session across renders without causing re-initialization
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session once
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !chatSessionRef.current) return;

    const userMsgText = inputText;
    setInputText('');

    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMsgText,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    try {
      const responseText = await sendMessageToGemini(chatSessionRef.current, userMsgText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const openWhatsApp = () => {
    // Pre-fill a message for better conversion
    const text = encodeURIComponent("Hello Koddz Empire, I was chatting with your AI assistant and I'm interested in your services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-[#efeae2] shadow-2xl rounded-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-[#008069] text-white p-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#008069] font-bold text-xl overflow-hidden">
            <img src="https://picsum.photos/200/200?random=1" alt="Koddz Bot" className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-base leading-tight">Koddz Empire AI</h3>
            <span className="text-xs text-green-100 opacity-90">online</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white">
          <Video 
            size={20} 
            className="cursor-pointer opacity-80 hover:opacity-100" 
            onClick={openWhatsApp}
            title="Video Call on WhatsApp"
          />
          <Phone 
            size={20} 
            className="cursor-pointer opacity-80 hover:opacity-100" 
            onClick={openWhatsApp}
            title="Voice Call on WhatsApp"
          />
          <MoreVertical size={20} className="cursor-pointer opacity-80 hover:opacity-100" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 chat-bg relative">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-2 px-3 shadow-sm relative text-sm ${
                  msg.sender === Sender.USER
                    ? 'bg-[#d9fdd3] text-gray-800 rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <div className={`text-[10px] text-gray-500 mt-1 flex items-center ${msg.sender === Sender.USER ? 'justify-end gap-1' : 'justify-end'}`}>
                  {formatTime(msg.timestamp)}
                  {msg.sender === Sender.USER && <CheckCheck size={14} className="text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex w-full justify-start">
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          
          {/* Conversion Button inside chat */}
          <div className="flex justify-center my-4">
            <button 
              onClick={openWhatsApp}
              className="bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold py-2 px-4 rounded-full shadow-md flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <MessageCircle size={14} />
              HIRE US ON WHATSAPP
            </button>
          </div>
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] p-2 flex items-center gap-2">
        <div className="p-2 cursor-pointer text-gray-500 hover:text-gray-700">
           <Smile size={24} />
        </div>
        <div className="p-2 cursor-pointer text-gray-500 hover:text-gray-700">
           <Paperclip size={24} />
        </div>
        <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 py-2 px-4 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-gray-800 placeholder-gray-500"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {inputText.trim() ? (
            <button
              type="submit"
              className="p-3 bg-[#008069] text-white rounded-full hover:bg-[#006d59] transition-colors flex items-center justify-center"
            >
              <Send size={20} className="ml-0.5" />
            </button>
          ) : (
             <button
              type="button"
              className="p-3 text-gray-500 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
              onClick={openWhatsApp}
            >
              <span className="text-xl">🎤</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};