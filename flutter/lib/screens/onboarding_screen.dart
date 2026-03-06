// lib/screens/onboarding_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class _OnboardPage {
  final String emoji;
  final String title;
  final String subtitle;
  const _OnboardPage({required this.emoji, required this.title, required this.subtitle});
}

const _pages = [
  _OnboardPage(
    emoji: '📍',
    title: "Yaqin tikuvchilarni toping",
    subtitle: "Joylashuvingizga asosan eng yaxshi tikuvchilarni xaritada ko'ring va tanlang.",
  ),
  _OnboardPage(
    emoji: '👗',
    title: "Portfolio va narxlarni solishtiring",
    subtitle: "Har bir tikuvchining ishlari, reytingi va narxlarini batafsil ko'ring.",
  ),
  _OnboardPage(
    emoji: '🔒',
    title: "Xavfsiz to'lov va kafolat",
    subtitle: "Buyurtmangizni xavfsiz bajaring. To'lov faqat ish tayyor bo'lganda o'tkaziladi.",
  ),
];

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});
  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageCtrl = PageController();
  int _page = 0;

  void _next() {
    if (_page < _pages.length - 1) {
      _pageCtrl.nextPage(duration: const Duration(milliseconds: 350), curve: Curves.easeOut);
    } else {
      context.go('/login');
    }
  }

  @override
  void dispose() {
    _pageCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Skip
            Align(
              alignment: Alignment.topRight,
              child: TextButton(
                onPressed: () => context.go('/login'),
                child: Text("O'tkazib yuborish",
                  style: GoogleFonts.inter(fontSize: 13, color: kMuted, fontWeight: FontWeight.w500)),
              ),
            ),

            // Pages
            Expanded(
              child: PageView.builder(
                controller: _pageCtrl,
                onPageChanged: (i) => setState(() => _page = i),
                itemCount: _pages.length,
                itemBuilder: (_, i) => _OnboardPageWidget(page: _pages[i]),
              ),
            ),

            // Dots
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_pages.length, (i) {
                final active = i == _page;
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 250),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: active ? 24 : 8, height: 8,
                  decoration: BoxDecoration(
                    color: active ? kPrimary : kBorder,
                    borderRadius: BorderRadius.circular(4),
                  ),
                );
              }),
            ),
            const SizedBox(height: 32),

            // Next button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _next,
                  child: Text(_page == _pages.length - 1 ? "Boshlash" : "Keyingisi"),
                ),
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _OnboardPageWidget extends StatelessWidget {
  final _OnboardPage page;
  const _OnboardPageWidget({required this.page});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 140, height: 140,
            decoration: BoxDecoration(
              color: const Color(0xFFfdf0f5),
              borderRadius: BorderRadius.circular(40),
            ),
            child: Center(child: Text(page.emoji, style: const TextStyle(fontSize: 64))),
          ),
          const SizedBox(height: 40),
          Text(page.title,
            textAlign: TextAlign.center,
            style: GoogleFonts.playfairDisplay(
              fontSize: 26, fontWeight: FontWeight.w700, color: kDark, height: 1.25)),
          const SizedBox(height: 16),
          Text(page.subtitle,
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 14, color: kMuted, height: 1.6)),
        ],
      ),
    );
  }
}
