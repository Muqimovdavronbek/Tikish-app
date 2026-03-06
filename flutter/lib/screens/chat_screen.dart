// lib/screens/chat_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class _Message {
  final String text, from; // 'me' | 'tailor'
  final DateTime time;
  const _Message({required this.text, required this.from, required this.time});
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _ctrl = TextEditingController();
  final ScrollController _scroll = ScrollController();

  final List<_Message> _messages = [
    _Message(text: "Assalomu alaykum! Qanday kiyim tiktirishni xohlaysiz?", from: 'tailor', time: DateTime.now().subtract(const Duration(minutes: 5))),
    _Message(text: "Ko'ylak tiktirishni xohlayman. S o'lchami kerak.", from: 'me', time: DateTime.now().subtract(const Duration(minutes: 4))),
    _Message(text: "Ajoyib! Material turini ko'rsating yoki bizda tayyor matolar ham bor.", from: 'tailor', time: DateTime.now().subtract(const Duration(minutes: 3))),
  ];

  void _send() {
    final text = _ctrl.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_Message(text: text, from: 'me', time: DateTime.now()));
      _ctrl.clear();
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) {
        _scroll.animateTo(_scroll.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
      }
    });
  }

  String _fmt(DateTime t) {
    return "${t.hour.toString().padLeft(2,'0')}:${t.minute.toString().padLeft(2,'0')}";
  }

  @override
  void dispose() { _ctrl.dispose(); _scroll.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFf7f3f5),
      appBar: AppBar(
        backgroundColor: kDark,
        leading: GestureDetector(
          onTap: () => context.go('/home'),
          child: const Icon(Icons.arrow_back_ios_new, size: 18, color: Colors.white),
        ),
        title: Row(children: [
          Container(
            width: 36, height: 36,
            decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.grey[300]),
            child: const Icon(Icons.person, size: 20, color: Colors.white),
          ),
          const SizedBox(width: 10),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text("Madina Umarova",
              style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.white)),
            Row(children: [
              Container(width: 6, height: 6,
                decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFF4ade80))),
              const SizedBox(width: 4),
              Text("Onlayn", style: GoogleFonts.inter(fontSize: 10, color: Colors.white54)),
            ]),
          ]),
        ]),
        actions: [
          IconButton(icon: const Icon(Icons.phone_outlined, color: Colors.white70), onPressed: () {}),
          IconButton(icon: const Icon(Icons.videocam_outlined, color: Colors.white70), onPressed: () {}),
        ],
      ),
      body: Column(children: [
        Expanded(
          child: ListView.builder(
            controller: _scroll,
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
            itemCount: _messages.length,
            itemBuilder: (_, i) {
              final msg = _messages[i];
              final isMe = msg.from == 'me';
              return Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Row(
                  mainAxisAlignment: isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    if (!isMe) ...[
                      Container(
                        width: 28, height: 28,
                        decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.grey[300]),
                        child: const Icon(Icons.person, size: 16, color: Colors.white),
                      ),
                      const SizedBox(width: 8),
                    ],
                    Column(
                      crossAxisAlignment: isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                      children: [
                        Container(
                          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          decoration: BoxDecoration(
                            color: isMe ? kPrimary : Colors.white,
                            borderRadius: BorderRadius.only(
                              topLeft: const Radius.circular(18),
                              topRight: const Radius.circular(18),
                              bottomLeft: Radius.circular(isMe ? 18 : 4),
                              bottomRight: Radius.circular(isMe ? 4 : 18),
                            ),
                            boxShadow: [BoxShadow(
                              color: Colors.black.withOpacity(0.05),
                              blurRadius: 6)],
                          ),
                          child: Text(msg.text,
                            style: GoogleFonts.inter(fontSize: 13, height: 1.4,
                              color: isMe ? Colors.white : kDark)),
                        ),
                        const SizedBox(height: 3),
                        Text(_fmt(msg.time),
                          style: GoogleFonts.inter(fontSize: 9, color: const Color(0xFFc4b0bc))),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ),

        // Input
        Container(
          padding: const EdgeInsets.fromLTRB(14, 8, 14, 24),
          decoration: const BoxDecoration(
            color: Colors.white,
            border: Border(top: BorderSide(color: Color(0xFFf0e4eb)))),
          child: Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
            IconButton(
              icon: const Icon(Icons.attach_file, color: kMuted),
              onPressed: () {},
            ),
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0xFFfdf0f5),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: kBorder),
                ),
                child: TextField(
                  controller: _ctrl,
                  maxLines: null,
                  style: GoogleFonts.inter(fontSize: 13, color: kDark),
                  decoration: InputDecoration.collapsed(
                    hintText: "Xabar yozing...",
                    hintStyle: GoogleFonts.inter(color: const Color(0xFFc4b0bc))),
                  onSubmitted: (_) => _send(),
                ),
              ),
            ),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: _send,
              child: Container(
                width: 42, height: 42,
                decoration: const BoxDecoration(shape: BoxShape.circle, color: kPrimary),
                child: const Icon(Icons.send_rounded, size: 18, color: Colors.white),
              ),
            ),
          ]),
        ),
      ]),
    );
  }
}
