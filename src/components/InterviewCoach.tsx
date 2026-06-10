import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, RefreshCw, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user' | 'system';
  text: string;
}

export default function InterviewCoach() {
  const [role, setRole] = useState('se');
  const [sessionActive, setSessionActive] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [turn, setTurn] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleStart = () => {
    setSessionActive(true);
    setTurn(0);
    
    let roleName = "Software Engineer";
    if (role === 'pm') roleName = "Product Manager";
    else if (role === 'da') roleName = "Data Analyst / Scientist";
    else if (role === 'bizdev') roleName = "Sales Representative";

    let question = `Welcome to the mock interview for the ${roleName} position. "Tell me about a time you solved a complex operational or structural bottleneck. What was your method?"`;
    
    if (role === 'pm') {
      question = `Welcome! Let's discuss product metrics. "Can you tell me about a time you launched a digital feature that failed to meet expectations? How did you pivot?"`;
    } else if (role === 'da') {
      question = `Hello! "Tell me about a time you had to clean a highly disorganized database or dataset. How did you structure the clean data?"`;
    } else if (role === 'bizdev') {
      question = `Great to meet you. "Tell me about a client negotiation that was on the verge of falling through. How did you turn it around?"`;
    }

    setChatHistory([
      { id: '1', sender: 'system', text: `Mock interview for ${roleName} started.` },
      { id: '2', sender: 'assistant', text: question }
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userInput
    };

    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');

    // Simulate AI thinking and response
    setTimeout(() => {
      const nextTurn = turn + 1;
      setTurn(nextTurn);

      let reply = "";
      if (nextTurn === 1) {
        reply = `Excellent. That details your initial approach well. For my next question: "How do you handle disagreement with a colleague or manager about the technical scope of a sprint?"`;
      } else if (nextTurn === 2) {
        reply = `Interesting perspective. Collaboration is key in modern cross-functional agile teams. "Finally, tell me what you seek from your next employer. What does a productive work culture look like to you?"`;
      } else {
        reply = `Fantastic answers. That concludes our practice session! Click "End Session & Get Report" below to compile your feedback data.`;
      }

      setChatHistory(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply
      }]);
    }, 1000);
  };

  const handleEnd = () => {
    setSessionActive(false);
    alert("Mock Interview evaluation compiled successfully! An optimization report summary has been sent to your email inbox.");
    setChatHistory([]);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Mic className="w-5 h-5 text-primary-600" />
          AI Mock Interview Coach
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Select your target role and click "Start Interview" to converse with our virtual career officer. You'll receive real-time answers evaluation.
        </p>
      </div>

      {!sessionActive ? (
        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Select Target Industry/Role</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-primary-600 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-sm"
            >
              <option value="se">Software Engineer (General)</option>
              <option value="pm">Product Manager</option>
              <option value="da">Data Analyst / Scientist</option>
              <option value="bizdev">Sales & Business Development</option>
            </select>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary-500/20 transition-all focus:outline-none"
          >
            Start Mock Interview
          </button>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[400px] bg-slate-50">
          {/* Header */}
          <div className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center font-title text-xs font-bold">
              AI
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Interviewer: Sarah (AI Talent Bot)</h4>
              <p className="text-[0.625rem] text-slate-400">Target Role: {role.toUpperCase()}</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3.5">
            {chatHistory.map(msg => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' 
                    ? 'ml-auto flex-row-reverse' 
                    : msg.sender === 'system' 
                      ? 'mx-auto' 
                      : ''
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary-600 shrink-0 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}

                <div 
                  className={`p-3 rounded-2xl text-[0.825rem] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : msg.sender === 'system'
                        ? 'bg-primary-50/70 border border-primary-200/40 text-primary-600 text-center text-[0.75rem] py-1 px-4 rounded-full font-medium shadow-none'
                        : 'bg-white border border-slate-200/60 text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Footer Input Bar */}
          <form onSubmit={handleSend} className="bg-white border-t border-slate-200/80 p-2.5 flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Type your answer here..."
              className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-800 focus:outline-none focus:border-primary-600 focus:bg-white text-xs font-medium"
            />
            <button 
              type="submit" 
              className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-md shadow-primary-500/10 transition-all focus:outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick actions bar */}
          <div className="bg-white border-t border-slate-100 px-4 py-2 flex justify-end">
            <button 
              onClick={handleEnd}
              className="text-[0.725rem] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition focus:outline-none"
            >
              <RefreshCw className="w-3 h-3" /> End Session & Get Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
