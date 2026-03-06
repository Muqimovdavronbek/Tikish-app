// lib/screens/tailor_profile_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../main.dart';

class TailorProfileScreen extends StatefulWidget {
  final String tailorId;
  const TailorProfileScreen({super.key, required this.tailorId});
  @override
  State<TailorProfileScreen> createState() => _TailorProfileScreenState();
}

class _TailorProfileScreenState extends State<TailorProfileScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabs;
  int _stars = 0;
  final _reviewCtrl = TextEditingController();

  final _services = [
    (name: "Ko'ylak tikish",   price: "80 000 – 150 000 so'm",  days: "3–5 kun"),
    (name: "Kostyum tikish",   price: "200 000 – 350 000 so'm", days: "7–10 kun"),
    (name: "Milliy kiyim",     price: "150 000 – 280 000 so'm", days: "5–7 kun"),
    (name: "Kiyim ta'mirlash", price: "20 000 – 60 000 so'm",   days: "1–2 kun"),
  ];

  final _reviews = [
    (name: "Zulfiya M.",  rating: 5, text: "Juda chiroyli tikdi! O'z vaqtida tayyor bo'ldi. Tavsiya qilaman!"),
    (name: "Jasur K.",    rating: 5, text: "Professional, sifatli. Har doim bu ustaga boraman."),
    (name: "Nilufar S.",  rating: 4, text: "Yaxshi ish, lekin 1 kun kech bo'ldi. Umumiy taassurot yaxshi."),
  ];

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() { _tabs.dispose(); _reviewCtrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFf7f3f5),
      body: CustomScrollView(slivers: [
        // Hero header
        SliverAppBar(
          expandedHeight: 220,
          pinned: true,
          backgroundColor: kDark,
          leading: GestureDetector(
            onTap: () => context.go('/home'),
            child: Container(
              margin: const EdgeInsets.all(8),
              decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.white.withOpacity(0.15)),
              child: const Icon(Icons.arrow_back_ios_new, size: 16, color: Colors.white),
            ),
          ),
          actions: [
            IconButton(
              icon: Icon(Icons.share_outlined, color: Colors.white.withOpacity(0.8)),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(Icons.favorite_border, color: Colors.white.withOpacity(0.8)),
              onPressed: () {},
            ),
          ],
          flexibleSpace: FlexibleSpaceBar(
            background: Stack(fit: StackFit.expand, children: [
              Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft, end: Alignment.bottomRight,
                    colors: [kDark, Color(0xFF2e1a2e)],
                  ),
                ),
              ),
              Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                const SizedBox(height: 40),
                Container(
                  width: 80, height: 80,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.grey[300],
                    border: Border.all(color: kPrimary, width: 3),
                  ),
                  child: const Icon(Icons.person, size: 44, color: Colors.white),
                ),
                const SizedBox(height: 10),
                Text("Madina Umarova",
                  style: GoogleFonts.playfairDisplay(fontSize: 20, fontWeight: FontWeight.w700, color: Colors.white)),
                const SizedBox(height: 4),
                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(
                      color: kPrimary.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: kPrimary.withOpacity(0.4)),
                    ),
                    child: Row(children: [
                      const Icon(Icons.verified, size: 12, color: kPrimary),
                      const SizedBox(width: 4),
                      Text("Tasdiqlangan", style: GoogleFonts.inter(fontSize: 11, color: kPrimary, fontWeight: FontWeight.w600)),
                    ]),
                  ),
                  const SizedBox(width: 8),
                  Text("Chilonzor tumani",
                    style: GoogleFonts.inter(fontSize: 11, color: Colors.white54)),
                ]),
              ])),
            ]),
          ),
        ),

        SliverToBoxAdapter(child: Column(children: [
          // Stats row
          Container(
            color: kDark,
            padding: const EdgeInsets.fromLTRB(20, 4, 20, 16),
            child: Row(children: [
              _Stat(value: "4.9", label: "Reyting", icon: Icons.star),
              _StatDivider(),
              _Stat(value: "127", label: "Buyurtma", icon: Icons.check_circle_outline),
              _StatDivider(),
              _Stat(value: "5 yil", label: "Tajriba", icon: Icons.workspace_premium_outlined),
              _StatDivider(),
              _Stat(value: "0.8 km", label: "Masofa", icon: Icons.location_on_outlined),
            ]),
          ),

          // Specialties
          Padding(
            padding: const EdgeInsets.all(14),
            child: Wrap(spacing: 8, runSpacing: 8, children: [
              "Ayollar kiyimi", "Milliy kiyim", "To'y libosi", "Bolalar kiyimi"
            ].map((s) => Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: const Color(0xFFfdf0f5),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: kBorder),
              ),
              child: Text(s, style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.w600, color: kPrimary)),
            )).toList()),
          ),

          // Tab bar
          Container(
            color: Colors.white,
            child: TabBar(
              controller: _tabs,
              labelColor: kPrimary,
              unselectedLabelColor: kMuted,
              indicatorColor: kPrimary,
              indicatorWeight: 2,
              labelStyle: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600),
              tabs: const [Tab(text: "Portfolio"), Tab(text: "Xizmatlar"), Tab(text: "Sharhlar")],
            ),
          ),

          // Tab content
          SizedBox(
            height: 400,
            child: TabBarView(
              controller: _tabs,
              children: [
                // Portfolio
                GridView.builder(
                  padding: const EdgeInsets.all(14),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2, crossAxisSpacing: 10, mainAxisSpacing: 10, childAspectRatio: 0.9),
                  itemCount: 6,
                  itemBuilder: (_, i) => ClipRRect(
                    borderRadius: BorderRadius.circular(14),
                    child: Container(
                      color: Colors.grey[200],
                      child: const Icon(Icons.checkroom, size: 48, color: Colors.grey),
                    ),
                  ),
                ),

                // Services
                ListView.builder(
                  padding: const EdgeInsets.all(14),
                  itemCount: _services.length,
                  itemBuilder: (_, i) {
                    final s = _services[i];
                    return Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Colors.white, borderRadius: BorderRadius.circular(16),
                        boxShadow: [BoxShadow(color: kPrimary.withOpacity(0.06), blurRadius: 8)],
                      ),
                      child: Row(children: [
                        Container(
                          width: 40, height: 40,
                          decoration: BoxDecoration(color: const Color(0xFFfdf0f5), borderRadius: BorderRadius.circular(12)),
                          child: const Icon(Icons.content_cut, size: 20, color: kPrimary),
                        ),
                        const SizedBox(width: 12),
                        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(s.name, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: kDark)),
                          const SizedBox(height: 3),
                          Row(children: [
                            const Icon(Icons.access_time, size: 11, color: Color(0xFFc4b0bc)),
                            const SizedBox(width: 3),
                            Text(s.days, style: GoogleFonts.inter(fontSize: 11, color: kMuted)),
                          ]),
                        ])),
                        Text(s.price, style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.w700, color: kPrimary)),
                      ]),
                    );
                  },
                ),

                // Reviews
                ListView(padding: const EdgeInsets.all(14), children: [
                  ..._reviews.map((r) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: Colors.white, borderRadius: BorderRadius.circular(16),
                      boxShadow: [BoxShadow(color: kPrimary.withOpacity(0.06), blurRadius: 8)],
                    ),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(children: [
                        Text(r.name, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: kDark)),
                        const Spacer(),
                        Row(children: List.generate(5, (i) =>
                          Icon(Icons.star, size: 12, color: i < r.rating ? kPrimary : Colors.grey[300]))),
                      ]),
                      const SizedBox(height: 6),
                      Text(r.text, style: GoogleFonts.inter(fontSize: 12, color: kMuted, height: 1.5)),
                    ]),
                  )),

                  // Add review form
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: const Color(0xFFfdf0f5),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: kBorder),
                    ),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text("Sharh qoldiring", style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: kDark)),
                      const SizedBox(height: 10),
                      Row(children: List.generate(5, (i) => GestureDetector(
                        onTap: () => setState(() => _stars = i + 1),
                        child: Padding(
                          padding: const EdgeInsets.only(right: 4),
                          child: Icon(Icons.star, size: 28,
                            color: i < _stars ? kPrimary : Colors.grey[300]),
                        ),
                      ))),
                      const SizedBox(height: 10),
                      TextField(
                        controller: _reviewCtrl,
                        maxLines: 3,
                        style: GoogleFonts.inter(fontSize: 13, color: kDark),
                        decoration: InputDecoration(
                          hintText: "Fikringizni yozing...",
                          hintStyle: GoogleFonts.inter(color: kMuted),
                          filled: true, fillColor: Colors.white,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: kBorder)),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: kBorder)),
                        ),
                      ),
                      const SizedBox(height: 10),
                      SizedBox(width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () {},
                          child: const Text("Sharh yuborish"),
                        )),
                    ]),
                  ),
                ]),
              ],
            ),
          ),
        ])),
      ]),

      // Bottom CTA
      bottomNavigationBar: Container(
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 28),
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: Color(0xFFf0e4eb))),
        ),
        child: Row(children: [
          GestureDetector(
            onTap: () => context.go('/chat'),
            child: Container(
              width: 48, height: 52,
              decoration: BoxDecoration(
                color: const Color(0xFFfdf0f5),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: kBorder),
              ),
              child: const Icon(Icons.message_outlined, color: kPrimary, size: 22),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: ElevatedButton(
              onPressed: () => context.go('/order'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                shadowColor: kPrimary.withOpacity(0.35), elevation: 4,
              ),
              child: const Text("Buyurtma berish"),
            ),
          ),
        ]),
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  final String value, label; final IconData icon;
  const _Stat({required this.value, required this.label, required this.icon});
  @override
  Widget build(BuildContext context) => Expanded(child: Column(children: [
    Icon(icon, size: 14, color: kPrimary),
    const SizedBox(height: 3),
    Text(value, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
    Text(label, style: GoogleFonts.inter(fontSize: 9, color: Colors.white38)),
  ]));
}

class _StatDivider extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
    Container(width: 1, height: 30, color: Colors.white.withOpacity(0.1));
}
