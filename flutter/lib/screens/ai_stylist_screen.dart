// lib/screens/ai_stylist_screen.dart
// Connects to /api/stylist (your Next.js backend) via HTTP streaming.
// For standalone Flutter APK: replace apiBaseUrl with your deployed URL.

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import '../main.dart';

// ─── Change this to your deployed TIKISH.UZ URL ──────────────────────────────
const String kApiBaseUrl = 'https://your-tikish-app.vercel.app';
// ─────────────────────────────────────────────────────────────────────────────

class _ChatMessage {
  final String role; // 'user' | 'assistant'
  final String text;
  const _ChatMessage({required this.role, required this.text});
}

const _suggestions = [
  (label: "To'y uchun",       emoji: "💍", desc: "kiyim tavsiya qiling"),
  (label: "Ofis uslubi",       emoji: "💼", desc: "professional ko'rinish"),
  (label: "Sayr va dam olish", emoji: "🌿", desc: "qulay va chiroyli"),
  (label: "Qishki kiyimlar",   emoji: "❄️", desc: "issiq va zamonaviy"),
  (label: "Milliy kiyim",      emoji: "🎨", desc: "an'anaviy uslub"),
  (label: "Rasmiy tadbir",     emoji: "✨", desc: "elegant ko'rinish"),
];

class AiStylistScreen extends StatefulWidget {
  const AiStylistScreen({super.key});
  @override
  State<AiStylistScreen> createState() => _AiStylistScreenState();
}

class _AiStylistScreenState extends State<AiStylistScreen> {
  final List<_ChatMessage> _messages = [];
  final TextEditingController _input  = TextEditingController();
  final ScrollController _scroll      = ScrollController();
  bool _streaming = false;

  @override
  void dispose() {
    _input.dispose();
    _scroll.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) {
        _scroll.animateTo(
          _scroll.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty || _streaming) return;
    _input.clear();

    setState(() {
      _messages.add(_ChatMessage(role: 'user', text: text.trim()));
      _streaming = true;
    });
    _scrollToBottom();

    // Build messages payload matching AI SDK format
    final payload = {
      'messages': _messages.map((m) => {'role': m.role, 'content': m.text}).toList(),
    };

    // Placeholder assistant message for streaming
    setState(() => _messages.add(const _ChatMessage(role: 'assistant', text: '')));
    final assistantIdx = _messages.length - 1;

    try {
      final request = http.Request('POST', Uri.parse('$kApiBaseUrl/api/stylist'))
        ..headers['Content-Type'] = 'application/json'
        ..body = jsonEncode(payload);

      final response = await http.Client().send(request);
      final stream = response.stream.transform(utf8.decoder);
      final buffer = StringBuffer();

      await for (final chunk in stream) {
        // Parse SSE data lines
        for (final line in chunk.split('\n')) {
          if (line.startsWith('0:')) {
            // Text delta format from AI SDK
            try {
              final raw = line.substring(2).trim();
              if (raw.isNotEmpty) {
                final decoded = jsonDecode(raw) as String;
                buffer.write(decoded);
                setState(() {
                  _messages[assistantIdx] = _ChatMessage(
                    role: 'assistant', text: buffer.toString());
                });
                _scrollToBottom();
              }
            } catch (_) {}
          }
        }
      }
    } catch (e) {
      setState(() {
        _messages[assistantIdx] = _ChatMessage(
          role: 'assistant',
          text: "Kechirasiz, xatolik yuz berdi. Qayta urinib ko'ring.");
      });
    } finally {
      setState(() => _streaming = false);
      _scrollToBottom();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(children: [
        // Header
        Container(
          color: kDark,
          child: SafeArea(
            bottom: false,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 12),
              child: Column(children: [
                Row(children: [
                  // Back
                  GestureDetector(
                    onTap: () => context.go('/home'),
                    child: Container(
                      width: 36, height: 36,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white.withOpacity(0.1)),
                      child: const Icon(Icons.arrow_back_ios_new, size: 16, color: Colors.white),
                    ),
                  ),
                  const Spacer(),
                  Column(children: [
                    Row(mainAxisSize: MainAxisSize.min, children: [
                      Container(
                        width: 28, height: 28,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: kPrimary.withOpacity(0.2)),
                        child: const Icon(Icons.auto_awesome, size: 14, color: kPrimary),
                      ),
                      const SizedBox(width: 8),
                      Text("AI Stilist",
                        style: GoogleFonts.playfairDisplay(
                          fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                    ]),
                    Text(
                      _streaming ? "Yozmoqda..." : "Onlayn • Tayyor",
                      style: GoogleFonts.inter(fontSize: 10, color: Colors.white54)),
                  ]),
                  const Spacer(),
                  // Reset
                  GestureDetector(
                    onTap: () => setState(() => _messages.clear()),
                    child: Container(
                      width: 36, height: 36,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white.withOpacity(0.1)),
                      child: const Icon(Icons.refresh, size: 16, color: Colors.white70),
                    ),
                  ),
                ]),

                // Suggestion chips — only show when no messages
                if (_messages.isEmpty) ...[
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.06),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(children: [
                      Text("Qanday yordam kerak?",
                        style: GoogleFonts.inter(fontSize: 11, color: Colors.white60)),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 8, runSpacing: 8,
                        children: _suggestions.map((s) => GestureDetector(
                          onTap: () => _sendMessage("${s.label} uchun ${s.desc}"),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(
                              color: kPrimary.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: kPrimary.withOpacity(0.25)),
                            ),
                            child: Row(mainAxisSize: MainAxisSize.min, children: [
                              Text(s.emoji, style: const TextStyle(fontSize: 14)),
                              const SizedBox(width: 6),
                              Text(s.label, style: GoogleFonts.inter(
                                fontSize: 11, fontWeight: FontWeight.w600, color: Colors.white)),
                            ]),
                          ),
                        )).toList(),
                      ),
                    ]),
                  ),
                ],
              ]),
            ),
          ),
        ),

        // Messages list
        Expanded(
          child: _messages.isEmpty
            ? _EmptyState()
            : ListView.builder(
                controller: _scroll,
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                itemCount: _messages.length + (_streaming && _messages.last.text.isEmpty ? 0 : 0),
                itemBuilder: (_, i) {
                  final msg = _messages[i];
                  final isUser = msg.role == 'user';
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Row(
                      mainAxisAlignment: isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        if (!isUser) ...[
                          Container(
                            width: 28, height: 28,
                            decoration: const BoxDecoration(shape: BoxShape.circle, color: kDark),
                            child: const Icon(Icons.auto_awesome, size: 13, color: kPrimary),
                          ),
                          const SizedBox(width: 8),
                        ],
                        Flexible(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                            constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.78),
                            decoration: BoxDecoration(
                              color: isUser ? kPrimary : const Color(0xFFfdf0f5),
                              borderRadius: BorderRadius.only(
                                topLeft: const Radius.circular(18),
                                topRight: const Radius.circular(18),
                                bottomLeft: Radius.circular(isUser ? 18 : 4),
                                bottomRight: Radius.circular(isUser ? 4 : 18),
                              ),
                            ),
                            child: msg.text.isEmpty && !isUser
                              ? _TypingDots()
                              : Text(msg.text,
                                  style: GoogleFonts.inter(
                                    fontSize: 13, height: 1.5,
                                    color: isUser ? Colors.white : kDark)),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
        ),

        // Input bar
        Container(
          padding: const EdgeInsets.fromLTRB(14, 10, 14, 20),
          decoration: const BoxDecoration(
            color: Colors.white,
            border: Border(top: BorderSide(color: Color(0xFFf0e4eb))),
          ),
          child: Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
            Expanded(
              child: Container(
                constraints: const BoxConstraints(maxHeight: 100),
                decoration: BoxDecoration(
                  color: const Color(0xFFfdf0f5),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFf0e4eb), width: 1.5),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                child: TextField(
                  controller: _input,
                  maxLines: null,
                  style: GoogleFonts.inter(fontSize: 13, color: kDark),
                  decoration: InputDecoration.collapsed(
                    hintText: "Kiyim haqida so'rang...",
                    hintStyle: GoogleFonts.inter(fontSize: 13, color: const Color(0xFFc4b0bc)),
                  ),
                  onSubmitted: _sendMessage,
                ),
              ),
            ),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: () => _sendMessage(_input.text),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                width: 42, height: 42,
                decoration: BoxDecoration(
                  color: _input.text.trim().isNotEmpty && !_streaming
                    ? kPrimary : const Color(0xFFf0e4eb),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(Icons.send_rounded, size: 18,
                  color: _input.text.trim().isNotEmpty && !_streaming
                    ? Colors.white : const Color(0xFFc4b0bc)),
              ),
            ),
          ]),
        ),
      ]),
    );
  }
}

