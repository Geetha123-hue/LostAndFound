package com.infosys.lostFoundApplication.bean;

public class ChatMessage {

    public enum MessageType {
        TEXT,            // normal text message
        IMAGE,           // image or media message
        SYSTEM,          // join / leave / info
        TYPING,          // typing indicator events
        READ_RECEIPT     // read receipt events
    }

    public enum MessageStatus {
        SENT,
        DELIVERED,
        READ
    }

    private String id;               // unique message id (UUID string)
    private String conversationId;   // which chat / DM this belongs to
    private MessageType type;        // TEXT / IMAGE / SYSTEM / ...
    private String sender;           // username or userId
    private String receiver;         // optional: for 1‑1 DM, can be null for groups
    private String content;          // text or URL for media
    private long timestamp;          // epoch millis
    private MessageStatus status;    // SENT / DELIVERED / READ

    public ChatMessage() {
    }

    public ChatMessage(String id,
                       String conversationId,
                       MessageType type,
                       String sender,
                       String receiver,
                       String content,
                       long timestamp,
                       MessageStatus status) {
        this.id = id;
        this.conversationId = conversationId;
        this.type = type;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.timestamp = timestamp;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }
}