// lib/screens/home_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class _Tailor {
  final String id, name, city, dist, spec;
  final double rating;
  final int orders;
  final double x, y; // map percentage positions
  const _Tailor({
    required this.id, required this.name, required this.city,
    required this.dist, required this.spec, required this.rating,
    required this.orders, required this.x, required this.y,
  });
}

const _tailors = [
  _Tailor(id:'1', name:'Madina Umarova',   city:'Chilonzor',       dist:'0.8 km', spec:'Ayollar kiyimi',  rating:4.9, orders:127, x:0.52, y:0.38),
  _Tailor(id:'2', name:'Rustam Toshev',     city:'Yunusobod',       dist:'1.4 km', spec:'Erkaklar kiyimi', rating:4.8, orders:95,  x:0.70, y:0.55),
  _Tailor(id:'3', name:'Gulnoza Nazarova',  city:"Mirzo Ulug'bek",  dist:'2.1 km', spec:"To'y libosi",     rating:4.9, orders:156, x:0.35, y:0.60),
  _Tailor(id:'4', name:'Bobur Ismoilov',    city:'Shayhontohur',    dist:'3.0 km', spec:'Milliy kiyim',    rating:4.7, orders:88,  x:0.62, y:0.72),
];

const _cats = ["Barchasi", "Ayollar", "Erkaklar", "To'y", "Milliy", "Bolalar"];

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _mapMode = true;
  String? _selected;
  String _cat = "Barchasi";
  int _navIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFf7f3f5),
      body: Column(children: [
        // Header
        Container(
          color: kDark,
          child: SafeArea(
            bottom: false,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 12),
              child: Column(children: [
                Row(children: [
                  Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(children: [
                      const Icon(Icons.location_on, size: 13, color: kPrimary),
                      const SizedBox(width: 4),
                      Text("Toshkent, O'zbekiston",
                        style: GoogleFonts.inter(fontSize: 11, color: Colors.white54)),
                    ]),
                    const SizedBox(height: 2),
                    Text("Yaqin tikuvchilar",
                      style: GoogleFonts.playfairDisplay(
                        fontSize: 20, fontWeight: FontWeight.w700, color: Colors.white)),
                  ])),
                  _NotifButton(),
                ]),
                const SizedBox(height: 12),
                GestureDetector(
                  onTap: () => context.go('/home'), // would go to search
                  child: Container(
                    height: 44,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: Colors.white.withOpacity(0.08)),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    child: Row(children: [
                      const Icon(Icons.search, size: 18, color: Colors.white38),
                      const SizedBox(width: 8),
                      Text("Tikuvchi yoki xizmat izlang...",
                        style: GoogleFonts.inter(fontSize: 13, color: Colors.white38)),
                    ]),
                  ),
                ),
                const SizedBox(height: 10),
                Row(children: [
                  _ToggleBtn(label: "Xarita",  active: _mapMode,  onTap: () => setState(() => _mapMode = true)),
                  const SizedBox(width: 8),
                  _ToggleBtn(label: "Ro'yxat", active: !_mapMode, onTap: () => setState(() => _mapMode = false)),
                ]),
              ]),
            ),
          ),
        ),

        // Body
        Expanded(
          child: _mapMode ? _MapView(
            tailors: _tailors,
            selected: _selected,
            onSelectTailor: (id) => setState(() => _selected = _selected == id ? null : id),
            onTailorTap: (id) => context.go('/tailor/$id'),
          ) : _ListView(
            tailors: _tailors,
            cats: _cats,
            selectedCat: _cat,
            onCatChanged: (c) => setState(() => _cat = c),
            onTailorTap: (id) => context.go('/tailor/$id'),
          ),
        ),
      ]),

      // Bottom navigation
      bottomNavigationBar: NavigationBar(
        selectedIndex: _navIndex,
        onDestinationSelected: (i) {
          setState(() => _navIndex = i);
          if (i == 1) context.go('/home'); // search placeholder
          if (i == 2) context.go('/ai-stylist');
          if (i == 3) context.go('/profile');
          if (i == 4) context.go('/tailor-dashboard');
        },
        backgroundColor: Colors.white,
        indicatorColor: const Color(0xFFfdf0f5),
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        destinations: [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home, color: kPrimary), label: "Bosh"),
          NavigationDestination(icon: Icon(Icons.search_outlined), selectedIcon: Icon(Icons.search, color: kPrimary), label: "Qidiruv"),
          NavigationDestination(icon: Icon(Icons.auto_awesome_outlined), selectedIcon: Icon(Icons.auto_awesome, color: kPrimary), label: "AI Stilist"),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person, color: kPrimary), label: "Profil"),
          NavigationDestination(icon: Icon(Icons.dashboard_outlined), selectedIcon: Icon(Icons.dashboard, color: kPrimary), label: "Panel"),
        ],
      ),
    );
  }
}

