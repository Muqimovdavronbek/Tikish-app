// lib/screens/splash_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _logoScale;
  late Animation<double> _logoOpacity;
  late Animation<double> _taglineOpacity;
  late Animation<Offset> _taglineSlide;
  late Animation<double> _dotsOpacity;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 2200));

    _logoScale   = Tween(begin: 0.6, end: 1.0).animate(CurvedAnimation(parent: _ctrl, curve: const Interval(0.0, 0.4, curve: Curves.easeOutBack)));
    _logoOpacity = Tween(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _ctrl, curve: const Interval(0.0, 0.35, curve: Curves.easeIn)));
    _taglineOpacity = Tween(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _ctrl, curve: const Interval(0.35, 0.65, curve: Curves.easeIn)));
    _taglineSlide = Tween(begin: const Offset(0, 0.4), end: Offset.zero).animate(CurvedAnimation(parent: _ctrl, curve: const Interval(0.35, 0.65, curve: Curves.easeOut)));
    _dotsOpacity  = Tween(begin: 0.0, end: 1.0).animate(CurvedAnimation(parent: _ctrl, curve: const Interval(0.5, 0.75, curve: Curves.easeIn)));

    _ctrl.forward();

    Future.delayed(const Duration(milliseconds: 2800), () {
      if (mounted) context.go('/onboarding');
    });
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Background circle decorations
          Positioned(top: -60, right: -60,
            child: Container(width: 220, height: 220,
              decoration: BoxDecoration(shape: BoxShape.circle,
                color: kPrimary.withOpacity(0.07)))),
          Positioned(bottom: -80, left: -80,
            child: Container(width: 260, height: 260,
              decoration: BoxDecoration(shape: BoxShape.circle,
                color: const Color(0xFFf9a8c9).withOpacity(0.1)))),

          // Main content
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 40),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Logo mark
                  AnimatedBuilder(
                    animation: _ctrl,
                    builder: (_, __) => Transform.scale(
                      scale: _logoScale.value,
                      child: Opacity(
                        opacity: _logoOpacity.value,
                        child: Container(
                          width: 100, height: 100,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(28),
                            gradient: const LinearGradient(
                              begin: Alignment.topLeft, end: Alignment.bottomRight,
                              colors: [kPrimary, Color(0xFFf9a8c9)],
                            ),
                            boxShadow: [BoxShadow(
                              color: kPrimary.withOpacity(0.35),
                              blurRadius: 30, offset: const Offset(0, 12),
                            )],
                          ),
                          child: const Center(
                            child: Icon(Icons.content_cut, size: 44, color: Colors.white),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // App name
                  AnimatedBuilder(
                    animation: _ctrl,
                    builder: (_, __) => Opacity(
                      opacity: _logoOpacity.value,
                      child: Column(children: [
                        RichText(text: TextSpan(
                          style: GoogleFonts.playfairDisplay(fontSize: 38, fontWeight: FontWeight.w700, color: kDark),
                          children: const [
                            TextSpan(text: 'TIKISH'),
                            TextSpan(text: '.UZ', style: TextStyle(color: kPrimary)),
                          ],
                        )),
                        const SizedBox(height: 4),
                        Text('RAQAMLI ATELYE',
                          style: GoogleFonts.inter(
                            fontSize: 11, fontWeight: FontWeight.w700,
                            letterSpacing: 4, color: kPrimary,
                          )),
                      ]),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Tagline
                  AnimatedBuilder(
                    animation: _ctrl,
                    builder: (_, __) => SlideTransition(
                      position: _taglineSlide,
                      child: Opacity(
                        opacity: _taglineOpacity.value,
                        child: Text(
                          "Yaqin joydagi tikuvchilarni toping.\nSifatli kiyimlarni buyurtma qiling.",
                          textAlign: TextAlign.center,
                          style: GoogleFonts.inter(fontSize: 13, color: kMuted, height: 1.6),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),

                  // Loading dots
                  AnimatedBuilder(
                    animation: _ctrl,
                    builder: (_, __) => Opacity(
                      opacity: _dotsOpacity.value,
                      child: _LoadingDots(),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Bottom label
          Positioned(
            bottom: 32, left: 0, right: 0,
            child: Text("O'zbekistondagi #1 tikuvchi platformasi",
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(fontSize: 11, color: const Color(0xFFc4b0bc))),
          ),
        ],
      ),
    );
  }
}

class _LoadingDots extends StatefulWidget {
  @override
  State<_LoadingDots> createState() => _LoadingDotsState();
}

class _LoadingDotsState extends State<_LoadingDots> with TickerProviderStateMixin {
  late List<AnimationController> _ctrls;
  late List<Animation<double>> _anims;

  @override
  void initState() {
    super.initState();
    _ctrls = List.generate(3, (i) => AnimationController(
      vsync: this, duration: const Duration(milliseconds: 600),
    )..repeat(reverse: true, period: Duration(milliseconds: 1200 + i * 200)));
    _anims = _ctrls.map((c) => Tween(begin: 0.3, end: 1.0).animate(c)).toList();
  }

  @override
  void dispose() {
    for (final c in _ctrls) c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(3, (i) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: AnimatedBuilder(
            animation: _anims[i],
            builder: (_, __) => Transform.scale(
              scale: 0.8 + _anims[i].value * 0.3,
              child: Opacity(
                opacity: _anims[i].value,
                child: Container(
                  width: 8, height: 8,
                  decoration: const BoxDecoration(shape: BoxShape.circle, color: kPrimary),
                ),
              ),
            ),
          ),
        );
      }),
    );
  }
}
