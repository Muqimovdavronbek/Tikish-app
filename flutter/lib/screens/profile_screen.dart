// lib/screens/profile_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFf7f3f5),
      body: CustomScrollView(slivers: [
        SliverToBoxAdapter(
          child: Container(
            color: kDark,
            child: SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
                child: Column(children: [
                  // Avatar
                  Stack(children: [
                    Container(
                      width: 80, height: 80,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle, color: Colors.grey[300],
                        border: Border.all(color: kPrimary, width: 3)),
                      child: const Icon(Icons.person, size: 44, color: Colors.white),
                    ),
                    Positioned(
                      bottom: 0, right: 0,
                      child: Container(
                        width: 24, height: 24,
                        decoration: const BoxDecoration(shape: BoxShape.circle, color: kPrimary),
                        child: const Icon(Icons.edit, size: 12, color: Colors.white),
                      ),
                    ),
                  ]),
                  const SizedBox(height: 12),
                  Text("Zulfiya Mirzo",
                    style: GoogleFonts.playfairDisplay(fontSize: 22, fontWeight: FontWeight.w700, color: Colors.white)),
                  const SizedBox(height: 4),
                  Text("+998 90 123 45 67",
                    style: GoogleFonts.inter(fontSize: 13, color: Colors.white54)),
                  const SizedBox(height: 12),
                  // Stats
                  Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                    _PStat("12", "Buyurtma"),
                    Container(width: 1, height: 28, color: Colors.white.withOpacity(0.15), margin: const EdgeInsets.symmetric(horizontal: 20)),
                    _PStat("3", "Tikuvchi"),
                    Container(width: 1, height: 28, color: Colors.white.withOpacity(0.15), margin: const EdgeInsets.symmetric(horizontal: 20)),
                    _PStat("8", "Sharhlar"),
                  ]),
                ]),
              ),
            ),
          ),
        ),

        SliverPadding(
          padding: const EdgeInsets.all(16),
          sliver: SliverList(delegate: SliverChildListDelegate([
            _MenuSection("Hisob sozlamalari", [
              _MenuItem(icon: Icons.person_outline,       label: "Shaxsiy ma'lumotlar", onTap: () {}),
              _MenuItem(icon: Icons.location_on_outlined, label: "Manzillarim",          onTap: () {}),
              _MenuItem(icon: Icons.payment_outlined,     label: "To'lov usullari",      onTap: () {}),
            ]),
            const SizedBox(height: 12),
            _MenuSection("Buyurtmalarim", [
              _MenuItem(icon: Icons.access_time,           label: "Aktiv buyurtmalar",    onTap: () {}),
              _MenuItem(icon: Icons.history,               label: "Buyurtmalar tarixi",   onTap: () {}),
              _MenuItem(icon: Icons.favorite_border,       label: "Sevimlilar",           onTap: () {}),
            ]),
            const SizedBox(height: 12),
            _MenuSection("Ilovalar", [
              _MenuItem(icon: Icons.notifications_outlined, label: "Bildirishnomalar",   onTap: () {}),
              _MenuItem(icon: Icons.language,               label: "Til: O'zbekcha",     onTap: () {}),
              _MenuItem(icon: Icons.lock_outline,           label: "Maxfiylik",          onTap: () {}),
              _MenuItem(icon: Icons.help_outline,           label: "Yordam",             onTap: () {}),
            ]),
            const SizedBox(height: 16),
            // Logout
            GestureDetector(
              onTap: () => context.go('/login'),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFfee2e2)),
                ),
                child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  const Icon(Icons.logout, size: 18, color: Color(0xFFef4444)),
                  const SizedBox(width: 8),
                  Text("Chiqish", style: GoogleFonts.inter(
                    fontSize: 14, fontWeight: FontWeight.w600, color: const Color(0xFFef4444))),
                ]),
              ),
            ),
            const SizedBox(height: 32),
          ])),
        ),
      ]),
    );
  }
}

class _PStat extends StatelessWidget {
  final String value, label;
  const _PStat(this.value, this.label);
  @override
  Widget build(BuildContext context) => Column(children: [
    Text(value, style: GoogleFonts.playfairDisplay(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white)),
    Text(label, style: GoogleFonts.inter(fontSize: 11, color: Colors.white54)),
  ]);
}

class _MenuSection extends StatelessWidget {
  final String title; final List<_MenuItem> items;
  const _MenuSection(this.title, this.items);
  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Padding(
        padding: const EdgeInsets.only(left: 4, bottom: 8),
        child: Text(title, style: GoogleFonts.inter(
          fontSize: 12, fontWeight: FontWeight.w700, color: kMuted, letterSpacing: 0.5))),
      Container(
        decoration: BoxDecoration(
          color: Colors.white, borderRadius: BorderRadius.circular(16),
          boxShadow: [BoxShadow(color: kPrimary.withOpacity(0.05), blurRadius: 8)],
        ),
        child: Column(children: items.asMap().entries.map((e) {
          final isLast = e.key == items.length - 1;
          return Column(children: [
            e.value,
            if (!isLast) Divider(height: 1, color: kBorder, indent: 52),
          ]);
        }).toList()),
      ),
    ],
  );
}

class _MenuItem extends StatelessWidget {
  final IconData icon; final String label; final VoidCallback onTap;
  const _MenuItem({required this.icon, required this.label, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(children: [
          Container(
            width: 32, height: 32,
            decoration: BoxDecoration(color: const Color(0xFFfdf0f5), borderRadius: BorderRadius.circular(10)),
            child: Icon(icon, size: 17, color: kPrimary),
          ),
          const SizedBox(width: 12),
          Expanded(child: Text(label,
            style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w500, color: kDark))),
          const Icon(Icons.chevron_right, size: 18, color: Color(0xFFc4b0bc)),
        ]),
      ),
    );
  }
}