// ─── Map View ────────────────────────────────────────────────────────────────
class _MapView extends StatelessWidget {
  final List<_Tailor> tailors;
  final String? selected;
  final ValueChanged<String> onSelectTailor;
  final ValueChanged<String> onTailorTap;
  const _MapView({required this.tailors, required this.selected,
    required this.onSelectTailor, required this.onTailorTap});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(children: [
          // Fake map
          ClipRRect(
            borderRadius: BorderRadius.circular(22),
            child: SizedBox(
              height: 260,
              child: Stack(
                children: [
                  // Map background
                  Container(color: const Color(0xFFe8eff8)),
                  CustomPaint(size: const Size(double.infinity, 260), painter: _MapPainter()),

                  // User dot
                  Positioned(
                    left: MediaQuery.of(context).size.width * 0.5 - 10,
                    top: 260 * 0.45 - 10,
                    child: Container(
                      width: 20, height: 20,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: kDark,
                        border: Border.all(color: Colors.white, width: 2),
                        boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 6)],
                      ),
                      child: const Center(child: CircleAvatar(radius: 4, backgroundColor: Color(0xFF60a5fa))),
                    ),
                  ),

                  // Tailor pins
                  ...tailors.map((t) {
                    final isSelected = selected == t.id;
                    final screenW = MediaQuery.of(context).size.width - 28;
                    return Positioned(
                      left: screenW * t.x - (isSelected ? 19 : 15),
                      top: 260 * t.y - (isSelected ? 19 : 15),
                      child: GestureDetector(
                        onTap: () => onSelectTailor(t.id),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          width: isSelected ? 38 : 30, height: isSelected ? 38 : 30,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.grey[300],
                            border: Border.all(
                              color: isSelected ? kPrimary : Colors.white, width: 2.5,
                            ),
                            boxShadow: [BoxShadow(
                              color: isSelected
                                ? kPrimary.withOpacity(0.35)
                                : Colors.black.withOpacity(0.15),
                              blurRadius: 8, offset: const Offset(0, 3),
                            )],
                          ),
                          child: const Center(child: Icon(Icons.content_cut, size: 14, color: Colors.white)),
                        ),
                      ),
                    );
                  }),

                  // Popup card
                  if (selected != null) ...[
                    Positioned(
                      bottom: 10, left: 10, right: 10,
                      child: _TailorPopupCard(
                        tailor: tailors.firstWhere((t) => t.id == selected),
                        onTap: () => onTailorTap(selected!),
                      ),
                    ),
                  ],

                  // Location button
                  Positioned(
                    top: 12, right: 12,
                    child: Material(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(10),
                      elevation: 2,
                      child: const Padding(
                        padding: EdgeInsets.all(8),
                        child: Icon(Icons.my_location, size: 18, color: kDark),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 14),

          // Nearby list header
          Row(children: [
            Text("Yaqin tikuvchilar",
              style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w700, color: kDark)),
            const Spacer(),
            TextButton(
              onPressed: () {},
              child: Row(children: [
                Text("Barchasi", style: GoogleFonts.inter(fontSize: 12, color: kPrimary, fontWeight: FontWeight.w600)),
                const Icon(Icons.chevron_right, size: 16, color: kPrimary),
              ]),
            ),
          ]),
          ...tailors.take(3).map((t) => _TailorListTile(
            tailor: t, onTap: () => onTailorTap(t.id))),
        ]),
      ),
    );
  }
}

// ─── List View ───────────────────────────────────────────────────────────────
class _ListView extends StatelessWidget {
  final List<_Tailor> tailors;
  final List<String> cats;
  final String selectedCat;
  final ValueChanged<String> onCatChanged;
  final ValueChanged<String> onTailorTap;
  const _ListView({required this.tailors, required this.cats,
    required this.selectedCat, required this.onCatChanged, required this.onTailorTap});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      // Category chips
      SizedBox(
        height: 44,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
          itemCount: cats.length,
          separatorBuilder: (_, __) => const SizedBox(width: 8),
          itemBuilder: (_, i) {
            final active = cats[i] == selectedCat;
            return GestureDetector(
              onTap: () => onCatChanged(cats[i]),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: active ? kPrimary : Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: active ? kPrimary : kBorder),
                ),
                alignment: Alignment.center,
                child: Text(cats[i], style: GoogleFonts.inter(
                  fontSize: 12, fontWeight: FontWeight.w500,
                  color: active ? Colors.white : kMuted)),
              ),
            );
          },
        ),
      ),
      Expanded(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(14, 8, 14, 14),
          children: tailors.map((t) => _TailorListTile(
            tailor: t, onTap: () => onTailorTap(t.id))).toList(),
        ),
      ),
    ]);
  }
}

// ─── Shared Widgets ──────────────────────────────────────────────────────────
class _NotifButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Container(
        width: 40, height: 40,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: kPrimary.withOpacity(0.15),
          border: Border.all(color: kPrimary.withOpacity(0.3)),
        ),
        child: const Icon(Icons.notifications_outlined, size: 18, color: kPrimary),
      ),
      Positioned(
        top: 8, right: 8,
        child: Container(
          width: 8, height: 8,
          decoration: BoxDecoration(
            shape: BoxShape.circle, color: kPrimary,
            border: Border.all(color: kDark, width: 1.5),
          ),
        ),
      ),
    ]);
  }
}