class _EmptyState extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Container(
          width: 64, height: 64,
          decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFFfdf0f5)),
          child: const Icon(Icons.auto_awesome, size: 28, color: kPrimary),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: 260,
          child: Text(
            "Assalomu alaykum! Men sizning shaxsiy uslub maslahatchiingizman. Yuqoridagi variantlardan birini tanlang yoki savolingizni yozing.",
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 13, color: kMuted, height: 1.6),
          ),
        ),
      ]),
    );
  }
}

class _TypingDots extends StatefulWidget {
  @override
  State<_TypingDots> createState() => _TypingDotsState();
}

class _TypingDotsState extends State<_TypingDots> with TickerProviderStateMixin {
  late List<AnimationController> _ctrls;
  late List<Animation<double>> _anims;

  @override
  void initState() {
    super.initState();
    _ctrls = List.generate(3, (i) => AnimationController(
      vsync: this, duration: const Duration(milliseconds: 400),
    )..repeat(reverse: true, period: Duration(milliseconds: 900 + i * 150)));
    _anims = _ctrls.map((c) => Tween(begin: 0.0, end: -5.0).animate(
      CurvedAnimation(parent: c, curve: Curves.easeInOut))).toList();
  }

  @override
  void dispose() { for (final c in _ctrls) c.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisSize: MainAxisSize.min, children: List.generate(3, (i) =>
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 2),
        child: AnimatedBuilder(
          animation: _anims[i],
          builder: (_, __) => Transform.translate(
            offset: Offset(0, _anims[i].value),
            child: Container(
              width: 7, height: 7,
              decoration: const BoxDecoration(shape: BoxShape.circle, color: kPrimary)),
          ),
        ),
      )
    ));
  }
}
