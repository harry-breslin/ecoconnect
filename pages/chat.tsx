import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Chat.module.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I saw your bamboo cutlery set on the marketplace. Is it still available?",
      sender: "other",
      time: "10:00 AM",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=60",
      name: "Sarah Johnson",
    },
    {
      id: 2,
      text: "Hi Sarah! Yes, it is. Are you interested in trading for the coffee as mentioned?",
      sender: "me",
      time: "10:01 AM",
      avatar: "",
      name: "You",
    },
    {
      id: 3,
      text: "Absolutely! I can meet you at Wholefoods tomorrow around 2pm if that works for you?",
      sender: "other",
      time: "10:03 AM",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=60",
      name: "Sarah Johnson",
    },
    {
      id: 4,
      text: "That sounds perfect. I'll bring the set with me. Looking forward to it!",
      sender: "me",
      time: "10:05 AM",
      avatar: "",
      name: "You",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: "me",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatar: "",
          name: "You",
        },
      ]);
      setMessage("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Chat - EcoConnect</title>
        <meta
          name="description"
          content="Connect with other eco-conscious members"
        />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8faf7",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Navigation */}
        <nav
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            padding: "1.5rem 2rem",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#328E6E",
                textDecoration: "none",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>🌱</span> EcoConnect
            </Link>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Link href="/marketplace" className={styles.navLink}>
                Marketplace
              </Link>
              <Link href="/leaderboard" className={styles.navLink}>
                Leaderboard
              </Link>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#e1eecc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#328E6E",
                    fontWeight: 600,
                  }}
                >
                  Y
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main
          style={{
            maxWidth: "1200px",
            margin: "2rem auto",
            padding: "0 2rem",
            display: "flex",
            gap: "2rem",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: "300px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              padding: "1.5rem",
              height: "calc(100vh - 10rem)",
              position: "sticky",
              top: "7rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "#1a202c",
              }}
            >
              Active Conversations
            </h3>

            {/* Conversation List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[1, 2, 3].map((item) => (
                <div key={item} className={styles.conversationItem}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#e1eecc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=60"
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#1a202c",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {item == 1
                        ? "Sarah Johnson"
                        : item == 2
                        ? "Cody Fisher"
                        : "Kathryn Murphy"}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#718096",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item === 1
                        ? "Looking forward to it!"
                        : "Is the item still available?"}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#718096",
                      alignSelf: "flex-start",
                    }}
                  >
                    {item === 1 ? "10:05 AM" : "Yesterday"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 10rem)",
            }}
          >
            {/* Chat Header */}
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid #edf2f7",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#e1eecc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=60"
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#1a202c",
                  }}
                >
                  Sarah Johnson
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#718096",
                  }}
                >
                  Trading: Bamboo Cutlery Set ↔ Coffee at Wholefoods
                </p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#f0f7f4",
                    color: "#328E6E",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>View Listing</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "1.5rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.sender === "me" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0.8rem",
                      maxWidth: "80%",
                      alignItems: "flex-end",
                    }}
                  >
                    {msg.sender === "other" && (
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: "#e1eecc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={msg.avatar}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    <div>
                      {msg.sender === "other" && (
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#4a5568",
                            marginBottom: "0.3rem",
                            fontWeight: 500,
                          }}
                        >
                          {msg.name}
                        </p>
                      )}
                      <div
                        style={{
                          backgroundColor:
                            msg.sender === "me" ? "#328E6E" : "#f0f7f4",
                          color: msg.sender === "me" ? "white" : "#1a202c",
                          padding: "0.8rem 1.2rem",
                          borderRadius:
                            msg.sender === "me"
                              ? "18px 18px 0 18px"
                              : "18px 18px 18px 0",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                          lineHeight: 1.5,
                        }}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#718096",
                          marginTop: "0.3rem",
                          textAlign: msg.sender === "me" ? "right" : "left",
                        }}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSend}
              style={{
                padding: "1.5rem",
                borderTop: "1px solid #edf2f7",
                display: "flex",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  position: "relative",
                }}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className={styles.inputField}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#718096",
                    fontSize: "1.2rem",
                  }}
                >
                  😊
                </button>
              </div>
              <button
                type="submit"
                className={styles.sendButton}
                disabled={!message.trim()}
              >
                <span>Send</span>
                <span style={{ fontSize: "1.2rem" }}>↑</span>
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