class _ToggleBtn extends StatelessWidget {
  final String label; final bool active; final VoidCallback onTap;
  const _ToggleBtn({required this.label, required this.active, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: active ? kPrimary : Colors.white.withOpacity(0.08),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(label, style: GoogleFonts.inter(
          fontSize: 12, fontWeight: FontWeight.w600,
          color: active ? Colors.white : Colors.white54)),
      ),
    );
  }
}

class _TailorListTile extends StatelessWidget {
  final _Tailor tailor; final VoidCallback onTap;
  const _TailorListTile({required this.tailor, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          boxShadow: [BoxShadow(color: kPrimary.withOpacity(0.06), blurRadius: 10, offset: const Offset(0, 3))],
        ),
        child: Row(children: [
          Container(
            width: 48, height: 48,
            decoration: BoxDecoration(color: const Color(0xFFe0e0e0), borderRadius: BorderRadius.circular(14)),
            child: const Icon(Icons.person, color: Colors.white, size: 28),
          ),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tailor.name, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: kDark)),
            const SizedBox(height: 2),
            Text(tailor.spec, style: GoogleFonts.inter(fontSize: 11, color: kMuted)),
            const SizedBox(height: 6),
            Row(children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: const Color(0xFFfdf0f5), borderRadius: BorderRadius.circular(10)),
                child: Text(tailor.city, style: GoogleFonts.inter(fontSize: 9, fontWeight: FontWeight.w600, color: kPrimary)),
              ),
              const SizedBox(width: 8),
              const Icon(Icons.location_on, size: 10, color: Color(0xFFc4b0bc)),
              const SizedBox(width: 2),
              Text(tailor.dist, style: GoogleFonts.inter(fontSize: 9, color: const Color(0xFFc4b0bc))),
            ]),
          ])),
          Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
            Row(children: [
              Icon(Icons.star, size: 12, color: kPrimary),
              const SizedBox(width: 2),
              Text(tailor.rating.toString(), style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: kDark)),
            ]),
            const SizedBox(height: 4),
            Text("${tailor.orders} buyurtma", style: GoogleFonts.inter(fontSize: 9, color: const Color(0xFFc4b0bc))),
          ]),
        ]),
      ),
    );
  }
}

class _TailorPopupCard extends StatelessWidget {
  final _Tailor tailor; final VoidCallback onTap;
  const _TailorPopupCard({required this.tailor, required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.12), blurRadius: 16)],
        ),
        child: Row(children: [
          Container(width: 44, height: 44,
            decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.person, color: Colors.white, size: 26)),
          const SizedBox(width: 10),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(tailor.name, style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w700, color: kDark)),
            Text(tailor.spec, style: GoogleFonts.inter(fontSize: 10, color: kMuted)),
            Row(children: [
              Icon(Icons.star, size: 10, color: kPrimary),
              Text(" ${tailor.rating}", style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w600, color: kDark)),
              const SizedBox(width: 8),
              Icon(Icons.location_on, size: 10, color: const Color(0xFFc4b0bc)),
              Text(" ${tailor.dist}", style: GoogleFonts.inter(fontSize: 10, color: const Color(0xFFc4b0bc))),
            ]),
          ])),
          Container(
            width: 32, height: 32,
            decoration: BoxDecoration(color: const Color(0xFFfdf0f5), borderRadius: BorderRadius.circular(10)),
            child: const Icon(Icons.chevron_right, size: 16, color: kPrimary),
          ),
        ]),
      ),
    );
  }
}

class _MapPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final roadPaint = Paint()..color = const Color(0xFFc8d8e8)..strokeWidth = 3;
    final minorPaint = Paint()..color = const Color(0xFFd1dce8)..strokeWidth = 1.5;
    final blockPaint = Paint()..color = const Color(0xFFdce8f2).withOpacity(0.8);
    final parkPaint  = Paint()..color = const Color(0xFFb8ddb8).withOpacity(0.6);

    // Grid
    for (double x = 60; x < size.width; x += 60) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), minorPaint);
    }
    for (double y = 52; y < size.height; y += 52) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), minorPaint);
    }
    // Main roads
    canvas.drawLine(Offset(0, size.height / 2), Offset(size.width, size.height / 2), roadPaint);
    canvas.drawLine(Offset(size.width / 2, 0), Offset(size.width / 2, size.height), roadPaint);

    // Blocks
    final rects = [
      Rect.fromLTWH(20, 20, 70, 40), Rect.fromLTWH(150, 20, 60, 35),
      Rect.fromLTWH(250, 30, 80, 40), Rect.fromLTWH(30, 90, 80, 40),
      Rect.fromLTWH(255, 160, 70, 38), Rect.fromLTWH(155, 150, 85, 40),
    ];
    for (final r in rects) {
      canvas.drawRRect(RRect.fromRectAndRadius(r, const Radius.circular(4)), blockPaint);
    }
    // Parks
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.3, size.height * 0.7), width: 70, height: 50), parkPaint);
    canvas.drawOval(Rect.fromCenter(center: Offset(size.width * 0.8, size.height * 0.38), width: 56, height: 40), parkPaint);
  }

  @override
  bool shouldRepaint(_) => false;
}
