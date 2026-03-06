// lib/main.dart
// TIKISH.UZ - Flutter App Entry Point
// Run: flutter run  |  Build APK: flutter build apk --release

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';

import 'screens/splash_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/home_screen.dart';
import 'screens/tailor_profile_screen.dart';
import 'screens/order_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/ai_stylist_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/tailor_dashboard_screen.dart';

// ─── Color Tokens ────────────────────────────────────────────────────────────
const Color kPrimary = Color(0xFFe85d8a);
const Color kDark    = Color(0xFF1a1a2e);
const Color kPink    = Color(0xFFfdf0f5);
const Color kMuted   = Color(0xFF8a7a85);
const Color kBorder  = Color(0xFFf0e4eb);
// ─────────────────────────────────────────────────────────────────────────────

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark,
  ));
  runApp(const TikishApp());
}

// ─── Router ──────────────────────────────────────────────────────────────────
final GoRouter _router = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(path: '/splash',            builder: (_, __) => const SplashScreen()),
    GoRoute(path: '/onboarding',        builder: (_, __) => const OnboardingScreen()),
    GoRoute(path: '/login',             builder: (_, __) => const LoginScreen()),
    GoRoute(path: '/register',          builder: (_, __) => const RegisterScreen()),
    GoRoute(path: '/home',              builder: (_, __) => const HomeScreen()),
    GoRoute(path: '/tailor/:id',        builder: (_, state) => TailorProfileScreen(tailorId: state.pathParameters['id']!)),
    GoRoute(path: '/order',             builder: (_, __) => const OrderScreen()),
    GoRoute(path: '/chat',              builder: (_, __) => const ChatScreen()),
    GoRoute(path: '/ai-stylist',        builder: (_, __) => const AiStylistScreen()),
    GoRoute(path: '/profile',           builder: (_, __) => const ProfileScreen()),
    GoRoute(path: '/tailor-dashboard',  builder: (_, __) => const TailorDashboardScreen()),
  ],
);
// ─────────────────────────────────────────────────────────────────────────────

class TikishApp extends StatelessWidget {
  const TikishApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'TIKISH.UZ',
      debugShowCheckedModeBanner: false,
      routerConfig: _router,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: kPrimary,
          primary: kPrimary,
          onPrimary: Colors.white,
          surface: Colors.white,
          onSurface: kDark,
        ),
        scaffoldBackgroundColor: const Color(0xFFf7f3f5),
        textTheme: GoogleFonts.interTextTheme().copyWith(
          displayLarge: GoogleFonts.playfairDisplay(
            fontSize: 32, fontWeight: FontWeight.w700, color: kDark,
          ),
          displayMedium: GoogleFonts.playfairDisplay(
            fontSize: 24, fontWeight: FontWeight.w700, color: kDark,
          ),
          displaySmall: GoogleFonts.playfairDisplay(
            fontSize: 20, fontWeight: FontWeight.w600, color: kDark,
          ),
          headlineMedium: GoogleFonts.inter(
            fontSize: 16, fontWeight: FontWeight.w600, color: kDark,
          ),
          bodyLarge: GoogleFonts.inter(
            fontSize: 14, fontWeight: FontWeight.w400, color: kDark,
          ),
          bodyMedium: GoogleFonts.inter(
            fontSize: 12, fontWeight: FontWeight.w400, color: kMuted,
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: kPink,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: kBorder),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: kBorder),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: const BorderSide(color: kPrimary, width: 1.5),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: kPrimary,
            foregroundColor: Colors.white,
            elevation: 0,
            shadowColor: kPrimary.withOpacity(0.3),
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            textStyle: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w600),
          ),
        ),
        appBarTheme: AppBarTheme(
          backgroundColor: kDark,
          foregroundColor: Colors.white,
          elevation: 0,
          titleTextStyle: GoogleFonts.playfairDisplay(
            fontSize: 18, fontWeight: FontWeight.w600, color: Colors.white,
          ),
        ),
      ),
    );
  }
}
