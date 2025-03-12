"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, X, Smile, MoreVertical, User, Image } from "lucide-react"
import "./ChatWidget.scss"

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "agent" | "system"
  timestamp: Date
  status?: "sending" | "sent" | "delivered" | "read" | "error"
  attachment?: {
    type: "image" | "file"
    url: string
    name: string
  }
}

export interface ChatWidgetProps {
  messages?: ChatMessage[]
  onSendMessage?: (message: string) => void
  onSendAttachment?: (file: File) => void
  agentName?: string
  agentStatus?: "online" | "offline" | "away"
  agentAvatar?: string
  className?: string
  placeholder?: string
  showHeader?: boolean
  showFooter?: boolean
  height?: string | number
}

export function ChatWidget({
  messages = [],
  onSendMessage,
  onSendAttachment,
  agentName = "Support Agent",
  agentStatus = "online",
  agentAvatar,
  className = "",
  placeholder = "Type a message...",
  showHeader = true,
  showFooter = true,
  height = "500px",
}: ChatWidgetProps) {
  const [inputValue, setInputValue] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages, isMinimized])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && onSendAttachment) {
      onSendAttachment(files[0])
      e.target.value = "" // Reset the input
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sending":
        return "⌛"
      case "sent":
        return "✓"
      case "delivered":
        return "✓✓"
      case "read":
        return <span className="chat-widget__message-status chat-widget__message-status--read">✓✓</span>
      case "error":
        return "!"
      default:
        return null
    }
  }

  return (
    <div
      className={`chat-widget ${isMinimized ? "chat-widget--minimized" : ""} ${className}`}
      style={{ height: isMinimized ? "auto" : height }}
    >
      {showHeader && (
        <div className="chat-widget__header">
          <div className="chat-widget__agent">
            <div className="chat-widget__avatar">
              {agentAvatar ? (
                <img src={agentAvatar || "/placeholder.svg"} alt={agentName} />
              ) : (
                <User className="chat-widget__avatar-placeholder" />
              )}
              <span className={`chat-widget__status chat-widget__status--${agentStatus}`}></span>
            </div>
            <div className="chat-widget__agent-info">
              <div className="chat-widget__agent-name">{agentName}</div>
              <div className="chat-widget__agent-status">{agentStatus}</div>
            </div>
          </div>
          <div className="chat-widget__actions">
            <button className="chat-widget__action-btn" aria-label="More options">
              <MoreVertical size={18} />
            </button>
            <button
              className="chat-widget__action-btn"
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? "+" : <X size={18} />}
            </button>
          </div>
        </div>
      )}

      {!isMinimized && (
        <>
          <div className="chat-widget__messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-widget__message chat-widget__message--${message.sender}`}>
                {message.attachment && (
                  <div className="chat-widget__attachment">
                    {message.attachment.type === "image" ? (
                      <img src={message.attachment.url || "/placeholder.svg"} alt={message.attachment.name} />
                    ) : (
                      <div className="chat-widget__file">
                        <Image size={24} />
                        <span>{message.attachment.name}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="chat-widget__message-content">{message.content}</div>
                <div className="chat-widget__message-meta">
                  <span className="chat-widget__message-time">{formatTime(message.timestamp)}</span>
                  <span className="chat-widget__message-status">{getStatusIcon(message.status)}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showFooter && (
            <div className="chat-widget__footer">
              <button className="chat-widget__footer-btn" onClick={handleAttachmentClick} aria-label="Attach file">
                <Paperclip size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="chat-widget__file-input"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              <textarea
                className="chat-widget__input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                rows={1}
              />
              <button className="chat-widget__footer-btn" aria-label="Add emoji">
                <Smile size={18} />
              </button>
              <button
                className="chat-widget__footer-btn chat-widget__send-btn"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

