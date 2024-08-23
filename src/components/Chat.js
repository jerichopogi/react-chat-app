import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    const messageSubscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages((messages) => [...messages, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const { error } = await supabase
        .from('messages')
        .insert([{ content: newMessage, author: username }]); // Use the stored username
      if (error) {
        console.error('Error inserting message:', error);
      } else {
        setNewMessage('');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral p-4">
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-md">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="mb-3 p-2 bg-gray-100 rounded-lg">
              <strong className="text-primary">{message.author}:</strong> {message.content}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg p-2 border-accent"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-primary text-white p-2 rounded-lg shadow-md hover:bg-secondary transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
