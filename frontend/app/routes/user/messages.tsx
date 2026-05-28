import { DashboardPage } from '@/components/DashboardPage'

import { Send, Search, MoreVertical, Paperclip, Smile, Video } from 'lucide-react'

export function meta() {
  return [{ title: 'Tin nhắn | Học viên' }]
}

export default function UserMessagesPage() {
  const contacts = [
    { id: 1, name: 'Alex Johanson', role: 'Mentor ReactJS', avatar: 'AJ', active: true, lastMsg: 'Bạn có câu hỏi nào cho buổi chiều nay không?' },
    { id: 2, name: 'Sarah Chen', role: 'Mentor NodeJS', avatar: 'SC', active: false, lastMsg: 'Ok, mình đã nhận được tài liệu.' },
    { id: 3, name: 'John Smith', role: 'Mentor Design', avatar: 'JS', active: false, lastMsg: 'Hẹn gặp bạn vào thứ 2 tới nhé!' }
  ]

  return (
    <DashboardPage description='Trao đổi trực tiếp với các mentor của bạn.' title='Tin nhắn'>
      <div className="grid lg:grid-cols-[350px_1fr] h-[calc(100vh-280px)] min-h-[600px] rounded-3xl border border-slate-200/60 bg-white/70 glass-panel overflow-hidden">
        {/* Sidebar */}
        <div className="border-r border-slate-200/60 flex flex-col hidden lg:flex">
          <div className="p-6 border-b border-slate-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="text" placeholder="Tìm hội thoại..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {contacts.map((contact) => (
              <div key={contact.id} className={`p-4 rounded-2xl cursor-pointer transition-all flex gap-4 ${contact.active ? 'bg-primary/5 border border-primary/10 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold ${contact.active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-0.5">
                      <p className="font-bold text-ink text-sm truncate">{contact.name}</p>
                      <span className="text-[10px] text-muted">14:20</span>
                   </div>
                   <p className="text-xs text-muted truncate">{contact.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col h-full bg-white/30 backdrop-blur-sm">
          {/* Top Bar */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-sm">AJ</div>
              <div>
                <p className="font-bold text-ink">Alex Johanson</p>
                <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Đang hoạt động
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><Video size={18} /></button>
               <button className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><MoreVertical size={18} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
             <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-bold text-slate-500">AJ</div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-slate-100 shadow-sm text-sm text-ink leading-relaxed">
                   Chào bạn! Mình vừa xem qua bài tập của bạn. Rất tốt, đặc biệt là phần Tailwind CSS layout.
                </div>
             </div>
             
             <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                <div className="p-4 rounded-2xl rounded-tr-none bg-primary text-white shadow-soft text-sm leading-relaxed">
                   Dạ cảm ơn anh ạ! Em vẫn đang hơi vướng phần Framer Motion một chút, không biết chiều nay mình có thể đi sâu vào phần đó không?
                </div>
             </div>

             <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-xs font-bold text-slate-500">AJ</div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-slate-100 shadow-sm text-sm text-ink leading-relaxed">
                   Tất nhiên rồi! Bạn có câu hỏi nào cụ thể cho buổi chiều nay không?
                </div>
             </div>
          </div>

          {/* Input */}
          <div className="p-6 bg-white/80 border-t border-slate-100">
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
               <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Paperclip size={20} /></button>
               <input type="text" placeholder="Nhập tin nhắn..." className="flex-1 bg-transparent border-none outline-none text-sm px-2" />
               <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Smile size={20} /></button>
               <button className="p-3 rounded-xl bg-primary text-white shadow-soft hover:shadow-glow transition-all active:scale-95"><Send size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  )
}
